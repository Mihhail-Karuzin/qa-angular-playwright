/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /**
   * Где лежат e2e тесты
   */
  testDir: './e2e',

  /**
   * Глобальный setup
   * Логинимся ОДИН раз и сохраняем storageState
   */
  globalSetup: require.resolve('./e2e/global-setup'),

  /**
   * Параллельность
   */
  fullyParallel: true,

  /**
   * Запрещаем test.only в CI
   */
  forbidOnly: !!process.env.CI,

  /**
   * Retry логика
   */
  retries: process.env.CI ? 1 : 0,

  /**
   * В CI — один воркер (стабильность)
   */
  workers: process.env.CI ? 1 : undefined,

  /**
   * Репорт
   */
  reporter: [['html', { open: 'never' }]],

  /**
   * Общие настройки для всех тестов
   */
  use: {
    baseURL: 'http://localhost:4200',

    /**
     * 🔑 КРИТИЧЕСКИ ВАЖНО
     * Подхватываем сохранённый токен
     */
    storageState: 'e2e/auth/admin.json',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /**
   * Проекты (пока только chromium)
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /**
   * Angular dev server
   */
  webServer: {
    command: 'npm start',
    port: 4200,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

