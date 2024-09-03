import {
  POST_ISSUE_DATE_ACTION_TYPES,
  POST_ISSUE_DATE_DESTROY,
  POST_ISSUE_DATE_FAILED,
  POST_ISSUE_DATE_REQUEST,
  POST_ISSUE_DATE_SUCCESS,
  _IPayloadIssueDate,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const storeIssueDateRequest = () => {
  return {
    type: POST_ISSUE_DATE_REQUEST,
  };
};

const storeIssueDateSuccess = (data: any) => {
  return {
    type: POST_ISSUE_DATE_SUCCESS,
    payload: data,
  };
};

const storeIssueDateFailed = (error: any) => {
  return {
    type: POST_ISSUE_DATE_FAILED,
    payload: error,
  };
};

export const storeIssueDateDestroy = () => {
  return {
    type: POST_ISSUE_DATE_DESTROY,
  };
};

export const sendIssueDate = (
  payload: _IPayloadIssueDate,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<POST_ISSUE_DATE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(storeIssueDateRequest());
    try {
      const res = await api.post(URL_PATH.store_issue_date, payload);
      // logApi({
      //   nameFunction: 'apiPost',
      //   res:res,
      //   tags: 'sendIssueDate'
      // })
      if (res?.status === 200) {
        dispatch(storeIssueDateSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(storeIssueDateFailed(res?.data));
      }
    } catch (err) {
      dispatch(storeIssueDateFailed(err));
    }
  };
};
