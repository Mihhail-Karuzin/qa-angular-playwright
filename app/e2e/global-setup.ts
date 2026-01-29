import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1️⃣ Открываем login
  await page.goto(`${baseURL}/login`);

  // 2️⃣ Заполняем форму
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');

  // 3️⃣ Сабмитим форму
  await page.keyboard.press('Enter');

  // 4️⃣ ЖДЁМ ПОЯВЛЕНИЯ ТОКЕНА (а не URL!)
  await page.waitForFunction(() => {
    return localStorage.getItem('qa_auth_token') !== null;
  });

  // 5️⃣ Сохраняем storageState
  await context.storageState({
    path: 'e2e/auth/admin.json',
  });

  await browser.close();
}

export default globalSetup;




