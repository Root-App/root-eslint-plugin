const rule = require('../../../lib/rules/preceded-by-await');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } });

ruleTester.run('preceded-by-await', rule, {
  valid: [
    {
      code: `describe("some test", async () => {
               await wait(() => {});
             });`,
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `describe("some test", async () => {
               await waitForElement(() => {});
             });`,
      options: [{ functionNames: ['wait', 'waitForElement'] }],
    },
    {
      code: `describe("some test", async () => {
               await pollForCondition(() => {});
             });`,
      options: [{ functionNames: ['pollForCondition'] }],
    },
  ],
  invalid: [
    {
      code: `describe("some test", async () => {
               wait(() => {});
             });`,
      errors: [{ message: "wait must be prefixed w/ 'await'" }],
      options: [{ functionNames: ['wait'] }],
    },
    {
      code: `describe("some test", async () => {
               waitForElement(() => {});
             });`,
      errors: [{ message: "waitForElement must be prefixed w/ 'await'" }],
      options: [{ functionNames: ['wait', 'waitForElement'] }],
    },
    {
      code: `describe("some test", async () => {
              pollForCondition(() => {});
            });`,
      errors: [{ message: "pollForCondition must be prefixed w/ 'await'" }],
      options: [{ functionNames: ['pollForCondition'] }],
    },
  ],
});
