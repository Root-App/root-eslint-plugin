module.exports = {
  meta: {
    docs: {
      description: 'ensures IntegrationDriver actions always return `this` or `null`',
    },
    schema: [],
  },
  create(context) {
    let info = {};

    return {
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor]': (node) => {
        info.hasReturn = false;
        info.isPrivate = (node.key.name[0] == "_");
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement[argument.type!=ThisExpression][argument.raw!=null]': (node) => {
        if (!info.isPrivate) {
          context.report(node, "Do not return anything except 'this' (chainable) or 'null' (terminal).");
        }
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement': (node) => {
        info.hasReturn = true;
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor]:exit': (node) => {
        if (!info.hasReturn && !info.isPrivate) {
          context.report(node, "Chainable actions must return 'this'. Terminal actions must return 'null'.");
        }
      },
    };
  },
};
