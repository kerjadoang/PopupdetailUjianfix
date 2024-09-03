import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/ptn/provider';
import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ParamList} from 'type/screen';

const useDiagnoticTest = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DiagnoticTestScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'DiagnoticTestScreen'>>();
  const gender: string = route?.params?.gender;

  const isFocused = useIsFocused();
  const [totalQuestion, setTotalQuestion] = useState<number>(5);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [data, setData] = useState<any>({
    question_group_a: [],
    question_group_b: [],
    question_group_c: [],
    question_group_d: [],
    question_group_e: [],
    filled: [],
  });

  //pop up
  const [showPopupFinish, setShowPopupFinish] = useState<boolean>(false);
  const [showPopupNotFinish, setShowPopupNotFinish] = useState<boolean>(false);
  const [showPopupNotFinishTest, setShowPopupNotFinishTest] =
    useState<boolean>(false);
  const [showFinishSection, setShowFinishSection] = useState<boolean>(false);

  const _renderData = () => {
    //get data mapping depends on currentquestion
    const question =
      currentQuestion === 1
        ? data.question_group_a
        : currentQuestion === 2
        ? data.question_group_b
        : currentQuestion === 3
        ? data.question_group_c
        : currentQuestion === 4
        ? data.question_group_d
        : data.question_group_e;
    return question;
  };

  const questionLength = [1, 2, 3, 4, 5]; //default diagnotic test from backend just 5 number

  useEffect(() => {
    if (isFocused) {
      _getData(questionLength);
    }
  }, [isFocused]);

  const _getData = async (question: any) => {
    try {
      const promises = question?.map(async (number: number) => {
        const params = {
          question_group: String.fromCharCode(number + 64).toLowerCase(), //convert 1,2,3,4,5 to a,b,c,d,e
          question_gender: gender ?? 'p',
        };
        const {
          status,
          data: {data},
        } = await provider.getDiagnoticTestQuestion(params);
        if (status === 200) {
          switch (number) {
            case 1:
              setData((prev: any) => ({
                ...prev,
                question_group_a: data,
              }));
              break;
            case 2:
              setData((prev: any) => ({
                ...prev,
                question_group_b: data,
              }));
              break;
            case 3:
              setData((prev: any) => ({
                ...prev,
                question_group_c: data,
              }));
              break;
            case 4:
              setData((prev: any) => ({
                ...prev,
                question_group_d: data,
              }));
              break;
            case 5:
              setData((prev: any) => ({
                ...prev,
                question_group_e: data,
              }));
              break;
          }
        }
      });

      await Promise.allSettled(promises);
    } catch (_) {
      Toast.show({type: 'error', text1: 'Something went wrong'});
      navigation.goBack();
    }
  };

  const _handlerSubmit = async () => {
    //submit finish test
    const tempData = data; //init new temp data
    try {
      const promiseQuestionA = tempData?.question_group_a?.map((obj: any) => {
        return {
          dt_question_id: obj?.id,
          rank: obj?.order,
        };
      });
      const promiseQuestionB = tempData?.question_group_b?.map((obj: any) => {
        return {
          dt_question_id: obj?.id,
          rank: obj?.order,
        };
      });
      const promiseQuestionC = tempData?.question_group_c?.map((obj: any) => {
        return {
          dt_question_id: obj?.id,
          rank: obj?.order,
        };
      });
      const promiseQuestionD = tempData?.question_group_d?.map((obj: any) => {
        return {
          dt_question_id: obj?.id,
          rank: obj?.order,
        };
      });
      const promiseQuestionE = tempData?.question_group_e?.map((obj: any) => {
        return {
          dt_question_id: obj?.id,
          rank: obj?.order,
        };
      });
      await Promise.allSettled([
        //wait all mapping with promise
        promiseQuestionA,
        promiseQuestionB,
        promiseQuestionC,
        promiseQuestionD,
        promiseQuestionE,
      ]);
      const newData = {
        //define data for body
        question_group_a: promiseQuestionA,
        question_group_b: promiseQuestionB,
        question_group_c: promiseQuestionC,
        question_group_d: promiseQuestionD,
        question_group_e: promiseQuestionE,
      };
      const body = newData;

      const {status} = await provider.submitDiagnoticTest(body);
      if (status === 200) {
        setShowPopupNotFinish(false);
        setShowFinishSection(true);
      }
    } catch (err: any) {
      setShowPopupNotFinish(false);
      setShowFinishSection(true);
      Toast.show({
        type: 'error',
        text1: err?.message ?? 'Something went wrong',
      });
    }
  };

  const _onDragEnd = (data: any) => {
    //ondragend mapping and set filled questions if user already make some changes in draggable list
    const temp = data?.map((obj: any, index: number) => {
      return {
        ...obj,
        order: index + 1,
      };
    });

    switch (currentQuestion) {
      case 1:
        setData((prev: any) => ({
          ...prev,
          question_group_a: temp,
          filled: !prev?.filled?.includes(0)
            ? [...prev.filled, 0]
            : prev.filled,
        }));
        break;
      case 2:
        setData((prev: any) => ({
          ...prev,
          question_group_b: temp,
          filled: !prev?.filled?.includes(1)
            ? [...prev.filled, 1]
            : prev.filled,
        }));
        break;
      case 3:
        setData((prev: any) => ({
          ...prev,
          question_group_c: temp,
          filled: !prev?.filled?.includes(2)
            ? [...prev.filled, 2]
            : prev.filled,
        }));
        break;
      case 4:
        setData((prev: any) => ({
          ...prev,
          question_group_d: temp,
          filled: !prev?.filled?.includes(3)
            ? [...prev.filled, 3]
            : prev.filled,
        }));
        break;
      case 5:
        setData((prev: any) => ({
          ...prev,
          question_group_e: temp,
          filled: !prev?.filled?.includes(4)
            ? [...prev.filled, 4]
            : prev.filled,
        }));
        break;
    }
  };
  const _handlerStepper = (text: any) => {
    //handle stepper question (top)
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';
    setCurrentQuestion(
      isNextButton
        ? currentQuestion + 1
        : isPreviousButton
        ? currentQuestion - 1
        : text,
    );
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    //handle prev next button (bottom)
    setCurrentQuestion(prevState =>
      direction === 'next' ? prevState + 1 : prevState - 1,
    );
  };

  const _handlerFinishButton = () => {
    if (data?.filled?.length > 4) {
      setShowPopupFinish(true);
      return;
    }
    setShowPopupNotFinishTest(true);
  };

  const _handlerGoBackButton = () => {
    setShowPopupNotFinish(true);
  };

  return {
    navigation,
    totalQuestion,
    setTotalQuestion,
    currentQuestion,
    setCurrentQuestion,
    _handlerStepper,
    handleNextPrevButton,
    data,
    setData,
    _renderData,
    _onDragEnd,
    showPopupFinish,
    showPopupNotFinish,
    setShowPopupFinish,
    setShowPopupNotFinish,
    _handlerSubmit,
    showFinishSection,
    setShowFinishSection,
    _handlerFinishButton,
    _handlerGoBackButton,
    showPopupNotFinishTest,
    setShowPopupNotFinishTest,
  };
};

export default useDiagnoticTest;
