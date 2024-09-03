/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

type Props = {
  num: number;
  name: string;
  score: number;
  isLow?: boolean;
};

const CardScore = ({num, name, score, isLow}: Props) => {
  return (
    <View style={styles.cardItem}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.numCard}>{num}</Text>
        <Text
          style={{
            color: Colors.dark.neutral100,
            fontFamily: Fonts.RegularPoppins,
          }}>
          {name}
        </Text>
      </View>
      <Text
        style={
          isLow ? [styles.textBtn, {color: Colors.danger.base}] : styles.textBtn
        }>
        {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.primary.base,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  numCard: {
    borderColor: Colors.dark.neutral40,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 28,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 18,
  },
});
export {CardScore};
