import { test, expect } from '@playwright/test';

test.describe('Session: logout lifecycle', () => {

  test('logout clears UI session and redirects to login', async ({ page }) => {
    test.skip(
      test.info().project.name === 'anon',
      'Logout not applicable for anon'
    );

    // 1️⃣ ЯВНО логинимся
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    await expect(page).toHaveURL(/\/dashboard/);

    // 2️⃣ КНОПКА logout (ВАЖНО: правильный testid)
    const logoutButton = page.getByTestId('logout');
    await expect(logoutButton).toBeVisible();

    // 3️⃣ Логаут
    await logoutButton.click();

    // 4️⃣ Редирект на login
    await expect(page).toHaveURL(/\/login/);

    // 5️⃣ Попытка вернуться назад
    await page.goto('/dashboard');

    // 6️⃣ Guard снова срабатывает
    await expect(page).toHaveURL(/\/login/);
  });

});




