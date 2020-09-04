module.exports = {
  meta: {
    docs: {
      description: 'useNativeDriver is now required for Animate.* functions',
    },
    fixable: false,
  },

  create(context) {
    return {
      'CallExpression[callee.object.name=Animated][callee.property.name=/event|timing|spring|decay/][arguments]'(node) {
        if (node && node.arguments) {
          const animationArgs = node.arguments[1];

          const containsNativeDriver = animationArgs && animationArgs.properties && animationArgs.properties.length > 0 && animationArgs.properties.find((property) => {
            return property.key.name === 'useNativeDriver';
          });

          if (!containsNativeDriver) {
            context.report(node, `Animated.${node.callee.property.name} requires useNativeDriver to be passed in an object as the second argument`);
          }
        }
      },
    };
  },
};
