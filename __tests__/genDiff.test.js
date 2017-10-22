/* eslint-disable no-undef */

import fs from 'fs';
import genDiff from '../src/';

const result1 = fs.readFileSync('__fixtures__/output.txt', 'utf-8');
const result2 = fs.readFileSync('__fixtures__/nestedOutput.txt', 'utf-8');

['json', 'yaml', 'ini'].forEach((type) => {
  test(`#genDiff nested ${type} diff`, () => {
    const firstConfigPath = `__fixtures__/nested1.${type}`;
    const secondConfigPath = `__fixtures__/nested2.${type}`;
    expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result2);
  });
});

['json', 'yaml', 'ini'].forEach((type) => {
  test(`#genDiff ${type} diff`, () => {
    const firstConfigPath = `__fixtures__/before.${type}`;
    const secondConfigPath = `__fixtures__/after.${type}`;
    expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result1);
  });
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
