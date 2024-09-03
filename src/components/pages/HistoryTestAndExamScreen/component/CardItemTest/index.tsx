/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Pressable} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import ChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';

type Props = {
  date: string;
  title: string;
  desc: string;
  score: number;
  isArrowIcon?: boolean;
  action: () => void;
};

const CardItemTest = ({
  date,
  title,
  desc,
  score,
  isArrowIcon,
  action,
}: Props) => {
  return (
    <Pressable style={[styles.container]} onPress={action}>
      <Text style={styles.date}>{date}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
        }}>
        <View style={{flex: 8}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.date, {fontSize: 14}]}>{desc}</Text>
        </View>
        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text style={styles.nilai}>Nilai</Text>
          <Text
            style={[styles.nilai, {color: Colors.primary.base, fontSize: 18}]}>
            {score}
          </Text>
        </View>

        {isArrowIcon && <ChevronRight />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.black,
  },
  nilai: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    bottom: 10,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
  },
});

export default CardItemTest;
