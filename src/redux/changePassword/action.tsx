import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_DESTROY,
  CHANGE_PASSWORD_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';

const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
};

const changePasswordSuccess = (data: any) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: {data},
  };
};

const changePasswordFailed = (error: any) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    payload: error,
  };
};

export const changePasswordDestroy = () => {
  return {
    type: CHANGE_PASSWORD_DESTROY,
    payload: null,
  };
};

export const fetchChangePassword = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<CHANGE_PASSWORD_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(changePasswordRequest());
    try {
      const res = await api.put('/uaa/v1/user/change_password', reqBody, {
        headers: {
          'Accept-Language': 'id',
        },
      });

      if (res?.status === 200) {
        dispatch(changePasswordSuccess(res?.data));
      } else {
        dispatch(changePasswordFailed(res?.data));
      }
    } catch (err) {
      dispatch(changePasswordFailed(err));
    }
  };
};
