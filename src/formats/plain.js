/* eslint-disable array-callback-return, consistent-return, no-use-before-define */

const toString = (path, type, newValue, oldValue) => {
  const text = {
    updated: ` From ${oldValue} to ${newValue}`,
    added: ` with value: ${newValue}`,
  }[type];

  return `Property '${path}' was ${type}.${text || ''}`;
};

const iterate = path => ({ key, newValue, type, oldValue, children }) => {
  const isUnchanged = type === 'unchanged';

  if (!children.length && isUnchanged) {
    return;
  }

  const currentPath = path ? `${path}.${key}` : key;

  if (children.length && isUnchanged) {
    return toPlainView(children, currentPath);
  }

  return toString(currentPath, type, newValue, oldValue);
};

const toPlainView = (diffAst, path) =>
  diffAst.map(iterate(path)).filter(t => t).join('\n');

export default diffAst => toPlainView(diffAst);
