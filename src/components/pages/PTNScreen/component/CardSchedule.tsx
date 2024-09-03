/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconCalendar from '@assets/svg/ic_calendar_blue.svg';
import IconUsers from '@assets/svg/ic16_users.svg';
import {_handlerConvertAllDate} from '@constants/functional';
import {CardTryoutSchedule} from './CardTryoutSchedule';
import {CardLiveClassSchedule} from './CardLiveClassSchedule';

type Props = {
  data: any;
  action: () => void;
};

const CardSchedule: FC<Props> = ({data, action}) => {
  const isTryout = data?.type === 'Try Out';
  const isLiveClass = data?.type === 'Live Class';
  const formatedDate = (string: string) => {
    const newArr = string.split(' - ');
    if (data?.type === 'Try Out') {
      return `${_handlerConvertAllDate(
        newArr?.[0],
        3,
        2,
        2,
      )} - ${_handlerConvertAllDate(newArr?.[1], 14, 2, 2)}`;
    } else {
      return `${_handlerConvertAllDate(
        newArr?.[0],
        3,
        2,
        2,
      )} • ${_handlerConvertAllDate(newArr?.[0], 8)} - ${_handlerConvertAllDate(
        newArr?.[1],
        8,
      )}`;
    }
  };

  if (isTryout) {
    return <CardTryoutSchedule data={data} action={action} />;
  }

  if (isLiveClass) {
    return <CardLiveClassSchedule data={data} action={action} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.type}>
          <Text style={styles.typeText}>{data?.type}</Text>
        </View>
      </View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', marginVertical: 8},
        ]}>
        <Text style={styles.title}>{data?.title}</Text>
        <TouchableOpacity style={styles.btn} onPress={action}>
          <Text style={styles.btnText}>
            {data?.status === 'Belum mendaftar' ? 'Daftar' : 'Gabung'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.greyText}>{data?.sub_title}</Text>
      <View style={styles.row}>
        <IconCalendar width={13} height={13} />
        <Text style={styles.descText}>
          {formatedDate(data?.note_group?.[0]?.description)}
        </Text>
      </View>
      <View style={styles.row}>
        <IconUsers width={13} height={13} />

        <Text style={styles.descText}>
          {data?.note_group?.[1]?.description}
        </Text>
      </View>
    </View>
  );
};
export {CardSchedule};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.neutral20,
  },
  row: {
    flexDirection: 'row',
  },
  type: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontFamily: Fonts.RegularPoppins,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  btn: {
    backgroundColor: Colors.primary.base,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  btnText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  greyText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  descText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  mentorName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  // title: {
  //   fontWeight: '600',
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: Fonts.SemiBoldPoppins,
  //   color: Colors.black,
  //   marginVertical: 5,
  // },
});
