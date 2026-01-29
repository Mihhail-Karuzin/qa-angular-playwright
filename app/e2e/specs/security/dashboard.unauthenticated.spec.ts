import { test, expect } from '@playwright/test';

test.describe('Security: unauthenticated access', () => {

  test('user is redirected to login when accessing dashboard directly', async ({ page }) => {

    // ❌ гарантированно убираем токен ДО загрузки Angular
    await page.addInitScript(() => {
      localStorage.removeItem('qa_auth_token');
    });

    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

});

