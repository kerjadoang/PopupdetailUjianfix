import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  type: string;
  desc?: string;
  day: string;
  date: string;
  index: number;
  lengthData: number;
};
const CardAbsent = (props: Props) => {
  const isLast = props?.index + 1 === props?.lengthData;
  return (
    <View
      style={[
        styles.container,
        {borderBottomWidth: isLast ? 0 : 1, marginBottom: isLast ? 600 : null},
      ]}>
      <View>
        <Text style={styles.title}>{props?.type}</Text>
        <Text
          style={[
            styles.title,
            {color: Colors.black, fontFamily: Fonts.RegularPoppins},
          ]}>
          {props?.date}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.dark.neutral20,
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 2,
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
