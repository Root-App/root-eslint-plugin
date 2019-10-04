module.exports = {
  meta: {
    docs: {
      description: 'Test filenames must be correct or they will not run on CI.',
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {
          testSuffix: {
            type: 'string',
          },
        },
      },
    ],
  },

  create(context) {
    let alreadyReported = false;

    const error = (context) => (node) => {
      const testSuffix = context.options[0].testSuffix;

      if (alreadyReported || context.getFilename().endsWith(testSuffix)) {
        return;
      }

      alreadyReported = true;

      context.report({
        node,
        message: `Test filenames must end with ${testSuffix}`,
      });
    };

    return {
      'CallExpression[callee.name="context"]': error(context),
      'CallExpression[callee.name="describe"]': error(context),
      'CallExpression[callee.name="it"]': error(context),
      'CallExpression[callee.name="itSlowly"]': error(context),
    };
  },
};
