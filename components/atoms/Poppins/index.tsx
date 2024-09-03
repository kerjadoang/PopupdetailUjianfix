import Fonts from '@constants/fonts';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type IPoppinsText = {
  type?: keyof typeof Fonts;
} & TextProps;

const PoppinsText = ({type = 'RegularPoppins', ...props}: IPoppinsText) => {
  return (
    <Text {...props} style={[styles(type).defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
};

export {PoppinsText};

const styles = (type: keyof typeof Fonts) =>
  StyleSheet.create({
    defaultStyle: {
      fontFamily: Fonts[type],
      letterSpacing: 0.2,
    },
  });
