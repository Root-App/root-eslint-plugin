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
          whitelist: {
            default: [],
            type: 'array',
          },
        },
      },
    ],
  },

  create(context) {
    let reported = false;

    const error = (context) => (node) => {
      const { testSuffix, whitelist } = context.options[0];
      const filename = context.getFilename();

      if (reported) { return; }
      if (whitelist.some((allowedFilename) => filename.endsWith(allowedFilename))) { return; }
      if (filename.endsWith(testSuffix)) { return; }

      reported = true;
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
