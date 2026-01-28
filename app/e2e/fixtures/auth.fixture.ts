import { test as base } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: import('@playwright/test').Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'e2e/auth/admin.json',
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export const expect = test.expect;
