import { test, expect } from "../fixtures/baseFixture";

test.describe("Multiple Windows", () => {
  test.beforeEach(async ({ multipleWindowsPage }) => {
    await multipleWindowsPage.goto();
  });
  test("TC 1: Verify page loads successfully", async ({
    multipleWindowsPage,
  }) => {
    await multipleWindowsPage.assertPageLoaded();
    await expect(multipleWindowsPage.clickHere).toHaveText("Click Here");
  });
  test("TC 2: Open new window", async ({ page, multipleWindowsPage }) => {
    const newPagePromise = page.waitForEvent("popup");
    await multipleWindowsPage.clickhere();
    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL("/windows/new");
  });
  test("TC 3: Verify New Window", async ({ page, multipleWindowsPage }) => {
    const newPagePromise = page.waitForEvent("popup");

    await multipleWindowsPage.clickhere();

    const newPage = await newPagePromise;

    await expect(
      newPage.getByRole("heading", { name: "New Window" }),
    ).toBeVisible();
  });
});
