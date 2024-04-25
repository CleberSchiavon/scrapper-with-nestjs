import { IsDateString, IsNotEmpty } from "class-validator";
export class IScraperRequestDTO {
  @IsNotEmpty()
  @IsDateString()
  checkin: string;

  @IsNotEmpty()
  @IsDateString()
  checkout: string;
}

export interface IReturnScraperURL {
  scraperRequest: IScraperRequestDTO;
  adultsNumber?: number;
  childsNumber?: number;
  hotelCode?: number;
  pageLanguage?: string;
  currency?: string;
}
