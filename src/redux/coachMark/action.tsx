import {
  GET_ALL_COACHMARK_ACTION_TYPES,
  GET_ALL_COACHMARK_DESTROY,
  GET_ALL_COACHMARK_FAILED,
  GET_ALL_COACHMARK_REQUEST,
  GET_ALL_COACHMARK_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import client from '@api/alternate';

const getAllCoachmarkRequest = () => {
  return {
    type: GET_ALL_COACHMARK_REQUEST,
  };
};

const getAllCoachmarkSuccess = (data: any) => {
  return {
    type: GET_ALL_COACHMARK_SUCCESS,
    payload: data,
  };
};

const getAllCoachmarkFailed = (error: any) => {
  return {
    type: GET_ALL_COACHMARK_FAILED,
    payload: error,
  };
};

export const getAllCoachmarkDestroy = () => {
  return {
    type: GET_ALL_COACHMARK_DESTROY,
  };
};

export const fetchAllCoachmark = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_COACHMARK_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllCoachmarkRequest());
    try {
      const res = await client.get(URL_PATH.check_coachmark);

      if (res?.status === 200) {
        dispatch(getAllCoachmarkSuccess(res?.data));
      } else {
        dispatch(getAllCoachmarkFailed(res?.data));
      }
      callback && callback(res);
    } catch (err) {
      callback && callback(err);
      dispatch(getAllCoachmarkFailed(err));
    }
  };
};

export const updateCoachmark = (coachMarkName: string, callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_COACHMARK_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllCoachmarkRequest());
    try {
      const body = {coachmark: coachMarkName, status: true};
      const res = await client.put(URL_PATH.update_coachmark, body);
      callback && callback(res);
      dispatch(fetchAllCoachmark());
    } catch (err) {
      dispatch(getAllCoachmarkFailed(err));
      callback && callback(err);
    }
  };
};
