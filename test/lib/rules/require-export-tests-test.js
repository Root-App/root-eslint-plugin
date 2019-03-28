const rule = require('../../../lib/rules/require-export-tests');
const path = require('path');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

const parserOptions = { sourceType: 'module' }
ruleTester.run('require-export-tests', rule, {
  valid: [
    {
      code: 'export function newPolicyContext(overrides, options) { return {}; }',
      filename: 'components/some-component.js',
      options: [{
        fileTestMappings: [
          { exportTestPath: path.resolve(__dirname, '../../../test/data/require-export-tests/require-export-test-1-valid.js'), exportPath: 'test/support/factories/index.js' }
        ],
      }],
      parserOptions: parserOptions
    },
    {
      code: 'export const FETCHED = { isFetched: true, };',
      filename: 'test/support/factories/index.js',
      options: [{
        fileTestMappings: [
          { exportTestPath: path.resolve(__dirname, '../../../test/data/require-export-tests/require-export-test-1-valid.js'), exportPath: 'test/support/factories/index.js' }
        ],
      }],
      parserOptions: parserOptions
    },
    {
      code: 'export function newFactory(overrides, options) { return {}; }',
      filename: 'test/support/factories/index.js',
      options: [{
          fileTestMappings: [
            { exportTestPath: path.resolve(__dirname, '../../../test/data/require-export-tests/*.js'), exportPath: 'test/support/factories/index.js' }
          ],
      }],
      parserOptions: parserOptions
    },
  ],
  invalid: [
    {
      code: 'export function newPolicyContext(overrides, options) { return {}; }',
      filename: 'test/support/factories/index.js',
      errors: [{ message: `Create a test for newPolicyContext in ${path.resolve(__dirname, '../../../test/data/require-export-tests/require-export-test-1-invalid.js')}.` }],
      options: [{
          fileTestMappings: [
            { exportTestPath: path.resolve(__dirname, '../../../test/data/require-export-tests/require-export-test-1-invalid.js'), exportPath: 'test/support/factories/index.js' }
          ],
      }],
      parserOptions: parserOptions
    },
    {
      code: 'export function newFactory(overrides, options) { return {}; }',
      filename: 'test/support/factories/index.js',
      errors: [{ message: `Create a test for newFactory in ${path.resolve(__dirname, '../../../test/data/require-export-tests/*-invalid.js')}.` }],
      options: [{
          fileTestMappings: [
            { exportTestPath: path.resolve(__dirname, '../../../test/data/require-export-tests/*-invalid.js'), exportPath: 'test/support/factories/index.js' }
          ],
      }],
      parserOptions: parserOptions
    },
    {
      code: 'export function unknown(overrides, options) { return {}; }',
      filename: 'test/support/unknown.js',
      errors: [{ message: `Create a test for unknown in ${path.resolve(__dirname, '../../../test/unknown/*-test.js')}.` }],
      options: [{
          fileTestMappings: [
            { exportTestPath: path.resolve(__dirname, '../../../test/unknown/*-test.js'), exportPath: 'test/support/unknown.js' }
          ],
      }],
      parserOptions: parserOptions
    },
  ],
});
