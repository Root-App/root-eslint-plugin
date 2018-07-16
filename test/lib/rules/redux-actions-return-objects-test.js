const rule = require('../../../lib/rules/redux-actions-return-objects');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('redux-actions-return-objects', rule, {
  valid: [
    {
      code: 'function someAction() { return function A(dispatch, getState) {} }',
      filename: 'components/some-component.js'
    },
    {
      code: 'function someAction() { return { type: "YES", success: true }; }',
      filename: 'state/actions/some-action.js',
    },
    {
      code: 'function someAction() { return function A(dispatch, getState) {} }',
      filename: 'state/actions/some-action.js',
      options: [{ whitelist: ['state/actions/some-action.js'] }]
    },
    {
      code: 'function someAction() { return function A(dispatch, getState) {} }',
      filename: 'some/path/state/actions/some-action.js',
      options: [{ whitelist: ['state/actions/some-action.js'] }]
    },
    {
      code: 'function someAction() { return function A(dispatch, getState) {} }',
      filename: 'some/path/state/actions/some-action.js',
      options: [{ whitelist: [''] }]
    },
  ],
  invalid: [
    {
      code: 'function someAction() { return "not_an_object"; }',
      filename: 'state/actions/some-action.js',
      errors: [{ message: 'Actions must return objects.' }]
    },
    {
      code: 'function someAction() { return; }',
      filename: 'state/actions/some-action.js',
      errors: [{ message: 'Actions must return objects.' }]
    },
    {
      code: 'function someAction() { return function A(dispatch, getState) {} }',
      filename: 'state/actions/some-action.js',
      options: [{ whitelist: ['state/actions/some-other-action.js'] }],
      errors: [{ message: 'Actions must return objects.' }],
    },
  ],
});
