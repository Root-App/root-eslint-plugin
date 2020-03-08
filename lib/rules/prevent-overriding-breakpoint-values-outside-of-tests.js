module.exports = {
  meta: {
    docs: {
      description: 'Prevent overriding BreakpointValues outside of tests',
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (filename.includes("/test/")) return {};

    var importedBreakpoints = []

    return {
      ImportDeclaration(node) {
        if (!node.source.value.includes('core-components/src/utils/breakpoints')) return {}

        const breakpointSpecifiers = node.specifiers.find((specifier) => (specifier.local && specifier.local.name === 'BreakpointValues'))
        if (breakpointSpecifiers) {
          importedBreakpoints.push(breakpointSpecifiers.imported.name)
        }
      },
      VariableDeclarator(node) {
        if (node.init && importedBreakpoints.includes(node.init.name)) {
          importedBreakpoints.push(node.id.name);
        }
      },
      AssignmentExpression(node) {
        if (!node.left.object || !importedBreakpoints.includes(node.left.object.name)) return {};

        context.report({
          node,
          message: 'Do not manipulate BreakpointValues outside of tests',
        });
      }
    };
  }
};
