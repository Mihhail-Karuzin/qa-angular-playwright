import { test, expect } from '@playwright/test';

test.describe('Login accessibility', () => {

  test('login form is keyboard accessible', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');

    // Сабмит формы с клавиатуры (A11Y)
    await page.getByTestId('login-form').press('Enter');

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('inputs have accessible labels', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('error message is announced to screen readers', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('username-input').fill('wrong');
    await page.getByTestId('password-input').fill('wrong');

    await page.getByTestId('login-form').press('Enter');

    const error = page.getByTestId('login-error');

    await expect(error).toBeVisible();
    await expect(error).toHaveAttribute('role', 'alert');
  });

});


