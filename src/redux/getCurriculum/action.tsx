import api from '@api/index';
import {Dispatch} from 'redux';
import {
  GET_CURRICULUM_ACTION_TYPES,
  GET_CURRICULUM_DESTROY,
  GET_CURRICULUM_FAILED,
  GET_CURRICULUM_REQUEST,
  GET_CURRICULUM_SUCCESS,
} from './type';

const getCurriculumRequest = () => {
  return {
    type: GET_CURRICULUM_REQUEST,
  };
};

const getCurriculumSuccess = (data: any) => {
  return {
    type: GET_CURRICULUM_SUCCESS,
    payload: data,
  };
};

const getCurriculumFailed = (error: any) => {
  return {
    type: GET_CURRICULUM_FAILED,
    payload: error,
  };
};

export const getCurriculumDestroy = () => {
  return {
    type: GET_CURRICULUM_DESTROY,
  };
};

export const fetchGetCurriculum = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_CURRICULUM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getCurriculumRequest());
    try {
      // will be replace if login success implements
      const res = await api.get('/master/v1/curriculum', {});

      if (res?.status === 200) {
        dispatch(getCurriculumSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getCurriculumFailed([]));
        callback && callback(res);
      }
    } catch (err) {
      dispatch(getCurriculumFailed(err));
      callback && callback(err);
    }
  };
};
