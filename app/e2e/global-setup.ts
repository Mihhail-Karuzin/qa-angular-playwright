import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Берём baseURL из playwright.config.ts
  const baseURL = config.projects[0].use.baseURL as string;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1️⃣ Открываем страницу логина
  await page.goto(`${baseURL}/login`);

  // 2️⃣ Логинимся
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-btn').click();

  // 3️⃣ Ждём успешный редирект
  await page.waitForURL('**/dashboard');

  // 4️⃣ Сохраняем storageState (токен авторизации)
  await context.storageState({
    path: 'e2e/auth/admin.json',
  });

  // 5️⃣ Закрываем браузер
  await browser.close();
}

export default globalSetup;


