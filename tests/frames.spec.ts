import { test, expect } from "../fixtures/baseFixture";

test.describe("Frames", () => {
  test.beforeEach(async ({ framePage }) => {
    await framePage.goto();
  });
  test("TC 1: Verify page loads successfully", async ({ framePage }) => {
    await framePage.assertPageLoaded();
    await expect(framePage.nestedFrame).toHaveText("Nested Frames");
    await expect(framePage.iFrame).toHaveText("iFrame");
  });
  test("TC 2: Open Nested Frames", async ({ framePage }) => {
    await framePage.nestedframe();
    await framePage.nestedframeContent();
  });
  test("TC 3: Open iFrame", async ({ page, framePage }) => {
    await framePage.iframe();

    const editorFrame = page.frameLocator("iframe");
    await expect(editorFrame.locator("body")).toBeVisible();
    await expect(editorFrame.locator("body")).toHaveText(
      "Your content goes here.",
    );
  });
  test("TC 4: Verify nested frames content persists after viewport resize", async ({
    page, framePage,
  }) => {
    await framePage.nestedframe();

    await page.setViewportSize({ width: 800, height: 600 });
    await framePage.nestedframeContent();

    await page.setViewportSize({ width: 1280, height: 720 });
    await framePage.nestedframeContent();
  });
  test("TC 5: verify nested frame dimension", async ({ page, framePage }) => {
    await framePage.nestedframe();

    //const topFrame = page.locator('frame[name="frame-top]');
    const topFrame = page.locator('frame[name="frame-top"]');
    const bottomFrame = page.locator('frame[name="frame-bottom"]'); 

    const topBox = await topFrame.boundingBox();
    const bottomBox = await bottomFrame.boundingBox();

    expect(topBox?.width).toBeGreaterThan(0);
    expect(topBox?.height).toBeGreaterThan(0);
    expect(bottomBox?.width).toBeGreaterThan(0);
    expect(bottomBox?.height).toBeGreaterThan(0);
  });
});
