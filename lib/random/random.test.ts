import { describe, expect, test } from 'bun:test';
import navfaker from '../index';

describe('Weighted Chance', () => {
  test('Returns boolean', () => {
    const result = navfaker.random.weightedChange(0.7);

    expect(typeof result).toBe('boolean');
  });
});

describe('Number', () => {
  describe('With interval as parameter', () => {
    test('Returns a number in the interval', () => {
      const randomNumber = navfaker.random.integer(9, 5);

      expect(randomNumber).toBeGreaterThanOrEqual(5);
      expect(randomNumber).toBeLessThanOrEqual(9);
    });

    test('With only one possible number', () => {
      const randomNumber = navfaker.random.integer(5, 5);

      expect(randomNumber).toEqual(5);
    });
  });

  describe('With number as parameter', () => {
    test('Positive number', () => {
      const randomNumber = navfaker.random.integer(10);

      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThanOrEqual(10);
    });

    test('0', () => {
      const randomNumber = navfaker.random.integer(0);

      expect(randomNumber).toEqual(0);
    });

    test('Negative number', () => {
      const randomNumber = navfaker.random.integer(-5);

      expect(randomNumber).toBeLessThanOrEqual(0);
      expect(randomNumber).toBeGreaterThanOrEqual(-5);
    });
  });

  describe('With no parameters', () => {
    test('Returns a positive number', () => {
      const randomNumber = navfaker.random.integer();

      expect(randomNumber).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('arrayElement', () => {
  describe('With no elements', () => {
    test('Returns undefined', () => {
      expect(navfaker.random.arrayElement([])).toBeUndefined();
    });
  });

  describe('with one element', () => {
    test('Returns the element', () => {
      expect(navfaker.random.arrayElement(['Ibsen'])).toEqual('Ibsen');
    });
  });

  describe('With more than one element', () => {
    test('Returns an element', () => {
      expect(
        navfaker.random.arrayElement(['Ibsen', 'Bjørnson', 'Kielland', 'Lie'])
          ?.length,
      ).toBeGreaterThan(0);
    });
  });
});
