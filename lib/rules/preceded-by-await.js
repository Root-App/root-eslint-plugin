module.exports = {
  meta: {
    docs: {
      description: 'ensures desired async functions are preceded by `await`.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          functionNames: {
            default: [],
            type: 'array',
          },
        },
      },
    ],
  },
  create(context) {
    const configuration = context.options[0] || {};
    const affectedFunctionNames = configuration.functionNames || [];

    return {
      CallExpression(node) {
        const functionName = node.callee.name;
        if (!affectedFunctionNames.includes(functionName)) { return; }
        if (node.parent.type === 'AwaitExpression') { return; }

        context.report({
          node,
          message: `${functionName} must be prefixed w/ 'await'`,
          fix: (fixer) => fixer.insertTextBefore(node, 'await '),
        });
      }
    };
  }
};
