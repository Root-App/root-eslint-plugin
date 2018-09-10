const rule = require('../../../lib/rules/prevent-use-of-window-location');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('prevent-window-location-assignment', rule, {
  valid: [
    {
      code: 'function someAction() { return; }',
      filename: 'components/some-component.js',

    }
  ],
  invalid: [
    {
      code: `function someAction() {
        var window = {};
        window.location = "test";
        return;
      }`,
      filename: 'components/some-component.js',
      errors: [{ message: 'Use props.location instead by wrapping component with a router.' }]
    },
  ],
});
