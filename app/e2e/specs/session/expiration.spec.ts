import { test, expect } from '@playwright/test';

test.describe('Session: expiration', () => {

  test('expired session redirects to login with returnUrl', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'anon',
      'Expiration relevant only for anon'
    );

    // 1️⃣ Пытаемся зайти в защищённую страницу
    await page.goto('/dashboard');

    // 2️⃣ Реальное поведение guard
    await expect(page).toHaveURL(/\/login/);

    // 3️⃣ Проверяем что это именно редирект
    const url = new URL(page.url());
    expect(url.searchParams.get('returnUrl')).toBe('/dashboard');

    // 4️⃣ Login UI присутствует
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

});


