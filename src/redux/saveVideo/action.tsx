import {
  SAVE_VIDEO_REQUEST,
  SAVE_VIDEO_SUCCESS,
  SAVE_VIDEO_FAILED,
  SAVE_VIDEO_DESTROY,
  SAVE_VIDEO_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const saveVideoRequest = () => {
  return {
    type: SAVE_VIDEO_REQUEST,
  };
};

const saveVideoSuccess = (data: any) => {
  return {
    type: SAVE_VIDEO_SUCCESS,
    payload: data,
  };
};

const saveVideoFailed = (error: any) => {
  return {
    type: SAVE_VIDEO_FAILED,
    payload: error,
  };
};

export const saveVideoDestroy = () => {
  return {
    type: SAVE_VIDEO_DESTROY,
  };
};

export const fetchSaveVideo = (reqBody: any): any => {
  return async (dispatch: Dispatch<SAVE_VIDEO_ACTION_TYPES>): Promise<void> => {
    dispatch(saveVideoRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.post(
        '/master/v1/user-videos/save-history',
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res?.status === 200) {
        dispatch(saveVideoSuccess(res?.data));
      } else {
        dispatch(saveVideoFailed(res?.data));
      }
    } catch (err) {
      dispatch(saveVideoFailed(err));
    }
  };
};
