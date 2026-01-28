/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Где лежат e2e тесты
  testDir: './e2e',

  // Global setup для storageState (логин 1 раз)
  globalSetup: './e2e/global-setup',

  // Параллельность
  fullyParallel: true,

  // Запрет test.only в CI
  forbidOnly: !!process.env.CI,

  // Ретраи
  retries: process.env.CI ? 1 : 0,

  // В CI — один воркер
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm start',
    port: 4200,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
