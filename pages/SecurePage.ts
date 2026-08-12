import { Page, Locator, expect } from "@playwright/test";


export class SecurePage {
	readonly page: Page;
	readonly heading: Locator;
	readonly flash: Locator;
	readonly logoutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.heading = page.getByRole("heading", { level: 2, name: "Secure Area" });
		this.flash = page.locator("#flash");
		this.logoutButton = page.getByRole("link", { name: "Logout" });
	}

	async verifyPageLoaded() {
		await expect(this.page).toHaveURL("/secure");
		await expect(this.heading).toBeVisible();
	}

	async logout() {
		await this.logoutButton.click();
	}
}
