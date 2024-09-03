import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import {fetchDetailAttendanceStudent} from '@redux';
import dayjs from 'dayjs';

interface IDatePicker {
  month: any;
  year: any;
}

const useScreen = () => {
  const route = useRoute();
  const dispatch: any = useDispatch();
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const {id_student}: any = route.params;
  const {studentDetail, getDetailAttendance}: any = useSelector(
    (state: RootState) => state,
  );
  const [filterMonth, setFilterMonth] = useState({
    label: `${dayjs().locale('id').format('MMMM')} ${dayjs().get('year')}`,
    value: `${dayjs().get('year')}-${dayjs().get('month') + 1}`,
  });
  const [swipe, setSwipe] = useState(false);
  useEffect(() => {
    dispatch(
      fetchDetailAttendanceStudent({
        user_id: id_student,
        date: filterMonth.value,
      }),
    );
  }, [filterMonth.value]);

  return {
    studentDetail,
    filterMonth,
    setFilterMonth,
    valueDatePicker,
    setValueDatePicker,
    getDetailAttendance,
    swipe,
    setSwipe,
  };
};
export {useScreen};
