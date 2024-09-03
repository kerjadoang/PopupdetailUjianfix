import {
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILED,
  DELETE_VIDEO_DESTROY,
  DELETE_VIDEO_ACTION_TYPES,
} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

import {Dispatch} from 'redux';
import {Keys} from '@constants/keys';

const deleteVideoRequest = () => {
  return {
    type: DELETE_VIDEO_REQUEST,
  };
};

const deleteVideoSuccess = (data: any) => {
  return {
    type: DELETE_VIDEO_SUCCESS,
    payload: data,
  };
};

const deleteVideoFailed = (error: any) => {
  return {
    type: DELETE_VIDEO_FAILED,
    payload: error,
  };
};

export const deleteVideoDestroy = () => {
  return {
    type: DELETE_VIDEO_DESTROY,
  };
};

export const fetchDeleteVideo = (id: any, deviceId: any): any => {
  return async (
    dispatch: Dispatch<DELETE_VIDEO_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(deleteVideoRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.delete(
        `/master/v1/user-videos/delete/${id}/${deviceId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res?.status === 200) {
        dispatch(deleteVideoSuccess(res?.data));
      } else {
        dispatch(deleteVideoFailed(res?.data));
      }
    } catch (err) {
      dispatch(deleteVideoFailed(err));
    }
  };
};
