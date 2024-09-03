import {Dispatch} from 'redux';
import {
  GET_JOIN_LIVE_CLASS_SESSION_REQUEST,
  GET_JOIN_LIVE_CLASS_SESSION_SUCCESS,
  GET_JOIN_LIVE_CLASS_SESSION_FAILED,
  GET_JOIN_LIVE_CLASS_SESSION_DESTROY,
  GET_JOIN_LIVE_CLASS_SESSION_ACTION_TYPES,
  IJoinLiveClassSessionResponse,
} from './type';
import client from '@api/alternate';
import {URL_PATH} from '@constants/url';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {dismissLoading, showLoading} from '@constants/functional';

const getJoinLiveClassSessionRequest = () => {
  return {
    type: GET_JOIN_LIVE_CLASS_SESSION_REQUEST,
  };
};
const getJoinLiveClassSessionSuccess = (
  data: IJoinLiveClassSessionResponse,
) => {
  return {
    type: GET_JOIN_LIVE_CLASS_SESSION_SUCCESS,
    payload: {
      data,
    },
  };
};
const getJoinLiveClassSessionFailed = (error: any) => {
  return {
    type: GET_JOIN_LIVE_CLASS_SESSION_FAILED,
    payload: error,
  };
};
export const getJoinLiveClassSessionDestroy = () => {
  return {
    type: GET_JOIN_LIVE_CLASS_SESSION_DESTROY,
  };
};

export const fetchJoinLiveClassSession = (
  id: any,
  callback?: () => void,
  service_type?: ServiceType,
): any => {
  return async (
    dispatch: Dispatch<GET_JOIN_LIVE_CLASS_SESSION_ACTION_TYPES>,
  ): Promise<void> => {
    showLoading();
    dispatch(getJoinLiveClassSessionRequest());
    try {
      const url =
        service_type === 'ptn'
          ? URL_PATH.join_live_class_session('ptn', id)
          : URL_PATH.join_live_class_session('guru', id);
      const res = await client.get(url);

      dispatch(getJoinLiveClassSessionSuccess(res.data));
      callback?.();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      dispatch(getJoinLiveClassSessionFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
