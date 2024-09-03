import {
  ERAPORT_SL_REQUEST,
  ERAPORT_SL_SUCCESS,
  ERAPORT_SL_FAILED,
  ERAPORT_SL_DESTROY,
  ERAPORT_SL_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';
import {dismissLoading, showLoading} from '@constants/functional';

const EraportShareListRequest = () => {
  return {
    type: ERAPORT_SL_REQUEST,
  };
};

const EraportShareListSuccess = (data: any) => {
  return {
    type: ERAPORT_SL_SUCCESS,
    payload: {data},
  };
};

const EraportShareListFailed = (error: any) => {
  return {
    type: ERAPORT_SL_FAILED,
    payload: error,
  };
};

export const EraportShareListDestroy = () => {
  return {
    type: ERAPORT_SL_DESTROY,
  };
};

export const fetchEraportShareList = (
  rombel_id: number,
  academic_year_id: number,
  academic_phase_id: number,
  school_id: number,
  class_id: number,
) => {
  return async (dispatch: Dispatch<ERAPORT_SL_ACTION_TYPES>): Promise<void> => {
    dispatch(EraportShareListRequest());
    try {
      showLoading();
      const res = await api.get(
        URL_PATH.get_sharelist_eraport(
          rombel_id,
          academic_year_id,
          academic_phase_id,
          school_id,
          class_id,
        ),
      );
      if (res?.status === 200) {
        dispatch(EraportShareListSuccess(res?.data));
      } else {
        dispatch(EraportShareListFailed(res?.data));
      }
    } catch (err) {
      dispatch(EraportShareListFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
