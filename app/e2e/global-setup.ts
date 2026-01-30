import { chromium, FullConfig } from '@playwright/test';

async function createState(
  baseURL: string,
  username: string,
  password: string,
  outFile: string
) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/login`);

  await page.getByTestId('username-input').fill(username);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-btn').click();

  await page.waitForURL('**/dashboard');

  await context.storageState({ path: outFile });
  await browser.close();
}

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  await createState(baseURL, 'admin', 'admin123', 'e2e/auth/admin.json');
  await createState(baseURL, 'user', 'user123', 'e2e/auth/user.json');
}







