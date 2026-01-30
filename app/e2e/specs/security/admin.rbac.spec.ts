import { test, expect } from '@playwright/test';

test.describe('Security: RBAC admin access', () => {

  test('authenticated USER role cannot access admin page', async ({ page }) => {
    // 🔑 имитируем залогиненного обычного пользователя
    await page.addInitScript(() => {
      localStorage.setItem('qa_auth_token', 'fake-token');
      localStorage.setItem('qa_user_role', 'user');
    });

    await page.goto('/admin');

    // ❌ доступ запрещён → редирект на dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('authenticated ADMIN role can access admin page', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('qa_auth_token', 'fake-token');
      localStorage.setItem('qa_user_role', 'admin');
    });

    await page.goto('/admin');

    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByRole('heading', { name: /admin/i })).toBeVisible();
  });

});

