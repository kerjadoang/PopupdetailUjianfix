import {
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_ACTION_TYPES,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST,
  GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getUlanganHarianChapterTestPackageRequest = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_REQUEST,
  };
};

const getUlanganHarianChapterTestPackageSuccess = (data: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_SUCCESS,
    payload: data,
  };
};

const getUlanganHarianChapterTestPackageFailed = (error: any) => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_FAILED,
    payload: error,
  };
};

export const getUlanganHarianChapterTestPackageDestroy = () => {
  return {
    type: GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_DESTROY,
  };
};

export const fetchGetUlanganHarianChapterTestPackage: any = (
  chapter_id: number,
  callback?: (data: any) => void,
  errCallback?: (data: any) => void,
) => {
  return async (
    dispatch: Dispatch<GET_ULANGAN_HARIAN_CHAPTER_TEST_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getUlanganHarianChapterTestPackageRequest());
    try {
      const res = await api.get(
        URL_PATH.get_ulangan_harian_chapter_test_package(chapter_id),
      );

      if (res?.status === 200) {
        dispatch(getUlanganHarianChapterTestPackageSuccess(res?.data));
        callback?.(res?.data);
      } else {
        dispatch(getUlanganHarianChapterTestPackageFailed(res?.data));
      }
    } catch (err) {
      errCallback?.(err);
      dispatch(getUlanganHarianChapterTestPackageFailed(err));
    }
  };
};
