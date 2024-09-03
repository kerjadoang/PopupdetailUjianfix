/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Robot from '@assets/svg/robot_link_account.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import Clock from '@assets/svg/ic16_clock.svg';
import api from '@api/index';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {Button} from '@components/atoms';
import useTaskDetail from '../useTaskDetail';
import {convertDate} from '@constants/functional';

interface Iprops {
  onClose: any;
}
const ChildrenSwipeUp = (props: Iprops) => {
  const {detail, dataDetail} = useTaskDetail();
  const navigation = useNavigation<any>();

  const handleOnPress = async () => {
    try {
      const response = await api.get(
        `/lms/v1/student/task/home/history/discussion/${detail?.task_student?.id}`,
      );

      if (response.status === 200) {
        let {
          data: {data},
        } = response;

        if (data) {
          const {correct, wrong, answered, skip, type} = data;

          const resultDataMapping = (values: any) => {
            return values?.map((value: any) => {
              return {
                id: value?.number,
                orders: value?.orders || value?.order || value?.number,
                question: value?.question,
                image_id_question: value?.image_id_question,
                answer_user: value?.answer,
                answer_system: value?.correct_answer,
                explanation: value?.discussion,
              };
            });
          };
          props?.onClose();

          const correctsData = resultDataMapping(correct);
          const answersData = resultDataMapping(answered);
          const wrongsData = resultDataMapping(wrong);
          const skipsData = resultDataMapping(skip);

          const screenParams = {
            title: dataDetail.title,
            questionServiceId: QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS,
            data: {
              type: type,
              corrects: {data: correctsData, total: correctsData?.length || 0},
              wrongs: {data: wrongsData, total: wrongsData?.length || 0},
              answers: {data: answersData, total: answersData?.length || 0},
              skips: {data: skipsData, total: skipsData?.length || 0},
            },
          };
          return navigation.navigate('ExplanationScreen', screenParams);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message,
          position: 'top',
        });
      }
    } catch (_) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {dataDetail?.type ? dataDetail?.type : '-'} •{' '}
        {dataDetail?.subject_name ? dataDetail?.subject_name : '-'}
      </Text>
      <Text style={styles.name}>
        {dataDetail?.title ? dataDetail?.title : '-'}
      </Text>
      <Text style={styles.date}>
        Diberikan:{' '}
        {detail?.task_teacher?.time_start
          ? convertDate(detail?.task_teacher?.time_start)
              .locale('id')
              .format('ddd, D MMM YYYY • HH:mm')
          : '-'}
      </Text>
      {dataDetail?.correction_type === 'pending' ? (
        <View style={styles.middle}>
          <Robot width={120} height={120} />
          <Text style={styles.description}>
            Tugas kamu masih dalam proses pemeriksaan. Tunggu sebentar, ya!
          </Text>
        </View>
      ) : dataDetail?.correction_type === 'finish' ? (
        <View style={styles.middle}>
          <Text style={styles.nilaiText}>Nilai</Text>
          <Text style={styles.nilaiValue}>
            {dataDetail?.value ? dataDetail?.value : 0}
          </Text>
        </View>
      ) : null}
      <View style={styles.bottom}>
        {dataDetail?.correction_type === 'finish' &&
        !dataDetail.isUnggahFile ? (
          <View>
            <View style={styles.nilaiContainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.trueValue}>
                  {dataDetail?.correct ? dataDetail?.correct : 0}
                </Text>
                <Text style={styles.trueText}>Benar</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.trueValue, {color: Colors.danger.base}]}>
                  {dataDetail?.wrong ? dataDetail?.wrong : 0}
                </Text>
                <Text style={[styles.trueText, {color: Colors.danger.base}]}>
                  Salah
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={[styles.trueValue, {color: Colors.dark.neutral60}]}>
                  {dataDetail?.skip ? dataDetail?.skip : 0}
                </Text>
                <Text style={[styles.trueText, {color: Colors.dark.neutral60}]}>
                  Dilewati
                </Text>
              </View>
            </View>
            <View style={styles.rectangle} />
          </View>
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.durationText}>Durasi Pengerjaan:</Text>
          <Clock width={16} height={16} style={{marginHorizontal: 5.5}} />
          <Text style={styles.durationTime}>
            {dataDetail?.duration ? dataDetail?.duration : '0 menit'}
          </Text>
        </View>
        <Text style={[styles.durationText, {paddingTop: 12}]}>
          Dikumpulkan:{' '}
          {detail?.task_student?.time_finish
            ? convertDate(detail?.task_student?.time_finish)
                .locale('id')
                .format('ddd, D MMM YYYY • HH:mm')
            : '-'}
        </Text>
      </View>
      {dataDetail?.correction_type === 'finish' && !dataDetail.isUnggahFile ? (
        <View style={{marginTop: 32, width: '100%'}}>
          <Button
            label="Lihat Pembahasan"
            fontSize={16}
            action={handleOnPress}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ChildrenSwipeUp;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
  },
  name: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    fontWeight: '600',
    paddingTop: 4,
  },
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
    paddingTop: 4,
  },
  nilaiText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
  },
  nilaiValue: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.primary.base,
    fontWeight: '600',
  },
  middle: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    fontWeight: '400',
    paddingTop: 16,
  },
  bottom: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    marginTop: 16,
    width: '100%',
  },
  durationText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '400',
  },
  durationTime: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.primary.base,
    fontWeight: '600',
  },
  nilaiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trueValue: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.success.base,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  trueText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.success.base,
    fontWeight: '400',
    paddingHorizontal: 28,
  },
  rectangle: {
    height: 0.6,
    backgroundColor: Colors.dark.neutral40,
    marginVertical: 12,
  },
});
