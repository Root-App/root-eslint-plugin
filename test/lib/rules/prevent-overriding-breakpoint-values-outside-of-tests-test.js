const rule = require('../../../lib/rules/prevent-overriding-breakpoint-values-outside-of-tests');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

const message = 'Do not manipulate BreakpointValues outside of tests';
const filename = '/anywhere-not-in-a-test-directory.js'
const testFilename = '/test/somewhere-in-a-test-directory.js'

ruleTester.run('prevent-overriding-breakpoint-values-outside-of-tests', rule, {
  valid: [
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/breakpoints';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: BreakpointValues.isSmall ? 10 : 20,
  },
});
`,
      filename,
    },
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/another-location';
BreakpointValues.isSmall = false;
`,
      filename,
    },
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/breakpoints';
BreakpointValues.isSmall = false;
`,
      filename: testFilename,
    },
  ],
  invalid: [
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/breakpoints';
BreakpointValues.isSmall = false;
`,
      errors: [{ message }],
      filename,
    },
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/breakpoints';
BreakpointValues.isAnything = false;
`,
      errors: [{ message }],
      filename,
    },
    {
      code: `
import { obfuscatedValue as BreakpointValues } from '@root/core-components/src/utils/breakpoints';
obfuscatedValue.isSmall = false;
`,
      errors: [{ message }],
      filename,
    },
    {
      code: `
import { BreakpointValues } from '@root/core-components/src/utils/breakpoints';
const obfuscatedValue = BreakpointValues;
obfuscatedValue.isSmall = false;
`,
      errors: [{ message }],
      filename,
    },
  ],
});
