import { defineConfig } from '@playwright/test';
import path from 'path';

const isDocker = Boolean(process.env.DOCKER || process.env.CI);

const E2E_DIR = path.resolve(__dirname, 'e2e');
const AUTH_DIR = path.resolve(E2E_DIR, '.auth');

export default defineConfig({
  testDir: path.join(E2E_DIR, 'specs'),
  testMatch: ['**/*.spec.ts'],

  timeout: 30_000,
  expect: { timeout: 5_000 },

  // 🔥 VERY IMPORTANT FOR DOCKER
  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['blob', { outputDir: 'blob-report' }],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:4200',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Global setup only locally
  ...(isDocker
    ? {}
    : {
        globalSetup: path.resolve(E2E_DIR, 'global-setup.ts'),
      }),

  projects: [
    {
      name: 'anon',
      use: { storageState: undefined },
    },

    ...(isDocker
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


















