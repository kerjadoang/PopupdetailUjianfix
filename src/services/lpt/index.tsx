import {useState} from 'react';
import provider from './provider';
import {CreateNoteBody, IDeleteMyNoteParam} from './type';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useDeleteNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const deleteNote = async (
    type: 'mynotes' | 'sharednotes',
    param: IDeleteMyNoteParam,
    isPancasila?: boolean,
  ) => {
    setLoading(true);
    setError(undefined);

    try {
      let res;
      if (type === 'mynotes') {
        res = await provider.deleteMyNote(param, isPancasila);
      } else {
        res = await provider.deleteSharedNote(param);
      }

      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: deleteNote,
  };
};

const useCreateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const createNote = async (body: CreateNoteBody, isPancasila?: boolean) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.createNote(body, isPancasila);

      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: createNote,
  };
};

const useEditNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const editNote = async (
    body: CreateNoteBody,
    note_id?: string,
    isPancasila?: boolean,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.editNote(body, note_id, isPancasila);

      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: editNote,
  };
};

export {useDeleteNote, useEditNote, useCreateNote};
