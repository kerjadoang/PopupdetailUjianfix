/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {
  fetchRombelClassList,
  fetchStudentAttendance,
  fetchStudentInRombel,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {_handlerConvertDatePicker} from '@constants/functional';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const useScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {classId, className}: any = route.params;
  const {
    getRombelClassList,
    getUser,
    getStudentAttendance,
    getStudentInRombel,
    getClassByDegree,
  }: any = useSelector((state: RootState) => state);
  const [classData, setClassData] = useState({
    id: classId,
    name: className,
  });
  const [showSwipe, setShowSwipe] = useState({
    date: false,
    class: false,
  });
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const formatedDate = _handlerConvertDatePicker(valueDatePicker);
  const formatedDate2 = _handlerConvertDatePicker(valueDatePicker, 9);
  const [summary, setSummary] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState({
    label: '',
    value: '',
  });
  const [currentRombel, setCurrentRombel] = useState(
    getRombelClassList?.data?.[0],
  );

  const getAttendance = () => {
    dispatch(
      fetchStudentAttendance({
        rombel_class_school_id: currentRombel?.id,
        date: formatedDate2,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      fetchRombelClassList(classData?.id ?? classId, getUser?.data?.school?.id),
    );
  }, [classData]);

  useEffect(() => {
    dispatch(
      fetchStudentInRombel(
        getRombelClassList?.data?.[currentRombel?.rombel_id - 1]?.id,
        query,
      ),
    );
    getAttendance();
  }, [getRombelClassList?.data, currentRombel, query, formatedDate2]);

  useEffect(() => {
    if (!getRombelClassList?.data) {
      return;
    }
    setCurrentRombel(getRombelClassList?.data?.[0]);
  }, [getRombelClassList?.data]);

  const isSummaryAvailable = () => {
    if (getStudentAttendance) {
      const detail = getStudentAttendance?.data;
      if (detail.attend_count > 0 || detail.absent_count > 0) {
        return setSummary(true);
      } else {
        return setSummary(false);
      }
    }
  };

  useEffect(() => {
    isSummaryAvailable();
  }, [getStudentAttendance]);
  const classByDegree = getClassByDegree?.data;

  return {
    summary,
    setSummary,
    keyword,
    setKeyword,
    query,
    setQuery,
    getRombelClassList,
    getStudentAttendance,
    getStudentInRombel,
    showSwipe,
    setShowSwipe,
    classByDegree,
    classData,
    setClassData,
    selectedDate,
    setSelectedDate,
    formatedDate,
    valueDatePicker,
    setValueDatePicker,
    getAttendance,
    currentRombel,
    setCurrentRombel,
    searchFocus,
    setSearchFocus,
  };
};
export default useScreen;
