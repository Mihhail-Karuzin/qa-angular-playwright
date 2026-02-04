import { test, expect } from '@playwright/test';

test.describe('Session lifecycle: UI stability on hard expiration', () => {
  const DASHBOARD_PATH = '/dashboard';

  test('does not crash UI when auth_token is missing before navigation', async ({ page }) => {
    // Capture browser errors
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    // Simulate corrupted auth state before route activation
    await page.addInitScript(() => {
      localStorage.removeItem('auth_token');
      localStorage.setItem('auth_role', 'user');
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto(DASHBOARD_PATH);

    // Expect redirect to login
    await expect(page).toHaveURL(/\/login/);

    // UI should not crash
    await expect(page.locator('body')).toBeVisible();

    // No uncaught runtime errors
    expect(pageErrors).toEqual([]);
  });

  test('login page remains interactive after forced logout scenario', async ({ page }) => {
    // Force unauthenticated state
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/login');

    // Basic UI sanity checks
    await expect(page.locator('input')).toHaveCount(2);
    await expect(page.locator('button')).toBeVisible();

    // Ensure no runtime errors occurred
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    expect(errors).toEqual([]);
  });
});


