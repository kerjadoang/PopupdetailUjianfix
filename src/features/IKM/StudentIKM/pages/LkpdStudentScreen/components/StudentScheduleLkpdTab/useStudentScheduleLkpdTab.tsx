import {useDisclosure} from '@hooks/useDisclosure';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {
  useLkpdActions,
  useLkpdDataSchedule,
  useLkpdReqBodySchedule,
  useLkpdSearch,
} from '../../zustand';
import {useIsFocused} from '@react-navigation/native';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {getDetailLKPD} from '@features/IKM/services/lkpdServices';
import {sleep} from '@constants/functional';
interface IuseStudentScheduleLkpdTab {
  lkpd_id?: number;
}

const useStudentScheduleLkpdTab = ({lkpd_id}: IuseStudentScheduleLkpdTab) => {
  const isFocused = useIsFocused();
  const {navigateScreen} = useNavigate();
  const [lkpdCardDetail, setLkpdCardDetail] = useState<ILKPDTaskTaskTeacher>();
  const lkpdScheduleData = useLkpdDataSchedule();
  const lkpdReqBodySchedule = useLkpdReqBodySchedule();
  const lkpdSearchText = useLkpdSearch();
  const {
    setMode: setLkpdMode,
    getDataSchedule,
    setReqBodySchedule,
  } = useLkpdActions();
  const {
    isVisible: isSwipeUpShow,
    type: swipeUpType,
    setType: setSwipeUpType,
    toggle: toggleSwipeUp,
    data: swipeUpData,
    hide: hideSwipeUp,
  } = useDisclosure<SwipeUpLKPDType, any>();
  const {
    isVisible: isShowSwipeupMapel,
    hide: hideSwipeupMapel,
    show: showSwipeupMapel,
  } = useDisclosure();
  const {data: subjectData}: {data: Array<Subject>} = useSelector(
    (state: RootState) => state.getSubjectsByUserClass,
  );

  const mapingSubject = (subjects: Array<Subject>) =>
    (subjects || [])?.map((subject: Subject) => {
      return {
        id: subject.id,
        name: subject.name,
        value: subject,
      } as BaseFilter;
    });

  const mappedSubjectData: Array<BaseFilter<any>> = useMemo(
    () => mapingSubject(subjectData),
    [],
  );

  const currentSelectedSubject: () => Array<BaseFilter<any>> = () => {
    const currentSubjects = subjectData.filter(subject =>
      lkpdReqBodySchedule.subject_id?.includes(subject.id || 0),
    );
    return mapingSubject(currentSubjects);
  };

  const onApplyFilter = (data: Array<BaseFilter<Subject>>) => {
    hideSwipeupMapel();

    setReqBodySchedule({
      offset: 0,
      subject_id: data.map(subject => {
        return subject.value.id || 0;
      }),
    });
  };

  const onResetFilter = () => {
    hideSwipeupMapel();
    setReqBodySchedule({
      offset: 0,
      subject_id: [],
    });
  };

  const fetchData = () => {
    getDataSchedule();
  };

  const onEndReached = () => {
    if (!isFocused) {
      return;
    }
    if (!lkpdScheduleData) {
      return;
    }
    setReqBodySchedule({
      offset: lkpdReqBodySchedule.offset! + 1,
    });
  };

  //listen when search text change
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!lkpdScheduleData) {
      return;
    }
    setReqBodySchedule({
      search: lkpdSearchText,
      offset: 0,
    });
  }, [lkpdSearchText]);

  //fetchData
  useEffect(() => {
    fetchData();
  }, [lkpdReqBodySchedule]);

  useAsyncEffect(async () => {
    try {
      await sleep(500);
      if (lkpdCardDetail || !lkpdScheduleData.list || !lkpd_id) {
        return;
      }
      const resData = await getDetailLKPD({
        task_id: lkpd_id,
        user_role: 'MURID',
      });
      setLkpdCardDetail(resData?.task_teacher);

      // setTimeout(() => {
      //   toggleSwipeUp({data: resData?.task_teacher, type: 'schedule'});
      // }, 500);
    } catch (error) {
      setLkpdCardDetail({title: 'Data tidak ditemukan'});
      // showErrorToast(isText(error)?error:'Terjadi Kesalahan');
      // showErrorToast('Tugas LKPD sudah tidak tersedia');
      // showErrorToast(isText(error))
    } finally {
      lkpd_id = undefined;
    }
  }, [lkpdScheduleData.list]);

  return {
    navigateScreen,
    isSwipeUpShow,
    swipeUpType,
    setSwipeUpType,
    toggleSwipeUp,
    swipeUpData,
    hideSwipeUp,
    lkpdScheduleData,
    setLkpdMode,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    mappedSubjectData,
    onApplyFilter,
    onResetFilter,
    currentSelectedSubject,
    onEndReached,
    lkpdSearchText,
  };
};
export default useStudentScheduleLkpdTab;
