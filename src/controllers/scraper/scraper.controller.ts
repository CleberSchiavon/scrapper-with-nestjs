import { Body, Controller, Post } from "@nestjs/common";
import { ScraperService } from "services/scraper/scraper.service";
import { IScraperRequestDTO } from "types/dtos/scraper";

@Controller("search")
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Post("")
  async searchHotels(@Body() scraperRequest: IScraperRequestDTO) {
    return this.scraperService.searchHotels(scraperRequest);
  }
}
