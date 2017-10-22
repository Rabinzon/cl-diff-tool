/* eslint-disable array-callback-return, consistent-return */

import { isObject } from 'lodash/fp';

const getChanges = (value, oldValue, state) => {
  const currentValue = isObject(value) ? 'complex value' : value;
  const prevValue = isObject(oldValue) ? 'complex value' : oldValue;
  if (state === 'updated') {
    return `From ${prevValue} to ${currentValue}`;
  }
  if (state === 'added') {
    return `with value: ${currentValue}`;
  }
  return '';
};

const toPlainView = (ast, path) =>
  ast.map(({ key, value, state, oldValue }) => {
    if (state === 'notChanged') return;
    const currentPath = path ? `${path}.${key}` : key;

    if (!state) {
      return toPlainView(value, currentPath);
    }

    return `Property '${currentPath}' was ${state}. ${getChanges(value, oldValue, state)}`.trim();
  }).filter(t => t).join('\n');

export default ast => toPlainView(ast);
