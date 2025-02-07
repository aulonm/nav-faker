import Dato from './dato/dato';
import Nav from './nav/nav';
import Navn from './navn/navn';
import PersonIdentifikator from './person-identifikator/person-identifikator';
import Person from './person/person';
import Random from './random/random';
import Telefon from './telefon/telefon';

class NavFaker {
  public random: Random;
  public personIdentifikator: PersonIdentifikator;
  public dato: Dato;
  public person: Person;
  public telefon: Telefon;
  public nav: Nav;
  public navn: Navn;

  constructor() {
    this.personIdentifikator = new PersonIdentifikator(this);
    this.random = new Random();
    this.dato = new Dato(this);
    this.person = new Person(this);
    this.telefon = new Telefon(this);
    this.nav = new Nav(this);
    this.navn = new Navn(this);
  }

  public seed(seed: string) {
    this.random = new Random(seed);
  }
}

export default NavFaker;
