module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash get',
    },
    //fixable: 'code',
    schema: [],
    //type: 'problem',
  },

  create(context) {
    return {
      ImportDeclaration(node) {

        if(node.source.value === 'lodash') {
          context.report({
            node,
            Message: "Use the explicit import of lodash: `import get from 'lodash/get';`",
            //fix: (fixer) => fixer.replaceText(node.callee, "import get from 'lodash/get'"),
          });
        }
      },
    };
  },
};
