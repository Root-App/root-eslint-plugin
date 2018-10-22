module.exports = {
  meta: {
    docs: {
      description: 'Do not use relative file paths',
    },
    fixable: false,
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if(node.source.value.includes('../') || node.source.value.includes('./')) {
          context.report(node, 'Use absolute paths for file imports');
        }
      },
    };
  },
};
