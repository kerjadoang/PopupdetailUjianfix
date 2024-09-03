import {
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_ACTION_TYPES,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST,
  GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getSubjectByCurriculumAndClassRequest = () => {
  return {
    type: GET_SUBJECT_BY_CURRICULUM_AND_CLASS_REQUEST,
  };
};

const getSubjectByCurriculumAndClassSuccess = (data: any) => {
  return {
    type: GET_SUBJECT_BY_CURRICULUM_AND_CLASS_SUCCESS,
    payload: data,
  };
};

const getSubjectByCurriculumAndClassFailed = (error: any) => {
  return {
    type: GET_SUBJECT_BY_CURRICULUM_AND_CLASS_FAILED,
    payload: error,
  };
};

export const getSubjectByCurriculumAndClassDestroy = () => {
  return {
    type: GET_SUBJECT_BY_CURRICULUM_AND_CLASS_DESTROY,
  };
};

export const fetchSubjectByCurriculumAndClass = (
  curriculum_id: any,
  class_id: any,
): any => {
  return async (
    dispatch: Dispatch<GET_SUBJECT_BY_CURRICULUM_AND_CLASS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSubjectByCurriculumAndClassRequest());
    try {
      const res = await api.get(
        URL_PATH.get_subject_by_curriculum_and_class(curriculum_id, class_id),
      );
      const data = res?.data;
      if (res?.status === 200) {
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.icon_path_url = imgRes?.data?.data?.path_url;
              obj.icon_path_id = imgRes?.data?.data?.ID;
            }
          }
        });
        await Promise.all(promises);
        dispatch(getSubjectByCurriculumAndClassSuccess(res?.data));
      } else {
        dispatch(getSubjectByCurriculumAndClassFailed(res?.data));
      }
    } catch (err) {
      dispatch(getSubjectByCurriculumAndClassFailed(err));
    }
  };
};
