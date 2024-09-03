import {Dispatch} from 'react';
import {
  ERAPORT_DETAIL_REQUEST,
  ERAPORT_DETAIL_SUCCESS,
  ERAPORT_DETAIL_FAILED,
  ERAPORT_DETAIL_DESTROY,
  ERAPORT_DETAIL_ACTION_TYPES,
} from './type';

import api from '@api/index';
import {URL_PATH} from '@constants/url';

const EraportDetailRequest = () => {
  return {
    type: ERAPORT_DETAIL_REQUEST,
  };
};

const EraportDetailSuccess = (data: any) => {
  return {
    type: ERAPORT_DETAIL_SUCCESS,
    payload: {data},
  };
};

const EraportDetailFailed = (error: any) => {
  return {
    type: ERAPORT_DETAIL_FAILED,
    payload: error,
  };
};

export const EraportDetailDestroy = () => {
  return {
    type: ERAPORT_DETAIL_DESTROY,
  };
};

export const fetchEraportDetail = (
  assessment_erapor_share_student_id: number,
) => {
  return async (
    dispatch: Dispatch<ERAPORT_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(EraportDetailRequest());
    try {
      const res = await api.get(
        URL_PATH.get_detail_erapor_murid(assessment_erapor_share_student_id),
      );

      if (res?.status === 200) {
        dispatch(EraportDetailSuccess(res?.data));
      } else {
        dispatch(EraportDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(EraportDetailFailed(err));
    }
  };
};
