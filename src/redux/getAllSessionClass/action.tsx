import {
  GET_ALL_SESSION_CLASS_ACTION_TYPES,
  GET_ALL_SESSION_CLASS_DESTROY,
  GET_ALL_SESSION_CLASS_FAILED,
  GET_ALL_SESSION_CLASS_REQUEST,
  GET_ALL_SESSION_CLASS_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllSessionClassRequest = () => {
  return {
    type: GET_ALL_SESSION_CLASS_REQUEST,
  };
};

const getAllSessionClasSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_ALL_SESSION_CLASS_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getAllSessionClassFailed = (
  error: any,
  nextPage?: boolean,
  params?: any,
) => {
  return {
    type: GET_ALL_SESSION_CLASS_FAILED,
    payload: {
      error,
      nextPage,
      params,
    },
  };
};

export const getAllSessionClassDestroy = () => {
  return {
    type: GET_ALL_SESSION_CLASS_DESTROY,
  };
};

export const fetchGetAllSessionClass = (params: any, callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_SESSION_CLASS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllSessionClassRequest());
    let nextPage = false;
    try {
      const res = await api.get(URL_PATH.get_all_session_class, {
        params: params,
      });
      if (res?.status === 200) {
        const data = res?.data || [];
        const promises = data?.data?.map(async (obj: any) => {
          const icon_subject = obj?.subject?.icon_mobile;
          const avatar = obj?.user_created_by?.avatar;
          if (icon_subject) {
            const imgRes = await api.get(`/media/v1/image/${icon_subject}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.subject_icon_url = imgRes?.data?.data?.path_url;
              obj.subject_icon_id = imgRes?.data?.data?.ID;
            }
          }
          if (avatar) {
            const avatarRes = await api.get(`/media/v1/image/${avatar}`);
            if (avatarRes?.status === 200 && avatarRes?.data?.code === 100) {
              obj.avatar_icon_url = avatarRes?.data?.data?.path_url;
              obj.avatar_icon_id = avatarRes?.data?.data?.ID;
            }
          }
        });
        nextPage = res.data?.data?.length > 0 ? true : false;
        await Promise.all(promises);
        callback && callback(res);
        dispatch(getAllSessionClasSuccess(res?.data, nextPage, params));
      } else {
        nextPage = res.data?.data?.length > 0 ? true : false;
        callback && callback(res);
        dispatch(getAllSessionClassFailed(res?.data, nextPage, params));
      }
    } catch (err) {
      callback && callback(err);
      dispatch(getAllSessionClassFailed(err, nextPage, params));
    }
  };
};
