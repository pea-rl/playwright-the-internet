import { Page, Locator } from "@playwright/test";

export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator("#dropdown");
    this.heading = page.getByRole("heading", { name: "Dropdown List" });
  }
  async goto() {
    await this.page.goto("/dropdown");
  }
  async selectOptionByValue(value: string) {
    await this.dropdown.selectOption(value);
  }
}
