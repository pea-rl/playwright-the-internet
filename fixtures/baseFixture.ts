import { test as base, expect } from "@playwright/test";
import { CheckboxesPage } from "../pages/CheckboxesPage";
import { DropdownPage } from "../pages/DropdownPage";
import { JavaScriptAlertsPage } from "../pages/JavaScriptAlertsPage";
import { DynamicControlsPage } from "../pages/DynamicControlsPage";
import { LoginPage } from "../pages/LoginPage";
import { SecurePage } from "../pages/SecurePage";
import { DynamicLoadingPage } from "../pages/DynamicLoadingPage";

export const test = base.extend<{ 
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
  dynamicControlsPage: DynamicControlsPage; 
  loginPage: LoginPage;
  securePage: SecurePage;
  dynamicLoadingPage: DynamicLoadingPage;

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
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
  dynamicLoadingPage: async ({ page }, use) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);
    await use(dynamicLoadingPage);
  },
});

export { expect };
