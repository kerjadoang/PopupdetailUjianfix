import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RightIcon from '@assets/svg/ic16_chevron_down_blue.svg';

type Props = {
  title: string;
  onPress: () => void;
  isDataExists: boolean;
};

const ButtonFilter: FC<Props> = ({title, onPress, isDataExists}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.containerTabContentItemButton,
        isDataExists && {backgroundColor: Colors.primary.base},
      ]}>
      <Text
        style={[
          styles.containerTabContentItemButtonTitle,
          isDataExists && {color: Colors.white},
        ]}>
        {title}
      </Text>

      <RightIcon color={isDataExists ? Colors.white : Colors.primary.base} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerTabContentItemButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  containerTabContentItemButtonTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    paddingRight: 8,
  },
});

export default ButtonFilter;
