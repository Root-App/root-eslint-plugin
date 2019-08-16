module.exports = {
  meta: {
    docs: {
      description: 'do not allow 404 as expected response for network requests',
    },
    fixable: false,
  },
  create(context) {
    return {
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedResponse"] > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedResponse"] > ArrayExpression > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedErrorResponses"] > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedErrorResponses"] > ArrayExpression > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedErrors"] > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'AwaitExpression CallExpression ObjectExpression Property[key.name="expectedErrors"] > ArrayExpression > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'NewExpression[callee.name="NetworkRequestConfiguration"] ObjectExpression Property[key.name="successCodes"] > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'NewExpression[callee.name="NetworkRequestConfiguration"] ObjectExpression Property[key.name="errorCodes"] > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'NewExpression[callee.name="NetworkRequestConfiguration"] ObjectExpression Property[key.name="successCodes"] ArrayExpression > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
      'NewExpression[callee.name="NetworkRequestConfiguration"] ObjectExpression Property[key.name="errorCodes"] ArrayExpression > Literal[value=404]': (node) => {
        context.report(node, "Use 204 instead of 404 status code to indicate no content");
      },
    };
  },
};
