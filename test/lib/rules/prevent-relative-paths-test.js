const rule = require('../../../lib/rules/prevent-relative-paths');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
const parserOptions = { 
  sourceType: 'module',
  ecmaVersion: 2015
}
const error = {
	message: 'Use absolute paths for file imports',
	type: 'ImportDeclaration',
}

ruleTester.run('prevent-relative-paths', rule, {
  valid: [
    {
      code: `
        import Something from 'modules/someFile';
      `,
      filename: 'components/some-component.js',
      parserOptions: parserOptions,
    },
    {
      code: `
        import { something } from 'modules/someFile';
      `,
      filename: 'components/some-component.js',
      parserOptions: parserOptions,
    }
  ],
  invalid: [
    {
      code: `
        import Something from '../someFile';
      `,
      filename: 'components/some-component.js',
      parserOptions: parserOptions,
      errors: [error]
    },
    {
      code: `
        import Something from './someFile';
      `,
      filename: 'components/some-component.js',
      parserOptions: parserOptions,
      errors: [error]
    },
  ],
});
