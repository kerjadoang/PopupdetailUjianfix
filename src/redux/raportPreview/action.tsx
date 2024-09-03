import {
  RAPOR_PREVIEW_ACTION_TYPES,
  RAPOR_PREVIEW_DESTROY,
  RAPOR_PREVIEW_FAILED,
  RAPOR_PREVIEW_REQUEST,
  RAPOR_PREVIEW_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const getRaporPreviewRequest = () => {
  return {
    type: RAPOR_PREVIEW_REQUEST,
  };
};

const getRaporPreviewSuccess = (data: any) => {
  return {
    type: RAPOR_PREVIEW_SUCCESS,
    payload: data,
  };
};

const getRaporPreviewFailed = (error: any) => {
  return {
    type: RAPOR_PREVIEW_FAILED,
    payload: error,
  };
};

export const getRaporPreviewDestroy = () => {
  return {
    type: RAPOR_PREVIEW_DESTROY,
  };
};

export const fetchRaporPreview = (rapor_id: any): any => {
  return async (
    dispatch: Dispatch<RAPOR_PREVIEW_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRaporPreviewRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(URL_PATH.preview_rapor(rapor_id), {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        const downloadDir =
          Platform.OS === 'ios'
            ? RNFS.LibraryDirectoryPath
            : RNFS.ExternalDirectoryPath;

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        const fileName = `e-raport_${year}-${month}-${day}_${hour}-${minute}-${second}.pdf`;
        const filePath = `${downloadDir}/${fileName}`;
        await RNFS.writeFile(filePath, res.data, 'base64');
        let response = {
          data: res?.data,
        };
        dispatch(getRaporPreviewSuccess(response));
      } else {
        dispatch(getRaporPreviewFailed([]));
      }
    } catch (err) {
      dispatch(getRaporPreviewFailed(err));
    }
  };
};
