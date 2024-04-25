import { BadRequestException, HttpException } from "@nestjs/common";
import { IReturnScraperURL } from "types/dtos/scraper";
import { HttpStatus, HttpStatusMessages } from "types/enums/http.enums";

interface IHTTPHandler {
  type: HttpStatus;
  message: HttpStatusMessages;
  statusCode?: number;
}

export function HTTPHandler({ type, message, statusCode }: IHTTPHandler) {
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
}: IReturnScraperURL) => {
  return `${process.env.SCRAPER_BASE_URL}?checkin=${scraperRequest.checkin}&checkout=${scraperRequest.checkout}&numeroAdultos=${adultsNumber}&criancas=${childsNumber}&codigoHotel=${hotelCode}&idioma=${pageLanguage}&moeda=${currency}`;
};
