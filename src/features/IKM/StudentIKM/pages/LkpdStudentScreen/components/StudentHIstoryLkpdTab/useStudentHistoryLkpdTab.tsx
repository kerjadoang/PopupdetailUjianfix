import {useDisclosure} from '@hooks/useDisclosure';

import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {
  useLkpdActions,
  useLkpdDataHistory,
  useLkpdReqBodyHistory,
  useLkpdSearch,
} from '../../zustand';

const useStudentHistoryLkpdTab = () => {
  const {navigateScreen} = useNavigate();
  const lkpdHistoryData = useLkpdDataHistory();
  const lkpdReqBodyHistory = useLkpdReqBodyHistory();
  const lkpdSearchText = useLkpdSearch();
  const {
    isVisible: isShowSwipeupMapel,
    hide: hideSwipeupMapel,
    show: showSwipeupMapel,
  } = useDisclosure();
  const {
    setMode: setLkpdMode,
    getDataHistory,
    setReqBodyHistory,
  } = useLkpdActions();
  const {
    isVisible: isSwipeUpShow,
    type: swipeUpType,
    setType: setSwipeUpType,
    toggle: toggleSwipeUp,
    data: swipeUpData,
    hide: hideSwipeUp,
  } = useDisclosure<SwipeUpLKPDType, LKPDCardData>();
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
      lkpdReqBodyHistory.subject_id?.includes(subject.id || 0),
    );
    return mapingSubject(currentSubjects);
  };

  const onApplyFilter = (data: Array<BaseFilter<Subject>>) => {
    hideSwipeupMapel();

    setReqBodyHistory({
      offset: 0,
      subject_id: data.map(subject => {
        return subject.value.id || 0;
      }),
    });
  };

  const onResetFilter = () => {
    hideSwipeupMapel();
    setReqBodyHistory({
      offset: 0,
      subject_id: [],
    });
  };

  const onEndReached = () => {
    if (!lkpdHistoryData) {
      return;
    }
    setReqBodyHistory({
      offset: lkpdReqBodyHistory.offset! + 1,
    });
  };

  //listen when search text changes
  useEffect(() => {
    if (!lkpdHistoryData) {
      return;
    }
    setReqBodyHistory({
      offset: 0,
      search: lkpdSearchText,
    });
  }, [lkpdSearchText]);

  //fetch history data
  useEffect(() => {
    fetchData();
  }, [lkpdReqBodyHistory]);

  const fetchData = () => {
    getDataHistory();
  };

  return {
    navigateScreen,
    isSwipeUpShow,
    swipeUpType,
    setSwipeUpType,
    toggleSwipeUp,
    swipeUpData,
    hideSwipeUp,
    lkpdHistoryData,
    setLkpdMode,
    currentSelectedSubject,
    mappedSubjectData,
    onApplyFilter,
    onResetFilter,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    onEndReached,
    lkpdSearchText,
  };
};
export default useStudentHistoryLkpdTab;
