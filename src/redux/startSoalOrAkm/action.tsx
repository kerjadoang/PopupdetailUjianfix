import {
  START_SOAL_OR_AKM_ACTION_TYPES,
  START_SOAL_OR_AKM_DESTROY,
  START_SOAL_OR_AKM_FAILED,
  START_SOAL_OR_AKM_REQUEST,
  START_SOAL_OR_AKM_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const startSoalOrAkmRequest = () => {
  return {
    type: START_SOAL_OR_AKM_REQUEST,
  };
};

const startSoalOrAkmSuccess = (data: any) => {
  return {
    type: START_SOAL_OR_AKM_SUCCESS,
    payload: data,
  };
};

const startSoalOrAkmFailed = (error: any) => {
  return {
    type: START_SOAL_OR_AKM_FAILED,
    payload: error,
  };
};

export const startSoalOrAkmDestroy = () => {
  return {
    type: START_SOAL_OR_AKM_DESTROY,
  };
};

export const fetchStartSoalOrAkm = (
  payload: {
    question_package_service_id: number;
    question_package_id: number;
    duration_minutes?: number;
  },
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<START_SOAL_OR_AKM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(startSoalOrAkmRequest());
    try {
      const res = await api.post(URL_PATH.start_soal_or_akm(), payload);
      callback && callback(res);
      if (res?.data?.code === 906 || res?.data?.code === 100) {
        dispatch(startSoalOrAkmSuccess(res?.data));
      } else {
        dispatch(startSoalOrAkmFailed(res?.data));
      }
    } catch (err) {
      dispatch(startSoalOrAkmFailed(err));
    }
  };
};
