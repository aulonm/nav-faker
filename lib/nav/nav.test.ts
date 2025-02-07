import { expect, test } from 'bun:test';
import navfaker from '../index';

test('ytelse returnerer en ytelse', () => {
  const randomYtelse = navfaker.nav.ytelse();

  expect(randomYtelse.length).toBeGreaterThan(0);
});
