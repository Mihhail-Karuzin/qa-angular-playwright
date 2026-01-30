import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/specs',

  globalSetup: './e2e/global-setup.ts',

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'anon',
      use: { storageState: undefined },
    },
    {
      name: 'user',
      use: { storageState: 'e2e/auth/user.json' },
    },
    {
      name: 'admin',
      use: { storageState: 'e2e/auth/admin.json' },
    },
  ],
});




