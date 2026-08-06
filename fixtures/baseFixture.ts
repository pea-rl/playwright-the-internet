import { test as base, expect } from "@playwright/test";
import { CheckboxesPage } from "../pages/CheckboxesPage";
import { DropdownPage } from "../pages/DropdownPage";
import { JavaScriptAlertsPage } from "../pages/JavaScriptAlertsPage";
import { DynamicControlsPage } from "../pages/DynamicControlsPage";

export const test = base.extend<{ 
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
  dynamicControlsPage: DynamicControlsPage; 

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
  dynamicControlsPage: async ({ page }, use) => {
    const dynamicControlsPage = new DynamicControlsPage(page);
    await use(dynamicControlsPage);
  },
});

export { expect };
