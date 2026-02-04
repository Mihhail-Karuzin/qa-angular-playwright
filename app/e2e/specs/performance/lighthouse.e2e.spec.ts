import { test, expect } from '@playwright/test';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

test.describe('Performance: Lighthouse via Playwright', () => {
  test('login and dashboard meet performance budgets', async ({ page }) => {
    // 1️⃣ Запускаем Chrome ПЕРВЫМ
    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    });

    try {
      // 2️⃣ Lighthouse — LOGIN
      const loginResult = await lighthouse('http://localhost:4200/login', {
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility'],
      });

      const loginCategories = loginResult?.lhr?.categories;

      const loginPerf = loginCategories?.performance?.score ?? 0;
      const loginA11y = loginCategories?.accessibility?.score ?? 0;

      expect(loginPerf).toBeGreaterThanOrEqual(0.7);
      expect(loginA11y).toBeGreaterThanOrEqual(0.9);

      // 3️⃣ Переход к dashboard
      await page.goto('http://localhost:4200/login');
      await page.goto('http://localhost:4200/dashboard');

      // 4️⃣ Lighthouse — DASHBOARD
      const dashboardResult = await lighthouse('http://localhost:4200/dashboard', {
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility'],
      });

      const dashCategories = dashboardResult?.lhr?.categories;

      const dashPerf = dashCategories?.performance?.score ?? 0;
      const dashA11y = dashCategories?.accessibility?.score ?? 0;

      expect(dashPerf).toBeGreaterThanOrEqual(0.7);
      expect(dashA11y).toBeGreaterThanOrEqual(0.9);
    } finally {
      // 5️⃣ Всегда закрываем Chrome
      await chrome.kill();
    }
  });
});




