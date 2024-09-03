import {
  PTN_SCHEDULE_REQUEST,
  PTN_SCHEDULE_SUCCESS,
  PTN_SCHEDULE_FAILED,
  PTN_SCHEDULE_DESTROY,
  PTN_SCHEDULE_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';

const PTNScheduleRequest = () => {
  return {
    type: PTN_SCHEDULE_REQUEST,
  };
};

const PTNScheduleSuccess = (data: any) => {
  return {
    type: PTN_SCHEDULE_SUCCESS,
    payload: {data},
  };
};

const PTNScheduleFailed = (error: any) => {
  return {
    type: PTN_SCHEDULE_FAILED,
    payload: error,
  };
};

export const PTNScheduleDestroy = () => {
  return {
    type: PTN_SCHEDULE_DESTROY,
  };
};

export const fetchPTNSchedule = (date: any, type: any) => {
  return async (
    dispatch: Dispatch<PTN_SCHEDULE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(PTNScheduleRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(
        `${URL_PATH.get_ptn_schedule_today(date, type)}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res?.status === 200) {
        dispatch(PTNScheduleSuccess(res?.data));
      } else {
        dispatch(PTNScheduleFailed(res?.data));
      }
    } catch (err) {
      dispatch(PTNScheduleFailed(err));
    }
  };
};
