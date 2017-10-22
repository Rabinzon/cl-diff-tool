import fs from 'fs';
import path from 'path';
import yamlParser from 'js-yaml';
import iniParser from 'ini';

import genDiff from './genDiff';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: iniParser.parse,
};

const isFilesExtEqual = (firstPath, secondPath) =>
  path.extname(firstPath) === path.extname(secondPath);

export default (firstPath, secondPath) => {
  if (!isFilesExtEqual(firstPath, secondPath)) {
    throw new Error('File types should be equal');
  }

  const configType = path.extname(secondPath).split('.').join('');
  const beforeConfig = fs.readFileSync(firstPath, 'utf-8');
  const afterConfig = fs.readFileSync(secondPath, 'utf-8');

  const parseConfig = parsers[configType];
  const beforeObject = parseConfig(beforeConfig);
  const afterObject = parseConfig(afterConfig);

  return genDiff(beforeObject, afterObject);
};

