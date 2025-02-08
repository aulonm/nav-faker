export function calculateCheckDigit1(fnr: string): number {
  const checkDigit1Multipliers = [3, 7, 6, 1, 8, 9, 4, 5, 2];
  return calculateCheckDigit(fnr, checkDigit1Multipliers);
}

export function calculateCheckDigit2(fnr: string): number {
  const checkDigit2Multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  return calculateCheckDigit(fnr, checkDigit2Multipliers);
}

function calculateCheckDigit(fnr: string, multiplierTable: number[]): number {
  let sum = 0;
  for (let i = 0; i < multiplierTable.length; i++) {
    const digit = Number.parseInt(fnr.charAt(i), 10);
    const multiplier = multiplierTable.at(i);
    if (multiplier !== undefined) {
      sum += digit * multiplier;
    }
  }

  const remainder = sum % 11;
  return remainder === 0 ? 0 : 11 - remainder;
}

export function isDnr(fnr: string) {
  const day = Number(fnr.substring(0, 2));
  return day > 40 && day <= 71;
}

export function isValidFnr(fnr: string) {
  if (fnr.length !== 11) {
    return false;
  }

  const k1 = Number(fnr.charAt(9));
  const k2 = Number(fnr.charAt(10));
  if (k1 !== calculateCheckDigit1(fnr)) {
    return false;
  }
  if (k2 !== calculateCheckDigit2(fnr)) {
    return false;
  }
  return true;
}
