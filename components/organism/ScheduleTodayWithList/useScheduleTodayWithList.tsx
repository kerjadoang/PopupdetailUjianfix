import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchScheduleByDate} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {getToken} from '@hooks/getToken';

interface RootState {
  scheduleByDate: any;
}
const useScheduleTodayWithList = () => {
  const isFocus = useIsFocused();
  // get state of redux/
  const scheduleByDate = useSelector(
    (state: RootState) => state.scheduleByDate,
  );
  const navigation: any = useNavigation();
  const today = dayjs().format('YYYY-MM-DD HH:mm');
  // setup dispatch
  const dispatch: any = useDispatch();
  const {data} = scheduleByDate;
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getToken();
        setToken(data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (isFocus) {
      fetchSchedule();
    }
  }, [isFocus, today]);

  const fetchSchedule = () => {
    dispatch(fetchScheduleByDate(today, ''));
  };

  return {
    navigation,
    fetchSchedule,
    today,
    data,
    token,
  };
};

export default useScheduleTodayWithList;
