const StackUtils = require('stack-utils');
const chalk = require('chalk');

const excludeArray = [
  // /.*?\/node_modules.*?\.js/,
  /.*?<anonym.*?>/,
];

const stack = new StackUtils({
  cwd: process.cwd(),
  internals: StackUtils.nodeInternals().concat(excludeArray),
});

const filterStacks = (stacks = []) => (
  stacks.filter((i) => i.search(/.*?de_modules.*?\./) === -1 && i)
);

const formatStacks = (stacks = []) => (
  stacks.map((i, p) => (p === 0 ? i : `\n\t\t ${i}`))
);

const getStacks = (errorStacks, extendedStacks = false) => {
  const stacks = stack.clean(errorStacks).split('\n');
  return (
    extendedStacks ? stacks : filterStacks(stacks)
  );
};

const stringStacks = (stacks = []) => stacks.toString().replace(/,/g, '');

const logError = (error = new Error(), extended = false) => {
  const stacks = getStacks(error.stack, extended);
  const errorString = `
  ${chalk.bold.red('-'.repeat(process.stdout.columns - 10))}
  ${chalk.bold.red('Error At')}:\t ${chalk.yellow(filterStacks(stacks)[0])}
  ${chalk.bold.red('Name')}:\t\t ${chalk.red(error.name)}
  ${chalk.bold.green('Message')}:\t ${error.message}

  ${chalk.bold.blue('Stack')}: ${
  chalk.bold.blue('-'.repeat(process.stdout.columns - 17))}
  \t\t ${chalk.blue(stringStacks(formatStacks(stacks)))}
  ${chalk.bold.red('-'.repeat(process.stdout.columns - 10))}
  `;

  console.log(errorString);
};

module.exports = logError;
