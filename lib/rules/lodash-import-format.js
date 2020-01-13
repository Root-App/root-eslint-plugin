module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash for a single import',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          maxAllowableImports: {
            type: 'integer',
          },
        },
      },
    ],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const maxImports = context.options[0] ? context.options[0] : 5;
        if (node.source.value === 'lodash' && node.specifiers.length <= maxImports) {
          if (node.specifiers.some(_checkForWildcard)) {
            context.report({
              node,
              message: "Import specific modules from lodash; do not use \"import { _ } from 'lodash'\"",
            });
          } else {
            context.report({
              node,
              message: "Use the explicit import of lodash: `import <name> from 'lodash/<name>';`",
              fix: function(fixer) { return fixer.replaceText(node, _createFullFixerString(node)); }
            });
          }
        }
      },
    };
  },
};

const _checkForWildcard = (specifier) => {
  const importedWilcard = (specifier.imported && specifier.imported.name && specifier.imported.name === "_");
  const localWildcard = (specifier.local && specifier.local.name && specifier.local.name === "_");
  return importedWilcard || localWildcard;
};

const _createFullFixerString = (node) => node.specifiers
  .map((specifier) => {
    const aliasName = specifier.local ? specifier.local.name : specifier.imported.name;
    const moduleName = specifier.imported ? specifier.imported.name : specifier.local.name;
    return `import ${aliasName} from 'lodash/${moduleName}';`;
  }).join("\n");
