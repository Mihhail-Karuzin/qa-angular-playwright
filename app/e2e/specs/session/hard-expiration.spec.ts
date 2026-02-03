import { test } from '@playwright/test';

test.fixme(
  true,
  'Session expiration is enforced backend-side and cannot be simulated via storageState'
);

test('expired session forces logout on next navigation', async ({ page }) => {
  // documented limitation
});


