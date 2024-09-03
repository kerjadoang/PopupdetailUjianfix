import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InfoIcon from '@assets/svg/ic_information.svg';
import Fonts from '@constants/fonts';

const Info = () => {
  const title = 'Silakan ke menu Input Nilai Murid untuk mengubah e-Rapor';
  return (
    <View style={styles.container}>
      <InfoIcon width={20} height={20} />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};
export {Info};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: Colors.primary.light4,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    fontFamily: Fonts.RegularPoppins,
    marginLeft: 10,
  },
});
