import { test, expect } from "../fixtures/baseFixture";

test.describe("Dynamic Controls", () => {
  test.beforeEach(async ({ dynamicControlsPage }) => {
    await dynamicControlsPage.goto();
  });
  test("TC 1: Verify Dynamic Controls page loads successfully", async ({
    page,
    dynamicControlsPage,
  }) => {
    await expect(page).toHaveURL(/dynamic_controls/);
    await expect(dynamicControlsPage.heading).toBeVisible();
    await expect(dynamicControlsPage.toggleButton).toBeVisible();
    await expect(dynamicControlsPage.toggleButton).toHaveText("Remove");
    await expect(dynamicControlsPage.enableButton).toBeVisible();
    await expect(dynamicControlsPage.checkbox).toBeVisible();
    await expect(dynamicControlsPage.inputField).toBeVisible();
  });
  test("TC 2: Verify Dynamic Controls checkbox removal", async ({
    dynamicControlsPage,
  }) => {
    await expect(dynamicControlsPage.checkbox).not.toBeChecked(); //expects first checkbox default state is unchecked
    await dynamicControlsPage.removeButtonClick();
    // wait for the checkbox to be removed from the DOM
    await expect(dynamicControlsPage.checkbox).toHaveCount(0);

    //await expect(dynamicControlsPage.message).toHaveText("It's gone!");
  });
  test("TC 3: Verify Dynamic Controls add checkbox", async ({
    dynamicControlsPage,
  }) => {
    await dynamicControlsPage.removeButtonClick();
    //await expect(dynamicControlsPage.message).toHaveText("It's gone!");

    await expect(dynamicControlsPage.checkbox).toHaveCount(0);
    await expect(dynamicControlsPage.toggleButton).toBeVisible();
    //await expect(dynamicControlsPage.toggleButton).toHaveText("Add");

    await dynamicControlsPage.addButtonClick();

    //await expect(dynamicControlsPage.message).toHaveText("It's back!");
    await expect(dynamicControlsPage.checkbox).toBeVisible();
    await expect(dynamicControlsPage.checkbox).not.toBeChecked();
  });
  test("TC 4: Verify Dynamic Controls checkbox can be un/checked", async ({
    dynamicControlsPage,
  }) => {
    await expect(dynamicControlsPage.checkbox).not.toBeChecked();
    await dynamicControlsPage.checkboxClick();
    await expect(dynamicControlsPage.checkbox).toBeChecked();

    await dynamicControlsPage.checkboxClick();
    await expect(dynamicControlsPage.checkbox).not.toBeChecked();
  });
  test("TC 5: Verify Dynamic Controls input field can be enabled and disabled", async ({
    dynamicControlsPage,
  }) => {
    await expect(dynamicControlsPage.inputField).toBeDisabled();
    await dynamicControlsPage.enableButtonClick();

   // await expect(dynamicControlsPage.message).toHaveText("It's enabled!");
    await expect(dynamicControlsPage.inputField).toBeEnabled();

    await dynamicControlsPage.enterText("Playwright");
    await expect(dynamicControlsPage.inputField).toHaveValue("Playwright");

    await dynamicControlsPage.disableButtonClick();
    //await expect(dynamicControlsPage.message).toHaveText("It's disabled!");
    await expect(dynamicControlsPage.inputField).toBeDisabled();
  });
});
