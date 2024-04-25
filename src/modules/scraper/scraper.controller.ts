import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IScraperRequestDTO } from "common/dtos/scraper";
import { ScraperService } from "./scraper.service";

@ApiTags("searchScraper")
@Controller("search")
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Post("")
  async searchHotels(@Body() scraperRequest: IScraperRequestDTO) {
    return this.scraperService.searchHotels(scraperRequest);
  }
}
