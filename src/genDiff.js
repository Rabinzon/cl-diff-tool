import { isObject, union } from 'lodash/fp';

const states = {
  added: '+',
  notChanged: ' ',
  removed: '-',
};

const createNode = (before = {}, after = {}) =>
  (key, state, value, oldValue, force = false) => {
    const beforeVal = before[key];
    const afterVal = after[key];

    if (isObject(beforeVal) || isObject(afterVal)) {
      return {
        key,
        state,
        oldValue: [...buildAst(beforeVal, afterVal, force)],
        value: [...buildAst(beforeVal, afterVal, force)],
      };
    }
    return { key, value, oldValue, state };
  };

const buildAst = (firstConfig = {}, secondConfig = {}, force = false) => {
  const combinedKeys = union(Object.keys(firstConfig), Object.keys(secondConfig));
  const makeNode = createNode(firstConfig, secondConfig);

  return combinedKeys.map((key) => {
    const beforeVal = firstConfig[key];
    const afterVal = secondConfig[key];
    const isAdded = !beforeVal && afterVal;
    const isRemoved = beforeVal && !afterVal;

    if (!force && (isObject(beforeVal || afterVal))) {
      if (!(isAdded && isRemoved) && !(beforeVal && afterVal)) {
        return makeNode(key, isAdded ? 'added' : 'removed', beforeVal || afterVal, null, true);
      }
      return makeNode(key, false, beforeVal || afterVal, null, false);
    }

    if (force || beforeVal === afterVal) {
      return makeNode(key, 'notChanged', beforeVal || afterVal, null, force);
    }

    if (isRemoved) {
      return makeNode(key, 'removed', beforeVal);
    }

    if (isAdded) {
      return makeNode(key, 'added', afterVal);
    }

    return makeNode(key, 'changed', afterVal, beforeVal);
  });
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

const astToString = (ast, level = 0) => {
  const result = ast
    .reduce((acc, { key, value, state, oldValue }) => {
      if (state === 'changed') {
        return acc +
          createRow(key, value, states.added, level) +
          createRow(key, oldValue, states.removed, level);
      }

      return acc + createRow(key, value, states[state], level);
    }, '');
  return result;
};


export default (firstConfig, secondConfig) => {
  const result = buildAst(firstConfig, secondConfig);
  // console.log(`{${astToString(result)}\n}\n`)
  return `{${astToString(result)}\n}\n`;
};
