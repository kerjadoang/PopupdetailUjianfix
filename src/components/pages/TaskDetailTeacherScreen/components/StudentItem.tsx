import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {convertDate} from '@constants/functional';

interface Iprops {
  avatar?: string;
  name?: string;
  date?: string;
  status?: string;
  value?: number;
  onPress: any;
  type?: string;
  key: number;
  lengthData: number;
  correctionType?: string;
}
const StudentItem = (props: Iprops) => {
  return (
    <View
      style={[
        styles.studentContainer,
        {marginBottom: props?.key + 1 === props?.lengthData ? 55 : 0},
      ]}>
      <View style={{flexDirection: 'row'}}>
        {props?.avatar?.endsWith('svg') ? (
          <SvgUri uri={props?.avatar} height={36} width={36} />
        ) : (
          <Image
            style={styles.iconContainer}
            source={{
              uri: props?.avatar,
            }}
          />
        )}
        <View style={styles.center}>
          <Text style={styles.studentName}>{props?.name}</Text>
          {props?.status === 'finish' ? (
            <Text style={styles.studentDate}>
              {convertDate(props?.date)
                .locale('id')
                .format('dddd, D MMM YYYY HH:mm') ?? ''}
            </Text>
          ) : props?.status === 'not yet' ? (
            <Text style={styles.studentDate}>Tidak mengumpulkan</Text>
          ) : null}
        </View>
      </View>
      {props?.type !== 'not_yet' &&
      (props?.correctionType === 'finish' || props?.status === 'finish') ? (
        <TouchableOpacity
          style={[
            styles.chips,
            props?.status === 'not yet'
              ? styles.chipsDanger
              : styles.chipsSuccess,
          ]}>
          <Text
            style={[
              styles.chipsText,
              {
                color:
                  props?.status === 'not yet'
                    ? Colors.danger.base
                    : Colors.success.base,
              },
            ]}>
            {props?.value}
          </Text>
        </TouchableOpacity>
      ) : props?.type === 'not_yet' ? (
        <TouchableOpacity style={styles.chips} onPress={props?.onPress}>
          <Text style={styles.chipsText}>Ingatkan</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.chips} onPress={props?.onPress}>
          <Text style={styles.chipsText}>Periksa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {StudentItem};

const styles = StyleSheet.create({
  studentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 13,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.violet.light2,
  },
  center: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  studentName: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral100,
  },
  studentDate: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontWeight: '400',
    color: Colors.dark.neutral60,
  },
  chips: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsSuccess: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.success.light2,
  },
  chipsDanger: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.danger.light2,
  },
  chipsText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.primary.base,
  },
});
