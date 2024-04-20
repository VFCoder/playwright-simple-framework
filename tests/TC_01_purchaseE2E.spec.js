import test from "../testFixtures/fixture";

test.describe.serial("@e2e: Login and purchase product", () => {
  test("Login as a demo user", async ({ homePage, loginPage }) => {
    await test.step("Open the app and verify products are loaded", async () => {
      await homePage.openApp();
      await homePage.verifyProductsVisible();
    });
    await test.step("Navigate to login page, log in and verify logged in", async () => {
      await homePage.clickSignInLink();
      await loginPage.loginAsDemoUser();
      await homePage.confirmSignedIn();
    });
    await test.step("Add product to cart and verify cart", async () => {
      await homePage.addProductToCart();
      await homePage.confirmProductInCart();
    });
    await test.step("Complete checkout process and purchase product", async () => {
      //todo
    });
    await test.step("Confirm purchase on orders page", async () => {
      //todo
    });
  });
});
