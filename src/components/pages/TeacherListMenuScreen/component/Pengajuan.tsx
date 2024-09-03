import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import IconKehadiran from '@assets/svg/ic24_kehadiran.svg';
import Arrow from '@assets/svg/ic_arrow_grey_right.svg';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

type Props = {
  action: () => void;
};

const Pengajuan = ({action}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View>
        <IconKehadiran />
        <Text style={styles.title}>Pengajuan Ketidakhadiran Guru</Text>
        <Text style={styles.subTitle}>
          Lihat pengajuan guru yang izin atau sakit
        </Text>
      </View>
      <Arrow />
    </TouchableOpacity>
  );
};
export {Pengajuan};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.black,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
});
