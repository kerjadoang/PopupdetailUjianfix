/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListActivity} from '@redux';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

interface RootState {
  listActivity: any;
}

const useActivitiesWidget = (userData: any) => {
  // get state of redux/
  const navigation: any = useNavigation();
  const {listActivity} = useSelector((state: RootState) => state);
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'));
  // setup dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListActivity(userData?.access_token));
  }, [userData]);

  const onPress = (id: any) => {
    navigation.navigate('MyActivityScreen', {
      userData,
    });
  };

  return {
    listActivity,
    onPress,
  };
};

export default useActivitiesWidget;
