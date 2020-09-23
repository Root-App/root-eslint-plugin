module.exports = {
  meta: {
    docs: {
      description: 'Use beforeEachSlowly when testing asynchronous code',
    },
    fixable: 'code',
  },

  create(context) {
    return {
      'CallExpression[callee.name=beforeEach][arguments]'(node) {
          if (node && node.arguments && node.arguments.length === 1) {
            const testFunction = node.arguments[0];

          if (testFunction.async) {
            context.report({
              node,
              message: "Use beforeEachSlowly when testing asynchronous code",
              fix: (fixer) => fixer.replaceText(node.callee, 'beforeEachSlowly'),
            });
          }
        }
      },
    };
  },
};