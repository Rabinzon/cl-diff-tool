import union from 'lodash/fp/union';

const createRow = (value, sort) =>
  ({ value: `\n\t${value}`, sort });

export default (firstConfig, secondConfig) => {
  const combinedKeys = union(Object.keys(firstConfig), Object.keys(secondConfig));

  const differences = combinedKeys.map((key) => {
    if (!Object.hasOwnProperty.call(secondConfig, key)) {
      return createRow(`- ${key}: ${firstConfig[key]}`, 2);
    }
    if (!Object.hasOwnProperty.call(firstConfig, key)) {
      return createRow(`+ ${key}: ${secondConfig[key]}`, 3);
    }
    if (secondConfig[key] === firstConfig[key]) {
      return createRow(`  ${key}: ${secondConfig[key]}`, 0);
    }
    return createRow(`+ ${key}: ${secondConfig[key]}\n\t- ${key}: ${firstConfig[key]}`, 1);
  }).sort((a, b) => a.sort - b.sort).map(t => t.value);
  return `{${differences.join('')}\n}`;
};
