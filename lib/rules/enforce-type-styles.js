module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'Make sure only Theme is setting typography styles in stylesheets',
      category: 'Design Style',
    },
    fixable: false,

    schema: [
      {
        "type": "object",
        "properties": {
          "blacklist": {
            "type": "array"
          }
        },
        "additionalProperties": false
      }
    ]
  },
  create(context) {
    let optsBlacklist;
    const [opts] = context.options;
    if(opts && opts.blacklist){
      optsBlacklist = opts.blacklist;
    }
    const blacklist = optsBlacklist || [
      'fontSize',
      'fontWeight',
      'lineHeight',
    ];

    const hasInvalidStyleProps = (obj) => {
      return obj.properties.some(prop =>
        prop && prop.value && (
          (prop.value.type === 'Literal' && blacklist.includes(prop.key.name))
          || (prop.value.type === 'ObjectExpression' && hasInvalidStyleProps(prop.value))
        )
      )
    };

    return {
      CallExpression(node) {
        const {object, property} = node.callee;
        const filename = context.getFilename();

        if(object.name !== 'StyleSheet'
          || property.name !== 'create'
          || filename.search(/(brand|joinroot\.com|joinroot-cms)\/(.*)?theme/) !== -1) return;

        const [stylesheet] = node.arguments;

        if(hasInvalidStyleProps(stylesheet)){
          context.report({
            node,
            message: `Only an imported Theme can set ${blacklist.join(', ')} in StyleSheet.create()`
          })
        }
      }
    };
  }
}
