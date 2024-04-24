import { Body, Controller, Post } from "@nestjs/common";
import { ScraperService } from "services/scraper/ScraperService";
import { IScraperRequestDTO } from "dtos/scraper";

@Controller("search")
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Post("")
  async searchHotels(@Body() scraperRequest: IScraperRequestDTO) {
    return this.scraperService.searchHotels(scraperRequest);
  }
}
