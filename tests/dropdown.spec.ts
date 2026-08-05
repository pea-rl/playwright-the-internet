import { test, expect } from "../fixtures/baseFixture";

test.describe("Dropdown", () => {
    test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.goto();
  });

  test("TC 1: verify Dropdown page loads successfully", async ({
    page,
    dropdownPage,
  }) => {
    await expect(page).toHaveURL(/dropdown/); //expects the URL to contain /dropdown
    await expect(dropdownPage.heading).toBeVisible(); //expects heading is visible
    await expect(dropdownPage.dropdown).toBeVisible(); //expects dropdown is visible
  });

  test("TC 2: verify default option is selected", async ({ dropdownPage }) => {
    await expect(dropdownPage.dropdown).toHaveValue(""); //expects default option is selected
  });

  test("TC 3: verify option 1 can be selected", async ({ dropdownPage }) => {
    await dropdownPage.selectOptionByValue("1"); //selects option 1
    await expect(dropdownPage.dropdown).toHaveValue("1"); //expects option 1 is selected
  });

  test("TC 4: verify option 2 can be selected", async ({ dropdownPage }) => {
    await dropdownPage.selectOptionByValue("2"); //selects option 2
    await expect(dropdownPage.dropdown).toHaveValue("2"); //expects option 2 is selected
  });
});
