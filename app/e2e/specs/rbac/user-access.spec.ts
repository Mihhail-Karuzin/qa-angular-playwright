import { test, expect } from '@playwright/test';

test.describe('RBAC: user access restrictions', () => {
  const ADMIN_PATH = '/admin';
  const DASHBOARD_PATH = '/dashboard';

  test('redirects standard user away from /admin', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto(ADMIN_PATH);

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('allows standard user to access /dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto(DASHBOARD_PATH);

    await expect(page).toHaveURL(/\/dashboard/);
  });
});
