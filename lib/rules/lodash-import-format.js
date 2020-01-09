module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash get',
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const isLodash = node.source.value === 'lodash';
        const isSingleImport = node.specifiers.length === 1;
        isTypeGet = false;
        if(isSingleImport && node.specifiers[0]) {
          if(node.specifiers[0].local){
            isTypeGet = node.specifiers[0].local.name === 'get';
          }
        }
        if(isLodash && isSingleImport && isTypeGet) {
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
