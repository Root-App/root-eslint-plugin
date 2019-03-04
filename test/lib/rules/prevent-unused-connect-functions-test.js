const rule = require('../../../lib/rules/prevent-unused-connect-functions');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });

ruleTester.run('prevent-unused-connect-functions', rule, {
  valid: [
    {
      code: `export default connect(
              (state) => ({}),
              (dispatch) => ({}),
              null,
              {
                withRef: true,
              }
            )`,
      filename: 'components/some-component.js',
    }
  ],
  invalid: [
    {
      code: `export default connect(
              () => ({}),
              () => ({}),
              null,
              {
                withRef: true,
              }
            )`,
      filename: 'components/some-component.js',
      errors: [{ message: 'Unwrap components from connect when connect is not used' }]
    },
    {
      code: `export default connect(
              null,
              () => ({}),
              null,
              {
                withRef: true,
              }
            )`,
      filename: 'components/some-component.js',
      errors: [{ message: 'Unwrap components from connect when connect is not used' }]
    },
    {
      code: `export default connect(
              () => ({}),
              null,
              null,
              {
                withRef: true,
              }
            )`,
      filename: 'components/some-component.js',
      errors: [{ message: 'Unwrap components from connect when connect is not used' }]
    },
  ],
});
