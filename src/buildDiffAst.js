/* eslint-disable no-use-before-define */

import { isObject, union, keys } from 'lodash/fp';

const types = {
  removed: 'removed',
  updated: 'updated',
  unchanged: 'unchanged',
  added: 'added',
};

const getNodeValue = value =>
  (isObject(value) ? 'complex value' : value);

const createNode = (key, type, newValue, oldValue, parentType) => ({
  key,
  type,
  newValue: getNodeValue(newValue || oldValue),
  oldValue: getNodeValue(oldValue || null),
  children: [...build(oldValue, newValue, parentType)],
});

const getCurrentType = (beforeVal, afterVal) => {
  const { removed, updated, unchanged, added } = types;
  const isObjects = isObject(beforeVal) && isObject(afterVal);

  if (beforeVal === afterVal || isObjects) {
    return unchanged;
  }

  if (beforeVal && !afterVal) {
    return removed;
  }

  if (!beforeVal && afterVal) {
    return added;
  }

  return updated;
};

const isTypeAddedOrRemoved = type =>
  (type === types.added || type === types.removed);

const build = (beforeObj = {}, afterObj = {}, parentType = false) => {
  if (!isObject(beforeObj) || !isObject(afterObj)) {
    return [];
  }

  const combinedKeys = union(keys(beforeObj), keys(afterObj));

  return combinedKeys.map((key) => {
    const beforeVal = beforeObj[key];
    const afterVal = afterObj[key];

    if (isTypeAddedOrRemoved(parentType)) {
      return createNode(key, types.unchanged, afterVal, beforeVal, parentType);
    }

    const type = getCurrentType(beforeVal, afterVal);
    const isSomeValObject = isObject(beforeVal) || isObject(afterVal);
    const localParentType = isTypeAddedOrRemoved(type) && isSomeValObject ? type : parentType;

    return createNode(key, type, afterVal, beforeVal, localParentType);
  });
};

export default (beforeConfig, afterConfig) =>
  build(beforeConfig, afterConfig);
