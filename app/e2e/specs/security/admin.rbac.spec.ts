import { test, expect } from '../../fixtures';

test.describe('Security: RBAC admin access', () => {

  test('anon user is redirected to login', async ({ page }) => {
    test.skip(test.info().project.name !== 'anon');
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('USER role is redirected away from admin', async ({ page }) => {
    test.skip(test.info().project.name !== 'user');
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('ADMIN role can access admin page', async ({ page }) => {
    test.skip(test.info().project.name !== 'admin');
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin/);
  });

});


