import type NavFaker from '../../navfaker';

interface UserOptions {
  fødselsdato?: Date;
  kjønn?: number;
}

export function getConfigOrDefault(
  navFaker: NavFaker,
  options: UserOptions,
  erDnummer: boolean,
) {
  let fødselsdato = options.fødselsdato;
  let kjønn = options.kjønn;

  if (!fødselsdato) {
    fødselsdato = navFaker.dato.mellom(new Date('1900-01-01'), new Date());
  }
  if (!kjønn) {
    kjønn = navFaker.person.kjønn();
  }
  return {
    erDnummer,
    fødselsdato,
    kjønn,
  };
}
