/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
import {usePTNReportScreen} from '../utils';

const DataTable: FC<{datas: any[]; historyData?: any; point?: any}> = ({
  datas,
  historyData,
  point,
}) => {
  const {navigation} = usePTNReportScreen();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi passing grade Universitas</Text>

      <View style={{marginTop: 12}}>
        <View style={styles.tableRow}>
          <Text style={styles.tableTitleHeader}>Nama</Text>
          <Text style={[styles.tableTitleHeader, styles.textAlignCenter]}>
            Jurusan
          </Text>
          <Text style={[styles.tableTitleHeader, styles.textAlignCenter]}>
            Passing Grade
          </Text>
          <Text style={[styles.tableTitleHeader, styles.textAlignCenter]}>
            Nilai Kamu
          </Text>
        </View>

        {datas.length !== 0 ? (
          datas?.map((value, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableTitleBody}>{value?.university}</Text>
              <Text style={[styles.tableTitleBody, styles.textAlignCenter]}>
                {value?.major}
              </Text>
              <Text
                style={[
                  styles.tableTitleBody,
                  styles.textAlignCenter,
                  styles.semibold,
                ]}>
                {value?.passing_grade}
              </Text>
              <Text
                style={[
                  styles.tableTitleBody,
                  styles.textAlignCenter,
                  styles.semibold,
                ]}>
                {value?.point}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={[styles.tableTitleBody, {paddingLeft: 12}]}>-</Text>
            <Text style={[styles.tableTitleBody, styles.textAlignCenter]}>
              -
            </Text>
            <Text
              style={[
                styles.tableTitleBody,
                styles.textAlignCenter,
                styles.semibold,
              ]}>
              -
            </Text>
            <Text
              style={[
                styles.tableTitleBody,
                styles.textAlignCenter,
                styles.semibold,
              ]}>
              {point ?? 0}
            </Text>
          </View>
        )}
      </View>

      {historyData?.register_id !== 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('TryOutDetailHistoryScreen', {
              id: historyData?.id,
              dataHistory: historyData,
            });
          }}>
          <Text style={styles.buttonText}>Detail Try Out</Text>
          <IconRight />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 1,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral40,
    gap: 8,
    paddingBottom: 8,
  },
  tableTitleHeader: {
    flex: 1,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    textAlignVertical: 'center',
  },
  tableTitleBody: {
    flex: 1,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 32,
    borderRadius: 20,
    marginTop: 12,
    backgroundColor: Colors.primary.light3,
  },
  buttonText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  semibold: {
    fontWeight: '600',
  },
});

export default DataTable;
