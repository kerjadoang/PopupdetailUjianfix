/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import RobotEmptyIcon from '@assets/svg/robot_link_account.svg';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import {Button} from '@components/atoms';
type Props = {
  hideSwipeUp?: () => void;
  data: any;
};
const SwipeUpBelumDinilai = ({hideSwipeUp, data}: Props) => {
  return (
    <View>
      <View>
        <View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 5}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.dark.neutral60,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0.25,
              }}>
              {`${data?.data?.type} • ${data?.data?.subject?.name}`}
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 5}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.dark.neutral100,
                fontSize: 20,
                lineHeight: 28,
                letterSpacing: 1,
              }}>
              {data?.data?.title || '[NULL]'}
            </Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <RobotEmptyIcon />
            <Text
              style={{
                marginHorizontal: '20%',
                marginVertical: 15,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral100,
                fontSize: 14,
                lineHeight: 22,
                textAlign: 'center',
                letterSpacing: 0.25,
              }}>
              Tugas kamu masih dalam proses pemeriksaan. Tunggu sebentar, ya!
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral60,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0.25,
              }}>
              Durasi Pengerjaan:{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.primary.base,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0.25,
              }}>{`${data?.detail?.duration}`}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral60,
                marginTop: 10,
                marginBottom: 20,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0.25,
              }}>
              {`Dikumpulkan: ${dayjs(data?.detail?.task_student?.time_finish)
                .locale('id')
                .format('dddd, DD MMM YYYY • hh:mm')}`}
            </Text>
          </View>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Button action={hideSwipeUp} label="Tutup" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwipeUpBelumDinilai;
