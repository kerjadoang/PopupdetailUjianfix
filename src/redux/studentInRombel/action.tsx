import {
  STUDENT_IN_ROMBEL_ACTION_TYPES,
  STUDENT_IN_ROMBEL_DESTROY,
  STUDENT_IN_ROMBEL_FAILED,
  STUDENT_IN_ROMBEL_REQUEST,
  STUDENT_IN_ROMBEL_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getStudentInRombelRequest = () => {
  return {
    type: STUDENT_IN_ROMBEL_REQUEST,
  };
};

const getStudentInRombelSuccess = (data: any) => {
  return {
    type: STUDENT_IN_ROMBEL_SUCCESS,
    payload: data,
  };
};

const getStudentInRombelFailed = (error: any) => {
  return {
    type: STUDENT_IN_ROMBEL_FAILED,
    payload: error,
  };
};

export const getStudentInRombelDestroy = () => {
  return {
    type: STUDENT_IN_ROMBEL_DESTROY,
  };
};

export const fetchStudentInRombel = (rombelId: any, search: any): any => {
  return async (
    dispatch: Dispatch<STUDENT_IN_ROMBEL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getStudentInRombelRequest());
    showLoading();
    try {
      const res = await api.get(URL_PATH.rombel_student_list(rombelId, search));
      if (res?.status === 200) {
        const promises = res?.data?.data?.rombel_user.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(URL_PATH.get_image(obj?.avatar));

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        dispatch(getStudentInRombelSuccess(res?.data));
      } else {
        dispatch(getStudentInRombelFailed(res?.data));
      }
    } catch (err) {
      dispatch(getStudentInRombelFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
