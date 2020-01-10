module.exports = {
  meta: {
    docs: {
      description: 'Use explicit import of lodash for a single import',
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // don't care if not lodash
        if (node.source.value === 'lodash') {
          // if using more than 5 modules, importing the library is fine
          if(node.specifiers.length <= 5) {
            // if fixing, we'll add to this string
            fixerString = "";
            // if { _ } is used, we're not fixing, and short circuting to the context report
            wildcardImport = false;
            // Looping through the five modules
            for (var i = 0; i < 5; i++){
              // null check plus wildcard short circuit
              if(node.specifiers[i] && !wildcardImport) {
                // check for '_' in either the local or imported name
                wildcardImport = _checkForWildcard(node.specifiers[i]);
                // short curcuit
                if(!wildcardImport){
                  // starting with the second, add a newline
                  if(i>0){fixerString += "\n";}
                  // preferenece is to use the local name for the alias
                  if(node.specifiers[i].local) { aliasName = node.specifiers[i].local.name; }
                  else{ aliasName = node.specifiers[i].imported.name; }
                  // preference is to use the imported name for the module
                  if(node.specifiers[i].imported) { moduleName = node.specifiers[i].imported.name; }
                  else { moduleName = node.specifiers[i].local.name; }
                  fixerString += "import " + aliasName + " from 'lodash/" + moduleName + "';";
                }
              }
            }
            if(!wildcardImport) {
              context.report({
                node,
                message: "Use the explicit import of lodash: `import <name> from 'lodash/<name>';`",
                fix: function(fixer) { return fixer.replaceText(node, fixerString)}
              });
            }
            else{
              context.report({
                node,
                message: "Import specific modules from lodash; do not use \"import { _ } from 'lodash'\"",
              });
            }
          }
        }
      },
    };
  },
};

_checkForWildcard = function(specifier) {
  if(specifier.imported && specifier.imported.name && specifier.imported.name == "_"){
    return true;
  }
  if(specifier.local && specifier.local.name && specifier.local.name == "_"){
    return true;
  }
  return false;
};
