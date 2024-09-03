import {
  PUT_IGNORE_ABSENT_REQUEST_ACTION_TYPES,
  PUT_IGNORE_ABSENT_REQUEST_DESTROY,
  PUT_IGNORE_ABSENT_REQUEST_FAILED,
  PUT_IGNORE_ABSENT_REQUEST_REQUEST,
  PUT_IGNORE_ABSENT_REQUEST_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const putIgnoreAbsentRequestRequest = () => {
  return {
    type: PUT_IGNORE_ABSENT_REQUEST_REQUEST,
  };
};

const putIgnoreAbsentRequestSuccess = (data: any) => {
  return {
    type: PUT_IGNORE_ABSENT_REQUEST_SUCCESS,
    payload: {data},
  };
};

const putIgnoreAbsentRequestFailed = (error: any) => {
  return {
    type: PUT_IGNORE_ABSENT_REQUEST_FAILED,
    payload: error,
  };
};

export const putIgnoreAbsentRequestDestroy = () => {
  return {
    type: PUT_IGNORE_ABSENT_REQUEST_DESTROY,
  };
};

type _IFetchPutIgnoreAbsentRequest = {
  absence_id: any;
  reviewer_note: string;
};

export const fetchPutIgnoreAbsentRequest = (
  reqBody: _IFetchPutIgnoreAbsentRequest,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<PUT_IGNORE_ABSENT_REQUEST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(putIgnoreAbsentRequestRequest());
    try {
      const res = await api.put(URL_PATH.put_ignore_absent_request(), reqBody);
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(putIgnoreAbsentRequestSuccess(res?.data));
      } else {
        dispatch(putIgnoreAbsentRequestFailed(res?.data));
      }
    } catch (err) {
      dispatch(putIgnoreAbsentRequestFailed(err));
    }
  };
};
