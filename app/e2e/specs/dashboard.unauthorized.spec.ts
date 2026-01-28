import { test, expect } from '@playwright/test';

test.describe('Dashboard unauthorized scenarios', () => {
  test('user without auth token is redirected to login', async ({ page }) => {
    // ❌ удаляем токен вручную
    await page.addInitScript(() => {
      localStorage.removeItem('qa_auth_token');
    });

    // идём напрямую
    await page.goto('/dashboard');

    // guard должен сработать
    await expect(page).toHaveURL(/\/login/);
  });
});
