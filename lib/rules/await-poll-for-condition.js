module.exports = {
  meta: {
    docs: {
      description: 'ensures pollForCondition is prefixed w/ `await`.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      'ExpressionStatement > CallExpression[callee.name=pollForCondition]'(node) {
        context.report({
          node,
          message: 'pollForCondition must be prefixed w/ `await`',
          fix: (fixer) => {
            return fixer.insertTextBefore(node, 'await ');
          },
        });
      },
    };
  },
};
