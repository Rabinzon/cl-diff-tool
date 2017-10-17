import program from 'commander';
import process from 'process';
import { json } from './diff';
import configReader from './configReader';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstPath, secondPath) => {
    const firstConfig = configReader(firstPath);
    const secondConfig = configReader(secondPath);

    if (!firstConfig || !secondConfig) {
      program.help();
    }
    console.log(json(firstConfig, secondConfig));
  })
  .parse(process.argv);

