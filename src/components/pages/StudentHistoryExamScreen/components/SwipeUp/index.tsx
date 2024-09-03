/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import UjianScoreCard from '@components/pages/ResultScreen/component/UjianScoreCard';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useQuery} from '@tanstack/react-query';
import {convertDate} from '@constants/functional';

type Props = {
  showExplanation?: () => void;
  data: any;
  result: any;
  accessToken?: string;
  is_display_result_exam?: boolean;
};
const SwipeUpDoneCorrection = ({
  showExplanation,
  data,
  accessToken,
  is_display_result_exam,
}: Props) => {
  const {data: examHistoryData} = useQuery<IExamHistoryData>({
    queryKey: ['examHistoryData'],
    queryFn: async () => {
      const resData = apiGet({
        url: URL_PATH.get_student_report_exam_detail(
          data?.student_exam?.[0]?.id,
          data?.student_exam?.[0]?.user_id,
        ),
        headers: accessToken && {Authorization: 'Bearer ' + accessToken},
      });
      return resData;
    },
  });

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
            }}>{`${data?.service?.name} • ${data?.subject?.name}`}</Text>
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
            {data?.title || '-'}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          {is_display_result_exam ? (
            <>
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
                  marginTop: 4,
                  marginBottom: 16,
                }}>
                {data?.student_exam[0].exam_history?.point || '-'}
              </Text>
            </>
          ) : null}
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '5%',
            borderRadius: 10,
            marginBottom: 25,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          {is_display_result_exam ? (
            <>
              <UjianScoreCard examHistoryData={examHistoryData} />
              <View
                style={{
                  width: '80%',
                  borderTopWidth: 0.5,
                  alignSelf: 'center',
                  marginTop: 5,
                  borderTopColor: Colors.dark.neutral40,
                }}
              />
            </>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 12,
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
              }}>{`${
              data?.student_exam[0].exam_history?.duration ?? 0
            } Menit`}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral60,
                marginTop: 12,
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0.25,
              }}>{`Tanggal Ujian: ${convertDate(
              data?.student_exam[0]?.exam_history?.created_at,
            ).format('dddd, d MMM YYYY • hh:mm')}`}</Text>
          </View>
        </View>
        <View
          style={{marginVertical: 10, marginHorizontal: 16, marginBottom: 16}}>
          <Button action={showExplanation} label="Lihat Pembahasan" />
        </View>
      </View>
    </View>
  );
};

export default SwipeUpDoneCorrection;
