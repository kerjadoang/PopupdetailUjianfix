import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import IconMonitoring from '@assets/svg/ic24_monitoring.svg';
import Arrow from '@assets/svg/ic_arrow_right_blue.svg';

type Props = {
  action: () => void;
};
const Monitoring = ({action}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <IconMonitoring width={25} height={25} />
      <View>
        <Text style={styles.title}>Monitoring</Text>
        <Text>Pantau aktivitas Murid selama Ujian.</Text>
      </View>
      <Arrow />
    </TouchableOpacity>
  );
};
export {Monitoring};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  chapter: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
});
