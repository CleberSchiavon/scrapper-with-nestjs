import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IScraperRequestDTO } from "common/dtos/scraper.dto";
import { RoomDataReturn } from "types/room";
import { ScraperService } from "./scraper.service";
@ApiTags("searchScraper")
@Controller("search")
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Post("")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Caso receba o statusCode 200, sua requisição foi concluida com sucesso",
    type: RoomDataReturn,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Caso receba um Bad Request, a payload está invalida, o motivo pode ser conferido no retorno da API",
  })
  async searchHotels(@Body() scraperRequest: IScraperRequestDTO) {
    return this.scraperService.searchHotels(scraperRequest);
  }
}
