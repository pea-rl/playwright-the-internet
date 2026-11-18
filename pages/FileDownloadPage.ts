import { Page, Locator, expect } from "@playwright/test";

export class FileDownloadPage {
  readonly fileInput: Locator;
  readonly downloadButton: Locator;
  readonly page: Page;
  readonly heading: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 3,
      name: "File Downloader",
    });
    this.fileInput = page.locator("#file-download");
    this.downloadButton = page.locator("#file-submit");
    
  }
  async goto() {
    await this.page.goto("/download");
  }
  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/download/);
    await expect(this.heading).toBeVisible();
  }
  async downloadFile(filePath: string) {
    
  }

}
