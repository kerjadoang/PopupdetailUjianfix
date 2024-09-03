import {
  GET_TASK_TEACHER_DETAIL_ACTION_TYPES,
  GET_TASK_TEACHER_DETAIL_DESTROY,
  GET_TASK_TEACHER_DETAIL_FAILED,
  GET_TASK_TEACHER_DETAIL_REQUEST,
  GET_TASK_TEACHER_DETAIL_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getTaskTeacherDetailRequest = () => {
  return {
    type: GET_TASK_TEACHER_DETAIL_REQUEST,
  };
};

const getTaskTeacherDetailSuccess = (data: any) => {
  return {
    type: GET_TASK_TEACHER_DETAIL_SUCCESS,
    payload: data,
  };
};

const getTaskTeacherDetailFailed = (error: any) => {
  return {
    type: GET_TASK_TEACHER_DETAIL_FAILED,
    payload: error,
  };
};

export const getTaskTeacherDetailDestroy = () => {
  return {
    type: GET_TASK_TEACHER_DETAIL_DESTROY,
  };
};

export const fetchTaskTeacherDetail = (id: any): any => {
  return async (
    dispatch: Dispatch<GET_TASK_TEACHER_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTaskTeacherDetailRequest());
    showLoading();
    try {
      const res = await api.get(URL_PATH.get_task_teacher_checked_detail(id));
      const data = res?.data;
      const finish = data?.data?.finish;
      const not_yet = data?.data?.not_yet;
      if (res?.status === 200) {
        if (finish) {
          const promises = finish?.map(async (o: any) => {
            if (o?.user?.avatar) {
              const imgRes = await api.get(
                `/media/v1/image/${o?.user?.avatar}`,
              );
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.user.avatar_path_url = imgRes?.data?.data?.path_url;
                o.user.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }
        if (not_yet) {
          const promises = not_yet?.map(async (o: any) => {
            if (o?.user?.avatar) {
              const imgRes = await api.get(
                `/media/v1/image/${o?.user?.avatar}`,
              );
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.user.avatar_path_url = imgRes?.data?.data?.path_url;
                o.user.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }

        dispatch(getTaskTeacherDetailSuccess(res?.data));
        dismissLoading();
      } else {
        dispatch(getTaskTeacherDetailFailed(res?.data));
        dismissLoading();
      }
    } catch (err) {
      dispatch(getTaskTeacherDetailFailed(err));
      dismissLoading();
    } finally {
      dismissLoading();
    }
  };
};
