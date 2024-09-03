/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  label: string;
  img: any;
  value: any;
};

const CardLMS = ({label, value, img}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
        <View style={styles.imgContainer}>{img}</View>
        <View style={{flexDirection: 'row', gap: 6}}>
          <Text style={styles.boldText}>{value}</Text>
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
  },
  text: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 16,
    color: Colors.black,
  },
  thinText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  imgContainer: {},
});
export {CardLMS};
