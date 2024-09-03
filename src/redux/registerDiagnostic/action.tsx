import {
  REGISTER_DIAGNOSTIG_TEST_ACTION_TYPES,
  REGISTER_DIAGNOSTIG_TEST_DESTROY,
  REGISTER_DIAGNOSTIG_TEST_FAILED,
  REGISTER_DIAGNOSTIG_TEST_REQUEST,
  REGISTER_DIAGNOSTIG_TEST_SUCCESS,
  _IPayloadRegister,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const registerDiagnosticRequest = () => {
  return {
    type: REGISTER_DIAGNOSTIG_TEST_REQUEST,
  };
};

const registerDiagnosticSuccess = (data: any) => {
  return {
    type: REGISTER_DIAGNOSTIG_TEST_SUCCESS,
    payload: data,
  };
};

const registerDiagnosticFailed = (error: any) => {
  return {
    type: REGISTER_DIAGNOSTIG_TEST_FAILED,
    payload: error,
  };
};

export const registerDiagnosticDestroy = () => {
  return {
    type: REGISTER_DIAGNOSTIG_TEST_DESTROY,
  };
};

export const sendRegisterDiagnostic = (
  payload: _IPayloadRegister,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<REGISTER_DIAGNOSTIG_TEST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(registerDiagnosticRequest());
    try {
      const res = await api.post(URL_PATH.register_diagnostic_test, payload);
      if (res?.status === 200) {
        dispatch(registerDiagnosticSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(registerDiagnosticFailed(res?.data));
        Toast.show({type: 'error', text1: res?.data?.message});
      }
    } catch (err: any) {
      dispatch(registerDiagnosticFailed(err));
      Toast.show({type: 'error', text1: err?.message});
    }
  };
};
