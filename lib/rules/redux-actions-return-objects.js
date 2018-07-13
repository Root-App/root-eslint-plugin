module.exports = {
  meta: {
    docs: {
      description: 'Prohibits returning anything but objects from Redux actions',
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {
          whiteList: {
            default: [],
            type: 'array',
          },
        },
      },
    ],
  },

  create(context) {
    return {
      'ReturnStatement'(node) {
        const filename = context.getFilename();
        const configuration = context.options[0] || {};
        const whitelist = configuration.whitelist || [];

        const inActions = filename.includes('state/actions/');
        if (!inActions) { return; }

        const returnsObject = node.argument && node.argument.type === 'ObjectExpression';
        if (returnsObject) { return; }

        const whitelisted = whitelist.some((w) => filename.includes(w));
        if (whitelisted) { return; }

        context.report(node, 'Actions must return objects.');
      },
    };
  },
};
