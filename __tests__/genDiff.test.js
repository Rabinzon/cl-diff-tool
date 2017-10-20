/* eslint-disable no-undef */

import genDiff from '../src/';

const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}';

test('json diff', () => {
  const firstConfigPath = '__fixtures__/before.json';
  const secondConfigPath = '__fixtures__/after.json';
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

test('yaml diff', () => {
  const firstConfigPath = '__fixtures__/before.yaml';
  const secondConfigPath = '__fixtures__/after.yaml';
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

