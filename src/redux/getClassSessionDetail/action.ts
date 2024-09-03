import {
  CS_DETAIL_REQUEST,
  CS_DETAIL_SUCCESS,
  CS_DETAIL_FAILED,
  CS_DETAIL_DESTROY,
  CS_DETAIL_ACTION_TYPES,
  IInitialStateGetClassSession,
} from './type';
import {URL_PATH} from '@constants/url';
import provider from '@services/media/provider';
import {AxiosResponse} from 'axios';

import {Dispatch} from 'redux';
import api from '@api/index';

const classSessionDetailRequest = () => {
  return {
    type: CS_DETAIL_REQUEST,
  };
};

const classSessionDetailSuccess = (data: any) => {
  return {
    type: CS_DETAIL_SUCCESS,
    payload: data,
  };
};

const classSessionDetailFailed = (error: any) => {
  return {
    type: CS_DETAIL_FAILED,
    payload: error,
  };
};

export const classSessionDetailDestroy = () => {
  return {
    type: CS_DETAIL_DESTROY,
  };
};

export const fetchClassSessionDetail = (service: ServiceType, id: any): any => {
  return async (dispatch: Dispatch<CS_DETAIL_ACTION_TYPES>): Promise<void> => {
    dispatch(classSessionDetailRequest());
    try {
      const res: AxiosResponse<IInitialStateGetClassSession['data']> =
        await api.get(
          service === 'LMS'
            ? URL_PATH.get_live_class_detail_from_LMS(id)
            : URL_PATH.get_live_class_detail(service, id),
        );

      if (res?.status === 200) {
        if (res.data?.data?.user?.avatar) {
          let resImage = await provider.getImage(res.data.data.user.avatar);
          res.data.data.user.path_url = resImage?.data?.path_url;
        }
        if (res.data?.data?.subject?.icon_mobile) {
          let resImage = await provider.getImage(
            res.data.data.subject.icon_mobile,
          );
          res.data.data.subject.path_url = resImage?.data?.path_url;
        }
        dispatch(classSessionDetailSuccess(res?.data));
      } else {
        dispatch(classSessionDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(classSessionDetailFailed(err));
    } finally {
    }
  };
};
