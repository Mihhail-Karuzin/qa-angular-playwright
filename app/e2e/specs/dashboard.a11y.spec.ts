import { test, expect } from '../fixtures/auth.fixture';

test.describe('Dashboard accessibility', () => {
  test('dashboard exposes heading and logout button', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(
      page.getByRole('heading', { name: /dashboard/i })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /logout/i })
    ).toBeVisible();
  });
});
