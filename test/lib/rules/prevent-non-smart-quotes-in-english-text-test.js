const rule = require('../../../lib/rules/prevent-non-smart-quotes-in-english-text');
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

const message = 'English customer facing copy should only contain smart quotes';
const filename = '/modules/brand/context/strings/en_US/login.js';

ruleTester.run('prevent-non-smart-quotes-in-english-text', rule, {
  valid: [
    {
      code: `{ intro_text: 'It’s almost time to drive.' }`,
      filename,
    },
    {
      code: `{ intro_text: 'It’s ‘almost’ time to drive.' }`,
      filename,
    },
    {
      code: `
export const login = {  
  permissions: {
    default: {
      intro_text: 'It’s almost time to drive.',
    }
  }
}`,
      filename,
    },
    {
      code: `{ intro_text: 'It’s “almost” time to drive.' }`,
      filename,
    },
    {
      code: `{ intro_text: 5 }`,
      filename,
    },
  ],
  invalid: [
    {
      code: `{ intro_text: 'It\\'s almost time to drive.' }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: 'It’s almost time to drive.' }`
    },
    {
      code: `{ intro_text: "It's almost time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s almost time to drive." }`
    },
    {
      code: `{ intro_text: "Its' almost time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "Its’ almost time to drive." }`
    },
    {
      code: `{ intro_text: "It’s 'almost' time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s ‘almost’ time to drive." }`
    },
    {
      code: `{ intro_text: "It’s \'almost\' time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s ‘almost’ time to drive." }`
    },
    {
      code: `{ intro_text: "It’s 'almost' time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s ‘almost’ time to drive." }`
    },
    {
      code: `{ intro_text: 'It’s "almost" time to drive.' }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: 'It’s “almost” time to drive.' }`
    },
    {
      code: `{ intro_text: "It’s \\"almost\\" time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s “almost” time to drive." }`
    },
    {
      code: `{ intro_text: "It's\\n almost time to drive." }`,
      filename,
      errors: [{ message }],
      output: `{ intro_text: "It’s\\n almost time to drive." }`
    },
    {
      code: `{ intro_text: 'It"s almost time to drive.' }`,
      filename,
      errors: [{ message }],
    },
    {
      code: `
export const login = {  
  permissions: {
    default: {
      intro_text: "It's almost time to drive.",
    }
  }
}`,
      filename,
      errors: [{ message }],
      output: `
export const login = {  
  permissions: {
    default: {
      intro_text: "It’s almost time to drive.",
    }
  }
}`,
    },
  ],
});
