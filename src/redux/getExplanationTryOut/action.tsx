import {
  GET_EXPLANATION_TRYOUT_ACTION_TYPES,
  GET_EXPLANATION_TRYOUT_DESTROY,
  GET_EXPLANATION_TRYOUT_FAILED,
  GET_EXPLANATION_TRYOUT_REQUEST,
  GET_EXPLANATION_TRYOUT_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getExplanationTryouteRequest = () => {
  return {
    type: GET_EXPLANATION_TRYOUT_REQUEST,
  };
};

const getExplanationTryouteSuccess = (data: any) => {
  return {
    type: GET_EXPLANATION_TRYOUT_SUCCESS,
    payload: data,
  };
};

const getExplanationTryouteFailed = (error: any) => {
  return {
    type: GET_EXPLANATION_TRYOUT_FAILED,
    payload: error,
  };
};

export const getExplanationTryouteDestroy = () => {
  return {
    type: GET_EXPLANATION_TRYOUT_DESTROY,
  };
};

export const fetchExplanationTryout = (
  tryoutHistoryId: any,
  subjectId: any,
  status: any,
): any => {
  return async (
    dispatch: Dispatch<GET_EXPLANATION_TRYOUT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getExplanationTryouteRequest());
    try {
      showLoading();
      const res = await api.get(
        URL_PATH.get_explanation_tryout(tryoutHistoryId, subjectId, status),
      );
      if (res?.status === 200) {
        dispatch(getExplanationTryouteSuccess(res?.data));
      } else {
        dispatch(getExplanationTryouteFailed(res?.data));
      }
    } catch (err) {
      dispatch(getExplanationTryouteFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
