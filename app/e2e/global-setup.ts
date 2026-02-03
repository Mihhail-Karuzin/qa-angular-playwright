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
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });

  // 1️⃣ Открываем страницу логина
  await page.goto('/login');

  // 2️⃣ Заполняем форму (РЕАЛЬНЫЕ data-testid из DOM)
  await page.getByTestId('username-input').fill(creds.username);
  await page.getByTestId('password-input').fill(creds.password);
  await page.getByTestId('login-btn').click();

  // 3️⃣ Ждём УСПЕШНЫЙ логин (редирект)
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });

  // 4️⃣ Гарантируем папку для storageState
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });

  // 5️⃣ Сохраняем storageState
  await page.context().storageState({ path: storagePath });

  await browser.close();
}

export default async function globalSetup(config: FullConfig) {
  const baseURL =
    (config.projects[0]?.use?.baseURL as string) ??
    'http://localhost:4200';

  const authDir = path.join(__dirname, '.auth');

  const userState = path.join(authDir, 'user.json');
  const adminState = path.join(authDir, 'admin.json');

  // ✅ КРЕДЫ ИЗ AuthService
  await loginAndSaveState(baseURL, userState, {
    username: 'user',
    password: 'user123',
  });

  await loginAndSaveState(baseURL, adminState, {
    username: 'admin',
    password: 'admin123',
  });
}










