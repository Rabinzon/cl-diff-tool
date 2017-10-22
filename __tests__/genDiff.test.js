/* eslint-disable no-undef */

import fs from 'fs';
import genDiff from '../src/';

const result = fs.readFileSync('__fixtures__/output.txt', 'utf-8');

test('#genDiff json diff', () => {
  const firstConfigPath = '__fixtures__/nested1.json';
  const secondConfigPath = '__fixtures__/nested2.json';
  const output = fs.readFileSync('__fixtures__/nestedOutput.txt', 'utf-8');
  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(output);
});

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
