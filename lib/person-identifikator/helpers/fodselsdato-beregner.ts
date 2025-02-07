import { padLeft } from '../../utils/string-utils';
import { erDnummer } from './fodselsnummer-utils';

export function fødselsnummerTilDato(fødselsnummer: string): Date {
  if (fødselsnummer.length !== 11) {
    throw Error(`Ugyldig lengde på personIdentifikator:  ${fødselsnummer}`);
  }

  const dag = getDag(fødselsnummer);

  const fireSifretÅr = getFiresifretÅr(fødselsnummer);
  const måned = fødselsnummer.substring(2, 4);
  return new Date(`${fireSifretÅr}-${måned}-${dag}`);
}

function getDag(fødselsnummer: string): string {
  let dag = Number(fødselsnummer.substring(0, 2));
  if (erDnummer(fødselsnummer)) {
    dag = dag - 40;
  } else if (dag >= 72) {
    throw Error(`Fødselsnummer er av ukjent format: ${fødselsnummer}`);
  }

  return padLeft(String(dag), 2, '0');
}

function getFiresifretÅr(fødselsnummer: string) {
  const year = Number(fødselsnummer.substring(4, 6));
  const individnummer = Number(fødselsnummer.substring(6, 9));

  if (individnummer < 500) {
    return year + 1900;
  }

  if (individnummer < 750 && 54 < year) {
    return year + 1800;
  }

  if (individnummer < 1000 && year < 40) {
    return year + 2000;
  }

  if (900 < individnummer || individnummer > 1000 || 39 >= year) {
    throw new Error(`Ugyldig personIdentifikator:  ${fødselsnummer}`);
  }

  return year + 1900;
}
