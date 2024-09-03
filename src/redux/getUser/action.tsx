import {Dispatch} from 'redux';
import {
  GET_USER_ACTION_TYPES,
  GET_USER_DESTROY,
  GET_USER_FAILED,
  GET_USER_REFETCH,
  GET_USER_REQUEST,
  GET_USER_STORE_TOKEN,
  GET_USER_SUCCESS,
} from './type';
import {RootState} from '../rootReducer';
import {AxiosResponse} from 'axios';

const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};

export const getUserSuccess = (data: any) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

const getUserFailed = (error: any) => {
  return {
    type: GET_USER_FAILED,
    payload: error,
  };
};

export const getUserRefetch = (refetch: boolean) => {
  return {
    type: GET_USER_REFETCH,
    payload: refetch,
  };
};

export const getUserDestroy = () => {
  return {
    type: GET_USER_DESTROY,
  };
};

export const getUserStoreToken = (token: string) => {
  return {
    type: GET_USER_STORE_TOKEN,
    payload: token,
  };
};

/**
 * A magic method that fetch user.
 * @deprecated
 * This function has been deprecated, try to use useQueryFetchUser instead.
 *
 * example to fetch user :
 * src/components/pages/HomeScreen/useHomeScreen.tsx line:44
 *
 * example to get user   :
 * const {getUser} = useSelector((state: RootState) => state);
 *
 */
export const fetchGetUser = (callback?: any): any => {
  return async (
    dispatch: Dispatch<GET_USER_ACTION_TYPES>,
    get: () => RootState,
  ): Promise<void> => {
    dispatch(getUserRequest());
    try {
      // will be replace if login success implements
      dispatch(getUserRefetch(true));
      const user = get().getUser.data;
      // will be replace if login success implements
      // const token = await getToken();
      // const res = await api.get('/uaa/v1/user/get-user', {});
      // const [token, res] = await Promise.all([
      //   getToken(),
      //   api.get('/uaa/v1/user/get-user', {}),
      // ]);
      const res: AtLeast<
        AxiosResponse<IBaseResponseData<IBaseUser>>,
        'data'
      > = {
        data: {
          data: user,
          code: 100,
          message: '',
        },
        status: 200,
      };
      callback && callback(res);
      // // const token = await getToken();
      // // const res = await api.get('/uaa/v1/user/get-user', {});
      // const [token, res] = await Promise.all([
      //   getToken(),
      //   api.get('/uaa/v1/user/get-user', {}),
      // ]);

      // callback && callback(res);
      // if (res?.status === 200) {
      //   if (res?.data?.data?.school?.image !== '') {
      //     const imgSchoolRes = await api.get(
      //       `/media/v1/image/${res?.data.data?.school?.image}`,
      //     );
      //     if (
      //       imgSchoolRes?.status === 200 &&
      //       imgSchoolRes?.data?.code === 100
      //     ) {
      //       res.data.data.school.path_url = imgSchoolRes?.data?.data?.path_url;
      //     }
      //   }

      //   if (res?.data?.data?.avatar !== '') {
      //     const imgRes = await api.get(
      //       `/media/v1/image/${res?.data.data?.avatar}`,
      //     );
      //     if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
      //       res.data.data.path_url = imgRes?.data?.data?.path_url;
      //     }
      //   }
      //   res.data.data.user_token = token;

      //   dispatch(getUserSuccess(res?.data));
      // } else {
      //   dispatch(getUserFailed([]));
      // }
    } catch (err) {
      dispatch(getUserFailed(err));
    } finally {
      getUserRefetch(false);
    }
  };
};
