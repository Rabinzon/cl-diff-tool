#!/usr/bin/env node
import program from 'commander';
import process from 'process';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [json|plain]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    if (!firstConfig || !secondConfig) {
      program.help();
    }
    console.log(genDiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
