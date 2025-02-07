import type NavFaker from '../navfaker';
import { Kjønn } from '../person-identifikator/person-identifikator';

class Person {
  private faker: NavFaker;

  constructor(faker: NavFaker) {
    this.faker = faker;
  }

  public kjønn(): number {
    return this.faker.random.vektetSjanse(0.5) ? Kjønn.KVINNE : Kjønn.MANN;
  }

  public antallBarn(fødselsdato: Date): number {
    const alder =
      new Date(new Date().getTime() - fødselsdato.getTime()).getFullYear() -
      1970;
    return this.kalkulerAntallBarn(alder);
  }

  private kalkulerAntallBarn(foreldresAlder: number) {
    if (foreldresAlder < 18) {
      return 0;
    }

    const maksAntallBarn = foreldresAlder - 18;

    if (this.faker.random.vektetSjanse(0.05)) {
      const max = Math.min(maksAntallBarn, 15);
      const min = 6;
      return this.faker.random.integer(max, min);
    }

    if (this.faker.random.vektetSjanse(0.75)) {
      return this.faker.random.integer(Math.min(maksAntallBarn, 5));
    }
    return 0;
  }
}

export default Person;
