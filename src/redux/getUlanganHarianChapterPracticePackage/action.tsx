import {
  GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_ACTION_TYPES,
  GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_DESTROY,
  GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_FAILED,
  GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_REQUEST,
  GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUlanganHarianChapterPracticePackageRequest = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_REQUEST,
  };
};

const getUlanganHarianChapterPracticePackageSuccess = (data: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUlanganHarianChapterPracticePackageFailed = (error: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUlanganHarianChapterPracticePackageDestroy = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_DESTROY,
  };
};

export const fetchGetUlanganHarianChapterPracticePackage: any = (
  chapter_id: number,
  callback?: any,
  errCallback?: any,
) => {
  return async (
    dispatch: Dispatch<GET_ULANGAN_HARIAN_CHAPTER_PRACTICE_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUlanganHarianChapterPracticePackageRequest());
    try {
      const res = await api.get(
        URL_PATH.get_ulangan_harian_chapter_practice_package(chapter_id),
      );

      if (res?.status === 200) {
        dispatch(getUlanganHarianChapterPracticePackageSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getUlanganHarianChapterPracticePackageFailed(res?.data));
      }
    } catch (err) {
      errCallback && errCallback(err);
      dispatch(getUlanganHarianChapterPracticePackageFailed(err));
    }
  };
};
