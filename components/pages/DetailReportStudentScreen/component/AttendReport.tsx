import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

const AttendReport = ({data}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Kehadiran</Text>
      <View style={styles.row}>
        <View>
          <Online width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Kelas Online</Text>
          <Text style={styles.attendDay}>{`${data?.online_class} Hari`}</Text>
        </View>
        <View>
          <Offline width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Tatap Muka</Text>
          <Text style={styles.attendDay}>{`${data?.offline_class} Hari`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    width: '100%',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  attendDay: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});

export {AttendReport};
