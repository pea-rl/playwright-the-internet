import { test as base, expect } from "@playwright/test";
import { CheckboxesPage } from "../pages/CheckboxesPage";

export const test = base.extend<{ checkboxesPage: CheckboxesPage;
}>({
  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },
});

export { expect };
