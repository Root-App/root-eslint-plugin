module.exports = {
  meta: {
    docs: {
      description: 'The reducers index should be kept sorted.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: false,
    schema: [],
  },

  create(context) {
    let previous = null;

    return {
      'CallExpression[callee.name=combineReducers] ObjectExpression'() {
        previous = null;
      },
      'CallExpression[callee.name=combineReducers] ObjectExpression Property'(node) {
        if (previous && previous.key.name > node.key.name) {
          context.report(node, `${node.key.name} must appear before ${previous.key.name}`);
        }

        previous = node;
      },
    };
  },
};
