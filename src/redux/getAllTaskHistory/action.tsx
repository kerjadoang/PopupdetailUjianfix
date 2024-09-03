import {
  GET_ALL_TASK_HISTORY_ACTION_TYPES,
  GET_ALL_TASK_HISTORY_DESTROY,
  GET_ALL_TASK_HISTORY_FAILED,
  GET_ALL_TASK_HISTORY_REQUEST,
  GET_ALL_TASK_HISTORY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllTaskHistoryRequest = () => {
  return {
    type: GET_ALL_TASK_HISTORY_REQUEST,
  };
};

const getAllTaskHistorySuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_ALL_TASK_HISTORY_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getAllTaskHistoryFailed = (error: any) => {
  return {
    type: GET_ALL_TASK_HISTORY_FAILED,
    payload: error,
  };
};

export const getAllTaskHistoryDestroy = () => {
  return {
    type: GET_ALL_TASK_HISTORY_DESTROY,
  };
};

export const fetchgetAllTaskHistory = (body: any, student_id: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_TASK_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllTaskHistoryRequest());
    try {
      const res = await api.post(
        student_id !== undefined
          ? URL_PATH.get_all_task_history_student(student_id)
          : URL_PATH.post_task_history,
        body,
      );
      if (res?.status === 200) {
        const nextPage = res?.data?.data?.list?.length > 0 ? true : false;

        dispatch(
          getAllTaskHistorySuccess(res?.data?.data?.list ?? [], nextPage, body),
        );
      } else {
        dispatch(getAllTaskHistoryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllTaskHistoryFailed(err));
    }
  };
};
