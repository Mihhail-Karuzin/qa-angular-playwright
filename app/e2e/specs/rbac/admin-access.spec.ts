import { test, expect } from '../../fixtures';

test.describe('RBAC: admin access control', () => {
  const ADMIN_PATH = '/admin';

  test('allows admin to access /admin', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'admin');
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto(ADMIN_PATH);

    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('denies access to /admin for unauthenticated user', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto(ADMIN_PATH);

    await expect(page).toHaveURL(/\/login/);
  });
});
