import { test, expect } from '@playwright/test';

test.describe('Dashboard accessibility (authenticated)', () => {
  test.use({ storageState: 'e2e/auth/user.json' });

  test('dashboard exposes heading and logout button', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByTestId('logout')).toBeVisible();

    await expect(page.getByTestId('logout')).toHaveAccessibleName(/logout/i);
  });
});
