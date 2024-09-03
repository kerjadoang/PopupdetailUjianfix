import {Dispatch} from 'redux';
import {
  LIST_ACTIVITY_ACTION_TYPES,
  LIST_ACTIVITY_DESTROY,
  LIST_ACTIVITY_FAILED,
  LIST_ACTIVITY_REQUEST,
  LIST_ACTIVITY_SUCCESS,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import Config from 'react-native-config';
import dayjs from 'dayjs';

const listActivityRequest = () => {
  return {
    type: LIST_ACTIVITY_REQUEST,
  };
};

const listActivitySuccess = (data: any) => {
  return {
    type: LIST_ACTIVITY_SUCCESS,
    payload: data,
  };
};

const listActivityFailed = (error: any) => {
  return {
    type: LIST_ACTIVITY_FAILED,
    payload: error,
  };
};

export const listActivityDestroy = () => {
  return {
    type: LIST_ACTIVITY_DESTROY,
  };
};

export const fetchListActivity = (token: any) => {
  return async (
    dispatch: Dispatch<LIST_ACTIVITY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(listActivityRequest());
    try {
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
      const endDate = dayjs().format('YYYY-MM-DD');

      const res = await axios.get(
        `${Config.BASEURL}/uaa/v1/user/my-activity?limit=1&page=1&start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token || tokenParse}`,
          },
        },
      );

      const data = res?.data || [];
      if (res?.status === 200) {
        dispatch(listActivitySuccess(data));
      } else {
        dispatch(listActivityFailed(data));
      }
    } catch (err) {
      dispatch(listActivityFailed(err));
    }
  };
};
