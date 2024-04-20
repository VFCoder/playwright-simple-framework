import BasePage from "./basePage";
import fs from "fs";
import {
  signinButton,
  usernameElement,
  productList,
  productContainer,
  addToCartButton,
  productNameInCart,
  checkoutButton,
  ordersLink,
} from "../locators/homePage";

const testData = JSON.parse(fs.readFileSync(`./data/testData.json`, `utf-8`));

const productToBuy = "iPhone 12 Pro";

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async verifyProductsVisible() {
    return await this.isElementVisible(
      productContainer,
      "Element not visible."
    );
  }

  async openApp() {
    await super.open("/");
    return await super.waitForPageLoad();
  }

  async clickSignInLink() {
    await this.waitAndClick(signinButton);
  }

  async confirmSignedIn() {
    return await this.verifyElementText(usernameElement, testData.username);
  }

  async addProductToCart() {
    const productCount = await this.countElement(productList);
    for (let i = 0; i < productCount; i++) {
      const productName = await this.page
        .locator(productList)
        .nth(i)
        .textContent();
      if (productName === productToBuy) {
        await this.page.locator(addToCartButton).nth(i).click();
        break;
      }
    }
  }

  async confirmProductInCart() {
    return await this.verifyElementText(productNameInCart, productToBuy);
  }
}
export default HomePage;
