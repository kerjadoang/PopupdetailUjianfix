import api from '@api';
import {Dispatch} from 'redux';
import {
  SELECT_ROLE_ACTION_TYPES,
  SELECT_ROLE_DESTROY,
  SELECT_ROLE_FAILED,
  SELECT_ROLE_REQUEST,
  SELECT_ROLE_SUCCESS,
} from './type';

const selectRoleRequest = () => {
  return {
    type: SELECT_ROLE_REQUEST,
  };
};

const selectRoleSuccess = (data: any) => {
  return {
    type: SELECT_ROLE_SUCCESS,
    payload: data,
  };
};

const selectRoleFailed = (error: any) => {
  return {
    type: SELECT_ROLE_FAILED,
    payload: error,
  };
};

export const selectRoleDestroy = () => {
  return {
    type: SELECT_ROLE_DESTROY,
  };
};

export const fetchGetRole = (): any => {
  return async (
    dispatch: Dispatch<SELECT_ROLE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(selectRoleRequest());
    try {
      // will be replace if login success implements
      const res = await api.get(
        '/master/v1/user_type',
        {},
        {
          headers: {
            'Accept-Language': 'id',
          },
        },
      );

      const data = res?.data || [];

      // using Promise.all() for fetch API paralel
      const promises = data?.data.map(async (obj: any) => {
        if (obj?.icon_mobile) {
          const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);

          if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
            obj.path_url = imgRes?.data?.data?.path_url;
          }
        }
      });

      await Promise.all(promises);

      dispatch(selectRoleSuccess(data));
    } catch (err) {
      dispatch(selectRoleFailed(err));
    }
  };
};
