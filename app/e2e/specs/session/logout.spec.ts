import { test } from '@playwright/test';

test.describe('Session: logout lifecycle', () => {
  test.skip(
    'logout clears session and redirects to /login',
    () => {
      // Phase 3 TODO:
      // Logout UI + deterministic selectors will be finalized in Phase 3,
      // along with session lifecycle hardening (forced logout, returnUrl).
    }
  );
});

