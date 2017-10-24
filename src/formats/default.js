/* eslint-disable no-use-before-define */

import { flatten } from 'lodash/fp';

const states = {
  added: '+',
  unchanged: ' ',
  removed: '-',
  updated: ' ',
};

const getSpaces = space =>
  (`${' '.repeat((space + 1) * 2)}`);

const toString = (key, value, sign, space, children) => {
  const indent = getSpaces(space);
  let currentValue;
  if (children.length) {
    currentValue = `{${astToString(children, space + 2)}\n${indent}  }`;
  }
  return `\n${indent}${sign} ${key}: ${currentValue || value}`;
};

const iterate = level => ({ key, newValue, type, oldValue, children }) => (
  type === 'updated' ? [
    toString(key, newValue, states.added, level, children),
    toString(key, oldValue, states.removed, level, children),
  ] : toString(key, newValue, states[type], level, children)
);

const astToString = (diffAst, level = 0) => {
  const result = diffAst.map(iterate(level));
  return flatten(result).join('');
};

export default diffAst =>
  `{${astToString(diffAst)}\n}`;

