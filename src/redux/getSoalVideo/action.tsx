import {
  SOAL_VIDEO_REQUEST,
  SOAL_VIDEO_SUCCESS,
  SOAL_VIDEO_FAILED,
  SOAL_VIDEO_DESTROY,
  SOAL_VIDEO_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const soalVideoRequest = () => {
  return {
    type: SOAL_VIDEO_REQUEST,
  };
};

const soalVideoSuccess = (data: any) => {
  return {
    type: SOAL_VIDEO_SUCCESS,
    payload: data,
  };
};

const soalVideoFailed = (error: any) => {
  return {
    type: SOAL_VIDEO_FAILED,
    payload: error,
  };
};

export const soalVideoDestroy = () => {
  return {
    type: SOAL_VIDEO_DESTROY,
  };
};

export const fetchSoalVideo = (idFile: string): any => {
  return async (dispatch: Dispatch<SOAL_VIDEO_ACTION_TYPES>): Promise<void> => {
    dispatch(soalVideoRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/soal/v1/service/video/${idFile}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(soalVideoSuccess(res?.data));
      } else {
        dispatch(soalVideoFailed(res?.data));
      }
    } catch (err) {
      dispatch(soalVideoFailed(err));
    }
  };
};
