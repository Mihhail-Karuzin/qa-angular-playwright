import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Dashboard flow (authenticated)', () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(
      testInfo.project.name === 'anon',
      'Dashboard requires authenticated user (documented limitation)'
    );
  });

  test('authenticated user sees dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.open();
    await dashboard.expectOpened();
  });

  test('logout redirects to login', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.open();
    await dashboard.expectOpened();

    await dashboard.logout();

    // ✅ logout → login
    await expect(page).toHaveURL(/\/login/);
  });
});









