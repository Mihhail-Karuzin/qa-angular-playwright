import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e', // 👈 КЛЮЧЕВО

  timeout: 30_000,

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    timeout: 120_000,
    reuseExistingServer: false,
  },

  projects: [
    { name: 'anon' },
    { name: 'user', use: { storageState: 'e2e/auth/user.json' } },
    { name: 'admin', use: { storageState: 'e2e/auth/admin.json' } },
  ],
});






