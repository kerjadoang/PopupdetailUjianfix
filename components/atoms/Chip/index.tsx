import {Pressable, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

type Props = {
  title?: string;
  onPress?: any;
  active?: boolean;
};

const Chip: FC<Props> = ({title, onPress, active}) => {
  return (
    <Pressable
      style={[
        styles.container,
        active
          ? {backgroundColor: Colors.primary.base}
          : {backgroundColor: Colors.primary.light3},
      ]}
      onPress={onPress}>
      <Text style={active ? styles.titleActive : styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.RegularPoppins,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '400',
    fontSize: 14,
    color: Colors.dark.neutral80,
    lineHeight: 18,
  },
  titleActive: {
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: Colors.white,
  },
  container: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
});
