import { defineConfig } from '@playwright/test';
import path from 'path';

const isDocker = Boolean(process.env.DOCKER);
const isCI = Boolean(process.env.CI);

const E2E_DIR = path.resolve(__dirname, 'e2e');
const AUTH_DIR = path.resolve(E2E_DIR, '.auth');

export default defineConfig({
  testDir: path.join(E2E_DIR, 'specs'),
  testMatch: ['**/*.spec.ts'],

  timeout: 30_000,
  expect: { timeout: 5_000 },

  // 🔥 Stability in CI
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  // 🔥 Important for Docker artifact mapping
  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['blob', { outputDir: 'blob-report' }],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:4200',
    ignoreHTTPSErrors: true,

    // Smart tracing strategy
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'on',
  },

  // Global setup only outside Docker/CI
  ...(isDocker || isCI
    ? {}
    : {
        globalSetup: path.resolve(E2E_DIR, 'global-setup.ts'),
      }),

  projects: [
    {
      name: 'anon',
      use: { storageState: undefined },
    },

    ...(isDocker || isCI
      ? []
      : [
          {
            name: 'user',
            use: {
              storageState: path.join(AUTH_DIR, 'user.json'),
            },
          },
          {
            name: 'admin',
            use: {
              storageState: path.join(AUTH_DIR, 'admin.json'),
            },
          },
        ]),
  ],
});


















