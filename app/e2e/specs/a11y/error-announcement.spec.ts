import { test, expect } from '@playwright/test';

test.describe('A11Y: error announcement', () => {
  test('login error is accessible to screen readers', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: /login/i }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
  });
});
