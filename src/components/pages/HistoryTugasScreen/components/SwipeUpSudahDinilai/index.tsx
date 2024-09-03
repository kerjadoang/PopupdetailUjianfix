/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import dayjs from 'dayjs';

type Props = {
  showExplanation?: () => void;
  data: any;
};
const SwipeUpSudahDinilai = ({showExplanation, data}: Props) => {
  // console.log('DATA', data);
  return (
    <View>
      <View>
        <View style={{width: '100%', alignItems: 'center'}}>
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
            {' '}
            {data?.data?.title || '[NULL]'}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Colors.dark.neutral60,
              fontSize: 14,
              lineHeight: 22,
              letterSpacing: 0.25,
            }}>
            {'Diberikan: '}{' '}
            {`${dayjs(data?.data?.time_finish)
              .locale('id')
              .format('ddd, D MMM YYYY • hh:mm')}`}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Colors.dark.neutral60,
              fontSize: 14,
              lineHeight: 22,
              letterSpacing: 0.25,
            }}>
            {'Nilai'}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.primary.base,
              fontSize: 24,
              lineHeight: 32,
              letterSpacing: 1,
              marginTop: 5,
              marginBottom: 30,
            }}>
            {data?.data?.student_value}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '5%',
            borderRadius: 10,
            marginBottom: 25,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginVertical: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.success.base,
                  fontSize: 16,
                  lineHeight: 20,
                  letterSpacing: 1,
                }}>
                {data?.detail?.task_student?.correct}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: Colors.success.base,
                  fontSize: 14,
                  lineHeight: 18,
                  letterSpacing: 0.25,
                  marginTop: 5,
                }}>
                Benar
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.danger.base,
                  fontSize: 16,
                  lineHeight: 20,
                  letterSpacing: 1,
                }}>
                {data?.detail?.task_student?.wrong}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: Colors.danger.base,
                  fontSize: 14,
                  lineHeight: 18,
                  letterSpacing: 0.25,
                  marginTop: 5,
                }}>
                Salah
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.dark.neutral60,
                  fontSize: 16,
                  lineHeight: 20,
                  letterSpacing: 1,
                }}>
                {data?.detail?.task_student?.skip}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: Colors.dark.neutral60,
                  fontSize: 14,
                  lineHeight: 18,
                  letterSpacing: 0.25,
                  marginTop: 5,
                }}>
                Dilewati
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '80%',
              borderTopWidth: 0.5,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
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
              }}>
              {`${data?.detail?.duration}`}
            </Text>
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
        </View>
        <View style={{marginVertical: 10}}>
          <Button action={showExplanation} label="Lihat Pembahasan" />
        </View>
      </View>
    </View>
  );
};

export default SwipeUpSudahDinilai;
