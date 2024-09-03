import api from '@api/index';
import {Dispatch} from 'redux';
import {
  REMOVE_VIDEO_DOWNLOAD_ACTION_TYPES,
  REMOVE_VIDEO_DOWNLOAD_DESTROY,
  REMOVE_VIDEO_DOWNLOAD_FAILED,
  REMOVE_VIDEO_DOWNLOAD_REQUEST,
  REMOVE_VIDEO_DOWNLOAD_SUCCESS,
} from './type';

const removeVideoDownloadRequest = () => {
  return {
    type: REMOVE_VIDEO_DOWNLOAD_REQUEST,
  };
};

const removeVideoDownloadSuccess = (data: any) => {
  return {
    type: REMOVE_VIDEO_DOWNLOAD_SUCCESS,
    payload: data,
  };
};

const removeVideoDownloadFailed = (error: any) => {
  return {
    type: REMOVE_VIDEO_DOWNLOAD_FAILED,
    payload: error,
  };
};

export const removeVideoDownloadDestroy = () => {
  return {
    type: REMOVE_VIDEO_DOWNLOAD_DESTROY,
  };
};

export const fetchRemoveVideoDownload = (reqId: any): any => {
  return async (
    dispatch: Dispatch<REMOVE_VIDEO_DOWNLOAD_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(removeVideoDownloadRequest());
    try {
      const res = await api.delete(`/master/v1/user-videos/${reqId}`);

      if (res?.status === 200) {
        dispatch(removeVideoDownloadSuccess(res?.data));
      } else {
        dispatch(removeVideoDownloadFailed(res?.data));
      }
    } catch (err) {
      dispatch(removeVideoDownloadFailed(err));
    }
  };
};
