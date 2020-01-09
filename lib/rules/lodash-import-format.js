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
          context.report(
            node,
            "Use the explicit import of lodash: `import get from 'lodash/get';`"

          );
        }
      },
    };
  },
};
