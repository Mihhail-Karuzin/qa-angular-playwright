import { chromium, FullConfig, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

type Credentials = {
  username: string;
  password: string;
};

async function loginAndSaveState(
  baseURL: string,
  storagePath: string,
  creds: Credentials
) {
  /**
   * =========================
   * LAUNCH BROWSER (DOCKER / CI SAFE)
   * =========================
   */
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',

      // 🔥 CRITICAL: disable proxy completely
      '--proxy-server=direct://',
      '--proxy-bypass-list=*',

      // Safety flags
      '--ignore-certificate-errors',
      '--allow-insecure-localhost',
      '--disable-web-security',
    ],
  });

  /**
   * =========================
   * CONTEXT
   * =========================
   */
  const context = await browser.newContext({
    baseURL,
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  /**
   * =========================
   * LOGIN FLOW
   * =========================
   */
  await page.goto(`${baseURL}/login`, {
    waitUntil: 'domcontentloaded',
  });

  await page.getByTestId('username-input').fill(creds.username);
  await page.getByTestId('password-input').fill(creds.password);
  await page.getByTestId('login-btn').click();

  await expect(page).toHaveURL(/\/dashboard/, {
    timeout: 30_000,
  });

  /**
   * =========================
   * STORAGE STATE
   * =========================
   */
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await context.storageState({ path: storagePath });

  await browser.close();
}

/**
 * =========================
 * GLOBAL SETUP
 * =========================
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL =
    (config.projects[0]?.use?.baseURL as string) ??
    process.env.BASE_URL ??
    'http://app:4200';

  const authDir = path.join(__dirname, '.auth');

  const userState = path.join(authDir, 'user.json');
  const adminState = path.join(authDir, 'admin.json');

  // USER
  await loginAndSaveState(baseURL, userState, {
    username: 'user',
    password: 'user123',
  });

  // ADMIN
  await loginAndSaveState(baseURL, adminState, {
    username: 'admin',
    password: 'admin123',
  });
}











