import {
  MAPEL_EXAM_VALUE_REQUEST,
  MAPEL_EXAM_VALUE_SUCCESS,
  MAPEL_EXAM_VALUE_FAILED,
  MAPEL_EXAM_VALUE_DESTROY,
  MAPEL_EXAM_VALUE_ACTION_TYPES,
} from './type';
import api from '@api/index';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const mapelExamValueRequest = () => {
  return {
    type: MAPEL_EXAM_VALUE_REQUEST,
  };
};

const mapelExamValueSuccess = (data: any) => {
  return {
    type: MAPEL_EXAM_VALUE_SUCCESS,
    payload: {data},
  };
};

const mapelExamValueFailed = (error: any) => {
  return {
    type: MAPEL_EXAM_VALUE_FAILED,
    payload: error,
  };
};

export const mapelExamValueDestroy = () => {
  return {
    type: MAPEL_EXAM_VALUE_DESTROY,
  };
};

export const fetchMapelExamValue = (id: number) => {
  return async (
    dispatch: Dispatch<MAPEL_EXAM_VALUE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(mapelExamValueRequest());
    try {
      const res = await api.get(URL_PATH.get_exam_total_and_value(id));

      if (res?.status === 200) {
        dispatch(mapelExamValueSuccess(res?.data));
      } else {
        dispatch(mapelExamValueFailed(res?.data));
      }
    } catch (err) {
      dispatch(mapelExamValueFailed(err));
    }
  };
};
