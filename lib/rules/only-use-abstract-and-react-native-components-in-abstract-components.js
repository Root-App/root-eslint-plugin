module.exports = {
  meta: {
    docs: {
      description: 'Ensure only abstract and react-native components are used to build abstract components',
    },
    fixable: false,
  },

  create(context) {
    const isAbstractComponent = context.getFilename().includes('/core-components/src/abstract');
    const validElementSources = ['react-native'];
    const validElementSourceDirectories = ['/core-components/src/abstract'];
    const inValidElementSourceDirectories = ['/core-components/src/components'];

    var validElements = [];

    function isValidElementSource(path) {
      return (
        validElementSources.some(validSource => validSource === path) ||
        validElementSourceDirectories.some(validSourceDirectory => path.includes(validSourceDirectory)) ||
        path.startsWith('./')
      );
    }

    function isInValidElementSource(path) {
      return (inValidElementSourceDirectories.some(inValidSourceDirectory => path.includes(inValidSourceDirectory)));
    }

    function isValidElement(node) {
      return validElements.includes(node.openingElement.name.name) ||
        (node.openingElement.name.type === 'JSXMemberExpression' &&
          node.openingElement.name.object.name === 'Animated' &&
          validElements.includes(node.openingElement.name.property.name))
    }

    if (!isAbstractComponent) return {};

    return {
      ImportDeclaration(node) {
        if (isInValidElementSource(node.source.value)) {
          context.report({
            node,
            message: 'Abstract components should not rely on core components'
          });
        }

        if (isValidElementSource(node.source.value)) {
          validElements.push(...node.specifiers.map(specifier => specifier.imported.name));
        }
      },
      VariableDeclaration(node) {
        validElements.push(...node.declarations.map(declaration => declaration.id.name));
      },
      JSXElement(node) {
        if (!isValidElement(node)) {
          context.report({
            node,
            message: 'Render only abstract or react-native components inside of a abstract component'
          });
        }
      }
    };
  }
};