import {
  GET_SUBJECTS_BY_CLASS_ACTION_TYPES,
  GET_SUBJECTS_BY_CLASS_DESTROY,
  GET_SUBJECTS_BY_CLASS_FAILED,
  GET_SUBJECTS_BY_CLASS_REQUEST,
  GET_SUBJECTS_BY_CLASS_SUCCESS,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import api from '@api/index';
import {apiGetBulkImage} from '@api/wrapping';

const getSubjectsByClassRequest = () => {
  return {
    type: GET_SUBJECTS_BY_CLASS_REQUEST,
  };
};

const getSubjectsByClassSuccess = (data: any) => {
  return {
    type: GET_SUBJECTS_BY_CLASS_SUCCESS,
    payload: data,
  };
};

const getSubjectsByClassFailed = (error: any) => {
  return {
    type: GET_SUBJECTS_BY_CLASS_FAILED,
    payload: error,
  };
};

export const getSubjectsByClassDestroy = () => {
  return {
    type: GET_SUBJECTS_BY_CLASS_DESTROY,
  };
};

export const fetchGetSubjectsByClass = (class_id?: number): any => {
  return async (
    dispatch: Dispatch<GET_SUBJECTS_BY_CLASS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSubjectsByClassRequest());

    // const {data} = getState().getSubjectsByClass;
    // if (data?.length < 1) {
    //   showLoading();
    // }
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      // const token = await AsyncStorage.getItem(Keys.token);
      // const tokenParse = await JSON.parse(token || '');
      // const tokenParses = getState().getUser?.data?.user_token;
      const res = await api.get(
        class_id
          ? `/master/v1/subject-by-class/${class_id?.toString()}`
          : '/master/v1/subject-by-user-class',
        // {
        //   headers: {
        //     Authorization: `Bearer ${tokenParse}`,
        //   },
        // },
      );
      if (res?.status === 200) {
        const data = res?.data || [];
        // using Promise.all() for fetch API paralel
        // const promises = data?.data?.map(async (obj: any) => {
        //   if (obj?.icon_mobile) {
        //     const imgRes = await api.get(`/media/v1/image/${obj?.icon_mobile}`);
        //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
        //       obj.icon_path_url = imgRes?.data?.data?.path_url;
        //       obj.icon_path_id = imgRes?.data?.data?.ID;
        //     }
        //   }
        // });

        // await Promise.all(promises);
        apiGetBulkImage({
          datas: data?.data,
          dottedString: 'icon_mobile',
          newParams: 'icon_path_url',
        });
        // dismissLoading();
        dispatch(getSubjectsByClassSuccess(res?.data));
      } else {
        // dismissLoading();
        dispatch(getSubjectsByClassFailed(res?.data));
      }
    } catch (err) {
      // dismissLoading();
      dispatch(getSubjectsByClassFailed(err));
    }
  };
};
