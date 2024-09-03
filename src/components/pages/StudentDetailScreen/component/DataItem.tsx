import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  label: string;
  value: string;
};

const DataItem = ({label, value}: Props) => {
  return (
    <View style={styles.dataItem}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );
};

export {DataItem};

const styles = StyleSheet.create({
  dataItem: {
    marginTop: 8,
  },
  dataLabel: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  dataValue: {},
});
