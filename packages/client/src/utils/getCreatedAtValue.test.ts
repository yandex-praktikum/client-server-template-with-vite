import { getCreatedAtValue } from './getCreatedAtValue';

test('getCreatedAtValue', async () => {
  expect(getCreatedAtValue('2022-10-11')).toBe('11.10.2022');
  expect(getCreatedAtValue('2022-10-11T12:30:40')).toBe('11.10.2022');
});
