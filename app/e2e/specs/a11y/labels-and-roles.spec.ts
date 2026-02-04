import { test, expect } from '@playwright/test';

test.describe('A11Y: labels and roles', () => {
  test('login inputs have accessible labels', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('buttons expose proper accessible role', async ({ page }) => {
    await page.goto('/login');

    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });
});
