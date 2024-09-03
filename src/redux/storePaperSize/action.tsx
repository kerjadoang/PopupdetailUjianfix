import {
  POST_PAPER_SIZE_ACTION_TYPES,
  POST_PAPER_SIZE_DESTROY,
  POST_PAPER_SIZE_FAILED,
  POST_PAPER_SIZE_REQUEST,
  POST_PAPER_SIZE_SUCCESS,
  _IPayloadPaperSize,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const storePaperSizeRequest = () => {
  return {
    type: POST_PAPER_SIZE_REQUEST,
  };
};

const storePaperSizeSuccess = (data: any) => {
  return {
    type: POST_PAPER_SIZE_SUCCESS,
    payload: data,
  };
};

const storePaperSizeFailed = (error: any) => {
  return {
    type: POST_PAPER_SIZE_FAILED,
    payload: error,
  };
};

export const storePaperSizeDestroy = () => {
  return {
    type: POST_PAPER_SIZE_DESTROY,
  };
};

export const sendPaperSize = (
  payload: _IPayloadPaperSize,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<POST_PAPER_SIZE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(storePaperSizeRequest());
    try {
      const res = await api.post(URL_PATH.store_paper_size, payload);
      // logApi({
      //   nameFunction: 'apiPost',
      //   res: res,
      //   tags: 'sendPaperSize',
      // });
      if (res?.status === 200) {
        dispatch(storePaperSizeSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(storePaperSizeFailed(res?.data));
      }
    } catch (err) {
      dispatch(storePaperSizeFailed(err));
    }
  };
};
