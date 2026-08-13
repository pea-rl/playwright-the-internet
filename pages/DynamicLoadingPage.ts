import { Page, Locator, expect } from "@playwright/test";

export class DynamicLoadingPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly example1Link: Locator;
  readonly example2Link: Locator;
  readonly startButton: Locator;
  readonly loadingIndicator: Locator;
  readonly finishText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 3,
      name: "Dynamically Loaded Page Elements",
    });
    this.example1Link = page.getByRole("link", {
      name: "Example 1: Element on page that is hidden",
    });
    this.example2Link = page.getByRole("link", {
      name: "Example 2: Element rendered after the fact",
    });
    this.startButton = page.getByRole("button", { name: "Start" });
    this.loadingIndicator = page.locator("#loading");
    this.finishText = page.locator("#finish");
  }

  async goto() {
    await this.page.goto("/dynamic_loading");
  }

  async openExample1() {
    await this.example1Link.click();
  }

  async openExample2() {
    await this.example2Link.click();
  }

  async clickStart() {
    await this.startButton.click();
  }

  async waitForLoadedText() {
    await expect(this.finishText).toHaveText("Hello World!");
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/dynamic_loading/);
    await expect(this.heading).toBeVisible();
  }
}
