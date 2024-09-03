/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchgetAllTaskHistory, getAllTaskHistoryDestroy} from '@redux';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import dayjs from 'dayjs';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {showErrorToast} from '@constants/functional';

interface RootState {
  getTaskHistory: any;
}
interface Detail {
  type?: string;
  subject_name?: string;
  correction_type?: string;
  title?: string;
  time_start?: string;
  time_finish?: string;
  value?: number;
  correct?: number;
  answered?: number;
  wrong?: number;
  skip?: number;
  time_correction?: string;
  duration?: number;
  time_working_task?: string;
  items?: any;
}
const LIMIT_OFFSET = {
  limit: 10,
  offset: 0,
};

const useStudentHistoryTaskSceen = () => {
  const route = useRoute<RouteProp<ParamList, 'HistoryTaskScreen'>>();
  const subject: any = route.params;
  const student_id: any = route?.params?.student?.id;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryTaskScreen'>>();
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  const {getTaskHistory} = useSelector((state: RootState) => state);
  const taskData = getTaskHistory?.data;
  const loading = getTaskHistory?.loading;

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [swipeUpType, setSwipeUoType] = useState('BELUM-DINILAI');
  const [swipeUpData, setSwipeUpData] = useState<Detail>({});
  const [result, setResult] = useState<any>();
  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);
  const handleSelect = (x: number) => {
    setSelectedItem(x);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    setRiwayatPagination(LIMIT_OFFSET);
  }, [selectedItem]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (selectedItem === 1) {
      dispatch(
        fetchgetAllTaskHistory(
          {
            search: '',
            ...riwayatPagination,
            class_id: [],
            subject_id: [subject?.subject?.id],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: ['pending', 'finish'],
            student_id: student_id,
          },
          student_id,
        ),
      );
    } else if (selectedItem === 2) {
      dispatch(
        fetchgetAllTaskHistory(
          {
            search: '',
            ...riwayatPagination,
            class_id: [],
            subject_id: [subject?.subject?.id],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: ['finish'],
            student_id: student_id,
          },
          student_id,
        ),
      );
    } else {
      dispatch(
        fetchgetAllTaskHistory(
          {
            search: '',
            ...riwayatPagination,
            class_id: [],
            subject_id: [subject?.subject?.id],
            type: ['PR', 'Projek', 'Tugas'],
            correction_type: ['pending'],
            student_id: student_id,
          },
          student_id,
        ),
      );
    }
  }, [riwayatPagination, selectedItem, isFocused]);

  useLayoutEffect(() => {
    return () => {
      dispatch(getAllTaskHistoryDestroy());
    };
  }, []);

  const __onEndReachedRiwayat = () => {
    const {riwayatDatasNextPage, isLoadingDatas} = getTaskHistory;
    if (riwayatDatasNextPage && !isLoadingDatas) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        offset: riwayatPagination.offset + riwayatPagination.limit,
      }));
    }
  };

  const fetchDetailHistoryTask = async (items: any) => {
    setLoading(true);

    const res = await api.get(URL_PATH.get_task_detail(items?.id));
    if (res?.status === 200) {
      const detail = res?.data?.data;
      const dataDetail: Detail = {
        items: items,
        type: detail?.task_teacher?.type,
        subject_name: detail?.task_teacher?.subject?.name,
        correction_type: detail?.task_student?.correction_type,
        title: detail?.task_teacher?.title,
        time_start: dayjs(detail?.task_student?.task_teacher?.time_start)
          .locale('id')
          .format('dddd, D MMMM YYYY • HH:mm'),
        time_finish: dayjs(detail?.task_student?.task_teacher?.time_finish)
          .locale('id')
          .format('dddd, D MMMM YYYY • HH:mm'),
        value: detail?.task_student?.value,
        correct: detail?.task_student?.correct,
        wrong: detail?.task_student?.wrong,
        skip: detail?.task_student?.skip,
        time_correction: dayjs(
          detail?.task_student?.task_teacher?.time_correction,
        )
          .locale('id')
          .format('dddd, D MMMM YYYY • HH:mm'),
        duration:
          detail?.duration ??
          dayjs(detail?.task_student?.time_finish).diff(
            dayjs(detail?.task_student?.task_teacher?.time_start)
              .locale('id')
              .format('dddd, D MMMM YYYY • HH:mm'),
            'minute',
          ),
      };

      try {
        const resDiscussion = await api.get(
          URL_PATH.get_task_history_student_discussion(
            res?.data?.data?.task_student?.id,
            student_id ?? student_id,
          ),
        );

        if (resDiscussion?.status === 200) {
          setResult(resDiscussion?.data);
        }
      } catch (error: any) {
        Toast.show({type: 'error', text1: error?.message});
      }
      setSwipeUpData(dataDetail);
      setIsShowDetail(true);
      setLoading(false);
    } else if (res?.data?.message === 'Data already exist') {
      setLoading(false);
    }
  };

  const fetchDetailHistoryTaskTeacher = async (items: any) => {
    setLoading(true);
    if (
      items?.student_value !== 'Tidak mengerjakan' &&
      items?.student_value !== 'Belum dinilai'
    ) {
      const res = await api.get(
        URL_PATH.get_task_history_student_detail_v2(items?.id, student_id),
      );

      if (res.status != 200) {
        setLoading(false);
        showErrorToast(res.data?.message || 'Terjadi Kesalahan');
        return;
      }

      if (res?.status === 200) {
        const detail = res?.data?.data;
        const dataDetail: Detail = {
          type: detail?.task_teacher?.type,
          subject_name: detail?.task_teacher?.subject?.name,
          correction_type: detail?.task_student?.correction_type,
          title: detail?.task_teacher?.title,
          time_start: dayjs(detail?.task_student?.task_teacher?.time_start)
            .locale('id')
            .format('dddd, D MMMM YYYY • HH:mm'),
          time_finish: dayjs(detail?.task_student?.task_teacher?.time_finish)
            .locale('id')
            .format('dddd, D MMMM YYYY • HH:mm'),
          value: detail?.task_student?.value,
          correct: detail?.task_student?.correct,
          wrong: detail?.task_student?.wrong,
          skip: detail?.task_student?.skip,
          time_correction: dayjs(
            detail?.task_student?.task_teacher?.time_correction,
          )
            .locale('id')
            .format('dddd, D MMMM YYYY • HH:mm'),
          duration:
            detail?.duration ??
            dayjs(detail?.task_student?.time_finish).diff(
              dayjs(detail?.task_student?.task_teacher?.time_start)
                .locale('id')
                .format('dddd, D MMMM YYYY • HH:mm'),
              'minute',
            ),
        };

        const resDiscussion = await api.get(
          URL_PATH.get_task_history_student_discussion(
            res?.data?.data?.task_student?.id,
            student_id,
          ),
        );

        if (resDiscussion?.status === 200) {
          const resDiscussionData = resDiscussion?.data?.data;
          if (resDiscussionData?.correct?.length != 0) {
            dataDetail.correct =
              resDiscussionData?.correct?.length ??
              resDiscussionData?.ttl_correct;
          }

          if (resDiscussionData?.wrong?.length != 0) {
            dataDetail.wrong =
              resDiscussionData?.wrong?.length ?? resDiscussionData?.ttl_wrong;
          }

          if (resDiscussionData?.skip?.length != 0) {
            dataDetail.skip =
              resDiscussionData?.skip?.length ?? resDiscussionData?.ttl_skip;
          }

          if (resDiscussionData?.answered?.length != 0) {
            dataDetail.answered = resDiscussionData?.answered?.length;
          }
          setSwipeUpData(dataDetail);
          setIsShowDetail(true);
          setSwipeUoType('SUDAH-DINILAI');
          setResult(resDiscussion?.data);
        } else {
          showErrorToast(
            resDiscussion?.data?.message || 'Gagal mendapatkan data',
          );
        }

        setLoading(false);
      } else if (res?.data?.message === 'Data already exist') {
        setLoading(false);
      }
    } else {
      setLoading(false);
      // navigation.navigate('CheckPRProjectTeacherScreen', {
      //   student: student,
      //   task: {...items, task_teacher: items},
      //   task_student_id: items?.task_student_id,
      //   taskId: items?.id,
      // });
      navigation.navigate('TaskDetailTeacherScreen', {
        id: items?.id,
      });
    }
  };

  const goToExplaination = async () => {
    setIsShowDetail(false);
    const {data} = result;

    if (data) {
      const {correct, wrong, answered, skip, type} = data;
      const resultDataMapping = (values: any) => {
        return values?.map((value: any) => ({
          id: value?.number,
          orders: value?.number,
          question: value?.question,
          answer_user: value?.answer,
          answer_system: value?.correct_answer,
          explanation: value?.discussion,
        }));
      };
      const correctsData = resultDataMapping(correct);
      const answersData = resultDataMapping(answered);
      const wrongsData = resultDataMapping(wrong);
      const skipsData = resultDataMapping(skip);
      const screenParams = {
        title: swipeUpData.title,
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
  };

  const onPressBack = () => {
    navigation.goBack();
    dispatch(getAllTaskHistoryDestroy());
  };

  return {
    route,
    subject,
    navigation,
    handleSelect,
    selectedItem,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryTask,
    swipeUpType,
    swipeUpData,
    result,
    goToExplaination,
    getTaskHistory,
    __onEndReachedRiwayat,
    taskData,
    student_id,
    fetchDetailHistoryTaskTeacher,
    onPressBack,
    loading,
  };
};

export default useStudentHistoryTaskSceen;
