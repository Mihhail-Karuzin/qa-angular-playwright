import { test, expect } from '@playwright/test';

test.describe('Login accessibility', () => {

    test('login form is keyboard accessible', async ({ page }) => {
        await page.goto('/login');

        await page.getByTestId('username-input').fill('admin');
        await page.getByTestId('password-input').fill('admin123');

        await page.getByTestId('login-form').press('Enter');

        await expect(page).toHaveURL(/\/dashboard/);
    });

    test('inputs have accessible labels', async ({ page }) => {
        await page.goto('/login');

        await expect(page.getByLabel('Username')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
    });

});

