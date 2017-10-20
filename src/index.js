import fs from 'fs';
import path from 'path';
import { map, compose, head } from 'lodash/fp';

import diff from './diff';

const parsers = {
  json: JSON.parse,
};

const isFilesExtEqual = (firstPath, secondPath) =>
  path.extname(firstPath) === path.extname(secondPath);

const getConfigs = (...paths) => {
  const configType = path.extname(head(paths)).split('.').join('');
  return compose(
    map(parsers[configType]),
    map(fs.readFileSync))(paths);
};

const genDiff = (firstPath, secondPath) => {
  if (!isFilesExtEqual(firstPath, secondPath)) {
    throw new Error('File types should be equal');
  }

  return diff(...getConfigs(firstPath, secondPath));
};

export default genDiff;
