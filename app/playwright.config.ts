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

  /**
   * =========================
   * PROJECTS
   * =========================
   */
  projects: [
    /**
     * -------------------------
     * Anonymous user
     * -------------------------
     */
    {
      name: 'anon',
      use: {
        storageState: undefined,
      },
    },

    /**
     * -------------------------
     * Authenticated user
     * -------------------------
     */
    {
      name: 'user',
      use: {
        storageState: path.resolve(
          __dirname,
          'e2e/.auth/user.json'
        ),
      },
    },

    /**
     * -------------------------
     * Admin user
     * -------------------------
     */
    {
      name: 'admin',
      use: {
        storageState: path.resolve(
          __dirname,
          'e2e/.auth/admin.json'
        ),
      },
    },

    /**
     * =========================
     * PERFORMANCE (LIGHTHOUSE)
     * =========================
     *
     * - Isolated project
     * - Single worker ONLY
     * - No parallelism
     * - Required for Lighthouse stability
     */
    {
      name: 'performance',
      testMatch: /.*lighthouse\.e2e\.spec\.ts/,
      workers: 1,
      retries: 0,
      use: {
        storageState: undefined,
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














