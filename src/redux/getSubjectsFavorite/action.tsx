import {
  GET_SUBJECTS_FAVORITE_ACTION_TYPES,
  GET_SUBJECTS_FAVORITE_DESTROY,
  GET_SUBJECTS_FAVORITE_FAILED,
  GET_SUBJECTS_FAVORITE_REQUEST,
  GET_SUBJECTS_FAVORITE_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {apiGetBulkImage} from '@api/wrapping';

const getSubjectsFavoriteRequest = () => {
  return {
    type: GET_SUBJECTS_FAVORITE_REQUEST,
  };
};

const getSubjectsFavoriteSuccess = (data: any) => {
  return {
    type: GET_SUBJECTS_FAVORITE_SUCCESS,
    payload: data,
  };
};

const getSubjectsFavoriteFailed = (error: any) => {
  return {
    type: GET_SUBJECTS_FAVORITE_FAILED,
    payload: error,
  };
};

export const getSubjectsFavoriteDestroy = () => {
  return {
    type: GET_SUBJECTS_FAVORITE_DESTROY,
  };
};

export const fetchGetSubjectsFavorite = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_SUBJECTS_FAVORITE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSubjectsFavoriteRequest());
    try {
      // will be replace if login success implements
      // const token = await AsyncStorage.getItem(Keys.token);
      // const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/master/v1/subject-favorite', {
        // headers: {
        //   Authorization: `Bearer ${tokenParse}`,
        // },
      });

      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        // const promises = data?.data.map(async (obj: any) => {
        //   if (obj?.subject?.icon_mobile) {
        //     const imgRes = await api.get(
        //       `/media/v1/image/${obj?.subject?.icon_mobile}`,
        //     );
        //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
        //       obj.subject.path_url = imgRes?.data?.data?.path_url;
        //       obj.subject.path_id = imgRes?.data?.data?.ID;
        //     }
        //   }
        // });

        // await Promise.all(promises);
        apiGetBulkImage({
          datas: data?.data,
          dottedString: 'subject.icon_mobile',
          newParams: 'path_url',
        });
        dispatch(getSubjectsFavoriteSuccess(res?.data));
        callback && callback(res);
      } else {
        dispatch(getSubjectsFavoriteFailed(res?.data));
      }
    } catch (err) {
      dispatch(getSubjectsFavoriteFailed(err));
    }
  };
};
