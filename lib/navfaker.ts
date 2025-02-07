import DateClass from './date/date';
import PersonIdentifier from './person-identifier/person-identifier';
import Person from './person/person';
import Random from './random/random';

class NavFaker {
  public random: Random;
  public personIdentifier: PersonIdentifier;
  public date: DateClass;
  public person: Person;

  constructor() {
    this.personIdentifier = new PersonIdentifier(this);
    this.random = new Random();
    this.date = new DateClass(this);
    this.person = new Person(this);
  }

  public seed(seed: string) {
    this.random = new Random(seed);
  }
}

export default NavFaker;
