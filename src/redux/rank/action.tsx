import {
  RANK_REQUEST,
  RANK_SUCCESS,
  RANK_FAILED,
  RANK_DESTROY,
  RANK_ACTION_TYPES,
} from './type';
import api from '@api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import apiWithoutToken from '@api/withoutToken';

const rankRequest = () => {
  return {
    type: RANK_REQUEST,
  };
};

const rankSuccess = (data: any) => {
  return {
    type: RANK_SUCCESS,
    payload: data,
  };
};

const rankFailed = (error: any) => {
  return {
    type: RANK_FAILED,
    payload: error,
  };
};

export const rankDestroy = () => {
  return {
    type: RANK_DESTROY,
  };
};

export const fetchRank: any = (token?: any) => {
  return async (dispatch: Dispatch<RANK_ACTION_TYPES>): Promise<void> => {
    dispatch(rankRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');

      const res = token
        ? await apiWithoutToken.get('/uaa/v1/user/get-leaderboard', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await api.get('/uaa/v1/user/get-leaderboard', {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          });

      if (res?.status === 200) {
        const data = res?.data || [];

        // using Promise.all() for fetch API paralel
        const promises = data?.data.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(`/media/v1/image/${obj?.avatar}`);

            if (imgRes?.status === 200 || imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);

        dispatch(rankSuccess(data));
      } else {
        dispatch(rankFailed(res?.data));
      }
    } catch (err) {
      dispatch(rankFailed(err));
    }
  };
};
