import {
  ASSESMENT_SET_REQUEST,
  ASSESMENT_SET_SUCCESS,
  ASSESMENT_SET_FAILED,
  ASSESMENT_SET_DESTROY,
  ASSESMENT_SET_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const AssesmentSetRequest = () => {
  return {
    type: ASSESMENT_SET_REQUEST,
  };
};

const AssesmentSetSuccess = (data: any) => {
  return {
    type: ASSESMENT_SET_SUCCESS,
    payload: {data},
  };
};

const AssesmentSetFailed = (error: any) => {
  return {
    type: ASSESMENT_SET_FAILED,
    payload: error,
  };
};

export const AssesmentSetDestroy = () => {
  return {
    type: ASSESMENT_SET_DESTROY,
  };
};

export const fetchAssesmentSet = (
  rombel: number,
  classId: number,
  academic_year: number,
  school: number,
  academic_phase_id: number,
) => {
  return async (
    dispatch: Dispatch<ASSESMENT_SET_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(AssesmentSetRequest());
    try {
      const res = await api.get(
        URL_PATH.get_assesment(
          rombel,
          classId,
          academic_year,
          school,
          academic_phase_id,
        ),
      );
      if (res?.status === 200) {
        dispatch(AssesmentSetSuccess(res?.data));
      } else {
        dispatch(AssesmentSetFailed(res?.data));
      }
    } catch (err) {
      dispatch(AssesmentSetFailed(err));
    }
  };
};
