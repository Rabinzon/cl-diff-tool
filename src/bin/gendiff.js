#!/usr/bin/env node
import program from 'commander';
import process from 'process';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    if (!firstConfig || !secondConfig) {
      program.help();
    }
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
