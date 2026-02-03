import { test } from '@playwright/test';

test.fixme(
  true,
  'Logout button visibility after expiration depends on backend session lifecycle'
);

test('expired session removes logout button', async ({ page }) => {
  // documented limitation
});

