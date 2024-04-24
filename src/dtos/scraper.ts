import { IsDateString, IsNotEmpty } from "class-validator";

export class IScraperRequestDTO {
  @IsNotEmpty()
  @IsDateString()
  checkin: string;
  @IsNotEmpty()
  @IsDateString()
  checkout: string;
}
