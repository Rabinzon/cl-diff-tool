const createRow = (key, value, sign = ' ') =>
  `\n\t${sign} ${key}: ${value}`;

const getNewKeys = (firstConfig, secondConfig) =>
  Object.keys(secondConfig).filter(key =>
    Object.keys(firstConfig).indexOf(key) === -1);

export default (firstConfig, secondConfig) => {
  const newKeys = getNewKeys(firstConfig, secondConfig);
  const differences = Object.keys(firstConfig)
    .reduce((acc, key) => {
      if (!Object.hasOwnProperty.call(secondConfig, key)) {
        return [...acc, createRow(key, firstConfig[key], '-')];
      }
      if (secondConfig[key] === firstConfig[key]) {
        return [...acc, createRow(key, firstConfig[key])];
      }
      return [
        ...acc,
        createRow(key, secondConfig[key], '+'),
        createRow(key, firstConfig[key], '-'),
      ];
    }, []);

  const totalDifferences = newKeys.reduce((acc, key) =>
    ([...acc, createRow(key, secondConfig[key], '+')]), differences);

  return `{${totalDifferences.join('')}\n}`;
};
