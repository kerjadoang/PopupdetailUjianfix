import {
  SUBJECTS_FAV_REQUEST,
  SUBJECTS_FAV_SUCCESS,
  SUBJECTS_FAV_FAILED,
  SUBJECTS_FAV_DESTROY,
  SUBJECTS_FAV_ACTION_TYPES,
} from './type';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const subjectsFavRequest = () => {
  return {
    type: SUBJECTS_FAV_REQUEST,
  };
};

const subjectsFavSuccess = (data: any) => {
  return {
    type: SUBJECTS_FAV_SUCCESS,
    payload: data,
  };
};

const subjectsFavFailed = (error: any) => {
  return {
    type: SUBJECTS_FAV_FAILED,
    payload: error,
  };
};

export const subjectsFavDestroy = () => {
  return {
    type: SUBJECTS_FAV_DESTROY,
  };
};

export const fetchSubjectsFav = (): any => {
  return async (
    dispatch: Dispatch<SUBJECTS_FAV_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(subjectsFavRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/master/v1/subject-favorite', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.subject?.icon_mobile) {
            const imgRes = await api.get(
              `/media/v1/image/${obj?.subject?.icon_mobile}`,
            );
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
              obj.path_id = imgRes?.data?.data?.ID;
            }
          }
        });

        await Promise.all(promises);
        dispatch(subjectsFavSuccess(res?.data));
      } else {
        dispatch(subjectsFavFailed(res?.data));
      }
    } catch (err) {
      dispatch(subjectsFavFailed(err));
    }
  };
};
