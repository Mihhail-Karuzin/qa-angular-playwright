import { test, expect } from '@playwright/test';

test.describe('Dashboard unauthorized scenarios', () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'anon',
      'Unauthorized scenarios run only for anon users'
    );
  });

  test('user without auth token is redirected to login', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });
});

