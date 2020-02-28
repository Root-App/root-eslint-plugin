module.exports = {
  meta: {
    docs: {
      description: 'Use StyleSheet from core-components instead of react-native',
    },
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      ImportDeclaration(node) {
        if (node.source.value != 'react-native') return {}
        const styleSheetImport = node.specifiers.find((specifier) => (specifier.imported !== undefined && specifier.imported.name === 'StyleSheet'));
        if (!styleSheetImport) return {}

        if (sourceCode.getText(node).match(/^import\s\{\sStyleSheet\s\}\sfrom\s'react-native';$/)) {
          context.report({
            node,
            message: 'Import StyleSheet from core-components instead of react-native',
            fix: (fixer) => {
              return [
                fixer.replaceText(node, sourceCode.getText(node).replace(/^import\s\{\sStyleSheet\s\}\sfrom\s'react-native';$/, "import { StyleSheet } from '@root/core-components/src/utils/stylesheet';")),
              ];
            },
          });
        } else {
          context.report({
            node,
            message: 'Import StyleSheet from core-components instead of react-native',
            fix: (fixer) => {
              return [
                fixer.replaceText(node, sourceCode.getText(node).replace(/(,\s+StyleSheet)|(?<=\{\s+)(StyleSheet,\s+)/, '')),
                fixer.insertTextAfter(node, "\nimport { StyleSheet } from '@root/core-components/src/utils/stylesheet';"),
              ];
            },
          });
        }

      }
    };
  }
};
