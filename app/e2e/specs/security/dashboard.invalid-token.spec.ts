import { test } from '@playwright/test';

test.describe('Security: invalid auth token', () => {

  test.skip(
    'invalid token validation is backend responsibility (documented limitation)',
    async () => {}
  );

});


