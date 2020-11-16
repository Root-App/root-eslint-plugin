const rule = require('../../../lib/rules/enforce-type-styles');
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

const blacklist = [
  'fontSize',
  'fontWeight',
  'lineHeight',
];

const message = `Only an imported Theme can set ${blacklist.join(', ')} in StyleSheet.create()`;

ruleTester.run('enforce-type-styles', rule, {
  valid: [
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          ...Theme.heading1(),
          color: Colors.nearBlack(),
        },
        subtext: {
          ...Theme.paragraph1(),
        }
      });
      `,
    },
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.1,
          color: Colors.nearBlack(),
        }
      });
      `,
      filename: 'brand/src/utils/theme.js'
    },
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.1,
          color: Colors.nearBlack(),
        }
      });
      `,
      filename: 'joinroot.com/src/utils/theme.js'
    },
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.1,
          color: Colors.nearBlack(),
        }
      });
      `,
      filename: 'joinroot-cms/src/utils/theme.js'
    },
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontWeight: 400,
          lineHeight: 1.1,
          color: Colors.nearBlack(),
        }
      });
      `,
      options: [
        {
          blacklist: [
            'fontSize',
          ]
        }
      ]
    },
  ],
  invalid: [
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.1,
          color: Colors.nearBlack(),
        }
      });
      `,
      errors: [{ message }],
    },
    {
      code: `
      const styles = StyleSheet.create({
        heading: {
          fontWeight: 400,
          color: Colors.nearBlack(),
        }
      });
      `,
      options: [
        {
          blacklist: [
            'fontWeight',
          ]
        }
      ],
      errors: [{
        message: 'Only an imported Theme can set fontWeight in StyleSheet.create()'
      }],
    }
  ]
})
