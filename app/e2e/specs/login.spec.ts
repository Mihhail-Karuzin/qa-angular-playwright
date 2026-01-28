import { test, expect } from '../fixtures/auth.fixture';

test.describe('Login flow', () => {
  test.use({ storageState: undefined });

  test('successful login redirects to dashboard', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login('admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('invalid login shows error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('wrong', 'wrong');

    await loginPage.expectErrorVisible();
  });
});


