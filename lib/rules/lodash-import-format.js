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
          if(node.specifiers.length <= 5) {
            fixerString = "";
            if(node.specifiers[0]) {
              fixerString += "import " + node.specifiers[0].local.name + " from 'lodash/" + node.specifiers[0].local.name + "';";
            }
            var i;
            for (i = 1; i < 5; i++){
              if(node.specifiers[i]) {
                fixerString += "\nimport " + node.specifiers[i].local.name + " from 'lodash/" + node.specifiers[i].local.name + "';";
              }
            }
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
