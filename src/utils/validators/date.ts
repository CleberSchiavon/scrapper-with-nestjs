import { IScraperRequestDTO } from "types/dtos/scraper";
import { HttpStatusMessages } from "types/enums/http.enums";
import * as moment from "moment";

interface IValidateCheckoutDate {
  isValid: boolean;
  message?: HttpStatusMessages;
}
export const validateCheckoutDate = (
  scraperRequest: IScraperRequestDTO
): IValidateCheckoutDate => {
  const currentDate = moment().add(-1, "day");
  const checkinDate = moment(scraperRequest.checkin);
  const checkoutDate = moment(scraperRequest.checkout);
  const dateDiff = checkoutDate.diff(checkinDate, "days");
  const isOldDate =
    checkinDate.isBefore(currentDate) || checkoutDate.isBefore(currentDate);

  if (checkoutDate.isSameOrBefore(checkinDate)) {
    return {
      isValid: false,
      message: HttpStatusMessages.INVALID_CHECKOUT_DATE_MESSAGE,
    };
  }
  if (dateDiff < 2) {
    return {
      isValid: false,
      message: HttpStatusMessages.NOT_ENOUGH_DAYS,
    };
  }
  if (isOldDate) {
    return {
      isValid: false,
      message: HttpStatusMessages.OLD_DATE,
    };
  }
  return {
    isValid: true,
  };
};
