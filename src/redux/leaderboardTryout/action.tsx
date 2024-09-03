import {
  LEADERBOARD_TRYOUT_REQUEST,
  LEADERBOARD_TRYOUT_SUCCESS,
  LEADERBOARD_TRYOUT_FAILED,
  LEADERBOARD_TRYOUT_DESTROY,
  LEADERBOARD_TRYOUT_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';

const leaderboardTryoutRequest = () => {
  return {
    type: LEADERBOARD_TRYOUT_REQUEST,
  };
};

const leaderboardTryoutSuccess = (data: any) => {
  return {
    type: LEADERBOARD_TRYOUT_SUCCESS,
    payload: {data},
  };
};

const leaderboardTryoutFailed = (error: any) => {
  return {
    type: LEADERBOARD_TRYOUT_FAILED,
    payload: error,
  };
};

export const leaderboardTryoutDestroy = () => {
  return {
    type: LEADERBOARD_TRYOUT_DESTROY,
  };
};

export const fetchLeaderboardTryout = () => {
  return async (
    dispatch: Dispatch<LEADERBOARD_TRYOUT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(leaderboardTryoutRequest());
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(`${URL_PATH.get_ranking_tryout}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        const data = res?.data;
        const promises = data?.data?.map(async (obj: any) => {
          if (obj?.user?.avatar) {
            const imgRes = await api.get(
              `${URL_PATH.get_image(obj?.user?.avatar)}`,
            );
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.user.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });
        await Promise.all(promises);
        dispatch(leaderboardTryoutSuccess(res?.data));
      } else {
        dispatch(leaderboardTryoutFailed(res?.data));
      }
    } catch (err) {
      dispatch(leaderboardTryoutFailed(err));
    }
  };
};
