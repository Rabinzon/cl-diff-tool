/* eslint-disable no-undef */

import genDiff from '../src/';

test('json diff', () => {
  const firstConfigPath = '__fixtures__/before.json';
  const secondConfigPath = '__fixtures__/after.json';
  const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}';

  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

