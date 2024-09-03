import api from '@api/index';
import apiWithoutToken from '@api/withoutToken';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {SaveAnswerType} from '@redux';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {styles} from './styles';
import React from 'react';
import RobotEmptyState from '@assets/svg/robot_empty_state.svg';
import {useRoute} from '@react-navigation/native';
import {isStringContains} from '@constants/functional';
import {useNavigate} from '@hooks/useNavigate';

const useExplanationScreen = () => {
  const {navigation} = useNavigate();
  const route: any = useRoute();
  const {
    title,
    questionServiceId,
    data,
    isFromHistoryLks,
    historyId,
    tokenAnak, // Penambahan untuk login sebagai orang tua dia bisa lihat result dari anak, jadi dibawa token anak
  } = route?.params;

  const [piece, setPiece] = useState<any>();

  const [activeBtn, setActiveBtn] = useState(0);
  const userAnswers: SaveAnswerType[] = useSelector(
    (state: RootState) => state.saveAnswer?.data,
  );

  const prProjekTugasFilter = () => {
    if (isStringContains(data?.type, 'uraian')) {
      filter.push('Dijawab', 'Dilewati');
      return;
    }

    if (isStringContains(data?.type, 'campuran')) {
      filter.push('Benar', 'Salah', 'Dijawab', 'Dilewati');
      return;
    }

    filter.push('Benar', 'Salah', 'Dilewati');
  };

  const filter: any = [];
  switch (questionServiceId) {
    case QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN:
    case QUESTION_SERVICE_TYPE.AKM_NUMERISASI_URAIAN:
    case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
      filter.push('Dijawab', 'Dilewati');
      break;
    case QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN:
      filter.push('Dijawab', 'Dilewati');
      break;
    case QUESTION_SERVICE_TYPE.SOAL_BERBASIS_NILAI:
      filter.push('Dijawab', 'Dilewati');
      break;
    case QUESTION_SERVICE_TYPE.TEST_ADAPTIF:
      filter.push('Benar', 'Salah');
      break;
    case QUESTION_SERVICE_TYPE.UJIAN:
    case QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS:
      prProjekTugasFilter();
      break;
    default:
      filter.push('Benar', 'Salah', 'Dilewati');
      break;
  }

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

  const usedData = isFromHistoryLks ? result : data;

  useLayoutEffect(() => {
    const fetchUserHistory = async () => {
      try {
        let URL = `/soal/v1/history/user-history/${historyId ?? 0}`;

        // check jika memiliki tokenAnak maka pake tokenAnak
        const response = tokenAnak
          ? await apiWithoutToken(URL, {
              headers: {
                Authorization: `Bearer ${tokenAnak}`,
              },
            })
          : await api.get(URL);

        if (response.status === 200) {
          const {point, correct_answer, wrong_answer, pass_answer} =
            response.data?.data;

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

            return {
              id: value?.selected_option?.id,
              question: value?.question?.question,
              answer_user,
              answer_system: value?.question?.options?.find(
                (_value: any) => _value?.is_correct,
              )?.key,
              is_correct: value?.selected_option?.is_correct,
              explanation: value?.question?.question_discuss?.explanation,
            };
          };

          setResult({
            ...result,
            point,
            corrects: {
              total: correct_answer?.length,
              data: correct_answer?.map((value: any) => ({
                ...resultDataMapping(value),
              })),
            },
            wrongs: {
              total: wrong_answer?.length,
              data: wrong_answer?.map((value: any) => ({
                ...resultDataMapping(value),
              })),
            },
            skips: {
              total: pass_answer?.length,
              data: pass_answer?.map((value: any) => ({
                ...resultDataMapping(value),
              })),
            },
          });
        }
      } catch (err) {
        return;
      }
    };
    if (isFromHistoryLks) {
      fetchUserHistory();
    }
  }, [historyId, isFromHistoryLks, questionServiceId, result, tokenAnak]);

  const mappingAnswer = useCallback(
    (data: any[]) => {
      return data.map((item: any) => {
        const findSaveAnswer = userAnswers?.find(
          (value: SaveAnswerType) => item?.questionId === value?.questionId,
        );

        if (findSaveAnswer) {
          item.userAnswer = findSaveAnswer?.userAnswer;
        }

        return item;
      });
    },
    [userAnswers],
  );

  const mappingEssayUsedData = useCallback(() => {
    const answerData = mappingAnswer(usedData?.corrects?.data || []);
    const wrongsData = mappingAnswer(usedData?.wrongs?.data || []);

    const mappedAnswerData = [...answerData, ...wrongsData];
    mappedAnswerData.sort();
    const resultMapping = {
      data: mappedAnswerData,
      total: usedData?.corrects?.total + usedData?.wrongs?.total,
    };
    return resultMapping;
  }, [
    mappingAnswer,
    usedData?.corrects?.data,
    usedData?.corrects?.total,
    usedData?.wrongs?.data,
    usedData?.wrongs?.total,
  ]);

  const mappingEssaySkippedData = useCallback(() => {
    usedData?.skips?.data?.orders?.sort();
    return usedData?.skips;
  }, [usedData?.skips]);

  const mappingFilterDataPrProjekTugas = useCallback(
    (currentIndex: number) => {
      const btnType: ButtonFilterType = filter[currentIndex];
      if (isStringContains(btnType, 'dijawab')) {
        setPiece(usedData?.answers);
        return;
      }

      if (isStringContains(btnType, 'dilewati')) {
        setPiece(usedData?.skips);
        return;
      }

      if (isStringContains(btnType, 'benar')) {
        setPiece(usedData?.corrects);
        return;
      }

      setPiece(usedData?.wrongs);
    },
    [
      filter,
      usedData?.answers,
      usedData?.corrects,
      usedData?.skips,
      usedData?.wrongs,
    ],
  );

  const filterData = useCallback(
    (x: any) => {
      if (questionServiceId === QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS) {
        mappingFilterDataPrProjekTugas(x);
        return;
      }

      if (x === 0) {
        switch (questionServiceId) {
          case QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN:
            setPiece(mappingEssayUsedData());
            return;
          case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
            setPiece(mappingEssayUsedData());
            return;
          case QUESTION_SERVICE_TYPE.SOAL_BERBASIS_NILAI:
            setPiece(mappingEssayUsedData());
            return;
          default:
            usedData?.corrects?.data?.orders?.sort();
            setPiece(usedData?.corrects);
            return;
        }
      }

      if (x === 1) {
        switch (questionServiceId) {
          case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
          case QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN:
          case QUESTION_SERVICE_TYPE.LATIHAN_SOAL_URAIAN:
            setPiece(mappingEssaySkippedData());
            return;
          case QUESTION_SERVICE_TYPE.SOAL_URAIAN:
            setPiece(mappingEssaySkippedData());
            return;
          case QUESTION_SERVICE_TYPE.SOAL_BERBASIS_NILAI:
            setPiece(mappingEssaySkippedData());
            return;
          case QUESTION_SERVICE_TYPE.AKM_NUMERISASI_URAIAN:
            setPiece(usedData?.wrongs);
            return;
          default:
            usedData?.wrongs?.data?.orders?.sort();
            setPiece(usedData?.wrongs);
            break;
        }
        return;
      }

      if (x === 2) {
        switch (questionServiceId) {
          case QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS:
            usedData?.answers?.data?.orders?.sort();
            setPiece(usedData?.answers);
            return;
          default:
            setPiece(usedData?.skips);
            return;
        }
      }

      usedData?.skips?.data?.orders?.sort();
      setPiece(usedData?.skips);
    },
    [
      questionServiceId,
      usedData?.skips,
      usedData?.corrects,
      usedData?.wrongs,
      usedData?.answers,
      mappingFilterDataPrProjekTugas,
      mappingEssayUsedData,
      mappingEssaySkippedData,
    ],
  );

  useEffect(() => {
    filterData(activeBtn);
  }, [activeBtn, filterData]);

  const renderNoAnswer = () => {
    // if (
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.LATIHAN_SOAL_PG &&
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.TANYA_JAWAB &&
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.LATIHAN_SOAL_URAIAN &&
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.SOAL_BERBASIS_NILAI &&
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.SOAL_URAIAN &&
    //   questionServiceId !== QUESTION_SERVICE_TYPE?.PR_PROJEK_TUGAS
    // ) {
    //   return null;
    // }

    let description;
    const type = filter[activeBtn];

    switch (type) {
      case 'Benar':
        description =
          'Pelajari kembali materi belajar dan coba kerjakan latihan lagi nanti.';
        break;
      case 'Salah':
        description = 'Keren, jawabanmu belum ada yang salah!';
        break;
      case 'Dilewati':
        description = 'Semua soal latihan berhasil kamu jawab.';
        break;
      default:
        description = '';
        break;
    }

    return (
      <View style={styles.noAnswer}>
        <RobotEmptyState />
        <Text style={styles.noAnswerTitle}>Tidak Ada Jawaban {type}</Text>
        <Text style={styles.noAnswerDescription}>{description}</Text>
      </View>
    );
  };

  const onPressFilterButton = (index: number) => {
    setActiveBtn(index);
    filterData(index);
  };

  return {
    navigation,
    title,
    filter,
    activeBtn,
    piece,
    renderNoAnswer,
    onPressFilterButton,
  };
};

export default useExplanationScreen;
