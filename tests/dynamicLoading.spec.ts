import { test, expect } from "../fixtures/baseFixture";

test.describe("Dynamic Loading", () => {
  test.beforeEach(async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.goto();
  });
  test("TC 1: Verify Dynamic Loading page loads successfully", async ({
    dynamicLoadingPage,
  }) => {
    await dynamicLoadingPage.assertPageLoaded();
    await expect(dynamicLoadingPage.example1Link).toHaveText(
      "Example 1: Element on page that is hidden",
    );

    await expect(dynamicLoadingPage.example2Link).toHaveText(
      "Example 2: Element rendered after the fact",
    );
  });
  test("TC 2: Go to Example 1", async ({ page, dynamicLoadingPage }) => {
    await expect(dynamicLoadingPage.example1Link).toHaveText(
      "Example 1: Element on page that is hidden",
    );

    await dynamicLoadingPage.openExample1();

    await expect(page).toHaveURL("/dynamic_loading/1");
    await expect(dynamicLoadingPage.startButton).toBeVisible();
  });
  test("TC 3: Go to Example 2", async ({ page, dynamicLoadingPage }) => {
    await expect(dynamicLoadingPage.example2Link).toHaveText(
      "Example 2: Element rendered after the fact",
    );

    await dynamicLoadingPage.openExample2();

    await expect(page).toHaveURL("/dynamic_loading/2");
    await expect(dynamicLoadingPage.startButton).toBeVisible();
  });
  test("TC 4: Verify Example 1 dynamically loads element", async ({
    dynamicLoadingPage,
  }) => {
    await dynamicLoadingPage.openExample1();
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoadedText();
  });
  test("TC 5: Verify Example 2 dynamically loads element", async ({
    dynamicLoadingPage,
  }) => {
    await dynamicLoadingPage.openExample2();
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoadedText();
  });
});
