import api from '@api';
import {Dispatch} from 'redux';
import {
  LIST_CLASS_ACTION_TYPES,
  LIST_CLASS_DESTROY,
  LIST_CLASS_FAILED,
  LIST_CLASS_REQUEST,
  LIST_CLASS_SUCCESS,
} from './type';

const listClassRequest = () => {
  return {
    type: LIST_CLASS_REQUEST,
  };
};

const listClassSuccess = (data: any) => {
  return {
    type: LIST_CLASS_SUCCESS,
    payload: data,
  };
};

const listClassFailed = (error: any) => {
  return {
    type: LIST_CLASS_FAILED,
    payload: error,
  };
};

export const listClassDestroy = () => {
  return {
    type: LIST_CLASS_DESTROY,
  };
};

export const fetchListClass = (): any => {
  return async (dispatch: Dispatch<LIST_CLASS_ACTION_TYPES>): Promise<void> => {
    dispatch(listClassRequest());
    try {
      // will be replace if login success implements
      const res = await api.get('/master/v1/degree_class_major', {});
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.id_image) {
            const imgRes = await api.get(`/media/v1/image/${obj?.id_image}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);

        dispatch(listClassSuccess(res?.data));
      } else {
        dispatch(listClassFailed(res?.data));
      }
    } catch (err) {
      dispatch(listClassFailed(err));
    }
  };
};
