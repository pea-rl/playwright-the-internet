import { JavaScriptAlertsPage } from "../pages/JavaScriptAlertsPage";

import { test, expect } from "../fixtures/baseFixture";

test.describe("Javascript Alerts", () => {
  test.beforeEach(async ({ javaScriptAlertsPage }) => {
    await javaScriptAlertsPage.goto();
  });

  test("TC 1: Verify JS Alert page loads succesfully", async ({
    page,
    javaScriptAlertsPage,
  }) => {
    await expect(page).toHaveURL(/javascript_alerts/);
    await expect(javaScriptAlertsPage.h3).toBeVisible();
  });

  test("TC 2: Verify JS Alert", async ({ javaScriptAlertsPage, page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("I am a JS Alert");
      await dialog.accept();
    });
    await javaScriptAlertsPage.clickJsAlert();
    await expect(javaScriptAlertsPage.resultText).toHaveText(
      "You successfully clicked an alert",
    );
  });

  test("TC 3: Verify JS Confirm", async ({ javaScriptAlertsPage, page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.accept();
    });
    await javaScriptAlertsPage.clickJsConfirm();
    await expect(javaScriptAlertsPage.resultText).toHaveText("You clicked: Ok");
  });

  test("TC 4: Verify JS Cancel", async ({ javaScriptAlertsPage, page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.dismiss();
    });
    await javaScriptAlertsPage.clickJsConfirm();
    await expect(javaScriptAlertsPage.resultText).toHaveText(
      "You clicked: Cancel",
    );
  });

  test("TC 5: Verify JS Prompt. No input", async ({
    javaScriptAlertsPage,
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("I am a JS prompt");
      await dialog.accept();
    });
    await javaScriptAlertsPage.clickJsPrompt();
    await expect(javaScriptAlertsPage.resultText).toHaveText("You entered:");
  });

  test("TC 6: Verify JS Prompt. With input", async ({
    javaScriptAlertsPage,
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("I am a JS prompt");
      await dialog.accept("Test input");
    });
    await javaScriptAlertsPage.clickJsPrompt();
    await expect(javaScriptAlertsPage.resultText).toHaveText(
      "You entered: Test input",
    );
  });
});
