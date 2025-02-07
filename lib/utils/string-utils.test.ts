import { expect, test } from 'bun:test';
import { padLeftNumber } from './string-utils';

test('Correct padding', () => {
  const paddedString = padLeftNumber(5, 5);

  expect(paddedString).toEqual('00005');
});
