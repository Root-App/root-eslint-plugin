module.exports = {
  'env': {
    'mocha': true,
  },
  'plugins': [
    'mocha',
  ],
  'rules': {
    'mocha/no-exclusive-tests': 'error',
  },
  'globals': {
    'ErrorUtils': false,
    '__DEV__': false,
    'expect': false,
    'xitSlowly': false,
  },
  'settings': {
    'mocha/additionalTestFunctions': [
      'itSlowly',
    ],
    'react': {
      'version': '16.3',
    },
  },
};
