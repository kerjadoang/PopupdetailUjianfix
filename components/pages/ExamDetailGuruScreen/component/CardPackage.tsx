/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  data: any;
};

const CardPackage: FC<Props> = ({data}) => {
  return (
    <View style={styles.cardPackage}>
      <Text style={styles.titleDetail}>{data?.name}</Text>
      <View
        style={[styles.headerDetail, {paddingVertical: 0, flexWrap: 'wrap'}]}>
        <View>
          <Text style={[styles.titleData, {lineHeight: 16}]}>
            Pilihan Ganda
          </Text>
          <Text>{data?.multiple_choice_count ?? 0} Soal</Text>
        </View>
        <View>
          <Text style={[styles.titleData, {lineHeight: 16}]}>Uraian</Text>
          <Text>{data?.essay_count ?? 0} Soal</Text>
        </View>
      </View>
    </View>
  );
};

export {CardPackage};

const styles = StyleSheet.create({
  cardPackage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  titleDetail: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.black,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  headerDetail: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleData: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.RegularPoppins,
  },
});
