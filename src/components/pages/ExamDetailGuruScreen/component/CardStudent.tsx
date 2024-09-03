/* eslint-disable react-native/no-inline-styles */
import Avatar from '@components/atoms/Avatar';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  name: string;
  date?: string | any | undefined;
  imgUrl: string;
  onCheck?: () => void;
  check?: boolean;
  isChecked?: boolean;
  point?: number;
};

const CardStudent = ({
  name,
  date,
  imgUrl,
  onCheck,
  check = false,
  isChecked = false,
  point,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar id={imgUrl} style={styles.ava} />
        <View
          style={{
            width: check || isChecked ? WINDOW_WIDTH - 215 : WINDOW_WIDTH - 120,
          }}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {check || isChecked ? <Text style={styles.date}>{date}</Text> : null}
        </View>
      </View>
      {check ? (
        <TouchableOpacity onPress={onCheck} style={styles.btn}>
          <Text style={styles.btnLabel}>Periksa</Text>
        </TouchableOpacity>
      ) : isChecked ? (
        <View style={styles.bgPoint}>
          <Text style={styles.point}>{point}</Text>
        </View>
      ) : null}
    </View>
  );
};
export {CardStudent};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  btnLabel: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  ava: {width: 48, height: 48, borderRadius: 48 / 2, marginRight: 12},
  name: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  date: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  bgPoint: {
    backgroundColor: Colors.success.light2,
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
  },
  point: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.success.base,
    textAlign: 'center',
  },
});
