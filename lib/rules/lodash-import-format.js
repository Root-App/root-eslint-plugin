module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash for a single import',
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'lodash') {
         isTypeGet = false;
          if(node.specifiers.length === 1 && node.specifiers[0]) {
            if(node.specifiers[0].local){
              moduleName = node.specifiers[0].local.name;
            }
            fixerString = "import " + moduleName + " from 'lodash/" + moduleName + "';";
            context.report({
              node,
              message: "Use the explicit import of lodash: `import <name> from 'lodash/<name>';`",
              fix: function(fixer) { return fixer.replaceText(node, fixerString)}
            });

          }
        }
      },
    };
  },
};
