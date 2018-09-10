module.exports = {
  meta: {
    docs: {
      description: 'Do not use window.location',
    },
    fixable: false,
  },

  create(context) {
    return {
      'MemberExpression[object.name=window][property.name=location]'(node) {
        context.report(node, 'Use props.location instead by wrapping component with a router');
      },
    };
  },
};
