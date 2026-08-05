import { Page, Locator } from "@playwright/test";

export class JavaScriptAlertsPage {
  heading(heading: any) {
      throw new Error("Method not implemented.");
  }
  readonly page: Page;
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly resultText: Locator;
  readonly h3: Locator;

  constructor(page: Page) {
    this.page = page;
    this.jsAlertButton = page.getByRole("button", { name: "Click for JS Alert" });
    this.jsConfirmButton = page.getByRole("button", { name: "Click for JS Confirm" });
    this.jsPromptButton = page.getByRole("button", { name: "Click for JS Prompt" });
    this.resultText = page.locator("#result");
    this.h3 = page.getByRole("heading", { name: "JavaScript Alerts" });
  }

  async goto() {
    await this.page.goto("/javascript_alerts");
  }

  async clickJsAlert() {
    await this.jsAlertButton.click();
  }

  async clickJsConfirm() {
    await this.jsConfirmButton.click();
  }

  async clickJsPrompt() {
    await this.jsPromptButton.click();
  }

  async getResultText() {
    return await this.resultText.textContent();
  }
}    