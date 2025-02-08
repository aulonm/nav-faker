import type NavFaker from '../../navfaker';

interface UserOptions {
  birthDate?: Date;
  sex?: number;
}

export function getConfigOrDefault(
  navFaker: NavFaker,
  options: UserOptions,
  isDnr: boolean,
) {
  let birthDate = options.birthDate;
  let sex = options.sex;

  if (!birthDate) {
    birthDate = navFaker.date.between(new Date('1900-01-01'), new Date());
  }
  if (!sex) {
    sex = navFaker.person.sex();
  }
  return {
    isDnr,
    birthDate,
    sex,
  };
}
