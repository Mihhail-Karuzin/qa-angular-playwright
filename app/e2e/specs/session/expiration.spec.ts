import { test } from '@playwright/test';

test.describe('Session: expiration', () => {
  test.skip(
    'expired session forces redirect to /login',
    () => {
      // Phase 3 TODO:
      // In a real system, session expiration is usually enforced by backend (401/403)
      // or via token TTL validation. Frontend-only demo auth does not implement TTL yet.
      // This will be implemented in Phase 3 (Session Lifecycle).
    }
  );
});

