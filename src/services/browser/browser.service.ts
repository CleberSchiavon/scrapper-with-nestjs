import { Browser as PuppeteerBrowserType } from "puppeteer";
const Puppeteer = require("puppeteer");
export class BrowserService {
  async getBrowser(): Promise<PuppeteerBrowserType> {
    return Puppeteer.launch();
  }

  async closeBrowser(browser: PuppeteerBrowserType): Promise<void> {
    if (!browser) {
      return;
    }
    return browser.close();
  }
}
