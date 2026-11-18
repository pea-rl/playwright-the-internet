import { test, expect } from "../fixtures/baseFixture";


test.describe("File Download", () => {
  test.beforeEach(async ({ fileUploadPage }) => {
    await fileUploadPage.goto();
  });

  test("TC 1: Verify page loads successfully", async ({ fileDownloadPage }) => {
    await fileDownloadPage.assertPageLoaded();
    await expect(fileDownloadPage.fileInput).toBeVisible();
    await expect(fileDownloadPage.downloadButton).toBeVisible();
  });

  test("TC 2: Verify clicking a file triggers a download", async ({ fileDownloadPage }) => {
    
  });
  test("TC 3: Verify downloaded filename / save the file", async ({
    fileDownloadPage,
  }) => {
    
  });
test("TC 4: Download a file with a long filename", async ({
    fileDownloadPage,
  }) => {
    
  });

});
