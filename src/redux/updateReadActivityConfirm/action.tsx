import api from '@api/index';
import {
  UPDATE_READ_ACTIVITY_CONFIRM_ACTION_TYPES,
  UPDATE_READ_ACTIVITY_CONFIRM_DESTROY,
  UPDATE_READ_ACTIVITY_CONFIRM_FAILED,
  UPDATE_READ_ACTIVITY_CONFIRM_REQUEST,
  UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import {URL_PATH} from '@constants/url';

const updateReadActivityConfirmRequest = () => {
  return {
    type: UPDATE_READ_ACTIVITY_CONFIRM_REQUEST,
  };
};

const updateReadActivityConfirmSuccess = (data: any) => {
  return {
    type: UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS,
    payload: data,
  };
};

const updateReadActivityConfirmFailed = (error: any) => {
  return {
    type: UPDATE_READ_ACTIVITY_CONFIRM_FAILED,
    payload: error,
  };
};

export const updateReadActivityConfirmDestroy = () => {
  return {
    type: UPDATE_READ_ACTIVITY_CONFIRM_DESTROY,
  };
};

export const fetchUpdateReadActivityConfirm = ({
  reqBody,
  userType,
  callback,
  errCallback,
}: {
  reqBody: {
    parent_id?: number;
    student_id?: number;
    status: string; //Approved | Rejected
    uuid: string;
  };
  userType?: number;
  callback?: any;
  errCallback?: any;
}) => {
  return async (
    dispatch: Dispatch<UPDATE_READ_ACTIVITY_CONFIRM_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateReadActivityConfirmRequest());
    try {
      const res = await api.put(
        userType === 2
          ? URL_PATH?.update_terbaca_parent_update_confirm
          : URL_PATH?.update_terbaca_update_confirm(),
        reqBody,
      );
      callback && callback(res);
      if (res?.status === 200) {
        dispatch(updateReadActivityConfirmSuccess(res?.data));
      } else {
        errCallback && errCallback(res);
        dispatch(updateReadActivityConfirmFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateReadActivityConfirmFailed(err));
    }
  };
};
