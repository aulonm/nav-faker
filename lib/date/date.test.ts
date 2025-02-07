import { expect, test } from 'bun:test';
import navfaker from '../index';

test('Generates random date between two dates', () => {
  const date1 = new Date('1990-01-01');
  const date2 = new Date('1995-01-01');

  const randomDate = navfaker.date.between(date1, date2);
  const year = randomDate.getFullYear();

  expect(year).toBeGreaterThanOrEqual(1990);
  expect(year).toBeLessThanOrEqual(1995);
});
