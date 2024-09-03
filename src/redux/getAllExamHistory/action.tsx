import {
  GET_ALL_EXAM_HISTORY_ACTION_TYPES,
  GET_ALL_EXAM_HISTORY_DESTROY,
  GET_ALL_EXAM_HISTORY_FAILED,
  GET_ALL_EXAM_HISTORY_REQUEST,
  GET_ALL_EXAM_HISTORY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllExamHistoryRequest = () => {
  return {
    type: GET_ALL_EXAM_HISTORY_REQUEST,
  };
};

const getAllExamHistorySuccess = (
  data: any,
  nextPage: boolean,
  params: any,
  resetList?: boolean,
) => {
  return {
    type: GET_ALL_EXAM_HISTORY_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
      resetList,
    },
  };
};

const getAllExamHistoryFailed = (error: any) => {
  return {
    type: GET_ALL_EXAM_HISTORY_FAILED,
    payload: error,
  };
};

export const getAllExamHistoryDestroy = () => {
  return {
    type: GET_ALL_EXAM_HISTORY_DESTROY,
  };
};

export const fetchGetAllExamHistory = (
  body: any,
  task?: boolean,
  resetList?: boolean,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_EXAM_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllExamHistoryRequest());
    try {
      const res = await api.post(
        task ? URL_PATH.post_task_history : URL_PATH.post_exam_history,
        body,
      );

      // logApi({
      //   nameFunction: 'apiPost',
      //   res: res,
      //   tags: 'fetchGetAllExamHistory',
      // });

      if (res?.status === 200) {
        const nextPage = res.data.data?.length > 0 ? true : false;
        dispatch(
          getAllExamHistorySuccess(
            res?.data?.data ?? [],
            nextPage,
            body,
            resetList,
          ),
        );
      } else {
        dispatch(getAllExamHistoryFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllExamHistoryFailed(err));
    }
  };
};
