import { Injectable, HttpStatus } from '@nestjs/common'
import { Page, Browser as PuppeteerBrowserType } from 'puppeteer'
import { IScraperRequestDTO } from 'common/dtos/scraper.dto'
import { BrowserService } from 'modules/browser/browser.service'
import { validateCheckoutDate } from 'common/validators/date'
import { HTTPHandler, returnScraperURL } from 'common/handlers/http.handler'
import { RoomData } from 'types/room'
import { parseAllRooms } from 'utils/room'

@Injectable()
export class ScraperService {
  constructor(private readonly browserService: BrowserService) {}

  async scrapData(searchPage): Promise<RoomData[]> {
    const allRoomInformation = await searchPage.$$eval(
      '.room-option',
      rooms => {
        return rooms.map(room => {
          const roomName = room.querySelector(
            '.room-option-title span',
          ).textContent
          const roomPrice = room.querySelector(
            '.daily-price--total .term',
          ).textContent
          const roomImage = room.querySelector(
            '.q-carousel__slides-container .q-carousel__slide',
          ).style.backgroundImage
          const roomDescription = room.querySelector(
            '.room-infos-guests-block p',
          ).textContent
          return {
            roomName,
            roomPrice,
            roomImage,
            roomDescription,
          }
        })
      },
    )
    return parseAllRooms(allRoomInformation)
  }
  async searchHotels(scraperRequest: IScraperRequestDTO): Promise<RoomData[]> {
    const isValidCheckoutDate = validateCheckoutDate(scraperRequest)

    if (!isValidCheckoutDate.isValid) {
      HTTPHandler({
        type: HttpStatus.BAD_REQUEST,
        message: isValidCheckoutDate.message,
      })
    }
    const browser = await this.browserService.getBrowser()
    const pageUrl = returnScraperURL({
      scraperRequest: scraperRequest,
    })
    const searchPage: Page = await browser.newPage()
    await searchPage.setViewport({ width: 1920, height: 1080 })
    await searchPage.goto(pageUrl)
    await searchPage.waitForSelector(
      '#main-layout > div.q-page-container > main > article > div.room-list > span > div:nth-child(1) > div.room-option',
    )
    const scraperResult = await this.scrapData(searchPage)
    await this.browserService.closeBrowser(browser)
    return scraperResult
  }
}
