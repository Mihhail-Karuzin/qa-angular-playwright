import { test, expect } from '@playwright/test';

test.describe('RBAC: /admin access', () => {

  test('anon is redirected to /login', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'anon',
      'Runs only in anon project'
    );

    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('user is redirected away from /admin (to /dashboard)', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'user',
      'Runs only in user project'
    );

    await page.goto('/admin');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('admin can open /admin', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'admin',
      'Runs only in admin project'
    );

    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin$/);
    await expect(
      page.getByRole('heading', { name: /admin/i })
    ).toBeVisible();
  });

});
