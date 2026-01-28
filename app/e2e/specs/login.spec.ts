import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { clear } from 'node:console';

test.describe('Login flow', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login('admin', 'admin123');

    await dashboardPage.assertOpened();
  });

  test('invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('wrong', 'credentials');

    await loginPage.assertLoginErrorVisible();
  });
});

