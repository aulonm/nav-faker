import type NavFaker from '../../navfaker';
import { padLeftNumber } from '../../utils/string-utils';
import type { Sex } from '../person-identifier';
import { calculateCheckDigit1, calculateCheckDigit2 } from './fnr-utils';

export interface Options {
  birthDate: Date;
  sex: Sex;
  isDNumber: boolean;
}

function isBetween(tall: number, min: number, max: number) {
  return tall >= min && tall <= max;
}

function getSerialNumberAsList(start: number, end: number) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, index: number) => padLeftNumber(start + index, 3));
}

function dateFromString(dato: Date) {
  const dd = dato.getDate();
  const mm = dato.getMonth() + 1;
  const yy = dato.getFullYear() % 100;
  return `${
    padLeftNumber(dd, 2) + padLeftNumber(mm, 2) + padLeftNumber(yy, 2)
  }`;
}

class FnrCalculator {
  private faker: NavFaker;
  private options: Options;

  constructor(faker: NavFaker, options: Options) {
    this.faker = faker;
    this.options = options;
  }

  public randomFnr() {
    const validPersonalIdentificationNumbers =
      this.getValidPersonalIdentificationNumbers();
    const randomIndividualNumber =
      validPersonalIdentificationNumbers[
        this.faker.random.integer(validPersonalIdentificationNumbers.length - 1)
      ];

    const adjustedBirthDate = this.adjustBirthDateForDNumber();

    const k1 = calculateCheckDigit1(adjustedBirthDate + randomIndividualNumber);

    const k2 = calculateCheckDigit2(
      adjustedBirthDate + randomIndividualNumber + k1,
    );

    return adjustedBirthDate + randomIndividualNumber + k1 + k2;
  }

  private getValidPersonalIdentificationNumbers() {
    return this.getIndividualNumbersForYear()
      .filter((personalIdentificationDigit) =>
        this.individualNumberHasCorrectSex(personalIdentificationDigit),
      )
      .filter((personalIdentificationDigit) =>
        this.validControlDigits(personalIdentificationDigit),
      );
  }

  private getIndividualNumbersForYear() {
    const year = this.options.birthDate.getFullYear();

    if (isBetween(year, 1854, 1899)) {
      return getSerialNumberAsList(500, 749);
    }

    if (isBetween(year, 1900, 1999)) {
      return getSerialNumberAsList(0, 500);
    }

    if (isBetween(year, 2000, 2039)) {
      return getSerialNumberAsList(500, 999);
    }

    throw new Error('Invalid date');
  }

  private individualNumberHasCorrectSex(personalIdentificationDigit: string) {
    const sexDigit = Number(personalIdentificationDigit.charAt(2));
    return sexDigit % 2 === this.options.sex;
  }

  private validControlDigits(personalIdentificationDigit: string) {
    const birthDate = this.adjustBirthDateForDNumber();
    const personalId = birthDate + personalIdentificationDigit;
    const k1 = calculateCheckDigit1(personalId);

    if (k1 === 10) {
      return false;
    }

    if (calculateCheckDigit2(personalId + k1) === 10) {
      return false;
    }

    return true;
  }

  private adjustBirthDateForDNumber(): string {
    const birthDate = dateFromString(this.options.birthDate);
    if (!this.options.isDNumber) {
      return birthDate;
    }
    const firstDigit = Number(birthDate.charAt(0)) + 4;
    return String(firstDigit).concat(birthDate.substring(1));
  }
}

export default FnrCalculator;
