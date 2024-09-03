import {Dispatch} from 'redux';
import {
  GET_ALL_NOTES_PANCASILA_REQUEST,
  GET_ALL_NOTES_PANCASILA_SUCCESS,
  GET_ALL_NOTES_PANCASILA_FAILED,
  GET_ALL_NOTES_PANCASILA_DESTROY,
  GET_ALL_NOTES_PANCASILA_ACTION_TYPES,
  GET_SHARED_NOTES_PANCASILA_REQUEST,
  GET_SHARED_NOTES_PANCASILA_SUCCESS,
  GET_SHARED_NOTES_PANCASILA_FAILED,
  GET_SHARED_NOTES_PANCASILA_DESTROY,
  GET_SHARED_NOTES_PANCASILA_ACTION_TYPES,
  GET_DETAIL_NOTE_PANCASILA_REQUEST,
  GET_DETAIL_NOTE_PANCASILA_SUCCESS,
  GET_DETAIL_NOTE_PANCASILA_FAILED,
  GET_DETAIL_NOTE_PANCASILA_DESTROY,
  GET_DETAIL_NOTE_PANCASILA_ACTION_TYPES,
} from './type';
import client from '@api/alternate';
import {URL_PATH} from '@constants/url';
import mediaProvider from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiGetBulkImage} from '@api/wrapping';

const getAllNotesPancasilaRequest = () => {
  return {
    type: GET_ALL_NOTES_PANCASILA_REQUEST,
  };
};
const getAllNotesPancasilaSuccess = (
  data: IGetNotesResponse,
  nextPage: boolean,
  params: IGetNotesParam,
) => {
  return {
    type: GET_ALL_NOTES_PANCASILA_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getAllNotesPancasilaFailed = (error: any) => {
  return {
    type: GET_ALL_NOTES_PANCASILA_FAILED,
    payload: error,
  };
};
export const getAllNotesPancasilaDestroy = () => {
  return {
    type: GET_ALL_NOTES_PANCASILA_DESTROY,
  };
};

const getSharedNotesPancasilaRequest = () => {
  return {
    type: GET_SHARED_NOTES_PANCASILA_REQUEST,
  };
};
const getSharedNotesPancasilaSuccess = (
  data: IGetNotePancasilaResponse,
  nextPage: boolean,
  params: IGetNotesParam,
) => {
  return {
    type: GET_SHARED_NOTES_PANCASILA_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getSharedNotesPancasilaFailed = (error: any) => {
  return {
    type: GET_SHARED_NOTES_PANCASILA_FAILED,
    payload: error,
  };
};
export const getSharedNotesPancasilaDestroy = () => {
  return {
    type: GET_SHARED_NOTES_PANCASILA_DESTROY,
  };
};

const getDetailNotePancasilaRequest = () => {
  return {
    type: GET_DETAIL_NOTE_PANCASILA_REQUEST,
  };
};
const getDetailNotePancasilaSuccess = data => {
  return {
    type: GET_DETAIL_NOTE_PANCASILA_SUCCESS,
    payload: data,
  };
};
const getDetailNotePancasilaFailed = (error: any) => {
  return {
    type: GET_DETAIL_NOTE_PANCASILA_FAILED,
    payload: error,
  };
};
export const getDetailNotePancasilaDestroy = () => {
  return {
    type: GET_DETAIL_NOTE_PANCASILA_DESTROY,
  };
};

export const fetchAllNotesPancasila = (param, callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_ALL_NOTES_PANCASILA_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllNotesPancasilaRequest());
    try {
      const res = await client.get(URL_PATH.get_all_note_pancasila, {
        params: {...(param || {})},
      });
      const nextPage = res?.data?.data?.length > 0;
      callback && callback(res);
      if (res.data?.data) {
        const promises = res?.data?.data?.map(async (obj: any) => {
          if (obj?.file) {
            const imgRes = await mediaProvider.getImage(obj.file);
            obj.path_url = imgRes?.data?.path_url;
          }
        });
        await Promise.all(promises);
      }
      dispatch(getAllNotesPancasilaSuccess(res.data, nextPage, param));
    } catch (err: any) {
      callback && callback(err);
      Toast.show({type: 'error', text1: err?.message});
      dispatch(getAllNotesPancasilaFailed(err));
    }
  };
};

export const fetchSharedNotesPancasila = (param): any => {
  return async (
    dispatch: Dispatch<GET_SHARED_NOTES_PANCASILA_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSharedNotesPancasilaRequest());
    try {
      const res = await client.get(URL_PATH.get_all_note_pancasila, {
        params: {...param},
      });

      res.data.data = await apiGetBulkImage({
        datas: res.data.data,
        dottedString: 'file',
        newParams: 'path_url',
      });

      const nextPage = res.data.data && res.data.data?.length > 0;
      if (!res.data.data) {
        res.data.data = [];
      }
      dispatch(getSharedNotesPancasilaSuccess(res.data, nextPage, param));
    } catch (err: any) {
      Toast.show({type: 'error', text1: err?.message});
      dispatch(getSharedNotesPancasilaFailed(err));
    }
  };
};

export const fetchDetailNotePancasila = (param, callback?: () => void): any => {
  return async (
    dispatch: Dispatch<GET_DETAIL_NOTE_PANCASILA_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDetailNotePancasilaRequest());
    try {
      const res = await client.get(
        URL_PATH.get_detail_note_pancasila(param.note_id),
      );

      if (res.data?.data?.file) {
        let resImage = await mediaProvider.getImage(res.data.data.file);
        res.data.data.path_url = resImage?.data?.path_url;
      }

      if (res.data?.data?.chapter_material?.file_id) {
        let resImage = await mediaProvider.getImage(
          res.data?.data?.chapter_material?.file_id,
        );
        res.data.data.chapter_material.path_url = resImage?.data?.path_url;
      }

      dispatch(getDetailNotePancasilaSuccess(res.data));
      callback?.();
    } catch (err) {
      dispatch(getDetailNotePancasilaFailed(err));
    }
  };
};
