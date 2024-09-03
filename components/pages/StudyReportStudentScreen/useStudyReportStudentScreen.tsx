import api from '@api/index';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  fetchMapelDetailMateri,
  fetchDurationSummary,
  taskDestroy,
  examDestroy,
  mapelDetailMateriDestroy,
  durationSummaryDestroy,
} from '@redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {URL_PATH} from '@constants/url';
import {useGetChapterListBySubject} from '@services/global';
interface RootState {
  mapelMateri?: any;
  durationSummary?: any;
  getUser?: any;
  task?: any;
  exam?: any;
}

interface IparamsMaterial {
  studentId: number;
  chapterId?: number;
  chapter_id?: number;
  student_id?: number;
}

const useStudyReportStudentScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamList, 'StudyReportStudentScreen'>>();
  const {subject} = route.params;
  const student = route?.params?.student;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'StudyReportStudentScreen'>>();
  const {data: chapterData} = useGetChapterListBySubject(subject?.id);
  const {mapelMateri, durationSummary, getUser} = useSelector(
    (state: RootState) => state,
  );
  const loadingStore = mapelMateri?.loading || durationSummary?.loading;
  const subjectMaterial = mapelMateri?.data?.data;
  const learningDuration = durationSummary?.data?.data || [];

  //fetching data
  const [schoolMaterial, setSchoolMaterial] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chapterSelected, setChapterSelected] = useState<any>({
    title: 'Bab',
    initValue: 'Semua Bab',
    value: 'Semua Bab',
    error: false,
    onPress: () => {
      setIsShowHandleChapter(true);
    },
  });

  const [chapterSelectedSummary, setChapterSelectedSummary] = useState<any>({
    title: 'Bab',
    initValue: 'Semua Bab',
    value: 'Semua Bab',
    error: false,
    onPress: () => {
      setIsShowHandleChapterSummary(true);
    },
  });

  const [show, setShow] = useState(false);
  const [type, setType] = useState(1);
  const [selectedItem, setSelectedItem] = useState(1);
  const [isShowHandleChapter, setIsShowHandleChapter] =
    useState<boolean>(false);
  const [isShowHandleChapterSummary, setIsShowHandleChapterSummary] =
    useState<boolean>(false);

  const materiTypeRes: any[] = [
    {
      learning_method: 'Video Presentasi',
      learning_method_id: 2,
      desc: 'materi dipelajari',
    },
    {
      learning_method: 'Video Animasi',
      learning_method_id: 3,
      desc: 'materi ditonton',
    },
    {
      learning_method: 'Ebook',
      learning_method_id: 1,
      desc: 'materi dibaca',
    },
  ];

  const [materiArrRes, setMateriArrRes] = useState<any[]>(materiTypeRes);
  const [_chapterChoosed, _setChapterChoosed] = useState<any>(0);

  const duration = {
    total: learningDuration?.total,
    perWeek: learningDuration?.total_per_week,
    perDay: learningDuration?.total_per_day,
  };
  const subjectData = {
    id: subjectMaterial?.subject?.id,
    name: subjectMaterial?.subject?.name,
    icon: subjectMaterial?.subject?.path_url,
  };
  const average = subjectMaterial?.average_test;

  const history = [
    {
      title: 'learn',
      total: subjectMaterial?.total_history?.learn?.total_materi,
      progress: subjectMaterial?.total_history?.learn?.user_progress,
      percentage: subjectMaterial?.total_history?.learn?.percentage,
      desc: 'materi dipelajari',
    },
    {
      title: 'practice',
      total: subjectMaterial?.total_history?.practice?.total_materi,
      progress: subjectMaterial?.total_history?.practice?.user_progress,
      percentage: subjectMaterial?.total_history?.practice?.percentage,
      desc: 'materi latihan dikerjakan',
    },
    {
      title: 'test',
      total: subjectMaterial?.total_history?.test?.total_materi,
      progress: subjectMaterial?.total_history?.test?.user_progress,
      percentage: subjectMaterial?.total_history?.test?.percentage,
      desc: 'materi ujian dikerjakan',
    },
  ];

  useEffect(() => {
    const materiType = schoolMaterial;

    materiType?.map((ie: any) => {
      switch (ie?.learning_method_id) {
        case 1:
          materiTypeRes[0] = {
            ...materiTypeRes[0],
            total: ie?.total ? ie.total : 0,
            total_learn: ie?.total_learn ? ie.total_learn : 0,
          };
          break;
        case 2:
          materiTypeRes[1] = {
            ...materiTypeRes[1],
            total: ie?.total ? ie.total : 0,
            total_learn: ie?.total_learn ? ie.total_learn : 0,
          };
          break;
        case 3:
          materiTypeRes[2] = {
            ...materiTypeRes[2],
            total: ie?.total ? ie.total : 0,
            total_learn: ie?.total_learn ? ie.total_learn : 0,
          };
          break;

        default:
          break;
      }
    });

    setMateriArrRes(materiTypeRes);
  }, []);

  const fetchSchoolMaterial = async (params: any) => {
    try {
      const res = await api.get(
        URL_PATH.get_school_materials_subject(subject?.id),
        {params: params},
      );
      if (res?.status === 200) {
        setSchoolMaterial(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const destroyAllFetch = () => {
    dispatch(taskDestroy());
    dispatch(examDestroy());
    dispatch(mapelDetailMateriDestroy());
    dispatch(durationSummaryDestroy());
  };

  const fetchingData = async () => {
    dispatch(
      fetchDurationSummary(
        subject?.id,
        student?.id ? {studentId: student?.id} : null,
      ),
    );
    dispatch(
      fetchMapelDetailMateri(
        subject?.id,
        student?.id ? {studentId: student?.id} : null,
      ),
    );
    const params: IparamsMaterial = {
      studentId: student ? student?.id : getUser?.data?.id,
    };
    fetchSchoolMaterial(params);
  };

  useEffect(() => {
    if (chapterSelected) {
      const params: IparamsMaterial = {
        studentId: student ? student?.id : getUser?.data?.id,
        student_id: student ? student?.id : getUser?.data?.id,
        chapterId: chapterSelected?.id, //for endpoint guru
        chapter_id: chapterSelected?.id, //for endpoint siswa
      };
      setIsLoading(true);
      dispatch(
        fetchMapelDetailMateri(subject?.id, params, () => {
          setIsLoading(false);
        }),
      );
    }
  }, [chapterSelected?.id]);

  useEffect(() => {
    if (chapterSelectedSummary) {
      const params: IparamsMaterial = {
        studentId: student ? student?.id : null,
        student_id: student ? student?.id : null,
        chapterId: chapterSelectedSummary?.id, //for endpoint guru
        chapter_id: chapterSelectedSummary?.id, //for endpoint siswa
      };
      setIsLoading(true);

      fetchSchoolMaterial(params).then(() => {
        setIsLoading(false);
      });
    }
  }, [chapterSelectedSummary?.id]);

  useEffect(() => {
    fetchingData().then(() => setIsLoading(false));
  }, []);
  //end fetching data

  function handleSelect(item: any) {
    setSelectedItem(item);
  }

  const __parselearningDurationToChart = useCallback(() => {
    if (learningDuration?.total_per_day) {
      return learningDuration?.total_per_day?.reduce(
        (prev: any, curr: any) => {
          prev.labels.push(curr?.day);
          prev.datasets[0].data.push(curr?.hour);
          return prev;
        },
        {
          labels: [],
          datasets: [{data: []}],
        },
      );
    }
    return {
      labels: [''],
      datasets: [{data: [0]}],
    };
  }, [learningDuration?.total_per_day]);

  const onPressBack = () => {
    navigation.goBack();
    destroyAllFetch();
  };

  return {
    show,
    setShow,
    type,
    setType,
    selectedItem,
    setSelectedItem,
    subjectData,
    subjectMaterial,
    fetchMapelDetailMateri,
    dispatch,
    fetchDurationSummary,
    learningDuration,
    getUser,
    navigation,
    handleSelect,
    subject,
    schoolMaterial,
    _chapterChoosed,
    _setChapterChoosed,
    history,
    average,
    setMateriArrRes,
    materiArrRes,
    duration,
    __parselearningDurationToChart,
    isLoading,
    student,
    isShowHandleChapter,
    setIsShowHandleChapter,
    route,
    chapterData,
    chapterSelected,
    setChapterSelected,
    isShowHandleChapterSummary,
    setIsShowHandleChapterSummary,
    chapterSelectedSummary,
    setChapterSelectedSummary,
    onPressBack,
    loadingStore,
  };
};

export default useStudyReportStudentScreen;
