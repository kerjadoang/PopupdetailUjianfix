import {
  GET_ALL_CHILDREN_REQUEST,
  GET_ALL_CHILDREN_SUCCESS,
  GET_ALL_CHILDREN_FAILED,
  GET_ALL_CHILDREN_DESTROY,
  GET_ALL_CHILDREN_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';

const getAllChildrenRequest = () => {
  return {
    type: GET_ALL_CHILDREN_REQUEST,
  };
};

const getAllChildrenSuccess = (data: any) => {
  return {
    type: GET_ALL_CHILDREN_SUCCESS,
    payload: data,
  };
};

const getAllChildrenFailed = (error: any) => {
  return {
    type: GET_ALL_CHILDREN_FAILED,
    payload: error,
  };
};

export const getAllChildrenDestroy = () => {
  return {
    type: GET_ALL_CHILDREN_DESTROY,
  };
};

export const fetchGetAllChildren = (): any => {
  return async (
    dispatch: Dispatch<GET_ALL_CHILDREN_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllChildrenRequest());
    try {
      const res = await api.get('/uaa/v1/user/get-all-children');
      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);

        dispatch(getAllChildrenSuccess(data));
      } else {
        dispatch(getAllChildrenFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllChildrenFailed(err));
    }
  };
};
