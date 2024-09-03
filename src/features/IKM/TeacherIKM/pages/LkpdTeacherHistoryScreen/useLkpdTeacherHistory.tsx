import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useMemo, useState} from 'react';
import {useMergeState} from '@constants/functional';
import {
  useTeacherHistoryLkpdActions,
  useTeacherHistoryLkpdDataHistory,
  useTeacherHistoryLkpdReqBodyHistory,
  useTeacherHistoryLkpdSearch,
} from './zustand';
import {useListPhaseClass} from '@features/IKM/zustand';
import {useDisclosure} from '@hooks/useDisclosure';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import dayjs from 'dayjs';

const useLkpdTeacherHistory = () => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LkpdTeacherHistoryScreen'>>();
  const {navigateScreen} = useNavigate();

  const teacherLkpdHistoryData = useTeacherHistoryLkpdDataHistory();
  const teacherLkpdReqBodyHistory = useTeacherHistoryLkpdReqBodyHistory();
  const teacherHistoryLkpdSearch = useTeacherHistoryLkpdSearch();
  const listPhaseClass = useListPhaseClass();

  const {
    setMode: setTeacherHistoryLkpdMode,
    setSearch: setTeacherHistoryLkpdSearch,
    getDataHistory,
    setReqBodyHistory,
    resetState,
  } = useTeacherHistoryLkpdActions();

  const {
    isVisible: isShowSwipeupMapel,
    hide: hideSwipeupMapel,
    show: showSwipeupMapel,
  } = useDisclosure();

  const {
    isVisible: isShowSwipeupFase,
    hide: hideSwipeupFase,
    show: showSwipeupFase,
  } = useDisclosure();

  const {
    isVisible: isShowSwipeupDate,
    hide: hideSwipeupDate,
    show: showSwipeupDate,
  } = useDisclosure();

  const [dateFrom, setDateFrom] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [dateTo, setDateTo] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [dateFilterType, setDateFilterType] = useState<
    'Semua Tanggal' | 'Pilih Tanggal'
  >('Semua Tanggal');

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

  const mapingPhase = (phase: Array<IPhaseClass>) =>
    (phase || [])?.map((phase: IPhaseClass) => {
      return {
        id: phase.id,
        name: phase.name,
        value: phase,
      } as BaseFilter;
    });

  const mappedSubjectData: Array<BaseFilter<any>> = useMemo(
    () => mapingSubject(subjectData),
    [],
  );

  const mappedPhaseData: Array<BaseFilter<any>> = useMemo(
    () => mapingPhase(listPhaseClass),
    [],
  );

  const currentSelectedSubject: () => Array<BaseFilter<any>> = () => {
    const currentSubjects = subjectData.filter(subject =>
      teacherLkpdReqBodyHistory.subject_id?.includes(subject.id || 0),
    );
    return mapingSubject(currentSubjects);
  };

  const currentSelectedPhase: () => Array<BaseFilter<any>> = () => {
    const currentPhases = listPhaseClass.filter(phase =>
      teacherLkpdReqBodyHistory.class_id?.includes(phase.id || 0),
    );
    return mapingPhase(currentPhases);
  };

  const onApplyFilterSubject = (data: Array<BaseFilter<Subject>>) => {
    hideSwipeupMapel();

    setReqBodyHistory({
      offset: 0,
      subject_id: data.map(subject => {
        return subject.value.id || 0;
      }),
    });
  };

  const onApplyFilterPhase = (data: Array<BaseFilter<IPhaseClass>>) => {
    hideSwipeupFase();

    setReqBodyHistory({
      offset: 0,
      class_id: data.map(phase => {
        return phase.value.id || 0;
      }),
    });
  };

  const onApplyFilterDate = (time_start: string, time_finish: string) => {
    hideSwipeupFase();

    setReqBodyHistory({
      offset: 0,
      time_start: time_start,
      time_finish: time_finish,
    });
  };

  const onResetFilterSubject = () => {
    hideSwipeupMapel();
    setReqBodyHistory({
      subject_id: [],
    });
  };
  const onResetFilterPhase = () => {
    hideSwipeupFase();
    setReqBodyHistory({
      class_id: [],
    });
  };
  const onResetFilterDate = () => {
    hideSwipeupDate();
    setDateFilterType('Semua Tanggal');
    setReqBodyHistory({
      time_start: '',
      time_finish: '',
    });
  };

  const fetchData = () => {
    getDataHistory();
  };

  const onEndReached = () => {
    if (!isFocused) {
      return;
    }
    if (!teacherLkpdHistoryData) {
      return;
    }
    setReqBodyHistory({
      offset: teacherLkpdReqBodyHistory.offset! + 1,
    });
  };

  //listen when search text change
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!teacherLkpdHistoryData) {
      return;
    }

    setReqBodyHistory({
      search: teacherHistoryLkpdSearch,
      offset: 0,
    });
  }, [teacherHistoryLkpdSearch]);

  //fetchData
  useEffect(() => {
    fetchData();
  }, [teacherLkpdReqBodyHistory]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  const [state, setState] = useMergeState({
    isShowSwipeUpOption: false,
  });

  const {isShowSwipeUpOption} = state;
  return {
    navigation,
    navigateScreen,
    setState,
    isShowSwipeUpOption,
    teacherHistoryLkpdSearch,
    setTeacherHistoryLkpdSearch,
    teacherLkpdHistoryData,
    setTeacherHistoryLkpdMode,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    isShowSwipeupFase,
    showSwipeupFase,
    hideSwipeupFase,
    isShowSwipeupDate,
    showSwipeupDate,
    hideSwipeupDate,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    dateFilterType,
    setDateFilterType,
    mappedSubjectData,
    mappedPhaseData,
    onApplyFilterSubject,
    onApplyFilterPhase,
    onApplyFilterDate,
    onResetFilterSubject,
    onResetFilterPhase,
    onResetFilterDate,
    currentSelectedSubject,
    currentSelectedPhase,
    onEndReached,
    listPhaseClass,
  };
};
export default useLkpdTeacherHistory;
