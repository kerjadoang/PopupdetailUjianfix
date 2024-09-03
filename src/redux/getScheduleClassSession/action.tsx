import {
  GET_SCHEDULE_CLASS_SESSION_ACTION_TYPES,
  GET_SCHEDULE_CLASS_SESSION_DESTROY,
  GET_SCHEDULE_CLASS_SESSION_FAILED,
  GET_SCHEDULE_CLASS_SESSION_REQUEST,
  GET_SCHEDULE_CLASS_SESSION_SUCCESS,
} from './type';
import mediaProvider from '@services/media/provider';
import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getScheduleClassSessionRequest = () => {
  return {
    type: GET_SCHEDULE_CLASS_SESSION_REQUEST,
  };
};

const getScheduleClassSessionSuccess = (data: any) => {
  return {
    type: GET_SCHEDULE_CLASS_SESSION_SUCCESS,
    payload: data,
  };
};

const getScheduleClassSessionFailed = (error: any) => {
  return {
    type: GET_SCHEDULE_CLASS_SESSION_FAILED,
    payload: error,
  };
};

export const getScheduleClassSessionDestroy = () => {
  return {
    type: GET_SCHEDULE_CLASS_SESSION_DESTROY,
  };
};

export const fetchGetScheduleClassSession = (date: string): any => {
  return async (
    dispatch: Dispatch<GET_SCHEDULE_CLASS_SESSION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getScheduleClassSessionRequest());
    try {
      const res = await api.get(
        URL_PATH.get_schedule_class_session_lms_home(date),
      );
      if (res?.status === 200) {
        const promises = res?.data?.data?.map(async (obj: any) => {
          if (obj?.creator?.avatar) {
            const resAvatar = await mediaProvider.getImage(
              obj?.creator?.avatar,
            );
            if (resAvatar) {
              obj.avatar_path_url = resAvatar?.data?.path_url;
              obj.avatar_path_id = resAvatar.data?.ID;
            }
          }
        });
        await Promise.all(promises);
        dispatch(getScheduleClassSessionSuccess(res?.data));
      } else {
        dispatch(getScheduleClassSessionFailed(res?.data));
      }
    } catch (err) {
      dispatch(getScheduleClassSessionFailed(err));
    }
  };
};
