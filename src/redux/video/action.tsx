import {
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAILED,
  VIDEO_DESTROY,
  VIDEO_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const videoRequest = () => {
  return {
    type: VIDEO_REQUEST,
  };
};

const videoSuccess = (data: any) => {
  return {
    type: VIDEO_SUCCESS,
    payload: data,
  };
};

const videoFailed = (error: any) => {
  return {
    type: VIDEO_FAILED,
    payload: error,
  };
};

export const videoDestroy = () => {
  return {
    type: VIDEO_DESTROY,
    payload: null,
  };
};

export const fetchVideo = (idFile: string): any => {
  return async (dispatch: Dispatch<VIDEO_ACTION_TYPES>): Promise<void> => {
    dispatch(videoRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/media/v1/video/recording/${idFile}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(videoSuccess(res?.data));
      } else {
        dispatch(videoFailed(res?.data));
      }
    } catch (err) {
      dispatch(videoFailed(err));
    }
  };
};
