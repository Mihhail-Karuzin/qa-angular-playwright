import { test, expect } from '@playwright/test';

test.describe('Session lifecycle: expiration', () => {
  const DASHBOARD_PATH = '/dashboard';

  test('redirects to /login with returnUrl when auth_expires_at is expired (on navigation)', async ({ page }) => {
    // Ensure we start from a clean baseline (global storageState may exist).
    // We intentionally set token + role to mimic "user appears logged in",
    // but the session is expired by time.
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', '0'); // expired
    });

    await page.goto(DASHBOARD_PATH);

    // Expect redirect to login and preservation of user intent (returnUrl)
    await expect(page).toHaveURL(/\/login\?returnUrl=%2Fdashboard/);
  });

  test('redirects to /login when session is already expired before route activation (guard-level expiration)', async ({ page }) => {
    // Simulate an expired session BEFORE any protected route is activated.
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', '0'); // expired
    });

    await page.goto(DASHBOARD_PATH);

    // Guard should immediately redirect to login and preserve returnUrl
    await expect(page).toHaveURL(/\/login\?returnUrl=%2Fdashboard/);
  });
});




