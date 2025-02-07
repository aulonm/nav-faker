import type NavFaker from '../navfaker';
import { Sex } from '../person-identifier/person-identifier';

class Person {
  private faker: NavFaker;

  constructor(faker: NavFaker) {
    this.faker = faker;
  }

  public sex(): number {
    return this.faker.random.weightedChange(0.5) ? Sex.WOMEN : Sex.MAN;
  }
}

export default Person;
