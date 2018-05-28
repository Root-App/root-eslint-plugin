module.exports = {
  meta: {
    docs: {
      description: 'During test you should import the default wrapped component',
    },
    fixable: false,
  },

  create(context) {
    return {
      'ImportDeclaration'(node) {
        const inScenes = node.source.value.includes('scenes/');
        const doesNotContainDefault = !node.specifiers.find((s) => s.type === 'ImportDefaultSpecifier');
        const isTestFile = context.getFilename().includes('-test.js');
        if (inScenes && doesNotContainDefault && isTestFile) { context.report(node, 'Only named imports from the scenes folder are not permitted, wrap connected components in <Provider> - https://goo.gl/QWsLse'); }
      },
    };
  },
};
