import {
  UPDATE_SUBJECTS_FAVORITE_ACTION_TYPES,
  UPDATE_SUBJECTS_FAVORITE_DESTROY,
  UPDATE_SUBJECTS_FAVORITE_FAILED,
  UPDATE_SUBJECTS_FAVORITE_REQUEST,
  UPDATE_SUBJECTS_FAVORITE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {apiGetBulkImage} from '@api/wrapping';

const updateSubjectsFavoriteRequest = () => {
  return {
    type: UPDATE_SUBJECTS_FAVORITE_REQUEST,
  };
};

const updateSubjectsFavoriteSuccess = (data: any) => {
  return {
    type: UPDATE_SUBJECTS_FAVORITE_SUCCESS,
    payload: data,
  };
};

const updateSubjectsFavoriteFailed = (error: any) => {
  return {
    type: UPDATE_SUBJECTS_FAVORITE_FAILED,
    payload: error,
  };
};

export const updateSubjectsFavoriteDestroy = () => {
  return {
    type: UPDATE_SUBJECTS_FAVORITE_DESTROY,
  };
};

export const fetchUpdateSubjectsFavorite = (data: any): any => {
  return async (
    dispatch: Dispatch<UPDATE_SUBJECTS_FAVORITE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(updateSubjectsFavoriteRequest());
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.put('/uaa/v1/user/update-subject-favorite', data, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
          'Request-Id': 'Test Hasbi',
        },
      });

      if (res?.status === 200) {
        apiGetBulkImage({
          datas: data?.data,
          dottedString: 'icon_mobile',
          newParams: 'path_url',
        });
        dispatch(updateSubjectsFavoriteSuccess(res?.data));
      } else {
        dispatch(updateSubjectsFavoriteFailed(res?.data));
      }
    } catch (err) {
      dispatch(updateSubjectsFavoriteFailed(err));
    }
  };
};
