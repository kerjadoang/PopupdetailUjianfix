/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGetAllExamParentHistory,
  getAllExamHistoryParentDestroy,
} from '@redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {NewGetAllExam} from '@constants/GetAllExam';
import {goToExplanationUtils} from '../StudentHistoryExamScreen/utils';
import {isStringContains} from '@constants/functional';
import {INavigation, IRoute} from 'type/screen';
import {useNavigation, useRoute} from '@react-navigation/native';

const LIMIT_OFFSET = {
  limit: 10,
  page: 1,
};

interface RootState {
  getExamHistoryParent: any;
}

const useHistoryExamSceen = (params: any) => {
  const navigation = useNavigation<INavigation<'HistoryExamScreenParent'>>();
  const route = useRoute<IRoute<'HistoryExamScreenParent'>>();
  const {data: dataAnak} = route?.params;
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  const {getExamHistoryParent} = useSelector((state: RootState) => state);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [swipeUpType, setSwipeUoType] = useState('BELUM-DINILAI');
  const [swipeUpData, setSwipeUpData] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);

  const handleSelect = (x: number) => {
    setSelectedItem(x);
  };

  useEffect(() => {
    if (selectedItem == 1) {
      dispatch(
        fetchGetAllExamParentHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[0].key,
            subject_id: [params?.subject?.id],
          },
          params?.data?.access_token,
          riwayatPagination === LIMIT_OFFSET,
        ),
      );
    } else if (selectedItem == 2) {
      dispatch(
        fetchGetAllExamParentHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[1].key,
            subject_id: [params?.subject?.id],
          },
          params?.data?.access_token,
          riwayatPagination === LIMIT_OFFSET,
        ),
      );
    } else {
      dispatch(
        fetchGetAllExamParentHistory(
          {
            search: '',
            ...riwayatPagination,
            status: NewGetAllExam[2].key,
            subject_id: [params?.subject?.id],
          },
          params?.data?.access_token,
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
    dispatch(getAllExamHistoryParentDestroy());
  };

  const __onEndReachedRiwayat = () => {
    const {riwayatDatasNextPage, isLoadingDatas} = getExamHistoryParent;
    if (riwayatDatasNextPage && !isLoadingDatas) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const fetchDetailHistoryExam = async (items: IUjianHistory) => {
    setLoading(true);
    if (isDoneScoring(items)) {
      // const res = await api.get(
      //   URL_PATH.get_student_report_exam_detail(
      //     items?.student_exam?.[0]?.id!,
      //     student_id!,
      //   ),
      // );
      const res = await api.get(
        URL_PATH.get_exam_history(items?.student_exam?.[0].id),
        {headers: {Authorization: 'Bearer ' + dataAnak?.access_token}},
      );
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
      setSwipeUpData(items);
      setIsShowDetail(true);
      setSwipeUoType('BELUM-DINILAI');
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
    handleSelect,
    selectedItem,
    getExamHistoryParent,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryExam,
    swipeUpType,
    swipeUpData,
    result,
    goToExplaination,
    __onEndReachedRiwayat,
    isDoneScoring,
    dataAnak,
  };
};

export default useHistoryExamSceen;
