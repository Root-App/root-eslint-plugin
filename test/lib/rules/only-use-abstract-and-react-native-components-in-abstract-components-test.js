const rule = require('../../../lib/rules/only-use-abstract-and-react-native-components-in-abstract-components');
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

const message = 'Render only abstract or react-native components inside of a abstract component'
const coreComponentImportMessage = 'Abstract components should not rely on core components'
const filename = '/core-components/src/abstract/abstract-button.js'
const nonAbstractFilename = 'src/component.js'

ruleTester.run('only-use-abstract-and-react-native-components-in-abstract-components', rule, {
  valid: [
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <AbstractCoreText
                textProps={textProps}
              >
                {title}
              </AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from './abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <AbstractCoreText
                textProps={textProps}
              >
                {title}
              </AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { Animated, View, ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <Animated.AbstractCoreText
                textProps={textProps}
              >
                {title}
              </Animated.AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { Animated, ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <Animated.View
              textProps={textProps}
            >
              {title}
            </Animated.View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        const DynamicComponent = expression ? SomeComponent : SomeOtherComponent;

        return (
          <DynamicComponent>
            <AbstractTouchableOpacity>
              <View style={style}>
                {leftIcon}
                <AbstractCoreText
                  textProps={textProps}
                >
                {title}
                </AbstractCoreText>
              </View>
              {leftAligned && rightIcon}
            </AbstractTouchableOpacity>
          </DynamicComponent>
        );
      });`,
      filename,
      errors: [{ message }],
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';
      import { CoreText } from '@root/core-components/src/components/core-text';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <AbstractCoreText
                textProps={textProps}
              >
              {title}
              <CoreText>
              {subject}
              </CoreText>
              </AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename: nonAbstractFilename,
      errors: [{ message }],
    },
  ],
  invalid: [
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';
      import { CoreText } from 'core-text';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <AbstractCoreText
                textProps={textProps}
              >
              {title}
              <CoreText>
              {subject}
              </CoreText>
              </AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
      errors: [{ message }],
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { View, ViewPropTypes } from 'react-native';
      import { CoreText } from '@root/core-components/src/components/core-text';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        const DynamicComponent = CoreText;

        return (
          <AbstractTouchableOpacity>
            <View style={style}>
              {leftIcon}
              <AbstractCoreText
                textProps={textProps}
              >
              {title}
              <DynamicComponent>
              {subject}
              </DynamicComponent>
              </AbstractCoreText>
            </View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
      errors: [{ coreComponentImportMessage }],
    },
    {
      code: `
      import { AbstractCoreText } from '@root/core-components/src/abstract/abstract-core-text';
      import { AbstractTouchableOpacity } from '@root/core-components/src/abstract/abstract-touchable-opacity';
      import { Animated } from 'somewhere-not-react-native';
      import { ViewPropTypes } from 'react-native';

      export const AbstractButton = forwardRef(({
        someProps
      }, ref,) => {

        return (
          <AbstractTouchableOpacity>
            <Animated.View
              textProps={textProps}
            >
              {title}
            </Animated.View>
            {leftAligned && rightIcon}
          </AbstractTouchableOpacity>
        );
      });`,
      filename,
      errors: [{ coreComponentImportMessage }],
    },
  ],
});
