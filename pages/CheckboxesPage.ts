import { Page, Locator } from "@playwright/test";

export class CheckboxesPage {
  constructor(private page: Page) {}

  //locate page heading
  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Checkboxes" });
  }

  //locate checkboxes by index
  checkbox(index: number): Locator {
    return this.page.locator('input[type="checkbox"]').nth(index);
  }

  //go to checkboxes page
  async goto() {
    await this.page.goto("/checkboxes");
  }

  // check the checkbox if it is not already checked
  async checkCheckbox(index: number): Promise<void> {
    const checkbox = this.checkbox(index);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  // uncheck the checkbox if it is checked
  async uncheckCheckbox(index: number): Promise<void> {
    const checkbox = this.checkbox(index);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }
}
