import {
  GET_ALL_EXAM_HISTORY_PARENT_ACTION_TYPES,
  GET_ALL_EXAM_HISTORY_PARENT_DESTROY,
  GET_ALL_EXAM_HISTORY_PARENT_FAILED,
  GET_ALL_EXAM_HISTORY_PARENT_REQUEST,
  GET_ALL_EXAM_HISTORY_PARENT_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import apiWithoutToken from '@api/withoutToken';

const getAllExamHistoryParentRequest = () => {
  return {
    type: GET_ALL_EXAM_HISTORY_PARENT_REQUEST,
  };
};

const getAllExamHistoryParentSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
  resetList?: boolean,
) => {
  return {
    type: GET_ALL_EXAM_HISTORY_PARENT_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
      resetList,
    },
  };
};

const getAllExamHistoryParentFailed = (error: any) => {
  return {
    type: GET_ALL_EXAM_HISTORY_PARENT_FAILED,
    payload: error,
  };
};

export const getAllExamHistoryParentDestroy = () => {
  return {
    type: GET_ALL_EXAM_HISTORY_PARENT_DESTROY,
  };
};

export const fetchGetAllExamParentHistory = (
  body: any,
  token: any,
  resetList?: boolean,
): any => {
  return async (
    dispatch: Dispatch<GET_ALL_EXAM_HISTORY_PARENT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllExamHistoryParentRequest());
    try {
      const res = await apiWithoutToken.post(URL_PATH.post_exam_history, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept-Language': 'en',
        },
      });
      if (res?.status === 200) {
        const nextPage = res.data.data?.length > 0 ? true : false;
        dispatch(
          getAllExamHistoryParentSuccess(
            res?.data?.data ?? [],
            nextPage,
            body,
            resetList,
          ),
        );
      } else {
        dispatch(getAllExamHistoryParentFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllExamHistoryParentFailed(err));
    }
  };
};
