import { Page, Locator, expect } from "@playwright/test";

export class FramesPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nestedFrame: Locator;
  readonly iFrame: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 3,
      name: "Frames",
    });
    this.nestedFrame = page.getByRole("link", {
      name: "Nested Frames",
    });
    this.iFrame = page.getByRole("link", {
      name: "iFrame",
    });
  }

  async goto() {
    await this.page.goto("/frames");
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/frames/);
    await expect(this.heading).toBeVisible();
  }
  async nestedframe() {
    await this.nestedFrame.click();
    await expect(this.page).toHaveURL(/nested_frames/);
  }
  async nestedframeContent() {
    const topFrame = this.page.frameLocator('frame[name="frame-top"]');
    const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
    const midFrame = topFrame.frameLocator('frame[name="frame-middle"]');
    const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
    const bottomFrame = this.page.frameLocator('frame[name="frame-bottom"]');

    await expect(leftFrame.locator("body")).toHaveText("LEFT");
    await expect(midFrame.locator("body")).toHaveText("MIDDLE");
    await expect(rightFrame.locator("body")).toHaveText("RIGHT");
    await expect(bottomFrame.locator("body")).toHaveText("BOTTOM");
  }
  async iframe() {
    await this.iFrame.click();
    await expect(this.page).toHaveURL(/iframe/);
  }
}
