import { Page, Locator, expect } from "@playwright/test";

export class MultipleWindowsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly clickHere: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 3,
      name: "Opening a new window",
    });
    this.clickHere = page.getByRole("link", {
      name: "Click Here",
    });
    
  }

  async goto() {
    await this.page.goto("/windows");
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/windows/);
    await expect(this.heading).toBeVisible();
  }
  async clickhere() {
    await this.clickHere.click();
  }
}
