import { expect, test } from 'bun:test';
import navfaker from '../index';

test('returns sex', () => {
  const faker = navfaker;

  const randomSex = faker.person.sex();

  expect(randomSex).toBeGreaterThanOrEqual(0);
  expect(randomSex).toBeLessThanOrEqual(1);
});
