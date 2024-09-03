import {Dispatch} from 'redux';
import {
  GET_ALL_NOTES_REQUEST,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_FAILED,
  GET_ALL_NOTES_DESTROY,
  IGetNotesResponse,
  GET_ALL_NOTES_ACTION_TYPES,
  IGetNotesParam,
  GET_SHARED_NOTES_REQUEST,
  GET_SHARED_NOTES_SUCCESS,
  GET_SHARED_NOTES_FAILED,
  GET_SHARED_NOTES_DESTROY,
  GET_SHARED_NOTES_ACTION_TYPES,
  GET_DETAIL_NOTE_REQUEST,
  GET_DETAIL_NOTE_SUCCESS,
  GET_DETAIL_NOTE_FAILED,
  GET_DETAIL_NOTE_DESTROY,
  GET_DETAIL_NOTE_ACTION_TYPES,
  IGetDetailNoteParam,
} from './type';
import client from '@api/alternate';
import {URL_PATH} from '@constants/url';
import mediaProvider from '@services/media/provider';

const getAllNotesRequest = () => {
  return {
    type: GET_ALL_NOTES_REQUEST,
  };
};
const getAllNotesSuccess = (
  data: IGetNotesResponse,
  nextPage: boolean,
  params: IGetNotesParam,
) => {
  return {
    type: GET_ALL_NOTES_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getAllNotesFailed = (error: any) => {
  return {
    type: GET_ALL_NOTES_FAILED,
    payload: error,
  };
};
export const getAllNotesDestroy = () => {
  return {
    type: GET_ALL_NOTES_DESTROY,
  };
};

const getSharedNotesRequest = () => {
  return {
    type: GET_SHARED_NOTES_REQUEST,
  };
};
const getSharedNotesSuccess = (
  data: IGetNotesResponse,
  nextPage: boolean,
  params: IGetNotesParam,
) => {
  return {
    type: GET_SHARED_NOTES_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};
const getSharedNotesFailed = (error: any) => {
  return {
    type: GET_SHARED_NOTES_FAILED,
    payload: error,
  };
};
export const getSharedNotesDestroy = () => {
  return {
    type: GET_SHARED_NOTES_DESTROY,
  };
};

const getDetailNoteRequest = () => {
  return {
    type: GET_DETAIL_NOTE_REQUEST,
  };
};
const getDetailNoteSuccess = (data: IGetNotesResponse) => {
  return {
    type: GET_DETAIL_NOTE_SUCCESS,
    payload: data,
  };
};
const getDetailNoteFailed = (error: any) => {
  return {
    type: GET_DETAIL_NOTE_FAILED,
    payload: error,
  };
};
export const getDetailNoteDestroy = () => {
  return {
    type: GET_DETAIL_NOTE_DESTROY,
  };
};

export const fetchAllNotes = (param: IGetNotesParam): any => {
  return async (
    dispatch: Dispatch<GET_ALL_NOTES_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllNotesRequest());
    try {
      const res = await client.get(URL_PATH.get_all_notes(param.chapter_id), {
        params: {...param},
      });
      const nextPage = res.data.data?.length > 0;

      const promises = res?.data?.data?.map(async (obj: any) => {
        if (obj?.file) {
          const imgRes = await mediaProvider.getImage(obj.file);
          obj.path_url = imgRes?.data?.path_url;
        }
      });

      await Promise.all(promises);

      dispatch(getAllNotesSuccess(res.data, nextPage, param));
    } catch (err) {
      dispatch(getAllNotesFailed(err));
    }
  };
};

export const fetchSharedNotes = (param: IGetNotesParam): any => {
  return async (
    dispatch: Dispatch<GET_SHARED_NOTES_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSharedNotesRequest());
    try {
      const res = await client.get(
        URL_PATH.get_shared_notes(param.chapter_id),
        {
          params: {...param},
        },
      );
      const nextPage = res.data.data && res.data.data?.length > 0;
      if (!res.data.data) {
        res.data.data = [];
      }
      dispatch(getSharedNotesSuccess(res.data, nextPage, param));
    } catch (err) {
      dispatch(getSharedNotesFailed(err));
    }
  };
};

export const fetchDetailNote = (
  param: IGetDetailNoteParam,
  callback?: () => void,
): any => {
  return async (
    dispatch: Dispatch<GET_DETAIL_NOTE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getDetailNoteRequest());
    try {
      const res = await client.get(URL_PATH.get_detail_note(param.note_id));

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

      dispatch(getDetailNoteSuccess(res.data));
      callback?.();
    } catch (err) {
      dispatch(getDetailNoteFailed(err));
    }
  };
};
