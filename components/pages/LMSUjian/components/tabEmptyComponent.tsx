import Colors from '@constants/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaskotEmpty from '@assets/svg/robot_empty_state.svg';
import MaskotSedih from '@assets/svg/robot_sedih.svg';
import Fonts from '@constants/fonts';
import {Button} from '@components/atoms';

interface Iprops {
  title?: string;
  subTitle?: string;
  withFilter?: boolean;
  actionFilter?: any;
}
const TabEmptyComponent = (props: Iprops) => {
  if (props?.withFilter) {
    return (
      <View style={styles.container}>
        <MaskotSedih style={styles.icon} />
        <Text style={styles.title}>{'Hasil Filter Tidak Ditemukan'}</Text>
        <View style={styles.containerButton}>
          <Button
            label="Tampilkan Semua Hasil"
            action={props?.actionFilter}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MaskotEmpty style={styles.icon} />
      <Text style={styles.title}>
        {props?.title ?? 'Belum Ada Ujian Mendatang'}
      </Text>
      <Text style={styles.subTitle}>
        {props?.subTitle ??
          'Ujian yang dijadwalkan guru \n akan tampil di sini.'}
      </Text>
    </View>
  );
};

export default TabEmptyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.dark.neutral100,
    paddingTop: 12,
  },
  subTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.dark.neutral60,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  containerButton: {
    width: '100%',
    marginTop: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
