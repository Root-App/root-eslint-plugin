const rule = require('../../../lib/rules/prevent-async-before-each-without-before-each-slowly');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });

ruleTester.run('prevent-async-before-each-without-before-each-slowly', rule, {
  valid: [
    {
      code: `beforeEachSlowly(async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `beforeEach(() => {
               wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `beforeEach(async () => {
               await wait(() => {});
             }, 100000);`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    }
  ],

  invalid: [
    {
      code: `beforeEach(async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      errors: [{ message: 'Use beforeEachSlowly when testing asynchronous code' }],
      options: [{ functionNames: ['wait'] }],
    },
  ],
});
