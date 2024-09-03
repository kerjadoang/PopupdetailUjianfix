/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  fetchRombelClassList,
  fetchRaportHistoryList,
  getRombelClassListDestroy,
  getStudentInRombelDestroy,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {showErrorToast} from '@constants/functional';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {ParamList} from 'type/screen';

const useScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'MenuRaporByClassScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'MenuRaporByClassScreen'>>();
  const dispatch = useDispatch();
  const {
    getRombelClassList,
    getStudentInRombel,
    getUser,
    academicYearOngoing,
    raporHistoryList,
  }: any = useSelector((state: RootState) => state);

  const {classId, className, isHistory}: any = route.params;
  const [classData, setClassData] = useState({
    id: classId,
    name: className,
  });
  const [keyword, setKeyword] = useState('');
  const [selectedClass, setSelectedClass] = useState({
    id: 0,
    rombel: getRombelClassList?.data?.[0]?.id,
  });
  const [year, setYear] = useState({
    id: academicYearOngoing?.data?.data?.id,
    name: academicYearOngoing?.data?.data?.years,
  });
  const [phase, setPhase] = useState({
    id: academicYearOngoing?.data?.data?.academic_phase?.[0]?.id,
    name: academicYearOngoing?.data?.data?.academic_phase?.[0]?.type,
  });
  const [rombel, setRombel] = useState({
    id: getRombelClassList?.data?.[0]?.id,
    name: getRombelClassList?.data?.[0]?.name,
  });

  const [selectedStudent, setSelectedStudent] = useState({
    id: 0,
    name: '',
  });

  const [swipe, setSwipe] = useState({
    show: false,
    type: '',
  });

  const [showChooseRapor, setShowChooseRapor] = useState(false);

  const [checkStudentERaport, setCheckStudentERaport] = useState<[]>([]);

  const _handlerShowSwipe = () => {
    if (swipe.show && swipe.type !== '') {
      return true;
    } else {
      return false;
    }
  };

  const getRaporHistory = () => {
    dispatch(
      fetchRaportHistoryList(year.id, classData.id, rombel.id, phase.id),
    );
  };
  useEffect(() => {
    dispatch(fetchRombelClassList(classData?.id, getUser?.data?.school?.id));
    getRaporHistory();
  }, [classData, dispatch, getUser?.data?.school?.id]);

  useEffect(() => {
    if (!getRombelClassList?.data?.[0]) {
      return;
    }
    setSelectedClass({
      ...selectedClass,
      id: 0,
      rombel: getRombelClassList?.data?.[0]?.id,
    });
  }, [getRombelClassList?.data]);

  useEffect(() => {
    return () => {
      dispatch(getRombelClassListDestroy());
      dispatch(getStudentInRombelDestroy());
    };
  }, []);

  const getCheckStudentERaport = async (
    murid_id: number,
    rombel_class_school_id: number,
    academic_year_id: number,
    school_id: number,
  ) => {
    try {
      var data = await apiGet({
        url: URL_PATH.get_check_student_eraport(
          murid_id,
          rombel_class_school_id,
          academic_year_id,
          school_id,
        ),
      });

      setCheckStudentERaport(data);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Error');
    }
  };

  return {
    navigation,
    selectedClass,
    setSelectedClass,
    getRombelClassList,
    getStudentInRombel,
    keyword,
    setKeyword,
    setClassData,
    isHistory,
    year,
    setYear,
    classData,
    phase,
    setPhase,
    swipe,
    setSwipe,
    _handlerShowSwipe,
    academicYearOngoing,
    rombel,
    setRombel,
    raporHistoryList,
    selectedStudent,
    setSelectedStudent,
    getRaporHistory,
    getUser,
    getCheckStudentERaport,
    checkStudentERaport,
    setCheckStudentERaport,
    setShowChooseRapor,
    showChooseRapor,
    dispatch,
  };
};
export {useScreen};
