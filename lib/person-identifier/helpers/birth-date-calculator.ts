import { padLeft } from '../../utils/string-utils';
import { isDnr } from './fnr-utils';

export function fnrToDate(fnr: string): Date {
  if (fnr.length !== 11) {
    throw Error(`Ugyldig lengde på personIdentifikator:  ${fnr}`);
  }

  const day = getDay(fnr);

  const fourDigitYear = getFourDigitYear(fnr);
  const month = fnr.substring(2, 4);
  return new Date(`${fourDigitYear}-${month}-${day}`);
}

function getDay(fnr: string): string {
  let day = Number(fnr.substring(0, 2));
  if (isDnr(fnr)) {
    day = day - 40;
  } else if (day >= 72) {
    throw Error(`Fnr is not in correct format: ${fnr}`);
  }

  return padLeft(String(day), 2, '0');
}

function getFourDigitYear(fnr: string) {
  const year = Number(fnr.substring(4, 6));
  const personalIndentificationNumber = Number(fnr.substring(6, 9));

  if (personalIndentificationNumber < 500) {
    return year + 1900;
  }

  if (personalIndentificationNumber < 750 && 54 < year) {
    return year + 1800;
  }

  if (personalIndentificationNumber < 1000 && year < 40) {
    return year + 2000;
  }

  if (
    900 < personalIndentificationNumber ||
    personalIndentificationNumber > 1000 ||
    39 >= year
  ) {
    throw new Error(`Not valid personal indentification number:  ${fnr}`);
  }

  return year + 1900;
}
