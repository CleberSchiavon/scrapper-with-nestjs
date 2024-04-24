import Puppeteer, { Browser as PuppeteerBrowserType } from "puppeteer";

class BrowserService {
  static getBrowser() {
    return Puppeteer.launch({});
  }

  static closeBrowser(browser: PuppeteerBrowserType) {
    if (!browser) {
      return;
    }
    return browser.close();
  }
}

module.exports = BrowserService;
