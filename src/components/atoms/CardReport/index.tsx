import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {IResultExam, IResultServiceType} from 'type/screen';
import {useQuery} from '@tanstack/react-query';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import UjianScoreCard from '@components/pages/ResultScreen/component/UjianScoreCard';

type Props = {
  wrong?: number;
  correct?: number;
  skip?: number;
  questionServiceId?: number;
  time: string;
  isEssay?: boolean;
  isTryOut?: boolean;
  tryOut_answered?: number;
  serviceType?: IResultServiceType;
  historyId?: number;
  examData?: IResultExam;
};

const CardReport: FC<Props> = ({
  wrong,
  correct,
  skip,
  questionServiceId,
  time,
  isEssay,
  isTryOut,
  tryOut_answered,
  serviceType,
  examData,
}) => {
  const {data: examHistoryData} = useQuery<IExamHistoryData>({
    queryKey: ['examHistoryData', examData],
    queryFn: async () => {
      const data = apiGet({
        url: URL_PATH.get_lms_history_exam(
          examData?.schoolExamScheduleId,
          examData?.studentExamId,
        ),
      });
      return data;
    },
  });

  const isOnlyTime =
    questionServiceId === QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN ||
    questionServiceId === QUESTION_SERVICE_TYPE.SOAL_BERBASIS_NILAI;

  const textCorrect =
    questionServiceId === QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN ||
    questionServiceId === QUESTION_SERVICE_TYPE.SOAL_URAIAN
      ? 'Dijawab'
      : 'Benar';

  const _renderDilewati = () => {
    if (
      questionServiceId === QUESTION_SERVICE_TYPE.PTN_BANK_SOAL ||
      questionServiceId === QUESTION_SERVICE_TYPE.TEST_ADAPTIF
    ) {
      return null;
    }

    return (
      <View style={styles.wrapperBox}>
        <Text style={[styles.wrapperBox_skipText, styles.textBold]}>
          {skip || 0}
        </Text>

        <Text style={styles.wrapperBox_skipText}>Dilewati</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {serviceType !== 'UJIAN' ? (
        <View>
          {!isOnlyTime && !isEssay && !isTryOut ? (
            <>
              <View style={styles.containerTop}>
                <View style={styles.wrapperBox}>
                  <Text
                    style={[styles.wrapperBox_correctText, styles.textBold]}>
                    {correct || 0}
                  </Text>

                  <Text style={styles.wrapperBox_correctText}>
                    {textCorrect}
                  </Text>
                </View>

                {questionServiceId !==
                  QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN &&
                questionServiceId !== QUESTION_SERVICE_TYPE.SOAL_URAIAN ? (
                  <View style={styles.wrapperBox}>
                    <Text
                      style={[styles.wrapperBox_wrongText, styles.textBold]}>
                      {wrong || 0}
                    </Text>

                    <Text style={styles.wrapperBox_wrongText}>Salah</Text>
                  </View>
                ) : null}

                {_renderDilewati()}
              </View>

              <View style={styles.line} />
            </>
          ) : null}

          {!isOnlyTime && isTryOut ? (
            <>
              <View style={styles.containerTop}>
                <View style={styles.wrapperBox}>
                  <Text style={[styles.wrapperBox_skipText, styles.textBold]}>
                    {tryOut_answered || 0}
                  </Text>

                  <Text style={styles.wrapperBox_skipText}>Terisi</Text>
                </View>

                {_renderDilewati()}
              </View>

              <View style={styles.line} />
            </>
          ) : null}
        </View>
      ) : (
        examHistoryData?.student_exam.exam?.is_display_result_exam && (
          <>
            <View style={styles.containerTop}>
              <UjianScoreCard examHistoryData={examHistoryData} />
            </View>
            <View style={styles.line} />
          </>
        )
      )}

      <View style={styles.wrapperTime}>
        <Text style={styles.wrapperTime_keyText}>Durasi Pengerjaan:</Text>

        <Icon
          name="clock-time-four"
          color={Colors.primary.base}
          style={styles.wrapperTime_icon}
          size={16}
        />

        <Text style={styles.wrapperTime_valueText}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: '1%',
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrapperBox: {
    alignItems: 'center',
  },
  wrapperBox_correctText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.success.base,
  },
  wrapperBox_wrongText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.danger.base,
  },
  wrapperBox_skipText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
  },
  line: {
    borderBottomColor: Colors.dark.neutral40,
    marginVertical: 12,
    borderBottomWidth: 1,
  },
  wrapperTime: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapperTime_keyText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  wrapperTime_icon: {
    marginHorizontal: 4,
  },
  wrapperTime_valueText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
});

export {CardReport};
