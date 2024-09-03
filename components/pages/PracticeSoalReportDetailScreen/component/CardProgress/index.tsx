/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '@constants/colors';
import ChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';

type Props = {
  title: string;
  action?: () => void;
  img?: any;
  taskdone: number;
  alltask: string;
  average?: number;
  isAverage?: boolean;
  isArrowIcon?: boolean;
};
const CardProgress = ({
  title,
  taskdone,
  alltask,
  action,
  img,
  average,
  isAverage,
  isArrowIcon,
}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={action}>
      <View>{img}</View>
      <View style={{flex: 1}}>
        <Text style={styles.cardTextTitle}>{title}</Text>

        <Text style={styles.cardTextSubTitle}>
          <Text style={{color: Colors.dark.neutral100}}>{taskdone}</Text>{' '}
          {alltask}
        </Text>
        {isAverage ? (
          <Text style={styles.cardTextSubTitle}>
            {`Rata-rata Nilai : ${average}`}
          </Text>
        ) : null}
      </View>
      {isArrowIcon && <ChevronRight />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  cardTextSubTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  textNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
});

export {CardProgress};
