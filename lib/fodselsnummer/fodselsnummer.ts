import moment = require('moment');
import NavFaker from '../navfaker';
import { padLeftNumber } from '../utils/string-utils';
import { getConfigOrDefault } from './helpers/config-helper';
import { fødselsnummerTilDato } from './helpers/fodselsdato-beregner';
import { beregnKontrollsiffer1, beregnKontrollsiffer2, datoSomStreng } from './helpers/fodselsnummer-utils';

export enum Kjønn {
    KVINNE = 0,
    MANN = 1,
}
function erMellom(tall: number, min: number, max: number) {
    return tall >= min && tall <= max;
}

function getLøpenummerSomListe(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, index: number) => padLeftNumber(start + index, 3));
}

class Fødselsnummer {

    private faker: NavFaker;

    constructor(faker: NavFaker) {
        this.faker = faker;
    }

    public generer(fødselsdato?: Date, kjønn?: number): string {
        const parsedOptions = getConfigOrDefault(this.faker, {fødselsdato, kjønn});
        return this.genererTilfeldigFødselsnummer(parsedOptions.fødselsdato, parsedOptions.kjønn);
    }

    public dnummer(fødselsdato?: Date, kjønn?: number): string {
        const fødselsnummer = this.generer(fødselsdato, kjønn);

        const førsteSiffer = Number(fødselsnummer.charAt(0));
        const nyttFørstesiffer = førsteSiffer + 4;

        return String(nyttFørstesiffer).concat(fødselsnummer.substring(1));
    }

    public myndig(kjønn?: number): string {
        const maxAlder = moment().subtract(100, 'years').toDate();
        const minAlder = moment().subtract(18, 'years').toDate();
        const fødselsdato = this.faker.dato.mellom(maxAlder, minAlder);

        return this.generer(fødselsdato, kjønn);
    }

    public getFødselsdato(fødselsnummer: string): Date {
        return fødselsnummerTilDato(fødselsnummer);
    }

    private genererTilfeldigFødselsnummer(dato: Date, kjønn: Kjønn) {
        const individnummere = this.getGyldigeIndividnummere(dato, kjønn);

        const formatertDato = datoSomStreng(dato);
        const tilfeldigIndividNummer = individnummere[this.faker.random.number(individnummere.length - 1)];

        const k1 = beregnKontrollsiffer1(formatertDato + tilfeldigIndividNummer);
        const k2 = beregnKontrollsiffer2(formatertDato + tilfeldigIndividNummer + k1);

        return formatertDato + tilfeldigIndividNummer + k1 + k2;
    }

    private getGyldigeIndividnummere(dato: Date, kjønn: Kjønn) {

        function individsifferHarRiktigKjønn(individnummer: string) {
            const kjønnSiffer = Number(individnummer.charAt(2));
            return kjønnSiffer % 2 === kjønn;
        }

        function gyldigeKontrollsiffere(individnummer: string) {
            const fødselsnummer = datoSomStreng(dato) + individnummer;
            const k1 = beregnKontrollsiffer1(fødselsnummer);
            if (k1 === 10) {
                return false;
            }
            if (beregnKontrollsiffer2(fødselsnummer + k1) === 10) {
                return false;
            }
            return true;
        }

        return this.getIndividsiffereForDato(dato)
            .filter(individsifferHarRiktigKjønn)
            .filter(gyldigeKontrollsiffere);
    }

    private getIndividsiffereForDato(date: Date) {
        const year = date.getFullYear();

        if (erMellom(year, 1854, 1899)) {
            return getLøpenummerSomListe(500, 749);
        } else if (erMellom(year, 1900, 1999)) {
            return getLøpenummerSomListe(0, 500);
        } else if (erMellom(year, 2000, 2039)) {
            return getLøpenummerSomListe(500, 999);
        } else {
            throw new Error('Ugyldig dato');
        }
    }

}

export default Fødselsnummer;
