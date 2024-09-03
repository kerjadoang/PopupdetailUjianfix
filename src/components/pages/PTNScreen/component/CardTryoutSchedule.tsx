/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconCalendar from '@assets/svg/ic_calendar_blue.svg';
import IconUsers from '@assets/svg/ic16_users.svg';
import {
  _handlerConvertAllDate,
  convertDate,
  isStringContains,
} from '@constants/functional';
import {MainText, MainView} from '@components/atoms';

type Props = {
  data: any;
  action: () => void;
};

const CardTryoutSchedule = ({data, action}: Props) => {
  const isExpired = convertDate().isAfter(convertDate(data?.time_finish));
  const isRegistered = isStringContains(data?.status, 'sudah mendaftar');
  const isIncoming = convertDate().isBefore(convertDate(data?.time_start));

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

  const renderTOStatus = () => {
    if (isRegistered) {
      return (
        <View
          style={[
            styles.type,
            {backgroundColor: Colors.success.light2, marginLeft: 8},
          ]}>
          <Text
            style={[
              styles.typeText,
              {color: Colors.success.base, textTransform: 'capitalize'},
            ]}>
            {data?.status}
          </Text>
        </View>
      );
    }

    if (isIncoming) {
      return (
        <View style={[styles.type, styles.incomingContainer]}>
          <Text style={[styles.type, styles.incomingText]}>Akan datang</Text>
        </View>
      );
    }

    return (
      <MainView flexDirection="row">
        <View
          style={[
            styles.type,
            {
              backgroundColor: Colors.dark.neutral10,
              marginHorizontal: 8,
              flexDirection: 'row',
            },
          ]}>
          <Text
            style={[
              styles.typeText,
              {
                color: Colors.dark.neutral80,
                textTransform: 'capitalize',
                backgroundColor: 'transparent',
              },
            ]}>
            {data?.status}
          </Text>
        </View>

        {isExpired ? (
          <MainText style={[styles.textSubTitleRed]}>Sudah Ditutup</MainText>
        ) : null}
      </MainView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.type}>
          <Text style={styles.typeText}>{data?.type}</Text>
        </View>
        {renderTOStatus()}
      </View>

      <View style={[styles.row, styles.rowTitle]}>
        <Text style={styles.title}>{data?.sub_title}</Text>

        {!isIncoming ? (
          <Pressable
            style={[styles.btn, (isExpired || isIncoming) && styles.btnDisable]}
            onPress={() => {
              if (isExpired || isIncoming) {
                return;
              }
              action?.();
            }}>
            <Text
              style={[
                styles.btnText,
                (isExpired || isIncoming) && styles.textGray,
              ]}>
              {!isRegistered ? 'Daftar' : 'Ikuti'}
            </Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.greyText}>{data?.note_group?.[0]?.label}</Text>
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
export {CardTryoutSchedule};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.neutral20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  rowTitle: {
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
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
    marginLeft: 6,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  mentorName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  btnDisable: {
    backgroundColor: Colors.dark.neutral40,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  textSubTitleRed: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.danger.base,
    backgroundColor: Colors.danger.light2,
    marginRight: 2,
    fontSize: 12,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  textGray: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral60,
  },
  textSubTitleBlue: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    backgroundColor: Colors.primary.light3,
    marginRight: 2,
    fontSize: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  incomingContainer: {backgroundColor: 'transparent', marginLeft: 8},
  incomingText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    backgroundColor: Colors.primary.light3,
    marginRight: 2,
    fontSize: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
