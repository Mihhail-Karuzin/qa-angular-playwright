import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Открываем логин
  await page.goto(`${baseURL}/login`);

  // Логинимся
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-btn').click();

  // Проверяем, что мы на dashboard
  await page.waitForURL('**/dashboard');

  // Сохраняем storageState
  await page.context().storageState({
    path: 'e2e/auth/admin.json',
  });

  await browser.close();
}

export default globalSetup;

