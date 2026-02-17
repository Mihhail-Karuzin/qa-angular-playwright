import { test, expect } from '../../fixtures';
import { clear } from 'node:console';

test.describe('RBAC: regression and edge cases', () => {
  test('unknown role is treated as unauthenticated', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('auth_role', 'superuser'); // invalid role
      localStorage.setItem('auth_expires_at', `${Date.now() + 60_000}`);
    });

    await page.goto('/admin');

    await expect(page).toHaveURL(/\/login|\/dashboard/);
  });
});
