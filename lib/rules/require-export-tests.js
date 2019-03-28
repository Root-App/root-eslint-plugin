const fs = require('fs');
const glob = require('glob');

module.exports = {
  meta: {
    docs: {
      description: 'Make sure there is an associated factory test in test/support/factories-test.js',
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {
          fileTestMappings: {
            default: [],
            type: 'array',
            items: {
              type: 'object',
              properties: {
                exportTestPath: {
                  type: 'string',
                },
                exportPath: {
                  type: 'string',
                },
              },
            },
          }
        },
      },
    ]
  },

  create(context) {
    const configuration = context.options[0] || {};

    return {
      ExportNamedDeclaration(node) {
        const declaration = node.declaration;
        if (!declaration) return;
        if (declaration.type !== 'FunctionDeclaration') return;

        const functionIdentifier = declaration.id;
        if (!functionIdentifier) return;
        if (!functionIdentifier.name) return;

        const exportedFunctionName = functionIdentifier.name;
        const filename = context.getFilename();

        configuration.fileTestMappings.forEach((testMapping) => {
          if (!filename.includes(testMapping.exportPath)) { return; }

          let exportFound = false;
          for (let testPath of glob.sync(testMapping.exportTestPath)) {
            var factoriesTestFile = fs.readFileSync(testPath);

            if (factoriesTestFile.toString().indexOf(exportedFunctionName) !== -1) {
              exportFound = true;
              break;
            }
          }
          if (!exportFound) {
            context.report(node, `Create a test for ${exportedFunctionName} in ${testMapping.exportTestPath}.`);
          }
        });

      },
    };
  },
};
