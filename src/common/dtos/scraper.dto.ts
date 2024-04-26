import { IsDateString, IsNotEmpty } from "class-validator";

export class IScraperRequestDTO {
  /**
   * Parametro de checkin - Utilize o formato YYYY-MM-DD
   * @example 2024-04-29
   * @param {string} checkin - Parametro de checkin
   */

  @IsNotEmpty()
  @IsDateString()
  checkin: string | Date;

  /**
   * Parametro de checkout - Utilize o formato YYYY-MM-DD
   * @param {string} checkout - Parametro de checkout
   * @example 2024-05-03
   */

  @IsNotEmpty()
  @IsDateString()
  checkout: string | Date;
}

export interface IReturnScraperURL {
  scraperRequest: IScraperRequestDTO;
  adultsNumber?: number;
  childsNumber?: number;
  hotelCode?: number;
  pageLanguage?: string;
  currency?: string;
}
