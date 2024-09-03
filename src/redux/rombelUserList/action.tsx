import {
  ROMBEL_USER_LIST_ACTION_TYPES,
  ROMBEL_USER_LIST_DESTROY,
  ROMBEL_USER_LIST_FAILED,
  ROMBEL_USER_LIST_REQUEST,
  ROMBEL_USER_LIST_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getRombelUserListRequest = () => {
  return {
    type: ROMBEL_USER_LIST_REQUEST,
  };
};

const getRombelUserListSuccess = (data: any) => {
  return {
    type: ROMBEL_USER_LIST_SUCCESS,
    payload: data,
  };
};

const getRombelUserListFailed = (error: any) => {
  return {
    type: ROMBEL_USER_LIST_FAILED,
    payload: error,
  };
};

export const getRombelUserListDestroy = () => {
  return {
    type: ROMBEL_USER_LIST_DESTROY,
  };
};

export const fetchRombelUserList = (id: any): any => {
  return async (
    dispatch: Dispatch<ROMBEL_USER_LIST_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRombelUserListRequest());
    try {
      const res = await api.get(URL_PATH.rombel_user(id));
      if (res?.status === 200) {
        const data = res?.data;
        const promises = data?.data?.rombel_user.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        dispatch(getRombelUserListSuccess(res?.data));
      } else {
        dispatch(getRombelUserListFailed(res?.data));
      }
    } catch (err) {
      dispatch(getRombelUserListFailed(err));
    }
  };
};
