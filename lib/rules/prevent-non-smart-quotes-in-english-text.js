module.exports = {
  meta: {
    docs: {
      description: 'Use smart quotes, in customer facing english copy',
    },
    fixable: 'code',
  },
  create(context) {
    const filename = context.getFilename();
    if (!filename.includes("/strings/en_US/")) return {};
	
    function fixQuotes(originalText) {
      var correctedText = originalText.replace(/(?<=\S)\\'(?=\S)|(?<=\S)\\'(?=\s)/g, '’');
      correctedText = correctedText.replace(/(?<=\S)'(?=\S)|(?<=\S)'(?=\s)/g, '’');

      correctedText = correctedText.replace(/(?<=\s)\\'(?=\S)/g, '‘');
      correctedText = correctedText.replace(/(?<=\s)'(?=\S)/g, '‘');

      correctedText = correctedText.replace(/(?<=\S)\\"(?=\s)/g, '”');
      correctedText = correctedText.replace(/(?<=\S)"(?=\s)/g, '”');

      correctedText = correctedText.replace(/(?<=\s)\\"(?=\S)/g, '“');
      correctedText = correctedText.replace(/(?<=\s)"(?=\S)/g, '“');
      
      
      return correctedText;
    }

    return {
      Literal(node) {
        if (!node.value.includes("'") && !node.value.includes('"')) return {}
        
        context.report({
          node,
          message: 'English customer facing copy should only contain smart quotes',
          fix: (fixer) => {
            return [
              fixer.replaceText(node, fixQuotes(node.raw)),
            ];
          },
        });
      }
    };
  }
};
