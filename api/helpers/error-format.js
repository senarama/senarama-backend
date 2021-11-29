const StackUtils = require('stack-utils');

const excludeArray = [
  /.*?\/node_modules.*?\.js/,
  /.*?<anonym.*?>/,
];

const stack = new StackUtils({
  cwd: process.cwd(),
  internals: StackUtils.nodeInternals().concat(excludeArray),
});

const logError = (error = new Error()) => {
  const stackList = stack.clean(error.stack).split('\n')
    .filter((i) => !!i)
    .map((i, p) => (p === 0 ? i : `\n    ${i}`))
    .toString()
    .replace(/,/g, '');

  // console.log(errorObj);
  const errorString = `
  Error at: ${stackList.split('\n').at(0)}
  Name: ${error.name}
  Message: ${error.message}
  Stack:
    ${stackList}
  `;

  console.log(errorString);
};

module.exports = logError;
