module.exports = {
  meta: {
    docs: {
      description: 'Use itSlowly when testing asynchronous code',
    },
    fixable: 'code',
  },

  create(context) {
    return {
      'CallExpression[callee.name=it][arguments]'(node) {
          if (node && node.arguments && node.arguments.length >= 2) {
            const testFunction = node.arguments[1];

          if (testFunction.async) {
            context.report({
              node,
              message: "Use itSlowly when testing asynchronous code",
              fix: (fixer) => fixer.replaceText(node.callee, 'itSlowly'),
            });
          }
        }
      },
    };
  },
};