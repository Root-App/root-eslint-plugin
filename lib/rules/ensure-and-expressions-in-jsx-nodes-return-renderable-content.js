module.exports = {
  meta: {
    docs: {
      description: "Ensure && logical expressions in JSX nodes return renderable content"
    },
    fixable: false
  },
  create(context) {
    function isLogicalExpression(node) {
      return node.type == "LogicalExpression";
    }

    function isAnAndExpression(node) {
      return isLogicalExpression(node) && node.operator == "&&";
    }

    function isAnOrExpression(node) {
      return isLogicalExpression(node) && node.operator == "||";
    }

    function verifyAndExpression(node, parent) {
      var validLeft = false;
      var validRight = false;

      if (isLogicalExpression(node.left)) {
        validLeft = verifyExpression(node.left, node);
      } else {
        validLeft = node.left.type == "UnaryExpression" && node.left.operator == "!";
      }

      if (isLogicalExpression(node.right)) {
        validRight = verifyExpression(node.right, node);
      } else {
        validRight = node.right.type == "JSXElement" || node.right.type == "CallExpression" || node.right.type == "ConditionalExpression" || (node.right.type == "UnaryExpression" && parent && isAnAndExpression(parent));
      }

      return validLeft && validRight;
    }

    function verifyOrExpression(node, parent) {
      var validLeft = false;
      var validRight = false;

      if (isLogicalExpression(node.left)) {
        validLeft = verifyExpression(node.left, node);
      } else {
        validLeft = true;
      }

      if (isLogicalExpression(node.right)) {
        validRight = verifyExpression(node.right, node);
      } else {
        validRight = true;
      }

      return validLeft && validRight;
    }

    function verifyExpression(node, parent) {
      if (isAnAndExpression(node)) {
        return verifyAndExpression(node, parent);
      } else if (isAnOrExpression(node)) {
        return verifyOrExpression(node, parent);
      } else {
        console.log("Error!!");
      }
    }

    function isRenderedNonStringNode(node) {
      if (!node.parent) {
        return true;
      }

      if (node.parent.type == "JSXElement" && node.parent.openingElement.name.name == "CoreText") {
        return false;
      }

      if (node.parent.type == "JSXAttribute") {
        return false;
      }

      return true;
    }

    return {
      JSXExpressionContainer(node) {
        if (isRenderedNonStringNode(node)) {
          if (isLogicalExpression(node.expression) && !verifyExpression(node.expression, node)) {
            context.report({
              node,
              message: "The left operand of an && expression in a JSX node must be coerced into a boolean using ! or !!"
            });
          }
        }
      }
    };
  }
};
