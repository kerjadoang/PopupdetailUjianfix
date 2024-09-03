import {
  GET_MINI_GAMES_ACTION_TYPES,
  GET_MINI_GAMES_DESTROY,
  GET_MINI_GAMES_FAILED,
  GET_MINI_GAMES_REQUEST,
  GET_MINI_GAMES_SUCCESS,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import api from '@api/index';
import {dismissLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';

const getMiniGameListRequest = () => {
  return {
    type: GET_MINI_GAMES_REQUEST,
  };
};

const getMiniGameListSuccess = (data: any) => {
  return {
    type: GET_MINI_GAMES_SUCCESS,
    payload: data,
  };
};

const getMiniGameListFailed = (error: any) => {
  return {
    type: GET_MINI_GAMES_FAILED,
    payload: error,
  };
};

export const getMiniGameListDestroy = () => {
  return {
    type: GET_MINI_GAMES_DESTROY,
  };
};

export const fetchMiniGameList = (chapter_id: number): any => {
  return async (
    dispatch: Dispatch<GET_MINI_GAMES_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getMiniGameListRequest());
    try {
      const res = await api.get(`${URL_PATH.get_practice_games(chapter_id)}`);
      if (res?.status === 200) {
        // const data = res?.data || [];
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
        // dismissLoading();
        dispatch(getMiniGameListSuccess(res?.data));
      } else {
        dismissLoading();
        dispatch(getMiniGameListFailed(res?.data));
      }
    } catch (err) {
      dismissLoading();
      dispatch(getMiniGameListFailed(err));
    }
  };
};
