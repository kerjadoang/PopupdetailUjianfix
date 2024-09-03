/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  fetchTeacherAttendance,
  fetchRombelUserList,
  fetchRombelClassList,
} from '@redux';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {DatePicker} from '@components/atoms';
import dayjs from 'dayjs';
import {_handlerConvertDatePicker} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const useScreen = () => {
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [valueDatePickerTemporary, setValueDatePickerTemporary] =
    useState<IDatePicker>({
      date: dayjs().get('date'),
      month: dayjs().get('month') + 1,
      year: dayjs().get('year'),
    });
  const [summary, setSummary] = useState(false);

  const formatedDate = _handlerConvertDatePicker(valueDatePicker);
  const formatedDateTemporary = _handlerConvertDatePicker(
    valueDatePickerTemporary,
  );
  const formatedDate2 = _handlerConvertDatePicker(valueDatePicker, 9);

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TeacherListMenuScreen'>>();
  const dispatch = useDispatch();
  const {
    getTeacherAttendance,
    rombelUserList,
    getClassByDegree,
    getRombelClassList,
    getUser,
  }: any = useSelector((state: RootState) => state);

  const [keyword, setKeyword] = useState('');
  const [filterClass, setFilterClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);

  const getAttendance = () => {
    dispatch(fetchTeacherAttendance({date: formatedDate2}));
  };

  const getRombelUser = () => {
    dispatch(
      fetchRombelUserList(`5?search=${keyword}&rombelClassId=${filterClass}`),
    );
  };

  useEffect(() => {
    getAttendance();
    getRombelUser();
  }, [keyword, filterClass, formatedDate2]);

  useEffect(() => {
    dispatch(fetchRombelClassList(0, getUser?.data?.school?.id));
  }, [dispatch, getUser?.data?.school?.id]);

  const isSummaryAvailable = () => {
    if (getTeacherAttendance) {
      const detail = getTeacherAttendance?.data;
      if (detail) {
        setSummary(true);
      } else {
        setSummary(false);
      }
    }
  };

  const handlerSelectAll = () => {
    if (getRombelClassList) {
      const id = getRombelClassList.data?.map((item: any, _: number) => {
        return item.id;
      });
      const name = getRombelClassList.data?.map((item: any, _: number) => {
        return item.name;
      });
      setFilterClass(id);
      setSelectedClass(name);
    }
  };

  useEffect(() => {
    isSummaryAvailable();
  }, [getTeacherAttendance]);

  return {
    summary,
    setSummary,
    navigation,
    getTeacherAttendance,
    rombelUserList,
    keyword,
    setKeyword,
    getClassByDegree,
    fetchRombelClassList,
    getRombelClassList,
    dispatch,
    valueDatePicker,
    setValueDatePicker,
    DatePicker,
    formatedDate,
    formatedDateTemporary,
    getAttendance,
    filterClass,
    setFilterClass,
    getRombelUser,
    selectedClass,
    setSelectedClass,
    handlerSelectAll,
    valueDatePickerTemporary,
    setValueDatePickerTemporary,
  };
};
export default useScreen;
