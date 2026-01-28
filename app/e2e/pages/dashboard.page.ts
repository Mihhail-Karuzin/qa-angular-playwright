import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByTestId('dashboard-page');
    this.logoutButton = page.getByTestId('logout-btn');
  }

  async assertOpened() {
    await expect(this.page).toHaveURL(/.*dashboard/);
    await expect(this.pageTitle).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
