import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAILED,
  TASK_DESTROY,
  TASK_ACTION_TYPES,
} from './type';
import api from '@api';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const taskRequest = () => {
  return {
    type: TASK_REQUEST,
  };
};

const taskSuccess = (data: any) => {
  return {
    type: TASK_SUCCESS,
    payload: {data},
  };
};

const taskFailed = (error: any) => {
  return {
    type: TASK_FAILED,
    payload: error,
  };
};

export const taskDestroy = () => {
  return {
    type: TASK_DESTROY,
  };
};

export const fetchTask = (subject_id?: number, student_id?: number): any => {
  return async (dispatch: Dispatch<TASK_ACTION_TYPES>): Promise<void> => {
    dispatch(taskRequest());
    try {
      const res = await api.get(
        `${URL_PATH.get_report_task}?subject=${subject_id}&studentId=${student_id}`,
      );
      if (res?.status === 200) {
        dispatch(taskSuccess(res?.data));
      } else {
        dispatch(taskFailed(res?.data));
      }
    } catch (err) {
      dispatch(taskFailed(err));
    }
  };
};
