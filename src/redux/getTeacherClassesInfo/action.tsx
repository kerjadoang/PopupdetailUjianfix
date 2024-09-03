import {
  GET_TEACHER_CLASSES_INFO_ACTION_TYPES,
  GET_TEACHER_CLASSES_INFO_DESTROY,
  GET_TEACHER_CLASSES_INFO_FAILED,
  GET_TEACHER_CLASSES_INFO_REQUEST,
  GET_TEACHER_CLASSES_INFO_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const getTeacherClassesInfoRequest = () => {
  return {
    type: GET_TEACHER_CLASSES_INFO_REQUEST,
  };
};

const getTeacherClassesInfoSuccess = (data: any) => {
  return {
    type: GET_TEACHER_CLASSES_INFO_SUCCESS,
    payload: {data},
  };
};

const getTeacherClassesInfoFailed = (error: any) => {
  return {
    type: GET_TEACHER_CLASSES_INFO_FAILED,
    payload: error,
  };
};

export const getTeacherClassesInfoDestroy = () => {
  return {
    type: GET_TEACHER_CLASSES_INFO_DESTROY,
  };
};

export const fetchGetTeacherClassesInfo = (callback?: any) => {
  return async (
    dispatch: Dispatch<GET_TEACHER_CLASSES_INFO_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTeacherClassesInfoRequest());
    try {
      const res = await api.get(URL_PATH.get_teacher_classes_info(1, 0));
      if (res?.status === 200) {
        dispatch(getTeacherClassesInfoSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getTeacherClassesInfoFailed(res?.data));
      }
    } catch (err) {
      dispatch(getTeacherClassesInfoFailed(err));
    }
  };
};
