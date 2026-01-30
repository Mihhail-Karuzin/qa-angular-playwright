import { test, expect } from '@playwright/test';

test.describe('Session: returnUrl redirect', () => {

  test('user returns to originally requested page after login', async ({ page }) => {

    test.skip(
      test.info().project.name !== 'anon',
      'ReturnUrl behavior is validated only for anonymous users'
    );

    // 1️⃣ Аноним идёт в защищённый роут
    await page.goto('/admin');

    // 2️⃣ Должны оказаться на login
    await expect(page).toHaveURL(/\/login/);

    const url = new URL(page.url());
    expect(url.searchParams.get('returnUrl')).toBe('/admin');

    // 3️⃣ Логинимся как admin
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-btn').click();

    // 4️⃣ Возврат туда, куда шли
    await expect(page).toHaveURL(/\/admin/);
  });

});

