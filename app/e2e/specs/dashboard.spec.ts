import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Dashboard flow (authenticated)', () => {
  // ✅ ВАЖНО: этот describe должен выполняться только с storageState
  test.use({ storageState: 'e2e/auth/user.json' });

  test('authenticated user sees dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.open();
    await dashboard.expectOpened();

    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('logout redirects to login', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.open();
    await dashboard.expectOpened();

    await page.getByTestId('logout').click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });
});

