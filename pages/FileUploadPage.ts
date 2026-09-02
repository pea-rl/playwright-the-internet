import { Page, Locator, expect } from "@playwright/test";

export class FileUploadPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 3,
      name: "File Uploader",
    });
    this.fileInput = page.locator("#file-upload");
    this.uploadButton = page.locator("#file-submit");
    this.uploadedFiles = page.locator("#uploaded-files");
  }
  async goto() {
    await this.page.goto("/upload");
  }
  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/upload/);
    await expect(this.heading).toBeVisible();
  }
  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }
  async assertFileUploaded(fileName: string) {
    await expect(this.uploadedFiles).toHaveText(fileName);
  }
  async clickUploadWithoutFile() {
    await this.uploadButton.click();
  }
  async assertNoFileSelectedError() {
    await expect(this.page.locator("body")).toContainText(
      "Internal Server Error",
    );
  }
    async assertUploadedFilesEmpty() {
    await expect(this.uploadedFiles).toHaveText("");
  }
    async getFileInputAcceptAttribute(): Promise<string | null> {
    return this.fileInput.getAttribute("accept");
  }
}
