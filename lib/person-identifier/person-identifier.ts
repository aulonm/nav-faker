import type NavFaker from '../navfaker';
import { fnrToDate } from './helpers/birth-date-calculator';
import { getConfigOrDefault } from './helpers/config-helper';
import FødselsnummerBeregner from './helpers/fnr-calculator';

export enum Sex {
  WOMEN = 0,
  MAN = 1,
}

class PersonIdentifier {
  private faker: NavFaker;

  constructor(faker: NavFaker) {
    this.faker = faker;
  }

  public fnr(birthDate?: Date, sex?: number): string {
    const parsedOptions = getConfigOrDefault(
      this.faker,
      { birthDate, sex },
      false,
    );
    return new FødselsnummerBeregner(this.faker, parsedOptions).randomFnr();
  }

  public dnr(birthDate?: Date, sex?: number): string {
    const parsedOptions = getConfigOrDefault(
      this.faker,
      { birthDate, sex },
      true,
    );
    return new FødselsnummerBeregner(this.faker, parsedOptions).randomFnr();
  }

  public adultFnr(sex?: number): string {
    const maxAlder = new Date();
    maxAlder.setFullYear(maxAlder.getFullYear() - 100, 0, 1);
    const minAlder = new Date();
    minAlder.setFullYear(minAlder.getFullYear() - 18, 0, 1);
    const birthDate = this.faker.date.between(maxAlder, minAlder);

    return this.fnr(birthDate, sex);
  }

  public getbirthDate(fnr: string): Date {
    return fnrToDate(fnr);
  }
}

export default PersonIdentifier;
