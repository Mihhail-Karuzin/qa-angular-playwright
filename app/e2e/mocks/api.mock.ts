import { Page } from '@playwright/test';

export class ApiMock {
  constructor(private page: Page) {}

  async mock401(urlPart: string) {
    await this.page.route(`**/${urlPart}`, route =>
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Unauthorized' }),
      })
    );
  }

  async mock500(urlPart: string) {
    await this.page.route(`**/${urlPart}`, route =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      })
    );
  }
}
