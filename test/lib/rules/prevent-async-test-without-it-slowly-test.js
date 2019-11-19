const rule = require('../../../lib/rules/prevent-async-test-without-it-slowly');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });

ruleTester.run('prevent-async-test-without-it-slowly', rule, {
  valid: [
    {
      code: `itSlowly("test description", async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    }
  ],
  invalid: [
    {
      code: `it("test description", async () => {
               await wait(() => {});
             });`,
      filename: 'tests/some-test.js',
      errors: [{ message: 'Use itSlowly when testing asynchronous code' }],
      options: [{ functionNames: ['wait'] }],
    },
  ],
});
