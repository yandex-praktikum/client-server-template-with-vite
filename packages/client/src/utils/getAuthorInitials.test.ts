import { getAuthorInitials } from './getAuthorInitials';

test('getCreatedAtValue', async () => {
  expect(getAuthorInitials({ first_name: 'Иван', second_name: 'Петров' })).toBe('ИП');
});
