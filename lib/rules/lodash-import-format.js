module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash get',
    },
    fixable: 'code',
    type: 'problem',
  },

  create(context) {
    return {
      'ImportDeclaration': (node) => {
        const hasImplicitLodashImport = note.source.value.startsWith("import { get } from 'lodash'");

        if(hasImplicitLodashImport) {
          context.report({
            node,
            Message: "Use the explicit import of lodash: `import get from 'lodash/get';`",
            fix: (fixer) => fixer.replaceText(node.callee, "import get from 'lodash/get'"),
          });
        }
      },
    };
  },
};
