import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // ⬅️ ВАЖНО: проверь реальный текст заголовка
    this.heading = page.getByRole('heading', {
      name: /dashboard/i,
    });

    // ✅ ИСПРАВЛЕНО: реальный testid
    this.logoutButton = page.getByRole('button', {
      name: /logout/i,
    });
  }

  async open() {
    await this.page.goto('/dashboard');
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.heading).toBeVisible();
  }

  async logout() {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
  }
}




