import { test, expect } from '@playwright/test';
import { clear } from 'node:console';

test.describe('Security: access after logout', () => {

  test('user cannot access dashboard after logout', async ({ page }) => {
    // 1️⃣ Логинимся вручную
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    await expect(page).toHaveURL(/\/dashboard/);

    // 2️⃣ Логаут
    await page.getByTestId('logout').click();
    await expect(page).toHaveURL(/\/login/);

    // 3️⃣ Прямая попытка зайти обратно
    await page.goto('/dashboard');

    // 4️⃣ Guard должен сработать
    await expect(page).toHaveURL(/\/login/);
  });

});

