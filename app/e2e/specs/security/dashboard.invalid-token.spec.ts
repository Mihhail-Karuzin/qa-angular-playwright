import { test, expect } from '@playwright/test';

test.describe('Security: invalid auth token', () => {

  test('user is logged out if token is invalid', async ({ page }) => {

    // ❌ кладём НЕвалидный токен ДО старта приложения
    await page.addInitScript(() => {
      localStorage.setItem('qa_auth_token', 'INVALID_TOKEN');
    });

    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

});

