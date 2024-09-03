/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllExamHistory, getAllExamHistoryDestroy} from '@redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {NewGetAllExam} from '@constants/GetAllExam';
import {isStringContains} from '@constants/functional';
import {goToExplanationUtils} from './utils';

interface RootState {
  getExamHistory: any;
}

const LIMIT_OFFSET = {
  limit: 10,
  page: 1,
};

const useStudentHistoryExamSceen = () => {
  const route = useRoute<RouteProp<ParamList, 'HistoryExamScreen'>>();
  const subject: any = route.params;
  const student_id: any = route?.params?.student_id;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryExamScreen'>>();
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  const {getExamHistory} = useSelector((state: RootState) => state);
  const loading = getExamHistory?.loading;
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [swipeUpType, setSwipeUoType] = useState('BELUM-DINILAI');
  const [swipeUpData, setSwipeUpData] = useState<any>(null);
  const [result, setResult] = useState(null);
  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);
  const handleSelect = (x: number) => {
    setSelectedItem(x);
  };
  const isFromTeacher = !!student_id;

  useEffect(() => {
    if (selectedItem === 1) {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[0].key,
            // status: ['done', 'done_scoring'],
            // status_student: ['dikumpulkan', 'diperiksa'],
            subject_id: [subject?.subject?.id],
            student_id: student_id,
          },
          undefined,
          riwayatPagination === LIMIT_OFFSET,
        ),
      );
    } else if (selectedItem === 2) {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[1].key,
            // status: ['done_scoring'],
            // status_student: ['diperiksa'],
            subject_id: [subject?.subject?.id],
            student_id: student_id,
          },
          undefined,
          riwayatPagination === LIMIT_OFFSET,
        ),
      );
    } else {
      dispatch(
        fetchGetAllExamHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[2].key,
            // status: ['done'],
            // status_student: ['dikumpulkan'],
            subject_id: [subject?.subject?.id],
            student_id: student_id,
          },
          undefined,
          riwayatPagination === LIMIT_OFFSET,
        ),
      );
    }
  }, [riwayatPagination, selectedItem]);

  useEffect(() => {
    setRiwayatPagination(LIMIT_OFFSET);
  }, [selectedItem]);

  useEffect(() => {
    resetList();
  }, []);

  const resetList = () => {
    dispatch(getAllExamHistoryDestroy());
  };

  const __onEndReachedRiwayat = () => {
    const {riwayatDatasNextPage, isLoadingDatas} = getExamHistory;
    if (riwayatDatasNextPage && !isLoadingDatas) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const fetchDetailHistoryExam = async (items: any) => {
    setLoading(true);

    if (isDoneScoring(items)) {
      const res = student_id
        ? await api.get(
            URL_PATH.get_student_report_exam_detail(
              items?.student_exam[0].exam_history?.student_exam_id,
              items?.student_exam[0].user_id,
            ),
          )
        : await api.get(URL_PATH.get_exam_history(items?.student_exam[0].id));
      if (res?.status === 200) {
        setSwipeUpData(items);
        setIsShowDetail(true);
        setSwipeUoType('SUDAH-DINILAI');
        setResult(res?.data);
      } else if (res?.data?.message === 'Data already exist') {
      }
      setLoading(false);
    } else {
      setLoading(false);
      if (student_id) {
        const student_paper_id =
          (getExamHistory.data as IUjianHistory)?.student_exam?.[0]
            ?.student_paper_id || '';
        navigation.navigate('TeacherCheckExamScreen', {
          question_package_id: items.question_package_id,
          student_exam_id: items.student_exam?.[0]?.id,
          student_name: items?.fullname,
          exam_name: items?.title,
          exam_id: items.id,
          student_paper_id: student_paper_id,
          mode: 'SCORING',
        });
      } else {
        setSwipeUpData(items);
        setIsShowDetail(true);
        setSwipeUoType('BELUM-DINILAI');
      }
    }
  };

  const goToExplaination = () => {
    setIsShowDetail(false);
    const {data}: any = result;

    return goToExplanationUtils({
      data: data,
      navigation: navigation,
      title: swipeUpData?.title,
      questionServiceId: QUESTION_SERVICE_TYPE.PR_PROJEK_TUGAS,
      // showAnswered: false,
    });
  };

  const isDoneScoring = (item: any) => {
    const selectedFilter = NewGetAllExam.find(item => item.id === selectedItem);

    const isDoneScoring =
      (item?.student_exam?.[0]?.status === 'selesai' ||
        isStringContains(item?.status, 'done_scoring')) &&
      selectedFilter?.key.some(item => isStringContains(item, 'scoring'));
    return isDoneScoring;
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
    __onEndReachedRiwayat,
    student_id,
    loading,
    isDoneScoring,
    isFromTeacher,
  };
};

export default useStudentHistoryExamSceen;
