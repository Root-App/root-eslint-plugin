const rule = require('../../../lib/rules/valid-test-filenames');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('valid-test-filenames', rule, {
  valid: [
    {
      code: 'function Component() { return null; }',
      filename: 'src/components/some-component.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'function itDoesAThing() { return true; }',
      filename: 'src/models/some-model.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'describe("Component", function() {});',
      filename: 'test/components/some-component-test.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'it("does a thing", function() {});',
      filename: 'test/models/some-model-test.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'itSlowly("does a thing", function() {});',
      filename: 'test/models/some-model-test.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'context("when doing a thing", function() {});',
      filename: 'test/models/some-model-test.js',
      options: [{ testSuffix: '-test.js' }],
    },
    {
      code: 'describe("Component", function() {});',
      filename: 'test/components/some-component-spec.js',
      options: [{ testSuffix: '-spec.js' }],
    },
    {
      code: 'it("does a thing", function() {});',
      filename: 'test/models/some-model-spec.js',
      options: [{ testSuffix: '-spec.js' }],
    },
    {
      code: 'itSlowly("does a thing", function() {});',
      filename: 'test/models/some-model-spec.js',
      options: [{ testSuffix: '-spec.js' }],
    },
    {
      code: 'context("when doing a thing", function() {});',
      filename: 'test/models/some-model-spec.js',
      options: [{ testSuffix: '-spec.js' }],
    },
  ],
  invalid: [
    {
      code: 'describe("Component", function() {});',
      filename: 'test/components/some-component.js',
      options: [{ testSuffix: '-test.js' }],
      errors: [{ message: 'Test filenames must end with -test.js' }]
    },
    {
      code: 'describe("Component", function() { context ("when foo", function() { it("bars", function() {}) }) });',
      filename: 'test/components/some-component.js',
      options: [{ testSuffix: '-test.js' }],
      errors: [{ message: 'Test filenames must end with -test.js' }]
    },
    {
      code: 'it("does a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-test.js' }],
      errors: [{ message: 'Test filenames must end with -test.js' }]
    },
    {
      code: 'itSlowly("does a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-test.js' }],
      errors: [{ message: 'Test filenames must end with -test.js' }]
    },
    {
      code: 'context("when doing a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-test.js' }],
      errors: [{ message: 'Test filenames must end with -test.js' }]
    },
    {
      code: 'describe("Component", function() {});',
      filename: 'test/components/some-component.js',
      options: [{ testSuffix: '-spec.js' }],
      errors: [{ message: 'Test filenames must end with -spec.js' }]
    },
    {
      code: 'describe("Component", function() { context ("when foo", function() { it("bars", function() {}) }) });',
      filename: 'test/components/some-component.js',
      options: [{ testSuffix: '-spec.js' }],
      errors: [{ message: 'Test filenames must end with -spec.js' }]
    },
    {
      code: 'it("does a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-spec.js' }],
      errors: [{ message: 'Test filenames must end with -spec.js' }]
    },
    {
      code: 'itSlowly("does a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-spec.js' }],
      errors: [{ message: 'Test filenames must end with -spec.js' }]
    },
    {
      code: 'context("when doing a thing", function() {});',
      filename: 'test/models/some-model.js',
      options: [{ testSuffix: '-spec.js' }],
      errors: [{ message: 'Test filenames must end with -spec.js' }]
    },
  ],
});
