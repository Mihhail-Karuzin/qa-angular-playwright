import { test, expect } from '../../fixtures';
import { clear } from 'node:console';

test.describe('Security: access after logout', () => {

  test('user cannot access dashboard after logout', async ({ page }) => {
    // Log in manually
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    await expect(page).toHaveURL(/\/dashboard/);

    // Logout
    await page.getByTestId('logout').click();
    await expect(page).toHaveURL(/\/login/);

    // A direct attempt to get back in
    await page.goto('/dashboard');

    // Guard should work
    await expect(page).toHaveURL(/\/login/);
  });

});

