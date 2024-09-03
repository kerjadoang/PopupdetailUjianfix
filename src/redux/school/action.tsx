import {
  SCHOOL_REQUEST,
  SCHOOL_SUCCESS,
  SCHOOL_FAILED,
  SCHOOL_DESTROY,
  SCHOOL_ACTION_TYPES,
} from './type';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';

const schoolRequest = () => {
  return {
    type: SCHOOL_REQUEST,
  };
};

const schoolSuccess = (data: any) => {
  return {
    type: SCHOOL_SUCCESS,
    payload: data,
  };
};

const schoolFailed = (error: any) => {
  return {
    type: SCHOOL_FAILED,
    payload: error,
  };
};

export const schoolDestroy = () => {
  return {
    type: SCHOOL_DESTROY,
  };
};

export const fetchSchool = (id: number): any => {
  return async (dispatch: Dispatch<SCHOOL_ACTION_TYPES>): Promise<void> => {
    dispatch(schoolRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/master/v1/school/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (res?.status === 200) {
        const data = res?.data || [];
        const image = data?.data?.image;
        const icon = data?.data?.degree.icon_mobile;
        if (image) {
          const imgRes = await api.get(`/media/v1/image/${image}`);
          if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
            data.data.icon_path_url = imgRes?.data?.data?.path_url;
            data.data.icon_path_id = imgRes?.data?.data?.ID;
          }
        }
        if (icon) {
          const iconRes = await api.get(`/media/v1/image/${icon}`);
          if (iconRes?.status === 200 && iconRes?.data?.code === 100) {
            data.data.degree.icon_path_url = iconRes?.data?.data?.path_url;
            data.data.degree.icon_path_id = iconRes?.data?.data?.ID;
          }
        }

        dispatch(schoolSuccess(data));
      } else {
        dispatch(schoolFailed(res?.data));
      }
    } catch (err) {
      dispatch(schoolFailed(err));
    }
  };
};
