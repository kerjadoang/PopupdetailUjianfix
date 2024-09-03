import {
  DURATION_SUMMARY_REQUEST,
  DURATION_SUMMARY_SUCCESS,
  DURATION_SUMMARY_FAILED,
  DURATION_SUMMARY_DESTROY,
  DURATION_SUMMARY_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const durationSummaryRequest = () => {
  return {
    type: DURATION_SUMMARY_REQUEST,
  };
};

const durationSummarySuccess = (data: any) => {
  return {
    type: DURATION_SUMMARY_SUCCESS,
    payload: {data},
  };
};

const durationSummaryFailed = (error: any) => {
  return {
    type: DURATION_SUMMARY_FAILED,
    payload: error,
  };
};

export const durationSummaryDestroy = () => {
  return {
    type: DURATION_SUMMARY_DESTROY,
  };
};

export const fetchDurationSummary = (id: number, params?: any): any => {
  return async (
    dispatch: Dispatch<DURATION_SUMMARY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(durationSummaryRequest());
    try {
      const res = await api.get(URL_PATH.get_duration_summary(id), {
        params: params,
      });
      if (res?.status === 200) {
        dispatch(durationSummarySuccess(res?.data));
      } else {
        dispatch(durationSummaryFailed(res?.data));
      }
    } catch (err) {
      dispatch(durationSummaryFailed(err));
    }
  };
};
