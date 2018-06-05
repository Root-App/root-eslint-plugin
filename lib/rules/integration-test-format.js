module.exports = {
  meta: {
    docs: {
      description: 'Inside the integration.begin block, all arbitrary code must be put in Driver actions.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: false,
    schema: [],
  },

  create(context) {
    return {
      'CallExpression[callee.object.name=integration][callee.property.name=begin] VariableDeclaration': (node) => {
        context.report(node, "Put arbitrary code inside a Driver action.");
      },
      'CallExpression[callee.object.name=integration][callee.property.name=begin] AssignmentExpression': (node) => {
        context.report(node, "Put arbitrary code inside a Driver action.");
      },
      'CallExpression[callee.object.name=integration][callee.property.name=begin] CallExpression[callee.name=expect]': (node) => {
        context.report(node, "Put expectations inside a Driver action that starts with 'read'.");
      },
    };
  },
};
