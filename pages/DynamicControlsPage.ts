import { Page, Locator, expect } from "@playwright/test";

export class DynamicControlsPage {
  readonly heading: Locator;
  readonly page: Page;
  readonly checkbox: Locator;
  readonly enableButton: Locator;
  readonly inputField: Locator;
  readonly message: Locator;
  readonly toggleButton: Locator;
  readonly disableButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toggleButton = page.locator("#checkbox-example button");
    this.checkbox = page.getByRole("checkbox");
    this.enableButton = page.getByRole("button", { name: "Enable" });
    this.disableButton = page.getByRole("button", { name: "Disable" });
    this.inputField = page.getByRole("textbox");
    this.message = page.locator("#message");
    this.heading = page.getByRole("heading", {
      level: 4,
      name: "Dynamic Controls",
    });
  }
  async goto() {
    await this.page.goto("/dynamic_controls");
  }
  async removeButtonClick() {
  await expect(this.toggleButton).toHaveText("Remove");
  await this.toggleButton.click();
  await expect(this.message).toHaveText("It's gone!");
}
async addButtonClick() {
  await expect(this.toggleButton).toHaveText("Add");
  await this.toggleButton.click();
  await expect(this.message).toHaveText("It's back!");
}
  async enableButtonClick() {
    await this.enableButton.click();
    await expect(this.message).toHaveText("It's enabled!");
  }
  async disableButtonClick() {
    await this.disableButton.click();
    await expect(this.message).toHaveText("It's disabled!");
  }
  async checkboxClick() {
    await this.checkbox.click();
  }
  async enterText(text: string) {
  await this.inputField.fill(text);
}
}
