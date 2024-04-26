import { Test, TestingModule } from "@nestjs/testing";
import { BrowserService } from "./browser.service";
import { Browser as PuppeteerBrowserType } from "puppeteer";
import puppeteer from "puppeteer";

jest.mock("puppeteer");

describe("BrowserService", () => {
  let service: BrowserService;

  beforeEach(async () => {
    jest.resetModules();
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserService],
    }).compile();
    service = module.get<BrowserService>(BrowserService);
  });

  it("BrowserService should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should handle closeBrowser gracefully if browser is undefined", async () => {
    await expect(service.closeBrowser(undefined)).resolves.toBeUndefined();
  });

  test("should create a new browser instance when calling getBrowser", async () => {
    const mockBrowser: PuppeteerBrowserType = {} as PuppeteerBrowserType;
    (
      puppeteer.launch as jest.MockedFunction<typeof puppeteer.launch>
    ).mockResolvedValue(mockBrowser);

    const browser = await service.getBrowser();

    expect(browser).toBe(mockBrowser);
    expect(puppeteer.launch).toHaveBeenCalledTimes(1);
  });
});
