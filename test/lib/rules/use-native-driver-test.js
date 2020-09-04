const rule = require('../../../lib/rules/use-native-driver');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('use-native-driver', rule, {
  valid: [
    {
      code: 'Animated.event([], { useNativeDriver: false });',
      filename: 'src/components/some-component.js',
    },
    {
      code: 'Animated.event([], { useNativeDriver: true });',
      filename: 'src/components/some-component.js',
    },
    {
      code: 'Animated.timing([], { useNativeDriver: true });',
      filename: 'src/components/some-component.js',
    },
    {
      code: 'Animated.spring([], { useNativeDriver: true });',
      filename: 'src/components/some-component.js',
    },
    {
      code: 'Animated.decay([], { useNativeDriver: true });',
      filename: 'src/components/some-component.js',
    },
  ],
  invalid: [
    {
      code: 'Animated.event([], {});',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.event requires useNativeDriver to be passed in an object as the second argument'}],
    },
    {
      code: 'Animated.event([], { foo: \'bar\' });',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.event requires useNativeDriver to be passed in an object as the second argument'}],
    },
    {
      code: 'Animated.event([]);',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.event requires useNativeDriver to be passed in an object as the second argument'}],
    },
    {
      code: 'Animated.timing([], {});',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.timing requires useNativeDriver to be passed in an object as the second argument'}],
    },
    {
      code: 'Animated.spring([], { foo: \'bar\' });',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.spring requires useNativeDriver to be passed in an object as the second argument'}],
    },
    {
      code: 'Animated.decay([]);',
      filename: 'test/components/some-component.js',
      errors: [{message: 'Animated.decay requires useNativeDriver to be passed in an object as the second argument'}],
    },
  ],
});
