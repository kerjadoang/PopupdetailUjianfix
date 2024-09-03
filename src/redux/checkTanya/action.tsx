import {
  CHECK_TANYA_REQUEST,
  CHECK_TANYA_SUCCESS,
  CHECK_TANYA_FAILED,
  CHECK_TANYA_DESTROY,
  CHECK_TANYA_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkTanyaRequest = () => {
  return {
    type: CHECK_TANYA_REQUEST,
  };
};

const checkTanyaSuccess = (data: any) => {
  return {
    type: CHECK_TANYA_SUCCESS,
    payload: {data},
  };
};

const checkTanyaFailed = (error: any) => {
  return {
    type: CHECK_TANYA_FAILED,
    payload: error,
  };
};

export const checkTanyaDestroy = () => {
  return {
    type: CHECK_TANYA_DESTROY,
  };
};

export const fetchCheckTanya = (subject_id: string) => {
  return async (
    dispatch: Dispatch<CHECK_TANYA_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(checkTanyaRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(`/tanya/v1/cek/${subject_id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Accept-Language': 'en',
        },
      });
      if (res?.status === 200) {
        dispatch(checkTanyaSuccess(res?.data));
      } else {
        dispatch(checkTanyaFailed(res?.data));
      }
    } catch (err) {
      dispatch(checkTanyaFailed(err));
    }
  };
};
