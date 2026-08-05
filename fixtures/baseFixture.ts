import { test as base, expect } from "@playwright/test";
import { CheckboxesPage } from "../pages/CheckboxesPage";
import { DropdownPage } from "../pages/DropdownPage";

export const test = base.extend<{ checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
}>({
  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },
});

export { expect };
