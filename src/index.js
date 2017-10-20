import fs from 'fs';
import path from 'path';
import yamlParser from 'js-yaml';
import iniParser from 'ini';
import { map, compose, head } from 'lodash/fp';

import diff from './diff';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: iniParser.parse,
};

const isFilesExtEqual = (firstPath, secondPath) =>
  path.extname(firstPath) === path.extname(secondPath);

const getConfigs = (...paths) => {
  const configType = path.extname(head(paths)).split('.').join('');
  return compose(
    map(parsers[configType]),
    map(confPath => fs.readFileSync(confPath, 'utf-8')),
  )(paths);
};

const genDiff = (firstPath, secondPath) => {
  if (!isFilesExtEqual(firstPath, secondPath)) {
    throw new Error('File types should be equal');
  }

  return diff(...getConfigs(firstPath, secondPath));
};

export default genDiff;
