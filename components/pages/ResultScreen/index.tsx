/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BarChart} from 'react-native-chart-kit';

import {styles} from './style';
import Colors from '@constants/colors';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import api from '@api/index';
import {Button, CardReport, MainView, SwipeUp} from '@components/atoms';
import Group39947 from '@assets/svg/group_39947.svg';
import IconShare from '@assets/svg/IconShare.svg';
import Robot from '@assets/svg/robot.svg';
import Share from './component/Share';
import {rdxDispatch, showErrorToast} from '@constants/functional';
import {destroySaveAnswerAction} from '@redux';
import {apiPost} from '@api/wrapping';
import {PTNModuleType, ParamList} from 'type/screen';

const WIDTH = Math.round(Dimensions.get('window').width);

const ResultScreen: FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ResultScreen'>>();

  const route = useRoute<RouteProp<ParamList, 'ResultScreen'>>();
  const [isShareShow, setIsShareShow] = useState(false);
  const [chartData, setChartData] = useState<any>([]);
  const isFocused = useIsFocused();

  const [result, setResult] = useState({
    point: undefined,
    corrects: {
      data: [],
      total: 0,
    },
    wrongs: {
      data: [],
      total: 0,
    },
    skips: {
      data: [],
      total: 0,
    },
  });

  const {
    params: {
      historyId,
      serviceType,
      title,
      subTitle,
      duration,
      questionServiceId,
      data,
      xpGained,
      points,
      subjectId,
      passAnswer,
      //kebutuhan param dari screen kerjakan ujian
      is_essay,
      isFromMultipleQuestionTypeScreen,
      resultsParam,
      is_tryout,
      tryOut_answered,
      module,
      progressData,
      nextSubjectProgressData,
      isCountdownFinish,
      examData,
    },
  } = route;

  const progressDataLastIndex = progressData?.slice(-1)[0];
  const isLastSubject = progressDataLastIndex?.id === subjectId;

  useEffect(() => {
    if (isFromMultipleQuestionTypeScreen && resultsParam && isFocused) {
      setResult(resultsParam);
    }
  }, [route?.params?.isFromMultipleQuestionTypeScreen, isFocused]);

  useLayoutEffect(() => {
    const fetchUserHistory = async () => {
      try {
        let URL = '';

        if (historyId && serviceType !== 'PRACTICE') {
          /**
           * Handle for Soal, Test, AKM
           */
          switch (serviceType) {
            case 'AKM':
              URL = `/lpt/v1/akm/user_history/${historyId}`;
              break;
            case 'SOAL':
              URL = `/soal/v1/history/user-history/${historyId}`;
              break;
            case 'TEST':
              URL = `/lpt/v1/tests/go_test/user_history/chapter?user_question_service_history_id=${historyId}`;
              break;
            case 'PTN':
              URL = `/ptn_soal/v1/history/discussion/${historyId}/${subjectId}`;
              break;
            case 'PTN':
              URL = `/ptn_soal/v1/history/discussion/${historyId}/${subjectId}`;
              break;
            default:
              break;
          }

          const response = await api.get(URL);

          if (response.status === 200) {
            const {
              point,
              correct_answer,
              wrong_answer,
              pass_answer,
              difficulty_analysis,
            } = response.data?.data;
            if (difficulty_analysis) {
              setChartData([
                ...Object.values(difficulty_analysis?.easy),
                ...Object.values(difficulty_analysis?.medium),
                ...Object.values(difficulty_analysis?.hard),
              ]);
            }

            const resultDataMapping = (value: any) => {
              let answer_user;

              switch (questionServiceId) {
                case QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN:
                case QUESTION_SERVICE_TYPE.AKM_NUMERISASI_URAIAN:
                case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
                  answer_user = value?.user_answer;
                  break;
                default:
                  answer_user = value?.selected_option?.key;
                  break;
              }

              const options =
                value?.question?.options || value?.question?.question_options;

              const resultMapping = {
                id: value?.selected_option?.id,
                questionId: value?.question?.id,
                orders: value?.orders || value?.order,
                question: value?.question?.question,
                answer_user,
                answer_system: options?.find(
                  (_value: any) => _value?.is_correct,
                )?.key,
                is_correct: value?.selected_option?.is_correct,
                explanation: value?.question?.question_discuss?.explanation,
              };
              return resultMapping;
            };
            setResult({
              ...result,
              point,
              corrects: {
                total: correct_answer?.length,
                data: correct_answer?.map((value: any, index: any) => ({
                  ...resultDataMapping(value, index),
                })),
              },
              wrongs: {
                total: wrong_answer?.length,
                data: wrong_answer?.map((value: any, index: any) => ({
                  ...resultDataMapping(value, index),
                })),
              },
              skips: {
                total: pass_answer?.length,
                data: pass_answer?.map((value: any, index: any) => ({
                  ...resultDataMapping(value, index),
                })),
              },
            });
          }
        } else {
          /**
           * Handle for Practice
           */
          const DATA = data?.reduce(
            (prev: any, curr: any) => {
              if (!curr?.answer_user) {
                prev.skips.data.push(curr);
                prev.skips.total += 1;
              } else {
                if (curr?.is_correct) {
                  prev.corrects.data.push(curr);
                  prev.corrects.total += 1;
                } else {
                  prev.wrongs.data.push(curr);
                  prev.wrongs.total += 1;
                }
              }

              return prev;
            },
            {
              corrects: {
                data: [],
                total: 0,
              },
              wrongs: {
                data: [],
                total: 0,
              },
              skips: {
                data: [],
                total: 0,
              },
            },
          );
          setResult({...result, ...DATA});
        }
      } catch (err) {
        return;
      }
    };

    fetchUserHistory();
  }, [historyId, serviceType]);

  const nextTryOut = async () => {
    const url = '/tryout/v1/start/subject-tps/next';
    const body = {
      tryout_user_history_id: historyId,
      subject_id: subjectId,
      condition: 'start',
    };
    try {
      const res = await apiPost({url: url, body: body});

      navigation.replace('TryOutQuestionScreen', {
        data: res ?? {},
        progressData: progressData,
        nextProgressData: nextSubjectProgressData,
        type: module as PTNModuleType,
        title: nextSubjectProgressData?.name ?? 'Try Out',
      });
    } catch (error: any) {
      showErrorToast(error ?? 'Terjadi kesalahan');
    }
  };

  const renderCardReport = () => {
    if (module === 'saintek' || module === 'soshum') {
      return null;
    }

    return (
      <CardReport
        correct={result.corrects.total}
        wrong={result.wrongs.total}
        skip={
          questionServiceId !== QUESTION_SERVICE_TYPE.TEST_ADAPTIF
            ? module === 'tps'
              ? passAnswer
              : result?.skips?.total
            : passAnswer
        }
        time={`${duration || '-'}`}
        questionServiceId={questionServiceId}
        isEssay={is_essay}
        isTryOut={is_tryout}
        tryOut_answered={tryOut_answered}
        serviceType={serviceType}
        examData={examData}
      />
    );
  };

  const renderButtonLihatPembahasan = () => {
    if (is_essay || isFromMultipleQuestionTypeScreen) {
      return null;
    }
    switch (questionServiceId) {
      case QUESTION_SERVICE_TYPE.LATIHAN_SOAL_PG:
      case QUESTION_SERVICE_TYPE.TANYA_JAWAB:
      case QUESTION_SERVICE_TYPE.SOAL_PILIHAN_GANDA:
      case QUESTION_SERVICE_TYPE.TEST_ADAPTIF:
      case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
      case QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN:
      case QUESTION_SERVICE_TYPE.AKM_LITERASI_PILIHAN_GANDA:
      case QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN:
      case QUESTION_SERVICE_TYPE.AKM_NUMERISASI_PILIHAN_GANDA:
      case QUESTION_SERVICE_TYPE.AKM_NUMERISASI_URAIAN:
      case QUESTION_SERVICE_TYPE.SOAL_BERBASIS_NILAI:
      case QUESTION_SERVICE_TYPE.KUIS:
        return (
          <>
            <Button
              action={() =>
                navigation.navigate<any>('ExplanationScreen', {
                  title,
                  questionServiceId,
                  data: result,
                })
              }
              label="Lihat Pembahasan"
              outline={true}
            />

            <View style={{height: 12}} />
          </>
        );
      case QUESTION_SERVICE_TYPE.PTN_BANK_SOAL:
        return (
          <>
            <Button
              action={() => {
                navigation.navigate<any>('ExplanationScreen', {
                  title: subTitle,
                  questionServiceId,
                  data: result,
                });
              }}
              label="Lihat Pembahasan"
              outline={true}
            />

            <View style={{height: 12}} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}>
        <MainView flex={10} justifyContent="center">
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Group39947
              style={[
                styles.backgroundImage,
                {
                  top:
                    is_tryout && module !== 'tps'
                      ? Dimensions.get('window').height / 4
                      : 0,
                },
              ]}
            />

            <View style={{paddingTop: 26}}>
              <View
                style={[
                  is_tryout && module !== 'tps'
                    ? {
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 0.9,
                      }
                    : {
                        alignItems: 'center',
                      },
                ]}>
                <Text style={styles.textBold}>
                  {serviceType === 'UJIAN'
                    ? 'Ujian Berhasil Dikumpulkan'
                    : serviceType === 'AKM'
                    ? 'AKM'
                    : serviceType === 'SOAL' &&
                      (title?.search(/test/i)! >= 0 ||
                        title?.search(/ujian/i)! >= 0)
                    ? 'Tes'
                    : serviceType === 'TEST'
                    ? 'Tes'
                    : serviceType === 'SOAL' &&
                      questionServiceId === QUESTION_SERVICE_TYPE.KUIS
                    ? 'Kuis'
                    : 'Latihan'}{' '}
                  {serviceType !== 'UJIAN' ? 'Selesai!' : ''}
                </Text>

                {serviceType === 'PRACTICE' ||
                (serviceType === 'SOAL' &&
                  questionServiceId !== QUESTION_SERVICE_TYPE.KUIS) ||
                serviceType === 'TEST' ? (
                  <Text style={[styles.textNormal, {marginVertical: 2}]}>
                    {title || '-'}
                  </Text>
                ) : null}
                <View style={{width: '80%'}}>
                  <Text style={[styles.textNormal, {textAlign: 'center'}]}>
                    {subTitle || '-'}
                  </Text>
                </View>
                <Robot style={{marginVertical: 24}} />
              </View>

              {serviceType !== 'UJIAN' && serviceType !== 'TRY OUT' ? (
                <View style={styles.rowEvenly}>
                  {serviceType !== 'PRACTICE' &&
                  questionServiceId !==
                    QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN &&
                  questionServiceId !== QUESTION_SERVICE_TYPE.SOAL_URAIAN &&
                  !is_essay ? (
                    <View>
                      <Text
                        style={[
                          styles.textNormal,
                          {marginBottom: 4, textAlign: 'center'},
                        ]}>
                        Nilai
                      </Text>

                      <Text
                        style={[
                          styles.textBold,
                          {
                            fontSize: 24,
                            lineHeight: 32,
                            color: Colors.primary.base,
                            textAlign: 'center',
                          },
                        ]}>
                        {questionServiceId !==
                        QUESTION_SERVICE_TYPE.PTN_BANK_SOAL
                          ? result.point || 0
                          : points || 0}
                      </Text>
                    </View>
                  ) : null}

                  {serviceType !== 'PTN' &&
                  !is_essay &&
                  !isFromMultipleQuestionTypeScreen ? (
                    <View>
                      <Text
                        style={[
                          styles.textNormal,
                          {marginBottom: 4, textAlign: 'center'},
                        ]}>
                        Dapat XP
                      </Text>

                      <Text
                        style={[
                          styles.textBold,
                          {
                            fontSize: 24,
                            lineHeight: 32,
                            color: Colors.primary.base,
                            textAlign: 'center',
                          },
                        ]}>
                        {`+${xpGained || 0}XP`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>

          <View
            style={[
              // {flex: 1},
              questionServiceId !== QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN
                ? {justifyContent: 'center'}
                : {marginTop: 32},
            ]}>
            {renderCardReport()}

            {serviceType === 'SOAL' &&
            questionServiceId === QUESTION_SERVICE_TYPE.KUIS ? (
              <Pressable
                style={styles.btnShare}
                onPress={() => setIsShareShow(true)}>
                <IconShare width={20} height={20} />
                <Text style={styles.textSemiBoldBaseColor}>Bagikan</Text>
              </Pressable>
            ) : null}
          </View>

          {serviceType === 'SOAL' && title?.search(/ujian/i)! >= 0 ? (
            <View style={[{flex: 1, marginVertical: 16}, styles.cardChart]}>
              <Text
                style={[
                  styles.textBold,
                  {fontSize: 14, lineHeight: 22, letterSpacing: 0.25},
                ]}>
                Analisa Tingkat Kesulitan
              </Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <BarChart
                  width={WIDTH}
                  height={220}
                  withInnerLines={false}
                  withHorizontalLabels={false}
                  showBarTops={false}
                  showValuesOnTopOfBars={true}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    barRadius: 5,
                    barPercentage: 0.75,
                    backgroundGradientFrom: Colors.white,
                    backgroundGradientTo: Colors.white,
                    color: () => Colors.success.base,
                    labelColor: () => Colors.dark.neutral60,
                    propsForLabels: {
                      textAnchor: 'start',
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                      dx: WIDTH * 0.05,
                    },
                  }}
                  style={{
                    marginTop: 12,
                    paddingRight: 0,
                  }}
                  data={{
                    labels: ['Mudah', 'Sedang', 'Sulit'],
                    datasets: [{data: chartData}],
                  }}
                />
              </ScrollView>
            </View>
          ) : null}
        </MainView>

        <MainView flex={1}>
          {renderButtonLihatPembahasan()}

          {is_tryout && module === 'tps' && !isLastSubject ? (
            <Button
              outline
              style={styles.marginBottom12}
              action={() => {
                if (isCountdownFinish) {
                  showErrorToast('Waktu pengerjaan telah habis', {
                    visibilityTime: 3000,
                  });
                  return navigation.goBack();
                }
                return nextTryOut();
              }}
              label="Ujian Berikutnya"
            />
          ) : null}
          <Button
            style={{bottom: 0}}
            action={() => {
              rdxDispatch(destroySaveAnswerAction());
              if (!is_tryout) {
                return navigation.pop(2);
              } else {
                return navigation.goBack();
              }
            }}
            label="Tutup"
          />
        </MainView>
      </ScrollView>
      <SwipeUp
        height={150}
        onClose={() => setIsShareShow(false)}
        isSwipeLine={true}
        visible={isShareShow}
        children={<Share invite={() => {}} share={() => {}} copy={() => {}} />}
      />
    </SafeAreaView>
  );
};

export {ResultScreen};
