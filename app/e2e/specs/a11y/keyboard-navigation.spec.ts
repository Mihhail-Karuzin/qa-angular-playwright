import { test, expect } from '@playwright/test';

test.describe('A11Y: keyboard navigation', () => {
  test('login form is fully operable via keyboard', async ({ page }) => {
    await page.goto('/login');

    await page.keyboard.press('Tab');
    await expect(page.locator('input').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input').nth(1)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('button')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/login/); // invalid creds keep user on login
  });
});
