import {
  DETAIL_PACKAGE_REQUEST,
  DETAIL_PACKAGE_SUCCESS,
  DETAIL_PACKAGE_FAILED,
  DETAIL_PACKAGE_DESTROY,
  DETAIL_PACKAGE_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const detailPackageRequest = () => {
  return {
    type: DETAIL_PACKAGE_REQUEST,
  };
};

const detailPackageSuccess = (data: any) => {
  return {
    type: DETAIL_PACKAGE_SUCCESS,
    payload: data,
  };
};

const detailPackageFailed = (error: any) => {
  return {
    type: DETAIL_PACKAGE_FAILED,
    payload: error,
  };
};

export const detailPackageDestroy = () => {
  return {
    type: DETAIL_PACKAGE_DESTROY,
  };
};

export const fetchDetailPackage = (
  id: number,
  callback?: CallBackWithParams<void, any>,
): any => {
  return async (
    dispatch: Dispatch<DETAIL_PACKAGE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(detailPackageRequest());
    try {
      // showLoading();
      const res = await api.get(`${URL_PATH.get_package_detail(id)}`);

      if (res?.status === 200) {
        const data = res?.data;
        if (data?.data?.icon_mobile) {
          const imgRes = await api.get(
            `/media/v1/image/${data?.data?.icon_mobile}`,
          );

          let path_url = imgRes?.data?.data?.path_url;
          Object.assign(data?.data, {path_url: path_url});
        }
        dispatch(detailPackageSuccess(res?.data));
      } else {
        dispatch(detailPackageFailed(res?.data));
      }
      callback?.(res.data);
    } catch (err) {
      dispatch(detailPackageFailed(err));
    } finally {
      // dismissLoading();
    }
  };
};
