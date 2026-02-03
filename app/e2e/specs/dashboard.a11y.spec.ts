import { test, expect } from '@playwright/test';

test.describe('Dashboard accessibility (authenticated)', () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(
      testInfo.project.name === 'anon',
      'Dashboard a11y requires authenticated user'
    );
  });

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


