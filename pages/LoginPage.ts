import { Page, Locator, expect } from "@playwright/test";


export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly flash: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Login Page" });
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.loginButton = page.getByRole("button");
    this.flash = page.locator("#flash");
  }

  async goto() {
    await this.page.goto("/login");
  }
  async login(username: string, password: string){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
