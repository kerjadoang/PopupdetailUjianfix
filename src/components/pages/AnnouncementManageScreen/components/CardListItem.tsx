/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconMore from '@assets/svg/ic24_more_gray.svg';
import IconUsers from '@assets/svg/ic16_users.svg';
import IconCalendar from '@assets/svg/ic24_calendar.svg';
import RobotClose from '@assets/svg/Robot_close.svg';
import {DetailItem} from './';
import {Button, PopUp, SwipeUp} from '@components/atoms';
import {LIMIT_OFFSET, formatDate, useAnnouncementManageScreen} from '../utils';

type Props = {
  isFirstItem?: boolean;
  data: IAnnouncement;
  handleCallbackData: (data: IAnnouncement) => void;
  setPagination: (data: any) => void;
  isFrom: 'Dijadwalkan' | 'Aktif';
};

const CardListItem: FC<Props> = ({
  isFirstItem,
  data,
  handleCallbackData,
  setPagination,
  isFrom,
}) => {
  const {
    isShowDetail,
    setIsShowDetail,
    isShowSwipeUpItem,
    setIsShowSwipeUpItem,
    swipeUpListItem,
    isShowPopUpItemHapus,
    setIsShowPopUpItemHapus,
  } = useAnnouncementManageScreen();
  return (
    <>
      <View style={[styles.container, isFirstItem ? {marginTop: 16} : {}]}>
        <View style={styles.containerTitleIcon}>
          <Text style={[{flex: 1}, styles.textBold]}>{data?.title}</Text>

          <TouchableOpacity onPress={() => setIsShowSwipeUpItem(true)}>
            <IconMore />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 4}}>
          <View style={styles.containerRow}>
            <IconUsers style={{top: 1}} />

            <Text style={[{flex: 1}, styles.textRegular]}>
              {data?.announce_to}
            </Text>
          </View>

          <View style={[{marginTop: 4}, styles.containerRow]}>
            <IconCalendar style={{top: 1}} width={16} height={16} />

            <Text style={[{flex: 1}, styles.textRegular]}>
              {`${formatDate(data?.time_start)} - ${formatDate(
                data?.time_end,
              )}`}
            </Text>
          </View>
        </View>

        <Button
          label="Detail"
          outline={true}
          top={8}
          action={() => {
            setIsShowDetail(true);
          }}
        />
      </View>

      <DetailItem
        itemData={data}
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpItem}
        onClose={() => setIsShowSwipeUpItem(false)}
        height={500}
        children={
          <View style={{paddingHorizontal: 16, paddingTop: 16}}>
            {swipeUpListItem.map((value, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    value.onPress(data?.id, isFrom);
                    setPagination(LIMIT_OFFSET);
                  }}
                  style={styles.swipeUpButton}>
                  {value.icon}

                  <Text
                    style={[
                      styles.textRegular,
                      {
                        fontSize: 16,
                        lineHeight: 24,
                        letterSpacing: 1,
                        color: Colors.dark.neutral100,
                      },
                    ]}>
                    {value.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        }
      />

      <PopUp
        show={isShowPopUpItemHapus}
        Icon={RobotClose}
        title="Hapus Pengumuman"
        desc={
          'Apakah Anda yakin untuk menghapus\npengumuman yang sudah dibuat?'
        }
        titleConfirm={'Batal'}
        actionConfirm={() => setIsShowPopUpItemHapus(false)}
        titleCancel={'Hapus'}
        actionCancel={() => {
          handleCallbackData(data);
          setIsShowSwipeUpItem(false);
          setIsShowPopUpItemHapus(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  containerRow: {
    flexDirection: 'row',
    gap: 4,
  },
  containerTitleIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  textRegular: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  swipeUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
});

export default memo(CardListItem);
