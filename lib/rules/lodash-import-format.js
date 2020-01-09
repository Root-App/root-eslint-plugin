module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash get',
    },
    fixable: 'code',
    schema: [],
    //type: 'problem',
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const isLodash = node.source.value === 'lodash';
        const numberOfImports = node.specifiers.count();
        const isTypeGet = node.specifiers.local.name === 'get';
        if(isLodash && numberOfImports === 1 && isTypeGet) {
          context.report({
            node,
            message: "Use the explicit import of lodash: `import get from 'lodash/get';`",
            fix: function(fixer) { return fixer.replaceText(node, "import get from 'lodash/get';")}
          });
        }
      },
    };
  },
};
