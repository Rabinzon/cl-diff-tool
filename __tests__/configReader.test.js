/* eslint-disable no-undef */

import configReader from '../src/configReader';

test('configReader', () => {
  const before = '__mocks__/before.json';
  const after = '__mocks__/after.json';
  const firstConfig = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
  };
  const secondConfig = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expect(configReader(before)).toMatchObject(firstConfig);
  expect(configReader(after)).toMatchObject(secondConfig);
  expect(configReader('test.json.md')).toBeFalsy();
});
