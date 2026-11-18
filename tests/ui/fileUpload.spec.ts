import { test, expect } from "../../fixtures/baseFixture";
import fs from "fs";

const TEST_FILE_PATH = "./data/sampleFile.txt"; //file path; data folder > sampleFile.txt
const TEST_FILE_NAME = "sampleFile.txt"; //file name

test.describe("File Upload", () => {
  test.beforeEach(async ({ fileUploadPage }) => {
    await fileUploadPage.goto();
  });

  test("TC 1: Verify page loads successfully", async ({ fileUploadPage }) => {
    await fileUploadPage.assertPageLoaded();
    await expect(fileUploadPage.fileInput).toBeVisible();
    await expect(fileUploadPage.uploadButton).toBeVisible();
  });

  test("TC 2: Upload a file successfully", async ({ fileUploadPage }) => {
    await fileUploadPage.uploadFile(TEST_FILE_PATH); //select file and click upload
    await expect(fileUploadPage.uploadedFiles).toBeVisible(); //verify uploaded file is displayed
    await fileUploadPage.assertFileUploaded(TEST_FILE_NAME); //verify uploaded file name
  });
  test("TC 3: Upload a file with a different extension", async ({
    fileUploadPage,
  }) => {
    const JPG_FILE_PATH = "./data/sampleFile.jpg";
    const JPG_FILE_NAME = "sampleFile.jpg";

    await fileUploadPage.uploadFile(JPG_FILE_PATH);
    await fileUploadPage.assertFileUploaded(JPG_FILE_NAME);
  });
  test("TC 4: Upload a file with a long filename", async ({
    fileUploadPage,
  }) => {
    const LONG_NAME_FILE_PATH = "./data/aVeryLongFileNameForFileUpload.txt";
    const LONG_NAME_FILE_NAME = "aVeryLongFileNameForFileUpload.txt";

    await fileUploadPage.uploadFile(LONG_NAME_FILE_PATH);
    await fileUploadPage.assertFileUploaded(LONG_NAME_FILE_NAME);
  });
  test("TC 5: Upload a file with spaces/special characters in the name", async ({
    fileUploadPage,
  }) => {
    const SPECIAL_CHARS_FILE_PATH = "./data/sampleFile(1).txt";
    const SPECIAL_CHARS_FILE_NAME = "sampleFile(1).txt";

    await fileUploadPage.uploadFile(SPECIAL_CHARS_FILE_PATH);
    await fileUploadPage.assertFileUploaded(SPECIAL_CHARS_FILE_NAME);
  });

  test("TC 6: Submit with no file selected", async ({ fileUploadPage }) => {
    const EMPTY_FILE_PATH = "./data/emptyFile.txt";
    const EMPTY_FILE_NAME = "emptyFile.txt";

    await fileUploadPage.clickUploadWithoutFile();
    await fileUploadPage.assertNoFileSelectedError();
  });

  test("TC 7: Upload an empty (0 KB) file", async ({ fileUploadPage }) => {
    const EMPTY_FILE_PATH = "./data/emptyFile.txt";
    const EMPTY_FILE_NAME = "emptyFile.txt";

    await fileUploadPage.uploadFile(EMPTY_FILE_PATH);
    await fileUploadPage.assertFileUploaded(EMPTY_FILE_NAME);
  });

  test("TC 8: Upload a large file", async ({ fileUploadPage }) => {
    const LARGE_FILE_PATH = "./data/largeFile.txt";
    const LARGE_FILE_NAME = "largeFile.txt";

    const fiveMB = 5 * 1024 * 1024;
    fs.writeFileSync(LARGE_FILE_PATH, Buffer.alloc(fiveMB, "a"));

    await fileUploadPage.uploadFile(LARGE_FILE_PATH);
    await fileUploadPage.assertFileUploaded(LARGE_FILE_NAME);

    fs.unlinkSync(LARGE_FILE_PATH);
  });

  test("TC 9: Uploaded file list resets after page reload", async ({
    fileUploadPage,
    page,
  }) => {
    // Upload a file, confirm it shows up
    await fileUploadPage.uploadFile(TEST_FILE_PATH);
    await fileUploadPage.assertFileUploaded(TEST_FILE_NAME);

    // Reload the page and go back to /upload
    await page.reload();
    await fileUploadPage.goto();

    // Confirm the uploaded files area is empty again (no client-side persistence)
    await fileUploadPage.assertUploadedFilesEmpty();
  });

  test("TC 11: Verify file input does not restrict file types", async ({
    fileUploadPage,
  }) => {
    // Checks whether the "accept" attribute is set on the file input.
    // On the-internet's upload page, it's expected to be null (no restriction).
    const acceptAttr = await fileUploadPage.getFileInputAcceptAttribute();
    expect(acceptAttr).toBeNull();
  });
});
