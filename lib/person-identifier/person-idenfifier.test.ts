import { describe, expect, test } from 'bun:test';
import navfaker from '../index';
import { isValidFnr } from './helpers/fnr-utils';

test('Generate valid fnr', () => {
  const fnr = navfaker.personIdentifier.fnr();
  expect(fnr).toHaveLength(11);
  expect(isValidFnr(fnr)).toEqual(true);
});

test('Generate adult fnr', () => {
  const fnr = navfaker.personIdentifier.adultFnr();

  const birthDate = navfaker.personIdentifier.getBirthDate(fnr);
  const age =
    new Date(new Date().getTime() - birthDate.getTime()).getFullYear() - 1970;

  expect(age).toBeLessThanOrEqual(100);
  expect(age).toBeGreaterThanOrEqual(18);
  expect(isValidFnr(fnr)).toEqual(true);
});

test('Parse birthDate', () => {
  const birthDate = navfaker.personIdentifier.getBirthDate('10108000398');

  expect(birthDate.getFullYear()).toEqual(1980);
  expect(birthDate.getDate()).toEqual(10);
  expect(birthDate.getMonth()).toEqual(9);
});

describe('d-number', () => {
  test('Create d-number', () => {
    const dnr = navfaker.personIdentifier.dnr();
    const førsteSiffer = Number(dnr.charAt(0));

    expect(dnr.length).toEqual(11);
    expect(førsteSiffer).toBeGreaterThanOrEqual(4);
    expect(førsteSiffer).toBeLessThanOrEqual(7);
    expect(isValidFnr(dnr)).toEqual(true);
  });
});

describe('get age from fnr', () => {
  test('Get age from fnr', () => {
    const fnr = '10108000398';
    const age = navfaker.personIdentifier.getAge(fnr);

    expect(age).toEqual(44);
  });
});
