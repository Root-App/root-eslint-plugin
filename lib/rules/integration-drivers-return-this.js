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
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement[argument.type!=ThisExpression]': (node) => {
        context.report(node, "IntegrationDriver actions may not return anything but 'this'.");
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor] BlockStatement.body > ReturnStatement': (node) => {
        info.hasReturn = true;
      },
      'ClassDeclaration[superClass.name=IntegrationDriver] MethodDefinition[key.name!=isLoaded][key.name!=constructor]:exit': (node) => {
        if (!info.hasReturn) {
          context.report(node, "IntegrationDriver actions must return 'this'.");
        }
      },
    };
  },
};
