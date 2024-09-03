import {
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  IMAGE_FAILED,
  IMAGE_DESTROY,
  IMAGE_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';

const imageRequest = () => {
  return {
    type: IMAGE_REQUEST,
  };
};

const imageSuccess = (data: any) => {
  return {
    type: IMAGE_SUCCESS,
    payload: data,
  };
};

const imageFailed = (error: any) => {
  return {
    type: IMAGE_FAILED,
    payload: error,
  };
};

export const imageDestroy = () => {
  return {
    type: IMAGE_DESTROY,
  };
};

export const fetchImage = (idImage: string): any => {
  return async (dispatch: Dispatch<IMAGE_ACTION_TYPES>): Promise<void> => {
    dispatch(imageRequest());
    try {
      const res = await api.get(`/media/v1/image/${idImage}`);
      if (res?.status === 200) {
        dispatch(imageSuccess(res?.data));
      } else {
        dispatch(imageFailed(res?.data));
      }
    } catch (err) {
      dispatch(imageFailed(err));
    }
  };
};
