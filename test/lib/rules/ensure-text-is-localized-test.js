const rule = require('../../../lib/rules/ensure-text-is-localized');
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

const message = 'Rendered strings should be localized, please make sure you are using the local-string utility'
const filename = 'src/component.js'
const testFilename = 'test/component.js'

ruleTester.run('ensure-text-is-localized', rule, {
  valid: [
    {
      code: `function render() {
               return (
                 <WrapperNode>
                   <RootText
                     style={styles.label}
                     testID={'header-text'}
                   >
                     {localizedText()}
                   </RootText>
                 </WrapperNode>
               )
             }`,
      filename,
    },
    {
      code: `function render() {
               return (
                 <RootText
                   style={styles.label}
                   testID={'header-text'}
                 >
                   {localizedText()}
                 </RootText>
               )
             }`,
      filename,
    },
    {
      code: `<RootText
              style={styles.label}
              testID={'header-text'}
            >
              {localizedText()}
            </RootText>`,
      filename,
    },
    {
      code: `<RootText>{localizedText()}</RootText>`,
      filename,
    },
    {
      code: `<RootText>{\`\${localizedText()}\`}</RootText>`,
      filename,
    },
    {
      code: `<RootText>{\`\ \`}</RootText>`,
      filename,
    },
    {
      code: `<RootText>Not a localized string</RootText>`,
      filename: testFilename,
    },
    {
      code: `<CoreText>{localizedText()}</CoreText>`,
      filename,
    },
    {
      code: `<Text>{localizedText()}</Text>`,
      filename,
    },
    {
      code: `<AbstractCoreText>{localizedText()}</AbstractCoreText>`,
      filename,
    },
  ],
  invalid: [
    {
      code: `function render() {
               return (
                 <WrapperNode>
                   <RootText
                     style={styles.label}
                     testID={'header-text'}
                   >
                     {'Not a localized string'}
                   </RootText>
                 </WrapperNode>
               )
             }`,
      filename,
      errors: [{ message }],
    },
    {
      code: `function render() {
               return (
                 <RootText
                   style={styles.label}
                   testID={'header-text'}
                 >
                   {'Not a localized string'}
                 </RootText>
               )
             }`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText
              style={styles.label}
              testID={'header-text'}
            >
              {'Not a localized string'}
            </RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText>{"Not a localized string"}</RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText>Not a localized string</RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText>Not a {localizedText()} localized string</RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText>{\`Not a localized string \${localizedText()}\`}</RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<RootText>{localizedText() + 'Not a localized string'}</RootText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<CoreText>Not a localized string</CoreText>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<Text>Not a localized string</Text>`,
      filename,
      errors: [{ message }],
    },
    {
      code: `<AbstractCoreText>Not a localized string</AbstractCoreText>`,
      filename,
      errors: [{ message }],
    },
  ],
});
