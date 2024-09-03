/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Maskot from '@assets/svg/maskot_11.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

const Empty = () => {
  return (
    <View style={styles.container}>
      <Maskot width={120} height={170} style={{alignSelf: 'center'}} />
      <Text style={styles.title}>Belum Ada Peserta</Text>
      <Text style={styles.desc}>
        Belum ada peserta yang bergabung karna kelas belum berlangsung
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  desc: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 16,
    color: Colors.dark.neutral60,
    textAlign: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
});

export {Empty};
