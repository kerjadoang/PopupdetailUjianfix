import {
  CHECK_DIAGNOSTIC_TEST_REQUEST,
  CHECK_DIAGNOSTIC_TEST_SUCCESS,
  CHECK_DIAGNOSTIC_TEST_FAILED,
  CHECK_DIAGNOSTIC_TEST_DESTROY,
  CHECK_DIAGNOSTIC_TEST_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';
import apiWithoutToken from '@api/withoutToken';

const checkDiagnosticRequest = () => {
  return {
    type: CHECK_DIAGNOSTIC_TEST_REQUEST,
  };
};

const checkDiagnosticSuccess = (data: any) => {
  return {
    type: CHECK_DIAGNOSTIC_TEST_SUCCESS,
    payload: {data},
  };
};

const checkDiagnosticFailed = (error: any) => {
  return {
    type: CHECK_DIAGNOSTIC_TEST_FAILED,
    payload: error,
  };
};

export const checkDiagnosticDestroy = () => {
  return {
    type: CHECK_DIAGNOSTIC_TEST_DESTROY,
  };
};

export const fetchCheckDiagnostic = (childData?: any) => {
  return async (
    dispatch: Dispatch<CHECK_DIAGNOSTIC_TEST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(checkDiagnosticRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await apiWithoutToken(`${URL_PATH.check_isregistered_test}`, {
        headers: {
          Authorization: `Bearer ${childData?.access_token || tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(checkDiagnosticSuccess(res?.data));
      } else {
        dispatch(checkDiagnosticFailed(res?.data));
      }
    } catch (err) {
      dispatch(checkDiagnosticFailed(err));
    }
  };
};
