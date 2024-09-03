import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  fetchGetAllExam,
  fetchGetLMSMateriSekolah,
  fetchGetScheduleClassSession,
  fetchSchool,
  getAllExamDestroy,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {StackNavigationProp} from '@react-navigation/stack';
import {SubjectType} from '@constants/subjectType';
import {RootState} from 'src/redux/rootReducer';
import {ParamList} from 'type/screen';
import {convertDate, isStringContains} from '@constants/functional';
import {ILMSMuridUjianListResponseData} from '@services/lms/type';

const useLMSHomeScreen = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSHomeScreen'>>();
  const isFocused = useIsFocused();
  const [isShowAboutSchool, setIsShowAboutSchool] = useState(false);
  const [isShowAllSubjects, setIsShowAllSubjects] = useState<boolean>(false);
  const [examCount, setExamCount] = useState(0);
  const [classData, setClassData] = useState<any>([]);
  const [taskCount, setTaskCount] = useState(0);

  const school = useSelector((state: RootState) => state.school);
  const getUser = useSelector((state: RootState) => state.getUser);
  const getAllExam = useSelector((state: RootState) => state.getAllExam);
  const getScheduleClassSession = useSelector(
    (state: RootState) => state.getScheduleClassSession,
  );
  const filteredAllExam = useMemo(
    () =>
      getAllExam?.data?.filter((item: ILMSMuridUjianListResponseData) => {
        return isStringContains(item.status || '', 'on_progress');
      }) || [],
    [getAllExam?.data],
  );

  const SessionClass = getScheduleClassSession?.data?.slice(0, 5);
  const getCountExam = useCallback(async () => {
    const res = await api.get(URL_PATH.get_count_exam + getUser?.data?.id);
    if (res?.status === 200) {
      setExamCount(res?.data?.data?.assigned);
    }
  }, [getUser?.data?.id]);

  const handleSwipeUpAllSubject = (_subjectData: any) => {
    setIsShowAllSubjects(false);
    navigation.navigate('ChapterLMSScreen', {
      subject_data: _subjectData,
      subject_type: SubjectType.LMS.MateriSekolah,
    });
  };

  const getCountTask = useCallback(async () => {
    const res = await api.get(URL_PATH.get_count_task + getUser?.data?.id);
    if (res?.status === 200) {
      setTaskCount(res?.data?.data?.not_yet);
    }
  }, [getUser?.data?.id]);

  const fetchAllData = useCallback(() => {
    dispatch(fetchGetAllExam(convertDate()?.format('YYYY-MM-DD')));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchGetLMSMateriSekolah((res: any) => {
        setClassData(res?.data?.data);
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchSchool(getUser?.data?.school_id));
      dispatch(
        fetchGetScheduleClassSession(convertDate()?.format('YYYY-MM-DD')),
      );
      getCountExam();
      getCountTask();
      fetchAllData();
    }

    return () => {
      dispatch(getAllExamDestroy());
    };
  }, [
    dispatch,
    fetchAllData,
    getCountExam,
    getCountTask,
    getUser?.data?.school_id,
    isFocused,
  ]);

  return {
    navigation,
    school,
    isShowAboutSchool,
    setIsShowAboutSchool,
    getAllExam,
    getScheduleClassSession,
    examCount,
    taskCount,
    SessionClass,
    isShowAllSubjects,
    classData,
    setIsShowAllSubjects,
    handleSwipeUpAllSubject,
    fetchAllData,
    filteredAllExam,
  };
};

export default useLMSHomeScreen;
