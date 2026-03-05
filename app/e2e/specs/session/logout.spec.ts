import { test, expect } from '../../fixtures';

test.describe('Session: logout lifecycle', () => {

  test('logout clears UI session and redirects to login', async ({ page }) => {
    test.skip(
      test.info().project.name === 'anon',
      'Logout not applicable for anon'
    );

    // OBVIOUSLY log in
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    await expect(page).toHaveURL(/\/dashboard/);

    // Logout BUTTON (IMPORTANT: correct testid)
    const logoutButton = page.getByTestId('logout');
    await expect(logoutButton).toBeVisible();

    // Logout
    await logoutButton.click();

    // Redirect to login
    await expect(page).toHaveURL(/\/login/);

    // Trying to go back
    await page.goto('/dashboard');

    // Guard is triggered again
    await expect(page).toHaveURL(/\/login/);
  });

});




