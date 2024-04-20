import { test, expect } from "@playwright/test";

test("purchase product", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  //sign in

  const signinButton = page.locator("#signin"); 
  await signinButton.click();

  const usernameInput = page.locator("#username");
  const usernamePassword = page.locator("#password");
  const loginButton = page.locator("#login-btn");

  await usernameInput.click();
  await usernameInput.type("demouser");
  await expect(usernameInput).toContainText("demouser");
  await page.keyboard.press("Enter");
  await usernamePassword.click();
  await usernamePassword.type("testingisfun99");
  await page.keyboard.press("Enter");
  await expect(usernamePassword).toContainText("testingisfun99");
  await loginButton.click();

  const usernameElement = page.locator(".username");
  const usernameText = await usernameElement.textContent();
  expect(usernameText).toContain("demouser");

  //get product names

  const productList = page.locator(".shelf-item__title");
  const productListText = await productList.allTextContents();
  console.log(productListText);

  //add product to cart with loop

  const productToBuy = "iPhone 12 Pro";
  const productCount = await productList.count();

  for (let i = 0; i < productCount; i++) {
    const productName = await productList.nth(i).textContent();
    const addToCartButton = page.locator(".shelf-item__buy-btn");
    if (productName === productToBuy) {
      await addToCartButton.nth(i).click();
      break;
    }
  }

  //confirm product is in cart

  const productNameInCart = page.locator(".shelf-item__details .title");
  await expect(productNameInCart).toHaveText(productToBuy);

  //checkout

  const checkoutButton = page.locator(".buy-btn");
  await checkoutButton.click();

  const firstNameInput = page.locator("#firstNameInput");
  const lastNameInput = page.locator("#lastNameInput");
  const addressLine1Input = page.locator("#addressLine1Input");
  const provinceInput = page.locator("#provinceInput");
  const postCodeInput = page.locator("#postCodeInput");
  const checkoutContinueButton = page.locator("#checkout-shipping-continue");
  const productNameInCheckout = page.locator(
    ".product-title.optimizedCheckout-contentPrimary"
  );

  await expect(productNameInCheckout).toHaveText(productToBuy);
  await firstNameInput.fill("Mike");
  await lastNameInput.fill("Jones");
  await addressLine1Input.fill("123 Spruce Ave");
  await provinceInput.fill("New Jersey");
  await postCodeInput.fill("12345");
  await checkoutContinueButton.click();

  //confirmation

  const orderConfirmationMessage = page.locator("#confirmation-message");
  const expectedConfirmationMessage =
    "Your Order has been successfully placed.";
  await expect(orderConfirmationMessage).toHaveText(
    expectedConfirmationMessage
  );

  const continueShoppingButton = page.locator("text=Continue Shopping »");
  await continueShoppingButton.click();

  const ordersLink = page.locator("#orders");
  await ordersLink.click();

  const productTitleOrdersPage = page.locator(
    "xpath=//div[@class='a-fixed-left-grid-col a-col-right']//div[1]"
  );
  console.log(await productTitleOrdersPage.textContent());
});
