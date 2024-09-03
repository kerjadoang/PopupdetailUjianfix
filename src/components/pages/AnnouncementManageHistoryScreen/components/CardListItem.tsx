/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconUsers from '@assets/svg/ic16_users.svg';
import IconCalendar from '@assets/svg/ic24_calendar.svg';
import {DetailItem} from '../../AnnouncementManageScreen/components';
import {Button} from '@components/atoms';
import {
  formatDate,
  useAnnouncementManageScreen,
} from '../../AnnouncementManageScreen/utils';

type Props = {
  isFirstItem?: boolean;
  data: IAnnouncement;
};

const CardListItem: FC<Props> = ({isFirstItem, data}) => {
  const {isShowDetail, setIsShowDetail} = useAnnouncementManageScreen();
  const isBadgeSelesai = data?.status === 'Selesai';

  return (
    <>
      <View style={[styles.container, isFirstItem ? {marginTop: 16} : {}]}>
        <Text
          style={[
            styles.badge,
            styles.textRegular,
            {
              fontSize: 12,
              lineHeight: 16,
              color: isBadgeSelesai
                ? Colors.success.base
                : Colors.dark.neutral80,
              backgroundColor: isBadgeSelesai
                ? Colors.success.light2
                : Colors.dark.neutral10,
            },
          ]}>
          {data?.status}
        </Text>

        <Text style={styles.textBold}>{data?.title}</Text>

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
        isUsedOutside={true}
        setIsShowDetail={setIsShowDetail}
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
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});

export default memo(CardListItem);
