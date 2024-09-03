import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RightIcon from '@assets/svg/ic16_chevron_down_blue.svg';

export type CapsuleButtonFilterProps = {
  id?: number;
  title?: string;
  onPress?: TouchableOpacityProps['onPress'];
  isSelected?: boolean;
  disabled?: boolean;
  value?: any;
  disabledWithoutColor?: boolean;
};

const CapsuleButtonFilter: React.FC<CapsuleButtonFilterProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props?.disabled || props?.disabledWithoutColor}
      style={[
        styles.cardContent,
        {
          backgroundColor: props.disabled
            ? Colors.dark.neutral40
            : props.isSelected
            ? Colors.primary.base
            : Colors.primary.light3,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: props.disabled
              ? Colors.dark.neutral60
              : props.isSelected
              ? Colors.white
              : Colors.primary.base,
          },
        ]}>
        {props.value ? props.value : props.title ? props.title : ''}
      </Text>
      {!props.disabled && (
        <RightIcon
          style={styles.rightIcon}
          color={props.isSelected ? Colors.white : Colors.primary.base}
        />
      )}
    </TouchableOpacity>
  );
};

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

export default CapsuleButtonFilter;
