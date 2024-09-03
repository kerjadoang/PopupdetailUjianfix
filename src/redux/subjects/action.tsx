import {
  SUBJECTS_REQUEST,
  SUBJECTS_SUCCESS,
  SUBJECTS_FAILED,
  SUBJECTS_DESTROY,
  SUBJECTS_ACTION_TYPES,
} from './type';
import api from '@api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const subjectsRequest = () => {
  return {
    type: SUBJECTS_REQUEST,
  };
};

const subjectsSuccess = (data: any) => {
  return {
    type: SUBJECTS_SUCCESS,
    payload: data,
  };
};

const subjectsFailed = (error: any) => {
  return {
    type: SUBJECTS_FAILED,
    payload: error,
  };
};

export const subjectsDestroy = () => {
  return {
    type: SUBJECTS_DESTROY,
  };
};

export const fetchSubjects = (): any => {
  return async (dispatch: Dispatch<SUBJECTS_ACTION_TYPES>): Promise<void> => {
    dispatch(subjectsRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/master/v1/subject/', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (res?.status === 200) {
        const data = res?.data || [];
        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.icon_mobile) {
            const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
              obj.path_id = imgRes?.data?.data?.ID;
            }
          }
        });

        await Promise.all(promises);
        dispatch(subjectsSuccess(res?.data));
      } else {
        dispatch(subjectsFailed(res?.data));
      }

      // if (res?.status === 200) {
      //   dispatch(subjectsSuccess(res?.data));
      // } else {
      //   dispatch(subjectsFailed(res?.data));
      // }
    } catch (err) {
      dispatch(subjectsFailed(err));
    }
  };
};
