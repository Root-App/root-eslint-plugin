const rule = require('../../../lib/rules/prefer-core-components-stylesheet');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run('prefer-core-components-stylesheet', rule, {
  valid: [
    {
      code: `import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`,
    },
  ],
  invalid: [
    {
      code: `
import { StyleSheet } from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import { StyleSheet, View } from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import { View } from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import { ListView, StyleSheet } from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import { ListView } from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import { ListView, StyleSheet, View } from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import { ListView, View } from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import {
  StyleSheet,
  ListView,
  View
} from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import {
  ListView,
  View
} from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import {
  ListView,
  StyleSheet,
  View
} from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import {
  ListView,
  View
} from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import {
  ListView,
  View,
  StyleSheet
} from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import {
  ListView,
  View
} from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
    {
      code: `
import {
  ListView,
  View,
  StyleSheet,
} from 'react-native';`,
      errors: [{ message: "Import StyleSheet from core-components instead of react-native" }],
      output: `
import {
  ListView,
  View,
} from 'react-native';
import { StyleSheet } from '@root/core-components/src/utils/stylesheet';`
    },
  ],
});
