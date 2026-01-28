import { test, expect } from '../fixtures/auth.fixture';

test.describe('Dashboard flow', () => {

  test('authenticated user sees dashboard', async ({ dashboardPage }) => {
    // IMPORTANT:
    // Even with storageState, Playwright starts from about:blank
    // Navigation must be explicit
    await dashboardPage.open();
    await dashboardPage.expectOpened();
  });

  test('logout redirects to login', async ({ dashboardPage, page }) => {
    await dashboardPage.open();
    await dashboardPage.expectOpened();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/login/);
  });

});

