import {
  GET_TEACHER_MATERIALS_ACTION_TYPES,
  GET_TEACHER_MATERIALS_DESTROY,
  GET_TEACHER_MATERIALS_FAILED,
  GET_TEACHER_MATERIALS_REQUEST,
  GET_TEACHER_MATERIALS_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const getTeacherMaterialsRequest = () => {
  return {
    type: GET_TEACHER_MATERIALS_REQUEST,
  };
};

const getTeacherMaterialsSuccess = (data: any) => {
  return {
    type: GET_TEACHER_MATERIALS_SUCCESS,
    payload: data,
  };
};

const getTeacherMaterialsFailed = (error: any) => {
  return {
    type: GET_TEACHER_MATERIALS_FAILED,
    payload: error,
  };
};

export const getTeacherMaterialsDestroy = () => {
  return {
    type: GET_TEACHER_MATERIALS_DESTROY,
  };
};

export const fetchTeacherMaterials = (curriculum_id: number): any => {
  return async (
    dispatch: Dispatch<GET_TEACHER_MATERIALS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getTeacherMaterialsRequest());
    showLoading();
    try {
      const res = await api.get(
        URL_PATH.get_teacher_materials(Number(curriculum_id)),
      );
      const data = res?.data;

      if (res?.status === 200) {
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.subject) {
            const promisesSubject = obj?.subject?.map(async (o: any) => {
              if (o?.icon_mobile) {
                const imgRes = await api.get(
                  `/media/v1/image/${o?.icon_mobile}`,
                );
                if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                  o.icon_path_url = imgRes?.data?.data?.path_url;
                  o.icon_path_id = imgRes?.data?.data?.ID;
                }
              }
            });
            await Promise.all(promisesSubject);
          }
        });
        await Promise.all(promises);
        dispatch(getTeacherMaterialsSuccess(res?.data));
      } else {
        dispatch(getTeacherMaterialsFailed(res?.data));
      }
      dismissLoading();
    } catch (err) {
      dispatch(getTeacherMaterialsFailed(err));
      dismissLoading();
    }
  };
};
