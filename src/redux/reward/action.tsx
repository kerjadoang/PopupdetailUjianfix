import {
  REWARD_REQUEST,
  REWARD_SUCCESS,
  REWARD_FAILED,
  REWARD_DESTROY,
  REWARD_ACTION_TYPES,
} from './type';
import api from '@api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {dismissLoading, showLoading} from '@constants/functional';

const rewardRequest = () => {
  return {
    type: REWARD_REQUEST,
  };
};

const rewardSuccess = (data: any) => {
  return {
    type: REWARD_SUCCESS,
    payload: data,
  };
};

const rewardFailed = (error: any) => {
  return {
    type: REWARD_FAILED,
    payload: error,
  };
};

export const rewardDestroy = () => {
  return {
    type: REWARD_DESTROY,
  };
};

export const fetchReward = (): any => {
  return async (dispatch: Dispatch<REWARD_ACTION_TYPES>): Promise<void> => {
    dispatch(rewardRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/uaa/v1/user/get-leaderboard', {
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
            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);

        dispatch(rewardSuccess(data));
      } else {
        dispatch(rewardFailed(res?.data));
      }
    } catch (err) {
      dispatch(rewardFailed(err));
    }
  };
};

export const claimReward = (): any => {
  return async (dispatch: Dispatch<REWARD_ACTION_TYPES>): Promise<void> => {
    dispatch(rewardRequest());

    try {
      showLoading();
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const response = await api.put(
        '/uaa/v1/user/claim-daily-checkin',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );

      if (response?.status === 200) {
        dispatch(rewardSuccess(response?.data));
      } else {
        dispatch(rewardFailed(response?.data));
      }
    } catch (err) {
      dispatch(rewardFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
