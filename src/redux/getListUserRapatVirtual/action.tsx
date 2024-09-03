import api from '@api';
import {Dispatch} from 'redux';
import {
  LIST_USER_RAPAT_VIRTUAL_ACTION_TYPES,
  LIST_USER_RAPAT_VIRTUAL_DESTROY,
  LIST_USER_RAPAT_VIRTUAL_FAILED,
  LIST_USER_RAPAT_VIRTUAL_REQUEST,
  LIST_USER_RAPAT_VIRTUAL_SUCCESS,
} from './type';

const listUserRapatVirtualRequest = () => {
  return {
    type: LIST_USER_RAPAT_VIRTUAL_REQUEST,
  };
};

const listUserRapatVirtualSuccess = (data: any) => {
  return {
    type: LIST_USER_RAPAT_VIRTUAL_SUCCESS,
    payload: data,
  };
};

const listUserRapatVirtualFailed = (error: any) => {
  return {
    type: LIST_USER_RAPAT_VIRTUAL_FAILED,
    payload: error,
  };
};

export const listUserRapatVirtualDestroy = () => {
  return {
    type: LIST_USER_RAPAT_VIRTUAL_DESTROY,
  };
};

export const fetchListUserRapatVirtual = (q): any => {
  return async (
    dispatch: Dispatch<LIST_USER_RAPAT_VIRTUAL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(listUserRapatVirtualRequest());
    try {
      // will be replace if login success implements
      const res = await api.get(
        `/lms/v1/virtual-meeting/list-user?search=${q}`,
      );
      if (res?.status === 200) {
        dispatch(listUserRapatVirtualSuccess(res?.data));
      } else {
        dispatch(listUserRapatVirtualFailed(res?.data));
      }
    } catch (err) {
      dispatch(listUserRapatVirtualFailed([]));
    }
  };
};
