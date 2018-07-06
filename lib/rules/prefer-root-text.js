module.exports = {
  meta: {
    docs: {
      description: 'ensures <RootText> is used instead of <Text>.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    var sourceCode = context.getSourceCode();
    return {
      "JSXOpeningElement": (node) => {
        if (node.name.name === 'Text') {
          context.report({
            node,
            message: node.name.name + 'use RootText instead of Text',
            fix: (fixer) => {
              return fixer.replaceText(node, sourceCode.getText(node).replace('<Text', '<RootText'));
            },
          });
        }
        return;
      },
      "JSXClosingElement": (node) => {
        if (node.name.name === 'Text') {
          context.report({
            node,
            message: node.name.name + 'use RootText instead of Text',
            fix: (fixer) => {
              return fixer.replaceText(node, sourceCode.getText(node).replace('/Text>', '/RootText>'));
            },
          });
        }
        return;
      },
    }
  },
};
