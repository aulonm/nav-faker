import type NavFaker from '../navfaker';
import { Kjønn } from '../person-identifikator/person-identifikator';
import guttenavn from './data/guttenavn';
import jentenavn from './data/jentenavn';

class Navn {
  private navfaker: NavFaker;

  constructor(faker: NavFaker) {
    this.navfaker = faker;
  }

  public fornavn(kjønn?: number): string | undefined {
    return this.getFornavnForKjønn(
      kjønn !== undefined ? kjønn : this.navfaker.person.kjønn(),
    );
  }

  private getFornavnForKjønn(kjønn: number) {
    if (kjønn === Kjønn.MANN) {
      return this.navfaker.random.arrayElement(guttenavn);
    }

    return this.navfaker.random.arrayElement(jentenavn);
  }
}

export default Navn;
