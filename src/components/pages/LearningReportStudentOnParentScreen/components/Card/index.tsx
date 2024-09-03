import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  label: string;
  subLabel: string;
  img: any;
};

const Card = ({label, subLabel, img}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>{img}</View>
      <View>
        <Text style={styles.boldText}>{label}</Text>
        <Text style={{fontFamily: Fonts.RegularPoppins}}>{subLabel}</Text>
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
  },
  boldText: {
    fontFamily: Fonts.SemiBoldPoppins,
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
export {Card};
