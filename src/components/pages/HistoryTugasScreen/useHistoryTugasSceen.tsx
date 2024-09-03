/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllExamHistory} from '@redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import api from '@api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';

interface RootState {
  getExamHistory: any;
}
const useHistoryTugasSceen = () => {
  const route = useRoute<RouteProp<ParamList, 'HistoryTugasScreen'>>();
  const subject: any = route.params;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryTugasScreen'>>();
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  const {getExamHistory} = useSelector((state: RootState) => state);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [swipeUpType, setSwipeUoType] = useState('BELUM-DINILAI');
  const [swipeUpData, setSwipeUpData] = useState({
    data: [],
    detail: [],
  });
  const [result, setResult] = useState(null);

  const handleSelect = (x: number) => {
    setSelectedItem(x);
  };

  useEffect(() => {
    if (selectedItem == 1) {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            limit: 10,
            offset: 0,
            class_id: [subject?.subject?.class_id],
            // class_id: [10],
            rombel_class_school_id: [],
            subject_id: [subject?.subject?.id],
            // subject_id: [50],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: [],
          },
          true,
        ),
      );
    } else if (selectedItem == 2) {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            limit: 10,
            offset: 0,
            class_id: [subject?.subject?.class_id],
            // class_id: [10],
            rombel_class_school_id: [],
            subject_id: [subject?.subject?.id],
            // subject_id: [50],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: ['finish'],
          },
          true,
        ),
      );
    } else {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            limit: 10,
            offset: 0,
            class_id: [subject?.subject?.class_id],
            // class_id: [10],
            rombel_class_school_id: [],
            subject_id: [subject?.subject?.id],
            // subject_id: [50],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: ['pending'],
          },
          true,
        ),
      );
    }
  }, [selectedItem]);

  const fetchDetailHistoryExam = async (items: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      setLoading(true);
      const res = await api
        .get(`/lms/v1/student/task/home/history/${items?.id}`, {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        })
        .then(response => {
          if (
            response?.data?.data?.task_student?.correction_type === 'finish'
          ) {
            setSwipeUpData({data: items, detail: response?.data?.data});
            setIsShowDetail(true);
            setSwipeUoType('SUDAH-DINILAI');
          } else {
            setSwipeUpData({data: items, detail: response?.data?.data});
            setIsShowDetail(true);
            setSwipeUoType('BELUM-DINILAI');
          }
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchPembahasan = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      setLoading(true);
      const res = await api
        .get(
          `/lms/v1/student-report/task/history/discussion/${swipeUpData?.data?.task_student_id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        )
        .then(response => {
          setLoading(false);
          if (response?.data?.code === 100) {
            const resultDataMapping = (values: []) =>
              values?.map((value: any) => ({
                id: value?.selected_option?.id,
                question: value?.question?.question,
                answer_user: value?.user_answer?.key,
                answer_system: value?.question?.options?.find(
                  (_value: any) => _value?.is_correct,
                )?.key,
                is_correct: value?.selected_option?.is_correct,
                explanation: value?.question?.question_discuss?.explanation,
              }));
            return navigation.navigate('ExplanationScreen', {
              title: swipeUpData?.data?.title,
              questionServiceId: QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS,
              data: {
                corrects: {
                  data: resultDataMapping(response?.data?.data?.correct),
                },
                wrongs: {data: resultDataMapping(response?.data?.data?.wrong)},
                skips: {data: resultDataMapping(response?.data?.data?.skip)},
              },
            });
          }
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const goToExplaination = () => {
    setIsShowDetail(false);
    fetchPembahasan();
    // const {data} = result;
    // const {correct_answer, wrong_answer, pass} = data;

    // const resultDataMapping = (values: []) =>
    //   values?.map((value: any) => ({
    //     id: value?.selected_option?.id,
    //     question: value?.question?.question,
    //     answer_user: value?.user_answer?.key,
    //     answer_system: value?.question?.options?.find(
    //       (_value: any) => _value?.is_correct,
    //     )?.key,
    //     is_correct: value?.selected_option?.is_correct,
    //     explanation: value?.question?.question_discuss?.explanation,
    //   }));

    // return navigation.navigate('ExplanationScreen', {
    //   title: swipeUpData?.title,
    //   questionServiceId: QUESTION_SERVICE_TYPE.LATIHAN_SOAL_PG,
    //   data: {
    //     corrects: {data: resultDataMapping(correct_answer)},
    //     wrongs: {data: resultDataMapping(wrong_answer)},
    //     skips: {data: resultDataMapping(pass)},
    //   },
    // });
  };

  return {
    route,
    subject,
    navigation,
    handleSelect,
    selectedItem,
    getExamHistory,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryExam,
    swipeUpType,
    swipeUpData,
    result,
    goToExplaination,
  };
};

export default useHistoryTugasSceen;
