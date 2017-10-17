/* eslint-disable no-undef */

import { json } from '../src/diff/';

test('#1 json diff', () => {
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
  const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}';

  expect(json(firstConfig, secondConfig)).toEqual(result);
});

test('#2 json diff', () => {
  const firstConfig = {
    host: 'hexlet.io',
  };
  const secondConfig = {};
  const result = '{\n\t- host: hexlet.io\n}';

  expect(json(firstConfig, secondConfig)).toEqual(result);
});

test('#3 json diff', () => {
  const firstConfig = {};
  const secondConfig = {};
  const result = '{\n}';

  expect(json(firstConfig, secondConfig)).toEqual(result);
});

test('#4 json diff', () => {
  const firstConfig = {};
  const secondConfig = {};
  const result = '{\n}';

  expect(json(firstConfig, secondConfig)).toEqual(result);
});
