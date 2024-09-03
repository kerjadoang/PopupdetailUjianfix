import {
  DETAIL_ABSENT_REQUEST,
  DETAIL_ABSENT_SUCCESS,
  DETAIL_ABSENT_FAILED,
  DETAIL_ABSENT_DESTROY,
  DETAIL_ABSENT_ACTION_TYPES,
  _IPayloadAbsentDetail,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getDetailAbsentRequest = () => {
  return {
    type: DETAIL_ABSENT_REQUEST,
  };
};

const getDetailAbsentSuccess = (data: any) => {
  return {
    type: DETAIL_ABSENT_SUCCESS,
    payload: {data},
  };
};

const getDetailAbsentFailed = (error: any) => {
  return {
    type: DETAIL_ABSENT_FAILED,
    payload: error,
  };
};

export const getDetailAbsentDestroy = () => {
  return {
    type: DETAIL_ABSENT_DESTROY,
  };
};

export const fetchDetailAbsentStudent = (
  payload: _IPayloadAbsentDetail,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<DETAIL_ABSENT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDetailAbsentRequest());
    try {
      showLoading();
      const res = await api.post(URL_PATH.detail_student_absent, payload);

      if (res?.status === 200) {
        dispatch(getDetailAbsentSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getDetailAbsentFailed(res?.data));
      }
    } catch (err) {
      dispatch(getDetailAbsentFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
