const rule = require('../../../lib/rules/lodash-import-format');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });

ruleTester.run('lodash-import-format', rule, {
  valid: [
    {
      code: "import get from 'lodash/get';",
      filename: 'tests/some-test.js',
      options: [{ functionNames: ['wait'] }],
    }
  ],
  invalid: [
    {
      code: "import { get } from 'lodash';",
      filename: 'tests/some-test.js',
      errors: [{ message: "Use the explicit import of lodash: `import get from 'lodash/get';" }],
      options: [{ functionNames: ['wait'] }],
    },
  ],
});
