module.exports = {
  meta: {
    docs: {
      description: 'Ensure text is localized',
    },
    fixable: false,
  },

  create(context) {
    const isTestFile = context.getFilename().includes('test/');

    function isNonSpaceStringLiteral(node) {
      return isTextNode(node)
        && isNonSpaceString(node.value);
    }

    function isContainerWithStringInLiteral(node) {
      return node.type === 'JSXExpressionContainer'
        && node.expression.type === 'Literal'
        && typeof node.expression.value === 'string';
    }

    function isContainerWithStringInTemplateLiteral(node) {
      return node.type === 'JSXExpressionContainer'
        && node.expression.type === 'TemplateLiteral'
        && node.expression.quasis.some((quasi) => { return isNonSpaceString(quasi.value.raw) });
    }

    function isContainerWithStringInBinaryExpression(node) {
      return node.type === 'JSXExpressionContainer'
        && node.expression.type === 'BinaryExpression'
        && [node.expression.left, node.expression.right].some((operandNode) => {
          return (operandNode.type === 'Literal' && isNonSpaceString(operandNode.value));
        });
    }

    function isNonSpaceString(value) {
      return typeof value === 'string' && !value.match(/^[\n\s]*$/);
    }

    function isTextNode(node) {
      return ['Literal', 'JSXText'].includes(node.type)
    }

    function isOpeningTextElement(node) {
      return ['RootText', 'CoreText', 'Text', 'AbstractCoreText'].includes(node.openingElement.name.name)
    }

    return {
      JSXElement(node) {
        if (!isTestFile
          && isOpeningTextElement(node)
          && (node.children.some(isNonSpaceStringLiteral)
            || node.children.some(isContainerWithStringInLiteral)
            || node.children.some(isContainerWithStringInTemplateLiteral)
            || node.children.some(isContainerWithStringInBinaryExpression)
          )) {
          context.report({
            node,
            message: 'Rendered strings should be localized, please make sure you are using the local-string utility'
          })
        }
      }
    }
  }
};
