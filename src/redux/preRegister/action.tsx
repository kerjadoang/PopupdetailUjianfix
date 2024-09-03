import api from '@api/index';
import {Dispatch} from 'redux';
import {
  PRE_REGISTER_ACTION_TYPES,
  PRE_REGISTER_DESTROY,
  PRE_REGISTER_FAILED,
  PRE_REGISTER_REQUEST,
  PRE_REGISTER_SUCCESS,
} from './type';

const preRegisterRequest = () => {
  return {
    type: PRE_REGISTER_REQUEST,
  };
};

const preRegisterSuccess = (data: any) => {
  return {
    type: PRE_REGISTER_SUCCESS,
    payload: data,
  };
};

const preRegisterFailed = (error: any) => {
  return {
    type: PRE_REGISTER_FAILED,
    payload: error,
  };
};

export const preRegisterDestroy = () => {
  return {
    type: PRE_REGISTER_DESTROY,
  };
};

export const fetchPreRegister = (reqBody: any): any => {
  return async (
    dispatch: Dispatch<PRE_REGISTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(preRegisterRequest());
    try {
      const res = await api.post('/uaa/v1/auth/pre_register', reqBody, {
        headers: {
          'Accept-Language': 'id',
        },
      });

      if (res?.status === 200) {
        dispatch(preRegisterSuccess(res?.data));
      } else {
        dispatch(preRegisterFailed(res?.data));
      }
    } catch (err) {
      dispatch(preRegisterFailed(err));
    }
  };
};
