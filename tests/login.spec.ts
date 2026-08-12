import { test, expect } from "../fixtures/baseFixture";
import { loginData } from "../data/loginData";

const invalidLoginScenarios = [
  {
    name: "Login with invalid username",
    username: loginData.invalidUsername.username,
    password: loginData.invalidUsername.password,
    expectedError: "Your username is invalid!",
  },
  {
    name: "Login with invalid password",
    username: loginData.invalidPassword.username,
    password: loginData.invalidPassword.password,
    expectedError: "Your password is invalid!",
  },
  {
    name: "Login with empty username",
    username: loginData.emptyUsername.username,
    password: loginData.emptyUsername.password,
    expectedError: "Your username is invalid!",
  },
  {
    name: "Login with empty password",
    username: loginData.emptyPassword.username,
    password: loginData.emptyPassword.password,
    expectedError: " Your password is invalid!",
  },
  {
    name: "Login with empty username and password",
    username: loginData.emptyCredentials.username,
    password: loginData.emptyCredentials.password,
    expectedError: "Your username is invalid!",
  },
];

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });
  test("TC 1: Verify Login page loads successfully", async ({ page, loginPage,
  }) => {
    await expect(page).toHaveURL("/login");
    await expect(loginPage.heading).toBeVisible();
  });
  test("TC 2: Valid username and password", async ({ page, loginPage, securePage,
  }) => {
    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password,
    );

    await securePage.verifyPageLoaded();
    await expect(securePage.flash).toContainText(
      "You logged into a secure area!",
    );
    // logout
    await securePage.logout();
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.username).toBeVisible();
  });
  invalidLoginScenarios.forEach((scenario) => {
    test(scenario.name, async ({ loginPage }) => {
      await loginPage.login(scenario.username, scenario.password);

      await expect(loginPage.flash).toBeVisible();

      await expect(loginPage.flash).toContainText(
        scenario.expectedError,
      );
    });
  });
});
