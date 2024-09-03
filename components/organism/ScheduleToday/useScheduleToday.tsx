import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {fetchScheduleByDate} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {jwtDecode, rdxDispatch} from '@constants/functional';
import {getToken} from '@hooks/getToken';

interface RootState {
  scheduleByDate: any;
}

type IUserData = {
  user?: IBaseUser;
  token?: string;
};

const useScheduleToday = () => {
  // get state of redux/
  const {data} = useSelector((state: RootState) => state.scheduleByDate);
  const navigation: any = useNavigation();
  const today = dayjs().format('YYYY-MM-DD');
  // const {data} = scheduleByDate;
  // const [token, setToken] = useState<string>('');
  // const [user, setUser] = useState<IBaseUser>();
  const [userData, setUserData] = useState<IUserData>({
    user: {},
    token: '',
  });
  // const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const refetchSchedule = useCallback(() => {
    rdxDispatch(fetchScheduleByDate(today, ''));
  }, [today]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    refetchSchedule();
  }, [isFocused]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getToken();
        const user = jwtDecode<IBaseUser>(data);
        // setUser(user);
        // setToken(data);
        setUserData({
          token: data,
          user: user,
        });
      } catch (error) {
        // console.error(error);
      }
    };
    fetchToken();
  }, []);

  const onNavigateToScheduleScreen = useCallback(() => {
    navigation.navigate('ScheduleScreen', {
      filter: 'semua',
      screen: '',
      loginAs: 'MURID',
      token: userData?.token,
      data: {},
    });
  }, [userData]);

  const onNavigateToExamScreen = useCallback((item: any) => {
    return navigation.navigate('LMSUjianTestCameraScreen', {
      data: item,
    });
  }, []);

  return {
    navigation,
    // scheduleByDate,
    refetchSchedule,
    data,
    userData,
    onNavigateToScheduleScreen,
    onNavigateToExamScreen,
  };
};

export default useScheduleToday;
