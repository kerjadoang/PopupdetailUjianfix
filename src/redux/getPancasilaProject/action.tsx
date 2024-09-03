import {
  GET_LIST_PANCASILA_PROJECT_ACTION_TYPES,
  GET_LIST_PANCASILA_PROJECT_DESTROY,
  GET_LIST_PANCASILA_PROJECT_FAILED,
  GET_LIST_PANCASILA_PROJECT_REQUEST,
  GET_LIST_PANCASILA_PROJECT_SUCCESS,
  GET_HISTORY_PANCASILA_PROJECT_DESTROY,
  GET_HISTORY_PANCASILA_PROJECT_FAILED,
  GET_HISTORY_PANCASILA_PROJECT_REQUEST,
  GET_HISTORY_PANCASILA_PROJECT_SUCCESS,
  GET_HISTORY_PANCASILA_PROJECT_ACTION_TYPES,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getListPancasilaProjectRequest = () => {
  return {
    type: GET_LIST_PANCASILA_PROJECT_REQUEST,
  };
};

const getListPancasilaProjectSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_LIST_PANCASILA_PROJECT_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getListPancasilaProjectFailed = (error: any) => {
  return {
    type: GET_LIST_PANCASILA_PROJECT_FAILED,
    payload: error,
  };
};

export const getListPancasilaProjectDestroy = () => {
  return {
    type: GET_LIST_PANCASILA_PROJECT_DESTROY,
  };
};

const getHistoryPancasilaProjectRequest = () => {
  return {
    type: GET_HISTORY_PANCASILA_PROJECT_REQUEST,
  };
};

const getHistoryPancasilaProjectSuccess = (
  data: any,
  nextPage: boolean,
  params: any,
) => {
  return {
    type: GET_HISTORY_PANCASILA_PROJECT_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const getHistoryPancasilaProjectFailed = (error: any) => {
  return {
    type: GET_HISTORY_PANCASILA_PROJECT_FAILED,
    payload: error,
  };
};

export const getHistoryPancasilaProjectDestroy = () => {
  return {
    type: GET_HISTORY_PANCASILA_PROJECT_DESTROY,
  };
};

export const fetchgetListPancasilaProject = (body: any): any => {
  return async (
    dispatch: Dispatch<GET_LIST_PANCASILA_PROJECT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getListPancasilaProjectRequest());
    try {
      const res = await api.get(URL_PATH.get_pancasila_project, {params: body});
      if (res?.status === 200) {
        const data = res?.data;
        const nextPage = res.data.data?.length > 0 ? true : false;
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.sender?.avatar) {
            const imgRes = await api.get(
              `/media/v1/image/${obj?.sender?.avatar}`,
            );
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.sender.icon_path_url = imgRes?.data?.data?.path_url;
              obj.sender.icon_path_id = imgRes?.data?.data?.ID;
            }
          }
        });
        await Promise.all(promises);
        dispatch(
          getListPancasilaProjectSuccess(res?.data?.data ?? [], nextPage, body),
        );
      } else {
        dispatch(getListPancasilaProjectFailed(res?.data));
      }
    } catch (err) {
      dispatch(getListPancasilaProjectFailed(err));
    }
  };
};

export const fetchgetHistoryPancasilaProject = (body: any): any => {
  return async (
    dispatch: Dispatch<GET_HISTORY_PANCASILA_PROJECT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getHistoryPancasilaProjectRequest());
    try {
      const res = await api.get(URL_PATH.get_pancasila_project, {params: body});
      if (res?.status === 200) {
        const data = res?.data;
        const nextPage = res.data.data?.length > 0 ? true : false;
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.sender?.avatar) {
            const imgRes = await api.get(
              `/media/v1/image/${obj?.sender?.avatar}`,
            );
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.sender.icon_path_url = imgRes?.data?.data?.path_url;
              obj.sender.icon_path_id = imgRes?.data?.data?.ID;
            }
          }
        });
        await Promise.all(promises);

        dispatch(
          getHistoryPancasilaProjectSuccess(
            res?.data?.data ?? [],
            nextPage,
            body,
          ),
        );
      } else {
        dispatch(getHistoryPancasilaProjectFailed(res?.data));
      }
    } catch (err) {
      dispatch(getHistoryPancasilaProjectFailed(err));
    }
  };
};
