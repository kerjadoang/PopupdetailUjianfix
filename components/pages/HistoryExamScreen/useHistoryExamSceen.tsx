/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllExamHistory} from '@redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';

interface RootState {
  getExamHistory: any;
}
const useHistoryExamSceen = (navigation, subject) => {
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  const {getExamHistory} = useSelector((state: RootState) => state);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [swipeUpType, setSwipeUoType] = useState('BELUM-DINILAI');
  const [swipeUpData, setSwipeUpData] = useState(null);
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
            status: ['done', 'done_scoring'],
            status_student: ['dikumpulkan', 'diperiksa'],
            subject_id: [subject?.subject?.id],
            // subject_id: [53],
            page: 0,
            limit: 10,
          },
          false,
        ),
      );
    } else if (selectedItem == 2) {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            status: ['done', 'done_scoring'],
            status_student: ['diperiksa'],
            subject_id: [subject?.subject?.id],
            // subject_id: [53],
            page: 0,
            limit: 10,
          },
          false,
        ),
      );
    } else {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            status: ['done', 'done_scoring'],
            status_student: ['dikumpulkan'],
            subject_id: [subject?.subject?.id],
            // subject_id: [53],
            page: 0,
            limit: 10,
          },
          false,
        ),
      );
    }
  }, [selectedItem]);

  const fetchDetailHistoryExam = async (items: any) => {
    setLoading(true);
    if (items?.student_exam[0].exam_history?.point !== undefined) {
      const res = await api.get(
        URL_PATH.get_exam_history(items?.student_exam[0].id),
      );
      if (res?.status === 200) {
        setSwipeUpData(items);
        setIsShowDetail(true);
        setSwipeUoType('SUDAH-DINILAI');
        setLoading(false);
        setResult(res?.data);
      } else if (res?.data?.message === 'Data already exist') {
        setLoading(false);
      }
    } else {
      setSwipeUpData(items);
      setIsShowDetail(true);
      setSwipeUoType('BELUM-DINILAI');
      setLoading(false);
    }
  };

  const goToExplaination = () => {
    setIsShowDetail(false);
    const {data} = result;
    const {correct_answer, wrong_answer, pass} = data;

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
      title: swipeUpData?.title,
      questionServiceId: QUESTION_SERVICE_TYPE.LATIHAN_SOAL_PG,
      data: {
        corrects: {data: resultDataMapping(correct_answer)},
        wrongs: {data: resultDataMapping(wrong_answer)},
        skips: {data: resultDataMapping(pass)},
      },
    });
  };

  return {
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

export default useHistoryExamSceen;
