import { Injectable } from "@nestjs/common";
import { IScraperRequestDTO } from "dtos/scraper";

@Injectable()
export class ScraperService {
  searchHotels(scraperRequest: IScraperRequestDTO) {
    return scraperRequest;
  }
}
