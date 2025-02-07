import type NavFaker from '../navfaker';
import { getConfigOrDefault } from './helpers/config-helper';
import { fødselsnummerTilDato } from './helpers/fodselsdato-beregner';
import FødselsnummerBeregner from './helpers/fødselsnummer-beregner';

export enum Kjønn {
  KVINNE = 0,
  MANN = 1,
}

class PersonIdentifikator {
  private faker: NavFaker;

  constructor(faker: NavFaker) {
    this.faker = faker;
  }

  public fødselsnummer(fødselsdato?: Date, kjønn?: number): string {
    const parsedOptions = getConfigOrDefault(
      this.faker,
      { fødselsdato, kjønn },
      false,
    );
    return new FødselsnummerBeregner(
      this.faker,
      parsedOptions,
    ).tilfeldigFødselsnummer();
  }

  public dnummer(fødselsdato?: Date, kjønn?: number): string {
    const parsedOptions = getConfigOrDefault(
      this.faker,
      { fødselsdato, kjønn },
      true,
    );
    return new FødselsnummerBeregner(
      this.faker,
      parsedOptions,
    ).tilfeldigFødselsnummer();
  }

  public myndigFødselsnummer(kjønn?: number): string {
    const maxAlder = new Date();
    maxAlder.setFullYear(maxAlder.getFullYear() - 100, 0, 1);
    const minAlder = new Date();
    minAlder.setFullYear(minAlder.getFullYear() - 18, 0, 1);
    const fødselsdato = this.faker.dato.mellom(maxAlder, minAlder);

    return this.fødselsnummer(fødselsdato, kjønn);
  }

  public getFødselsdato(fødselsnummer: string): Date {
    return fødselsnummerTilDato(fødselsnummer);
  }
}

export default PersonIdentifikator;
