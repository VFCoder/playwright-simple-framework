import BasePage from "./basePage";
import fs from "fs";
import {
  usernameInput,
  usernamePassword,
  loginButton,
} from "../locators/loginPage";

const testData = JSON.parse(fs.readFileSync(`./data/testData.json`, `utf-8`))

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async loginAsDemoUser() {
    await this.waitAndClick(usernameInput);
    await this.waitAndType(usernameInput, testData.username);
    await this.keyPress("Enter")

    await this.waitAndClick(usernamePassword);
    await this.waitAndType(usernamePassword, testData.password);
    await this.keyPress("Enter")

    await this.waitAndClick(loginButton);
  }
}
export default LoginPage;