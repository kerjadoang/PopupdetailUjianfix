import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import Arrow from '@assets/svg/ic_arrow_right_blue.svg';

type Props = {
  type: string;
  reason: string;
  day: string;
  date: string;
  arrow: boolean;
  action?: () => void;
};
const CardAbsent = ({type, reason, action, day, date, arrow}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={[styles.title, {color: Colors.black}]}>
          {day} Hari :{' '}
          <Text
            style={[
              styles.title,
              {color: Colors.black, fontFamily: Fonts.RegularPoppins},
            ]}>
            {date}
          </Text>
        </Text>
        <Text style={[styles.title, {color: Colors.black}]}>{reason}</Text>
      </View>
      {arrow ? (
        <Pressable onPress={action} style={styles.icon}>
          <Arrow />
        </Pressable>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  icon: {
    justifyContent: 'center',
  },
});
export {CardAbsent};
