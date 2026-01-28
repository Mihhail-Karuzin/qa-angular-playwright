import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout-btn');
  }

  /**
   * Explicit navigation to dashboard page.
   * IMPORTANT:
   * - Even with storageState, Playwright starts on about:blank
   * - Navigation must always be explicit in Page Objects
   */
  async open() {
    await this.page.goto('/dashboard');
  }

  /**
   * Assertion that dashboard page is opened
   */
  async expectOpened() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  /**
   * Logout action
   */
  async logout() {
    await this.logoutButton.click();
  }
}


