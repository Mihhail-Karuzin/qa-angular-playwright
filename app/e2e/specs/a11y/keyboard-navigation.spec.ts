import { test, expect } from '../../fixtures';
import { clear } from 'node:console';

test.describe('A11Y: keyboard navigation', () => {
  test('login form is fully operable via keyboard', async ({ page }) => {
    // =========================
    // Open login page
    // =========================
    await page.goto('/login');

    // =========================
    // Locators (explicit, stable)
    // =========================
    const usernameInput = page.getByTestId('username-input');
    const passwordInput = page.getByTestId('password-input');
    const loginButton = page.getByRole('button', { name: /login/i });

    // =========================
    // Ensure page is fully ready
    // =========================
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    // =========================
    // Keyboard navigation flow
    // =========================
    // Simulate assistive technology initial focus
    await usernameInput.focus();
    await expect(usernameInput).toBeFocused();

    // TAB → password
    await page.keyboard.press('Tab');
    await expect(passwordInput).toBeFocused();

    // TAB → submit button
    await page.keyboard.press('Tab');
    await expect(loginButton).toBeFocused();

    // ENTER → submit form (invalid creds expected)
    await page.keyboard.press('Enter');

    // =========================
    // Assertion
    // =========================
    // Invalid credentials keep user on login page
    await expect(page).toHaveURL(/\/login/);
  });
});

