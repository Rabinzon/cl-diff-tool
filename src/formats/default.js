/* eslint-disable no-use-before-define */

import { isObject } from 'lodash/fp';

const states = {
  added: '+',
  notChanged: ' ',
  removed: '-',
};

const getIndent = (level) => {
  if (level === 0) {
    return '  ';
  }
  return `  ${getIndent(level - 1)}`;
};

const createRow = (key, value, sign, level) => {
  const val = isObject(value) ? `{${astToString(value, level + 2)}\n${getIndent(level)}  }` : value;
  return (`\n${getIndent(level)}${sign || ' '} ${key}: ${val}`);
};

const astToString = (ast, level = 0) =>
  ast.map(({ key, value, state, oldValue }) => {
    if (state === 'updated') {
      return createRow(key, value, states.added, level) +
        createRow(key, oldValue, states.removed, level);
    }
    return createRow(key, value, states[state], level);
  }).join('');

export default ast =>
  `{${astToString(ast)}\n}`;

