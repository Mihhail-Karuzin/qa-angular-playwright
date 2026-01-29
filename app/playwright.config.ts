/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /**
   * 📁 Где лежат E2E тесты
   * ТОЛЬКО Playwright, никаких Angular unit
   */
  testDir: './e2e',

  /**
   * ❌ КРИТИЧНО:
   * Исключаем Angular unit tests (Jasmine/Karma)
   */
  testIgnore: [
    '**/node_modules/**',
    '**/src/**/*.spec.ts',        // Angular unit tests
    '**/*.unit.spec.ts',
  ],

  /**
   * 🔑 Global setup
   * Логин 1 раз → сохраняем storageState
   */
  globalSetup: require.resolve('./e2e/global-setup'),

  /**
   * ⚡ Параллельность
   */
  fullyParallel: true,

  /**
   * 🚫 Запрещаем test.only в CI
   */
  forbidOnly: !!process.env.CI,

  /**
   * 🔁 Retry логика
   */
  retries: process.env.CI ? 1 : 0,

  /**
   * 👷 В CI используем 1 worker (стабильность)
   */
  workers: process.env.CI ? 1 : undefined,

  /**
   * 📊 Репорты
   */
  reporter: [['html', { open: 'never' }]],

  /**
   * 🌍 Общие настройки
   */
  use: {
    baseURL: 'http://localhost:4200',

    /**
     * 🔐 Подхватываем сохранённый токен
     * По умолчанию все тесты — авторизованы
     */
    storageState: 'e2e/auth/admin.json',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /**
   * 🌐 Браузеры
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /**
   * 🚀 Angular dev server
   */
  webServer: {
    command: 'npm start',
    port: 4200,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

