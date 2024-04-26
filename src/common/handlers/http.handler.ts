import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { IReturnScraperUrl } from "common/dtos/scraper.dto";
import { HttpStatusMessages } from "types/enums/http.enums";

interface IHttpHandler {
  type: HttpStatus;
  message: HttpStatusMessages;
  statusCode?: number;
}

export function HTTPHandler({ type, message, statusCode }: IHttpHandler) {
  switch (type) {
    case HttpStatus.BAD_REQUEST:
      throw new BadRequestException(message, {
        cause: new Error(),
      });
    default:
      throw new HttpException(message, statusCode);
  }
}

const scrapperDefaultValues = {
  adultsNumber: 2,
  childsNumber: 0,
  hotelCode: 12,
  pageLanguage: "pt-BR",
  currency: "BRL",
};
export const returnScraperURL = ({
  scraperRequest,
  adultsNumber = scrapperDefaultValues.adultsNumber,
  childsNumber = scrapperDefaultValues.childsNumber,
  hotelCode = scrapperDefaultValues.hotelCode,
  pageLanguage = scrapperDefaultValues.pageLanguage,
  currency = scrapperDefaultValues.currency,
}: IReturnScraperUrl) => {
  return `${process.env.SCRAPER_BASE_URL}?checkin=${scraperRequest.checkin}&checkout=${scraperRequest.checkout}&numeroAdultos=${adultsNumber}&criancas=${childsNumber}&codigoHotel=${hotelCode}&idioma=${pageLanguage}&moeda=${currency}`;
};
