module.exports = {
  meta: {
    docs: {
      description: 'Only import IntegrationDriver in integration tests',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: false,
    schema: [],
  },

  create(context) {
    return {
      'ImportDeclaration': (node) => {
        const filename = context.getFilename();

        const isIntegrationTest = filename.includes("test/integration");
        const isIntegrationDriver = filename.includes("test/support/drivers/integration");
        const isIntegrationHelper = filename.includes("test/support/integration-helper");

        const isIntegrationDriverImport = node.source.value.startsWith('test/support/drivers/integration');

        if (isIntegrationDriverImport && !(isIntegrationTest || isIntegrationDriver || isIntegrationHelper)) {
          context.report(node, "Do not use IntegrationDriver outside of integration tests.");
        }
      },
    };
  },
};
