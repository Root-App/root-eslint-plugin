module.exports = {
  meta: {
    docs: {
      description: 'Components should only be wrapped in a connect function when state or dispatch is being used',
    },
    fixable: false,
  },

  create(context) {
    function nullLiteral(node) {
        return node.type === 'Literal' && node.value === null;
    }

    function arrowFunctionWithUnusedParams(node) {
        return node.type === 'ArrowFunctionExpression' && node.params.length === 0;
    }

    return {
      'ExportDefaultDeclaration CallExpression[callee.name=connect][arguments]'(node) {
        if (node && node.arguments && node.arguments.length > 2) {
            const stateArgument = node.arguments[0];
            const dispatchArgument = node.arguments[1];
            
            if ((nullLiteral(stateArgument) || arrowFunctionWithUnusedParams(stateArgument)) && (nullLiteral(dispatchArgument) || arrowFunctionWithUnusedParams(dispatchArgument))) {
                context.report(node, 'Unwrap components from connect when connect is not used');
            }
        }
      },
    };
  },
};
