/* eslint-disable react-native/no-inline-styles */

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import GreenCircle from '@assets/svg/greenCircle.svg';
import RedCircle from '@assets/svg/redCircle.svg';

import WhiteAbsensi from '@assets/svg/whiteAbsensi.svg';
import {GreyArrow} from '@assets/images';

type Props = {
  year: string;
  attend: string;
  notAttend: string;
  onAttend?: () => void;
  onNotAttend?: () => void;
};
const PresensiContainer = ({
  year,
  attend,
  notAttend,
  onAttend,
  onNotAttend,
}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <WhiteAbsensi width={24} height={24} />
            <Text style={[styles.thickText, {fontSize: 14, marginTop: 2}]}>
              Presensi
            </Text>
          </View>
          <Text style={styles.thinText}>{year}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.item}>
            <Text style={styles.thinText}>Hadir</Text>
            <Pressable onPress={onAttend} style={styles.itemRow}>
              <GreenCircle width={15} height={15} style={{marginTop: 4}} />
              <Text style={styles.thickText}>{attend} Hari</Text>
              <Image source={GreyArrow} style={styles.arrow} />
            </Pressable>
          </View>
          <View style={styles.item}>
            <Text style={styles.thinText}>Tidak Hadir</Text>
            <Pressable onPress={onNotAttend} style={styles.itemRow}>
              <RedCircle width={15} height={15} style={{marginTop: 4}} />
              <Text style={styles.thickText}>{notAttend} Hari</Text>
              <Image source={GreyArrow} style={styles.arrow} />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  thickText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.dark.neutral100,
    marginHorizontal: 8,
  },
  thinText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  item: {
    width: '50%',
    alignContent: 'flex-start',
  },
  arrow: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
    marginTop: 6,
  },
  itemRow: {flexDirection: 'row'},
});
export default PresensiContainer;
