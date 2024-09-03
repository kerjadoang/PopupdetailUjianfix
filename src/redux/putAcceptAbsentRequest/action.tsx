import {
  PUT_ACCEPT_ABSENT_REQUEST_ACTION_TYPES,
  PUT_ACCEPT_ABSENT_REQUEST_DESTROY,
  PUT_ACCEPT_ABSENT_REQUEST_FAILED,
  PUT_ACCEPT_ABSENT_REQUEST_REQUEST,
  PUT_ACCEPT_ABSENT_REQUEST_SUCCESS,
} from './type';
import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import api from '@api/index';

const putAcceptAbsentRequestRequest = () => {
  return {
    type: PUT_ACCEPT_ABSENT_REQUEST_REQUEST,
  };
};

const putAcceptAbsentRequestSuccess = (data: any) => {
  return {
    type: PUT_ACCEPT_ABSENT_REQUEST_SUCCESS,
    payload: {data},
  };
};

const putAcceptAbsentRequestFailed = (error: any) => {
  return {
    type: PUT_ACCEPT_ABSENT_REQUEST_FAILED,
    payload: error,
  };
};

export const putAcceptAbsentRequestDestroy = () => {
  return {
    type: PUT_ACCEPT_ABSENT_REQUEST_DESTROY,
  };
};

type _IFetchPutAcceptAbsentRequest = {
  absence_id: any;
};

export const fetchPutAcceptAbsentRequest = (
  reqBody: _IFetchPutAcceptAbsentRequest,
  callback?: any,
) => {
  return async (
    dispatch: Dispatch<PUT_ACCEPT_ABSENT_REQUEST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(putAcceptAbsentRequestRequest());
    try {
      const res = await api.put(
        URL_PATH.put_accept_absent_request(reqBody?.absence_id),
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(putAcceptAbsentRequestSuccess(res?.data));
      } else {
        dispatch(putAcceptAbsentRequestFailed(res?.data));
      }
    } catch (err) {
      dispatch(putAcceptAbsentRequestFailed(err));
    }
  };
};
