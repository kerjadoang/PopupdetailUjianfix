import {
  EXAM_DETAIL_REQUEST,
  EXAM_DETAIL_SUCCESS,
  EXAM_DETAIL_FAILED,
  EXAM_DETAIL_DESTROY,
  EXAM_DETAIL_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const ExamDetailRequest = () => {
  return {
    type: EXAM_DETAIL_REQUEST,
  };
};

const ExamDetailSuccess = (data: any) => {
  return {
    type: EXAM_DETAIL_SUCCESS,
    payload: {data},
  };
};

const ExamDetailFailed = (error: any) => {
  return {
    type: EXAM_DETAIL_FAILED,
    payload: error,
  };
};

export const ExamDetailDestroy = () => {
  return {
    type: EXAM_DETAIL_DESTROY,
  };
};

export const fetchExamDetail = (id: number): any => {
  return async (
    dispatch: Dispatch<EXAM_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(ExamDetailRequest());
    try {
      showLoading();
      const res = await api.get(URL_PATH.get_exam_detail(id));
      if (res?.status === 200) {
        const data = res?.data;
        if (
          data?.data?.student_status?.mengumpulkan &&
          data?.data?.student_status?.mengumpulkan?.length !== 0
        ) {
          const promises = data?.data?.student_status?.mengumpulkan?.map(
            async (obj: any) => {
              if (obj?.avatar) {
                const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);
                if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                  obj.path_url = imgRes?.data?.data?.path_url;
                }
              }
              if (obj?.student_exam_id) {
                const studentInfo = await api.get(
                  URL_PATH?.scoring_exam_student(obj?.student_exam_id),
                );
                if (studentInfo?.status === 200) {
                  obj.point2 = studentInfo?.data?.data?.exam_history?.point;
                }
              }
            },
          );
          await Promise.all(promises);
        }

        if (
          data?.data?.student_status?.belum_selesai &&
          data?.data?.student_status?.belum_selesai?.length !== 0
        ) {
          const promises2 = data?.data?.student_status?.belum_selesai?.map(
            async (obj: any) => {
              if (obj?.avatar) {
                const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);
                if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                  obj.path_url = imgRes?.data?.data?.path_url;
                }
              }
            },
          );
          await Promise.all(promises2);
        }
        dispatch(ExamDetailSuccess(res?.data));
      } else {
        dispatch(ExamDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(ExamDetailFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
