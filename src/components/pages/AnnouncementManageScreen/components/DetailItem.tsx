/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, memo, useLayoutEffect} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconUsers from '@assets/svg/ic16_users.svg';
import CalendarIcon from '@assets/svg/ic24_calendar.svg';
import {Button, Header} from '@components/atoms';
import {formatDate, useAnnouncementManageScreen} from '../utils';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

type Props = {
  itemData: IAnnouncement;
  isShowDetail: boolean;
  isUsedOutside?: boolean;
  setIsShowDetail: (value: boolean) => void;
};

const DetailItem: FC<Props> = ({
  itemData,
  isShowDetail,
  isUsedOutside,
  setIsShowDetail,
}) => {
  const isBadgeSelesai = itemData?.status === 'Selesai';

  const {
    navigation,
    isLoading,
    setIsLoading,
    detailData,
    //
    __getAnnouncement,
  } = useAnnouncementManageScreen();

  useLayoutEffect(() => {
    if (isShowDetail) {
      setIsLoading(true);
      __getAnnouncement(itemData?.id).finally(() => setIsLoading(false));
    }
  }, [isShowDetail]);

  return (
    <>
      <Modal
        visible={isShowDetail}
        onRequestClose={() => setIsShowDetail(false)}>
        <Header
          label="Pengumuman"
          backgroundColor="transparent"
          onPressIconLeft={() => setIsShowDetail(false)}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {detailData?.image ? (
            <FastImage style={styles.image} source={{uri: detailData?.image}} />
          ) : (
            <View
              style={[
                styles.image,
                {
                  borderWidth: 1,
                  borderColor: Colors.dark.neutral20,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.textRegular}>No Image</Text>
            </View>
          )}

          <View style={{marginTop: 16}}>
            {isUsedOutside ? (
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
                {itemData?.status}
              </Text>
            ) : null}

            <Text style={styles.textSemiBold}>{itemData?.title}</Text>

            {!isUsedOutside ? (
              <Text
                style={[
                  styles.textRegular,
                  {
                    marginTop: 4,
                    fontSize: 12,
                    lineHeight: 16,
                    color: Colors.dark.neutral60,
                  },
                ]}>
                Dibuat {formatDate(detailData?.created_at)}
              </Text>
            ) : null}

            <View style={{marginTop: 4}}>
              <View style={styles.containerRow}>
                <IconUsers style={{top: 1}} />

                <Text style={[{flex: 1}, styles.textRegular]}>
                  {itemData?.announce_to}
                </Text>
              </View>

              <View style={styles.containerRow}>
                <CalendarIcon style={{top: 1}} width={16} height={16} />

                <Text style={[{flex: 1}, styles.textRegular]}>
                  {`${formatDate(itemData?.time_start)} - ${formatDate(
                    itemData?.time_end,
                  )}`}
                </Text>
              </View>
            </View>
          </View>

          <Text style={[styles.textRegular, {marginTop: 16, marginBottom: 24}]}>
            {itemData?.description}
          </Text>
        </ScrollView>

        {!isUsedOutside ? (
          <View style={styles.containerBottomShadow}>
            <Button
              label={'Perbarui Pengumuman'}
              action={() => {
                setIsShowDetail(false);
                navigation.navigate('AnnouncementManageCreateScreen', {
                  type: 'EDIT',
                  id: itemData?.id,
                });
              }}
              fontSize={16}
            />
          </View>
        ) : null}
      </Modal>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  // BEGIN UNIVERSAL
  containerRow: {
    flexDirection: 'row',
    gap: 4,
  },
  textSemiBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
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
  // END UNIVERSAL //
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  containerBottomShadow: {
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.dark.neutral40,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  image: {
    height: 183.14,
    borderRadius: 10,
  },
});

export default memo(DetailItem);
