import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: 'e2e/specs',
  timeout: 30_000,

  globalSetup: path.resolve(__dirname, 'e2e/global-setup.ts'),

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'anon',
      use: {
        storageState: undefined,
      },
    },

    {
      name: 'user',
      use: {
        storageState: path.resolve(
          __dirname,
          'e2e/.auth/user.json'
        ),
      },
    },

    {
      name: 'admin',
      use: {
        storageState: path.resolve(
          __dirname,
          'e2e/.auth/admin.json'
        ),
      },
    },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});














