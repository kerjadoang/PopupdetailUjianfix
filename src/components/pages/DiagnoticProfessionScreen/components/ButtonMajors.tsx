import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

interface Iprops {
  label: string;
  action: any;
  selected?: boolean;
}
const ButtonMajors = (props: Iprops) => {
  return (
    <TouchableOpacity
      onPress={props?.action}
      style={[styles.container, props?.selected && styles.containerActive]}>
      <Text style={[styles.label, props?.selected && styles.labelActive]}>
        {props?.label}
      </Text>
    </TouchableOpacity>
  );
};

export {ButtonMajors};
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  container: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    marginRight: 8,
  },
  labelActive: {
    color: Colors.white,
  },
  containerActive: {
    backgroundColor: Colors.primary.base,
  },
});
