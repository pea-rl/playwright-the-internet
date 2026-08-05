import { test as base, expect } from "@playwright/test";
import { CheckboxesPage } from "../pages/CheckboxesPage";
import { DropdownPage } from "../pages/DropdownPage";
import { JavaScriptAlertsPage } from "../pages/JavaScriptAlertsPage";

export const test = base.extend<{ checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
}>({
  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },
  javaScriptAlertsPage: async ({ page }, use) => {
    const javaScriptAlertsPage = new JavaScriptAlertsPage(page);
    await use(javaScriptAlertsPage);
  },
});

export { expect };
