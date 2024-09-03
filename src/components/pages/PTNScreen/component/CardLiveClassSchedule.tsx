/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconCalendar from '@assets/svg/ic_calendar_blue.svg';
import IconBook from '@assets/svg/ic_book.svg';
import IconLive from '@assets/svg/ic_live.svg';
import {
  _handlerConvertAllDate,
  convertDate,
  isStringContains,
} from '@constants/functional';
import {Button, MainView} from '@components/atoms';
import Avatar from '@components/atoms/Avatar';
import {IncomingButton} from './IncomingButton';

type Props = {
  data: any;
  action: () => void;
  button?: boolean;
};

const CardLiveClassSchedule = ({data, action, button = true}: Props) => {
  const isIncoming = convertDate().isBefore(convertDate(data?.time_start));
  const isExpired = convertDate().isAfter(convertDate(data?.time_end));
  const isFinish = isStringContains(data?.status, 'finish');

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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.type}>
          <Text style={styles.typeText}>{data?.type_badge || data?.type}</Text>
        </View>
      </View>

      <>
        <View style={[styles.row, {marginTop: 14}]}>
          <Avatar id={data?.avatar} />
          <Text style={styles.mentorName}>{data?.creator.full_name}</Text>
        </View>

        <Text style={[styles.title, {marginTop: 12}]}>{data?.title}</Text>

        <MainView flexDirection="row" flex={1} alignItems="center">
          <MainView flex={3} flexDirection="row" alignItems="center">
            <MainView flex={isIncoming ? 2 : 1}>
              {/* Description */}
              <MainView flexDirection="row" alignItems="center">
                <IconBook width={13} height={13} />
                <Text style={[styles.descText]}>
                  {data?.note_group[0]?.description}
                </Text>
              </MainView>

              {/* Date LC */}
              <MainView flexDirection="row">
                <IconCalendar width={13} height={13} />
                <Text style={styles.descText}>
                  {formatedDate(data?.note_group?.[1].description)}
                </Text>
              </MainView>

              {!isIncoming && !isFinish ? (
                <View style={[styles.row, {marginVertical: 2}]}>
                  <IconLive width={13} height={13} />
                  <Text
                    style={[
                      styles.greyText,
                      {color: Colors.danger.base, marginLeft: 10},
                    ]}>
                    Sedang berlangsung
                  </Text>
                </View>
              ) : null}
            </MainView>

            {isIncoming ? (
              <MainView flex={1}>
                <IncomingButton data={data} />
              </MainView>
            ) : null}

            {isFinish && button ? (
              <MainView flex={0.6}>
                <Button label="Lihat Rekaman" outline action={action} />
              </MainView>
            ) : null}
          </MainView>

          {!isIncoming && !isExpired && !isFinish && button ? (
            <MainView flex={1} alignSelf="flex-start">
              <Pressable
                style={[styles.btn, {width: '100%', alignItems: 'center'}]}
                onPress={action}>
                <Text style={styles.btnText}>Gabung</Text>
              </Pressable>
            </MainView>
          ) : null}
        </MainView>
      </>
    </View>
  );
};
export {CardLiveClassSchedule};

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
});
