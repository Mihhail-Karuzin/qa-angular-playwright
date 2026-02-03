import { test, expect } from '@playwright/test';

test.describe('Security: unauthenticated access', () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'anon',
      'Unauthenticated checks apply only to anon users'
    );
  });

  test('user is redirected to login when accessing dashboard directly', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });
});


