import {apiGet, apiGetSingleImage, apiPost} from '@api/wrapping';
import {
  dismissLoading,
  showLoading,
  useMergeState,
} from '@constants/functional';
import {useIsFocused} from '@react-navigation/native';
import provider from '@services/ptn/provider';
import {IBankSoalQuestionData} from '@services/ptn/type';
import {useEffect, useRef, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const usePTNBankSoalScreen = () => {
  const isFocused = useIsFocused();

  const [questionData, setQuestionData] = useState<IBankSoalQuestionData[]>([]);

  const [state, setState] = useMergeState({
    isLoading: false,
    error: false,
    allListSubject: [],
    tpsListSubject: [],
    saintekListSubject: [],
    soshumListSubject: [],
  });

  const {
    isLoading,
    error,
    allListSubject,
    tpsListSubject,
    saintekListSubject,
    soshumListSubject,
  }: any = state;

  const questionDiscuss = useRef<String>();

  useEffect(() => {
    if (isFocused) {
      getListSubject();
    }
  }, [isFocused]);

  const getListSubject = async () => {
    setState({isLoading: true, error: undefined});

    try {
      let res;

      res = await provider.getListSubject();
      let resTps = res.data.data.tps;
      let resSaintek = res.data.data.saintek;
      let resSoshum = res.data.data.soshum;

      setState({
        allListSubject: res.data.data,
      });

      resTps = await getModuleIcon(resTps);
      resSaintek = await getModuleIcon(resSaintek);
      resSoshum = await getModuleIcon(resSoshum);

      setState({
        tpsListSubject: resTps,
        saintekListSubject: resSaintek,
        soshumListSubject: resSoshum,
      });

      setState({isLoading: false});
      return Promise.resolve(res.data);
    } catch (err: any) {
      setState({error: err, isLoading: false});
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    }
  };

  const getModuleIcon = async (data: any[]): Promise<any[]> => {
    for (let i = 0; i < data.length; i++) {
      try {
        if (!data[i].icon_mobile) {
          continue;
        }
        const imgRes = await apiGetSingleImage({imageId: data[i].icon_mobile});

        data[i].icon_mobile = imgRes;
      } catch (err: any) {
        setState({error: err, isLoading: false});
        Toast.show({
          type: 'error',
          text1:
            err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
        });
        return Promise.reject(err);
      }
    }

    return data;
  };

  const getListQuestion = async (subject_id: number) => {
    try {
      showLoading();
      const data = await apiGet({
        url: provider.getListQuestion(subject_id),
      });
      setQuestionData(data);

      return data;
    } catch (errorMessage: any) {
      Toast.show({
        type: 'error',

        text1: errorMessage || 'Error',
      });
    } finally {
      dismissLoading();
    }
  };

  const getQuestionExplanation = async (
    question_id: number,
    question_option_id: number,
  ) => {
    setState({isLoading: true});

    try {
      const data = await apiGet({
        url: provider.getQuestionExplanation(question_id, question_option_id),
      });

      questionDiscuss.current = data.question_discuss.explanation;
    } catch (errorMessage: any) {
      Toast.show({
        type: 'error',

        text1: errorMessage || 'Error',
      });
    } finally {
      setState({isLoading: false});
    }
  };

  const postStartPractice = async (subject_id: number) => {
    setState({isLoading: true});

    try {
      await apiPost({
        url: provider.postStartPractice(subject_id),
      });
    } catch (errorMessage: any) {
      Toast.show({
        type: 'error',

        text1: errorMessage || 'Error',
      });
    } finally {
      setState({isLoading: false});
    }
  };

  return {
    isLoading,
    error,
    allListSubject,
    tpsListSubject,
    saintekListSubject,
    soshumListSubject,
    questionData,
    questionDiscuss,
    getListSubject,
    getListQuestion,
    getQuestionExplanation,
    postStartPractice,
  };
};

export default usePTNBankSoalScreen;
