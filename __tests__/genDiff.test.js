/* eslint-disable no-undef */

import genDiff from '../src/';

const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}';

test('#genDiff json diff', () => {
  const firstConfigPath = '__fixtures__/before.json';
  const secondConfigPath = '__fixtures__/after.json';
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

test('#genDiff yaml diff', () => {
  const firstConfigPath = '__fixtures__/before.yaml';
  const secondConfigPath = '__fixtures__/after.yaml';
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

test('#genDiff ini diff', () => {
  const firstConfigPath = '__fixtures__/before.ini';
  const secondConfigPath = '__fixtures__/after.ini';
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
});

test('#genDiff with different file type should throw error', () => {
  const firstConfigPath = '__fixtures__/before.json';
  const secondConfigPath = '__fixtures__/after.ini';
  expect(() => {
    genDiff(firstConfigPath, secondConfigPath);
  }).toThrow();
});

test('#genDiff without arguments should throw error', () => {
  expect(() => { genDiff(); }).toThrow();
});
