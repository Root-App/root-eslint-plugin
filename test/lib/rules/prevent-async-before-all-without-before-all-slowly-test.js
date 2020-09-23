const rule = require('../../../lib/rules/prevent-async-before-all-without-before-all-slowly');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });

ruleTester.run('prevent-async-before-all-without-before-all-slowly', rule, {
  valid: [
    {
      code: `beforeAllSlowly(async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `beforeAll(() => {
               wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `beforeAll(async () => {
               await wait(() => {});
             }, 100000);`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    }
  ],

  invalid: [
    {
      code: `beforeAll(async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      errors: [{ message: 'Use beforeAllSlowly when testing asynchronous code' }],
      options: [{ functionNames: ['wait'] }],
    },
  ],
});
