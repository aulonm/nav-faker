import { describe, expect, test } from 'bun:test';
import navfaker from '../index';
import { isValidFnr } from './helpers/fnr-utils';

test('Generate valid fnr', () => {
  const fnr = navfaker.personIdentifier.fnr();
  expect(fnr).toHaveLength(11);
  expect(isValidFnr(fnr)).toEqual(true);
});

test('Generate adult fnr', () => {
  const fnr = navfaker.personIdentifier.myndigFødselsnummer();

  const birthDate = navfaker.personIdentifier.getbirthDate(fnr);
  const age =
    new Date(new Date().getTime() - birthDate.getTime()).getFullYear() - 1970;

  expect(age).toBeLessThanOrEqual(100);
  expect(age).toBeGreaterThanOrEqual(18);
  expect(isValidFnr(fnr)).toEqual(true);
});

test('Parse birthDate', () => {
  const birthDate = navfaker.personIdentifier.getbirthDate('10108000398');

  expect(birthDate.getFullYear()).toEqual(1980);
  expect(birthDate.getDate()).toEqual(10);
  expect(birthDate.getMonth()).toEqual(9);
});

describe('d-number', () => {
  test('Create d-number', () => {
    const dNumber = navfaker.personIdentifier.dNumber();
    const førsteSiffer = Number(dNumber.charAt(0));

    expect(dNumber.length).toEqual(11);
    expect(førsteSiffer).toBeGreaterThanOrEqual(4);
    expect(førsteSiffer).toBeLessThanOrEqual(7);
    expect(isValidFnr(dNumber)).toEqual(true);
  });
});
