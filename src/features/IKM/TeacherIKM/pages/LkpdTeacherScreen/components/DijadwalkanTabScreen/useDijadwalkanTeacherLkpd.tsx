import {useNavigate} from '@hooks/useNavigate';
import {useIsFocused} from '@react-navigation/native';
import {
  useTeacherLkpdActions,
  useTeacherLkpdDataSchedule,
  useTeacherLkpdReqBodySchedule,
  useTeacherLkpdSearchSchedule,
} from '../../zustand';
import {
  dismissLoading,
  isText,
  showErrorToast,
  showLoading,
  useMergeState,
} from '@constants/functional';
import {useEffect, useMemo} from 'react';
import {useDisclosure} from '@hooks/useDisclosure';
import {useAllSubjects, useListPhaseClass} from '@features/IKM/zustand';
import {teacherDeleteLembarKerja} from '@features/IKM/services/lkpdServices';

const useDijadwalkanTeacherLkpd = () => {
  const isFocused = useIsFocused();
  const {navigateScreen} = useNavigate();
  const teacherLkpdScheduleData = useTeacherLkpdDataSchedule();
  const teacherLkpdReqBodySchedule = useTeacherLkpdReqBodySchedule();
  const listPhaseClass = useListPhaseClass();
  const teacherLkpdSearch = useTeacherLkpdSearchSchedule();
  const subjectData = useAllSubjects();

  const {
    setMode: setTeacherLkpdMode,
    setSearch: setTeacherLkpdSearch,
    getDataSchedule,
    setReqBodySchedule,
    setCurrentType,
  } = useTeacherLkpdActions();
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

  const mapingSubject = (subjects: Array<IKMSubject>) =>
    (subjects || [])?.map((subject: IKMSubject) => {
      return {
        id: subject.subject_details?.[0].id,
        name: subject.subject_details?.[0].name,
        value: subject.subject_details,
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
    [subjectData],
  );
  const mappedPhaseData: Array<BaseFilter<any>> = useMemo(
    () => mapingPhase(listPhaseClass),
    [],
  );

  const currentSelectedSubject: () => Array<BaseFilter<any>> = () => {
    const currentSubjects = subjectData.filter(subject =>
      teacherLkpdReqBodySchedule.subject_id?.includes(
        subject.subject_details?.[0]?.id || 0,
      ),
    );
    return mapingSubject(currentSubjects);
  };

  const currentSelectedPhase: () => Array<BaseFilter<any>> = () => {
    const currentPhases = listPhaseClass.filter(phase =>
      teacherLkpdReqBodySchedule.class_id?.includes(phase.id || 0),
    );
    return mapingPhase(currentPhases);
  };

  const onApplyFilterSubject = (data: Array<BaseFilter<IKMSubject>>) => {
    hideSwipeupMapel();

    setReqBodySchedule({
      offset: 0,
      subject_id: data.map(subject => {
        return subject.id || 0;
      }),
    });
  };

  const onApplyFilterPhase = (data: Array<BaseFilter<IPhaseClass>>) => {
    hideSwipeupFase();

    setReqBodySchedule({
      offset: 0,
      class_id: data.map(phase => {
        return phase.value.id || 0;
      }),
    });
  };

  const onResetFilterSubject = () => {
    hideSwipeupMapel();
    setReqBodySchedule({
      offset: 0,
      subject_id: [],
    });
  };
  const onResetFilterPhase = () => {
    hideSwipeupFase();
    setReqBodySchedule({
      offset: 0,
      class_id: [],
    });
  };

  const fetchData = () => {
    getDataSchedule();
  };

  const onEndReached = () => {
    if (!isFocused) {
      return;
    }
    if (!teacherLkpdScheduleData) {
      return;
    }
    setReqBodySchedule({
      offset: teacherLkpdReqBodySchedule.offset! + 1,
    });
  };

  //listen when search text change
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!teacherLkpdScheduleData) {
      return;
    }
    setReqBodySchedule({
      search: teacherLkpdSearch,
      offset: 0,
    });
  }, [teacherLkpdSearch]);

  //fetchData
  useEffect(() => {
    fetchData();
  }, [teacherLkpdReqBodySchedule]);

  //setCurrentType
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setCurrentType('Schedule');
  }, [isFocused]);

  const [state, setState] = useMergeState({
    isShowSwipeUpOption: false,
    swipeUpData: '',
  });

  const {isShowSwipeUpOption, swipeUpData} = state;

  const onDeleteLembarKerja = async (data: LKPDCardData) => {
    try {
      showLoading();
      await teacherDeleteLembarKerja({task_id: data.id || 0});
      setReqBodySchedule({offset: 0});
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  return {
    navigateScreen,
    isShowSwipeUpOption,
    setState,
    teacherLkpdSearch,
    setTeacherLkpdSearch,
    teacherLkpdScheduleData,
    setTeacherLkpdMode,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    isShowSwipeupFase,
    showSwipeupFase,
    hideSwipeupFase,
    listPhaseClass,
    mappedSubjectData,
    mappedPhaseData,
    onApplyFilterSubject,
    onApplyFilterPhase,
    onResetFilterSubject,
    onResetFilterPhase,
    currentSelectedSubject,
    currentSelectedPhase,
    onEndReached,
    swipeUpData,
    onDeleteLembarKerja,
  };
};

export default useDijadwalkanTeacherLkpd;
