import {
  GET_DETAIL_SESSION_CLASS_ACTION_TYPES,
  GET_DETAIL_SESSION_CLASS_DESTROY,
  GET_DETAIL_SESSION_CLASS_FAILED,
  GET_DETAIL_SESSION_CLASS_REQUEST,
  GET_DETAIL_SESSION_CLASS_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getDetailSessionClassRequest = () => {
  return {
    type: GET_DETAIL_SESSION_CLASS_REQUEST,
  };
};

const getDetailSessionClassSuccess = (data: any) => {
  return {
    type: GET_DETAIL_SESSION_CLASS_SUCCESS,
    payload: {
      data,
    },
  };
};

const getDetailSessionClassFailed = (error: any) => {
  return {
    type: GET_DETAIL_SESSION_CLASS_FAILED,
    payload: error,
  };
};

export const getDetailSessionClassDestroy = () => {
  return {
    type: GET_DETAIL_SESSION_CLASS_DESTROY,
  };
};

export const fetchGetDetailSessionClass = (id: any): any => {
  return async (
    dispatch: Dispatch<GET_DETAIL_SESSION_CLASS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDetailSessionClassRequest());
    try {
      const res = await api.get(URL_PATH.get_detail_session_class(id));

      if (res?.status === 200) {
        // const data = res?.data || [];
        // const promises = data?.data?.map(async (obj: any) => {
        //   const icon_subject = obj?.subject?.icon_mobile;
        //   const avtar = obj?.user_created_by?.avatar;
        //   if (icon_subject) {
        //     const imgRes = await api.get(`/media/v1/image/${icon_subject}`);
        //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
        //       obj.subject_icon_url = imgRes?.data?.data?.path_url;
        //       obj.subject_icon_id = imgRes?.data?.data?.ID;

        //   }
        //   if (avatar) {
        //     const avatarRes = await api.get(`/media/v1/image/${avatar}`);
        //     if (avtarRes?.status === 200 && avatarRes?.data?.code === 100) {
        //       obj.avatar_icon_url = avatarRes?.data?.data?.path_url;
        //       obj.avatar_icon_id = avatarRes?.data?.data?.ID;
        //     }
        //   }
        // });

        // await Promise.all(promises);

        dispatch(getDetailSessionClassSuccess(res?.data));
      } else {
        dispatch(getDetailSessionClassFailed(res?.data));
      }
    } catch (err) {
      dispatch(getDetailSessionClassFailed(err));
    }
  };
};
