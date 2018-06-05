module.exports = {
  meta: {
    docs: {
      description: 'ensures IntegrationDriver action always return `this`',
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
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement[argument.type!=ThisExpression]': (node) => {
        if (!info.isPrivate) {
          context.report(node, "Public IntegrationDriver actions may not return anything but 'this'.");
        }
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement': (node) => {
        info.hasReturn = true;
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor]:exit': (node) => {
        if (!info.hasReturn && !info.isPrivate) {
          context.report(node, "Public IntegrationDriver actions must return 'this'.");
        }
      },
    };
  },
};
