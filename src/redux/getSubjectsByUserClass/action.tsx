import {
  GET_SUBJECTS_BY_USER_CLASS_ACTION_TYPES,
  GET_SUBJECTS_BY_USER_CLASS_DESTROY,
  GET_SUBJECTS_BY_USER_CLASS_FAILED,
  GET_SUBJECTS_BY_USER_CLASS_REQUEST,
  GET_SUBJECTS_BY_USER_CLASS_SUCCESS,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import api from '@api/index';
import {apiGetBulkImage} from '@api/wrapping';

const getSubjectsByUserClassRequest = () => {
  return {
    type: GET_SUBJECTS_BY_USER_CLASS_REQUEST,
  };
};

const getSubjectsByUserClassSuccess = (data: any) => {
  return {
    type: GET_SUBJECTS_BY_USER_CLASS_SUCCESS,
    payload: data,
  };
};

const getSubjectsByUserClassFailed = (error: any) => {
  return {
    type: GET_SUBJECTS_BY_USER_CLASS_FAILED,
    payload: error,
  };
};

export const getSubjectsByUserClassDestroy = () => {
  return {
    type: GET_SUBJECTS_BY_USER_CLASS_DESTROY,
  };
};

export const fetchGetSubjectsByUserClass = (): any => {
  return async (
    dispatch: Dispatch<GET_SUBJECTS_BY_USER_CLASS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSubjectsByUserClassRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // const trace = await perf().startTrace('fetchGetSubjectsByUserClass');
      // will be replace if login success implements
      // const token = await AsyncStorage.getItem(Keys.token);
      // const tokenParse = await JSON.parse(token || '');
      // const tokenParse = getState().getUser?.data?.user_token||await getToken();

      const res = await api.get('/master/v1/subject-by-user-class', {
        // headers: {
        //   Authorization: `Bearer ${tokenParse}`,
        // },
      });
      if (res?.status === 200) {
        const data = res?.data || [];
        // using Promise.all() for fetch API paralel
        // const promises = data?.data?.map(async (obj: any) => {
        //   if (obj?.icon_mobile) {
        //     const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
        //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
        //       obj.path_url = imgRes?.data?.data?.path_url;
        //       obj.path_id = imgRes?.data?.data?.ID;
        //     }
        //   }
        // });

        // await Promise.all(promises);
        apiGetBulkImage({
          datas: data?.data,
          dottedString: 'icon_mobile',
          newParams: 'path_url',
        });
        dispatch(getSubjectsByUserClassSuccess(res?.data));
      } else {
        dispatch(getSubjectsByUserClassFailed(res?.data));
      }
    } catch (err) {
      dispatch(getSubjectsByUserClassFailed(err));
    }
  };
};
