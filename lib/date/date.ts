import type NavFaker from '../navfaker';

class DateClass {
  private faker: NavFaker;

  constructor(faker: NavFaker) {
    this.faker = faker;
  }

  public between(fra: Date, til: Date): Date {
    const fraMilli = Date.parse(fra.toString());
    const dateOffset = this.faker.random.integer(
      Date.parse(til.toString()) - fraMilli,
    );

    return new Date(fraMilli + dateOffset);
  }
}

export default DateClass;
