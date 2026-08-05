import { test, expect } from "../fixtures/baseFixture";

test.describe("Checkboxes", () => {
    test.beforeEach(async ({ checkboxesPage }) => {
    await checkboxesPage.goto();
  });
  test("TC 1: verify Checkboxes page loads successfully", async ({ page, checkboxesPage }) => {
    await expect(page).toHaveURL(/checkboxes/); //expects the URL to contain /checkboxes

    await expect(checkboxesPage.heading).toBeVisible(); //expects heading is visible
    await expect(checkboxesPage.checkbox(0)).toBeVisible(); //expects checkboxes are visible
    await expect(checkboxesPage.checkbox(1)).toBeVisible();
  });

  test("TC 2: verify default states", async ({ checkboxesPage }) => {
    await expect(checkboxesPage.checkbox(0)).not.toBeChecked(); //expects first checkbox default state is unchecked
    await expect(checkboxesPage.checkbox(1)).toBeChecked(); //expects second checkbox default state is checked
  });

  test("TC 3: verify first checkbox can be checked", async ({ checkboxesPage }) => {
    await checkboxesPage.checkCheckbox(0); //checks the first checkbox
    await expect(checkboxesPage.checkbox(0)).toBeChecked(); //expects first checkbox state is checked
  });

  test("TC 4: verify second checkbox can be unchecked", async ({ checkboxesPage }) => {
    await checkboxesPage.uncheckCheckbox(1); //unchecks the second checkbox
    await expect(checkboxesPage.checkbox(1)).not.toBeChecked(); //expects second checkbox state is unchecked
  });
});
