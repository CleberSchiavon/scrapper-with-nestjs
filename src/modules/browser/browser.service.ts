import { Browser as PuppeteerBrowserType } from "puppeteer";
import puppeteer from "puppeteer";
export class BrowserService {
  async getBrowser(): Promise<PuppeteerBrowserType> {
    return puppeteer.launch();
  }

  async closeBrowser(browser: PuppeteerBrowserType): Promise<void> {
    if (!browser) {
      return;
    }
    return browser.close();
  }
}
