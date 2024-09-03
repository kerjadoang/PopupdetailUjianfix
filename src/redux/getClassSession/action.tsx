import {
  CLASS_SESSION_REQUEST,
  CLASS_SESSION_SUCCESS,
  CLASS_SESSION_FAILED,
  CLASS_SESSION_DESTROY,
  CLASS_SESSION_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const classSessionRequest = () => {
  return {
    type: CLASS_SESSION_REQUEST,
  };
};

const classSessionSuccess = (data: any) => {
  return {
    type: CLASS_SESSION_SUCCESS,
    payload: data,
  };
};

const classSessionFailed = (error: any) => {
  return {
    type: CLASS_SESSION_FAILED,
    payload: error,
  };
};

export const classSessionDestroy = () => {
  return {
    type: CLASS_SESSION_DESTROY,
  };
};

export const fetchClassSession = (type: string) => {
  return async (
    dispatch: Dispatch<CLASS_SESSION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(classSessionRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(URL_PATH.get_live_class(type), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Accept-Language': 'en',
        },
      });

      if (res?.status === 200) {
        dispatch(classSessionSuccess(res?.data));
      } else {
        dispatch(classSessionFailed(res?.data));
      }
    } catch (err) {
      dispatch(classSessionFailed(err));
    }
  };
};
