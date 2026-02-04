import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  /**
   * =========================
   * TEST LOCATION
   * =========================
   */
  testDir: 'e2e/specs',

  /**
   * =========================
   * GLOBAL TIMEOUT
   * =========================
   */
  timeout: 30_000,

  /**
   * =========================
   * GLOBAL SETUP
   * =========================
   * Creates storageState files
   * for user and admin roles
   */
  globalSetup: path.resolve(__dirname, 'e2e/global-setup.ts'),

  /**
   * =========================
   * SHARED CONTEXT SETTINGS
   * =========================
   */
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },

  /**
   * =========================
   * PROJECTS (AUTH SCOPES)
   * =========================
   */
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
        storageState: path.resolve(__dirname, 'e2e/.auth/user.json'),
      },
    },
    {
      name: 'admin',
      use: {
        storageState: path.resolve(__dirname, 'e2e/.auth/admin.json'),
      },
    },
  ],

  /**
   * =========================
   * WEB SERVER
   * =========================
   */
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
















