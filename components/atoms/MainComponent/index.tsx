import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import Fonts from '@constants/fonts';
import {removeAttrFromObject} from '@constants/functional';

export interface MainViewProps extends ViewStyle {
  p?: number;
  m?: number;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const MainView: React.FC<MainViewProps> = MVProps => {
  const children = MVProps?.children;
  const props: MainTextProps = removeAttrFromObject(MVProps, ['children']);

  const dynamicStyle: ViewStyle = {
    padding: props?.p,
    margin: props?.m,
    ...props,
  };

  return <View style={[dynamicStyle, props?.style]}>{children}</View>;
};

interface MainTextProps extends TextStyle {
  p?: number;
  m?: number;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  type?: FontType;
}

type FontType = 'SemiBold' | 'Regular' | 'Bold' | undefined;

const MainText: React.FC<MainTextProps> = MTProps => {
  const children = MTProps?.children;
  const type: FontType = MTProps?.type;
  const customStyle = MTProps?.style;
  const props: MainTextProps = removeAttrFromObject(MTProps, [
    'type',
    'children',
    'style',
  ]);

  const dynamicStyle: TextStyle = {
    padding: props?.p,
    margin: props?.m,
    fontFamily:
      props?.fontFamily ?? type === 'SemiBold'
        ? Fonts.SemiBoldPoppins
        : type === 'Bold'
        ? Fonts.BoldPoppins
        : Fonts.RegularPoppins,
    fontWeight: type === 'SemiBold' || type === 'Bold' ? '600' : '400',
    fontSize: props?.fontSize ?? 14,
    lineHeight: props?.lineHeight ?? 18,
    letterSpacing: props?.letterSpacing ?? 0.25,
    ...props,
  };

  return <Text style={[dynamicStyle, customStyle]}>{children}</Text>;
};

export {MainView, MainText};
