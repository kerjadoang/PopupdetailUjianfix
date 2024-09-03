import {
  RECORD_FILTER_ACTION_TYPES,
  RECORD_FILTER_DESTROY,
  RECORD_FILTER_FAILED,
  RECORD_FILTER_REQUEST,
  RECORD_FILTER_SUCCESS,
  _IPayloadRecordFilter,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const recordFilterRequest = () => {
  return {
    type: RECORD_FILTER_REQUEST,
  };
};

const recordFilterSuccess = (data: any) => {
  return {
    type: RECORD_FILTER_SUCCESS,
    payload: data,
  };
};

const recordFilterFailed = (error: any) => {
  return {
    type: RECORD_FILTER_FAILED,
    payload: error,
  };
};

export const recordFilterDestroy = () => {
  return {
    type: RECORD_FILTER_DESTROY,
  };
};

export const fetchRecordFilter = (
  payload: _IPayloadRecordFilter,
  // downloaded: boolean,
  callback?: any,
): any => {
  return async (
    dispatch: Dispatch<RECORD_FILTER_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(recordFilterRequest());
    try {
      showLoading();
      // const token = await AsyncStorage.getItem(Keys.token);
      // const tokenParse = await JSON.parse(token || '');
      // const deviceId = await getUniqueId();
      // const deviceId = await DeviceInfo.getUniqueId();

      const res = await api.post(
        URL_PATH.post_ptn_record_session('guru'),
        payload,
        // {
        //   headers: {
        //     Authorization: `Bearer ${tokenParse}`,
        //     // 'Device-id': downloaded ? deviceId : '',
        //     // || 'k8hjs8y375hmglsdfr2'
        //   },
        // },
      );

      if (res?.status === 200) {
        dispatch(recordFilterSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(recordFilterFailed(res?.data));
      }
    } catch (err) {
      dispatch(recordFilterFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
