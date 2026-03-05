import { test, expect } from '../../fixtures';

test.describe('Session: returnUrl redirect', () => {

  test('user returns to originally requested page after login', async ({ page }) => {

    test.skip(
      test.info().project.name !== 'anon',
      'ReturnUrl behavior is validated only for anonymous users'
    );

    // Anonymous goes to a secure route
    await page.goto('/admin');

    // Should be on login
    await expect(page).toHaveURL(/\/login/);

    const url = new URL(page.url());
    expect(url.searchParams.get('returnUrl')).toBe('/admin');

    // Log in as admin
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    // Returning to where we were going
    await expect(page).toHaveURL(/\/admin/);
  });

});

