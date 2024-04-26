import { Test, TestingModule } from "@nestjs/testing";
import { BrowserService } from "./browser.service";
import { Browser as PuppeteerBrowserType } from "puppeteer";
const Puppeteer = require("puppeteer");

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
      Puppeteer.launch as jest.MockedFunction<typeof Puppeteer.launch>
    ).mockResolvedValue(mockBrowser);

    const browser = await service.getBrowser();

    expect(browser).toBe(mockBrowser);
    expect(Puppeteer.launch).toHaveBeenCalledTimes(1);
  });
});
