import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RightIcon from '@assets/svg/ic16_chevron_down_blue.svg';
type Props = {
  stylesContainer?: any;
  title?: string;
  backgroundColor?: string;
  onPress?: any;
  isSelected?: boolean;
  value?: any;
};
const ButtonFilter = ({title, onPress, isSelected, value}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cardContent,
        {
          backgroundColor: isSelected
            ? Colors.primary.base
            : Colors.primary.light3,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {color: isSelected ? Colors.white : Colors.primary.base},
        ]}>
        {value ? value : title ? title : ''}
      </Text>
      <RightIcon
        style={styles.rightIcon}
        color={isSelected ? Colors.white : Colors.primary.base}
      />
    </TouchableOpacity>
  );
};

export {ButtonFilter};
const styles = StyleSheet.create({
  cardContent: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    paddingRight: 8,
  },
  rightIcon: {},
});
