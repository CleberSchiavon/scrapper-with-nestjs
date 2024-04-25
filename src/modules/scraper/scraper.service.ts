import { Injectable } from "@nestjs/common";
import { Page, Browser as PuppeteerBrowserType } from "puppeteer";
import { IScraperRequestDTO } from "common/dtos/scraper";
import { BrowserService } from "modules/browser/browser.service";
import { validateCheckoutDate } from "common/validators/date";
import { HTTPHandler, returnScraperURL } from "common/handlers/http.handler";
import { HttpStatus } from "types/enums/http.enums";
import { RoomData } from "types/room";

@Injectable()
export class ScraperService {
  constructor(private readonly browserService: BrowserService) {}

  async scrapData(
    browser: PuppeteerBrowserType,
    scraperRequest: IScraperRequestDTO
  ): Promise<any> {
    const pageUrl = returnScraperURL({
      scraperRequest: scraperRequest,
    });
    const searchPage: Page = await browser.newPage();
    await searchPage.setViewport({ width: 1920, height: 1080 });
    await searchPage.goto(pageUrl);
    await searchPage.waitForSelector(
      "#main-layout > div.q-page-container > main > article > div.room-list > span > div:nth-child(1) > div.room-option > div.carousel-wrapper > div.lb-carousel.room-option--carousel > span > div > div.q-carousel__slides-container > div > div"
    );
    // Aqui eu estou criando a função utilitária extractURLFromBackgroundStyle dentro do contexto da página, tentei de vários metodos utilizar de forma externa, mas não funcionou
    await searchPage.evaluate(() => {
      // @ts-expect-error - Precisei fazer dessa forma pois o evaluate do puppeteer não estava importando corretamente a função utilitária que eu criei dentro dos handlers
      if (!window.extractURLFromBackgroundStyle) {
        // @ts-expect-error
        window.extractURLFromBackgroundStyle = (
          backgroundImageString: string
        ) => {
          const urlRegex = /url\(['"]?([^'"]+?)['"]?\)/;
          const matches = backgroundImageString.match(urlRegex);

          if (matches && matches[1]) {
            return matches[1];
          } else {
            return null;
          }
        };
      }
    });

    const getRoomData = await searchPage.evaluate(() => {
      const roomsList = document.querySelectorAll(
        "#main-layout > div.q-page-container > main > article > div.room-list > span > div"
      );

      const roomInformation = Array.from(roomsList).map((room) => {
        const roomName = room.querySelector(
          "div.room-option > div.room-infos > div.room-infos-guests-block > div.room-option-title.desktop-only > h3 > span"
        );
        const roomDescription = room.querySelector(
          "div.room-option > div.room-infos > div.room-infos-guests-block > div.room-option-title.desktop-only > p"
        );
        const roomPrice = room.querySelector(
          "div.room-option > div.room-infos > div.room-rates-wrapper > div.room-rates-price > div.daily-price > p.lb-text__xxs-h4.lb-text__md-h3.lb-text__weight-4.lb-text.text-alert-500.daily-price--total > strong"
        );
        const roomImageUrl = room
          .querySelector(
            "div.room-option > div.carousel-wrapper > div.lb-carousel.room-option--carousel > span > div > div.q-carousel__slides-container > div > div"
          )
          .getAttribute("style");

        return {
          name: roomName ? roomName.textContent : "",
          description: roomDescription ? roomDescription.textContent : "",
          price: roomPrice ? roomPrice.textContent : "",
          // @ts-expect-error
          image: window.extractURLFromBackgroundStyle(roomImageUrl),
        };
      });

      return roomInformation;
    });

    return getRoomData;
  }

  async searchHotels(scraperRequest: IScraperRequestDTO): Promise<RoomData> {
    const isValidCheckoutDate = validateCheckoutDate(scraperRequest);

    if (!isValidCheckoutDate.isValid) {
      HTTPHandler({
        type: HttpStatus.BAD_REQUEST,
        message: isValidCheckoutDate.message,
      });
    }
    const browser = await this.browserService.getBrowser();
    const scraperResult: RoomData = await this.scrapData(
      browser,
      scraperRequest
    );
    return scraperResult;
  }
}
