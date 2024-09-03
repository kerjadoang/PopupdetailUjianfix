import {
  GET_PR_PROJECT_HISTORY_DESTROY,
  GET_PR_PROJECT_HISTORY_FAILED,
  GET_PR_PROJECT_HISTORY_REQUEST,
  GET_PR_PROJECT_HISTORY_SUCCESS,
  GET_PR_PROJECT_HISTORY_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getPRProjectHistoryRequest = () => {
  return {
    type: GET_PR_PROJECT_HISTORY_REQUEST,
  };
};

const getPRProjectHistorySuccess = (
  data: any,
  nextPage?: boolean,
  params?: any,
) => {
  return {
    type: GET_PR_PROJECT_HISTORY_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getPRProjectHistoryFailed = (
  error: any,
  nextPage?: boolean,
  params?: any,
) => {
  return {
    type: GET_PR_PROJECT_HISTORY_FAILED,
    payload: {
      error,
      nextPage,
      params,
    },
  };
};

export const getPRProjectHistoryDestroy = () => {
  return {
    type: GET_PR_PROJECT_HISTORY_DESTROY,
  };
};

export const fetchgetPRProjectHistory = (body: any): any => {
  return async (
    dispatch: Dispatch<GET_PR_PROJECT_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getPRProjectHistoryRequest());
    let nextpage = false;
    try {
      const res = await api.post(URL_PATH.get_teacher_task_history, body);
      nextpage = res.data?.data?.list?.length > 0 ? true : false;
      if (res?.status === 200) {
        dispatch(
          getPRProjectHistorySuccess(res?.data?.data?.list, nextpage, body),
        );
      } else {
        dispatch(
          getPRProjectHistoryFailed(res?.data?.data?.list, nextpage, body),
        );
      }
    } catch (err) {
      dispatch(getPRProjectHistoryFailed(err, nextpage, body));
    }
  };
};
