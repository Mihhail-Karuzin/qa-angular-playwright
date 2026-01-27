import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {

  test('invalid login shows error', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-username').fill('wrong');
    await page.getByTestId('login-password').fill('wrong');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
  });

  test('valid login redirects to dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('admin123');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test(' dashboard is protected for unauthenticated user', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL('/login');
  });

  test('🚪 logout clears session and redirects to login', async ({ page }) => {
    // login first
    await page.goto('/login');
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('admin123');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/dashboard');

    // logout
    await page.getByTestId('logout-btn').click();

    await expect(page).toHaveURL('/login');

    // dashboard should be blocked again
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });

});
