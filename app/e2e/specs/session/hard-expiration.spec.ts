import { test, expect } from '@playwright/test';

test.describe('Session lifecycle: hard expiration (guard-level)', () => {
  const DASHBOARD_PATH = '/dashboard';

  test('redirects to /login when auth_token is missing before route activation', async ({ page }) => {
    // Simulate corrupted session BEFORE navigation
    await page.addInitScript(() => {
      localStorage.removeItem('auth_token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto(DASHBOARD_PATH);

    await expect(page).toHaveURL(/\/login/);
  });

  test('denies access to protected routes when localStorage is cleared before navigation', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto(DASHBOARD_PATH);

    await expect(page).toHaveURL(/\/login/);
  });
});



