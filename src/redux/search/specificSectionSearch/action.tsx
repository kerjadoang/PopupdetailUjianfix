import {
  SPECIFIC_SEARCH_REQUEST,
  SPECIFIC_SEARCH_SUCCESS,
  SPECIFIC_SEARCH_FAILED,
  SPECIFIC_SEARCH_DESTROY,
  SPECIFIC_SEARCH_ACTION_TYPES,
  ISpecificSearchQuery,
  ISpecificSearchResponse,
  SPECIFIC_SEARCH_ALL_REQUEST,
  SPECIFIC_SEARCH_ALL_SUCCESS,
  SPECIFIC_SEARCH_ALL_FAILED,
  SPECIFIC_SEARCH_ALL_DESTROY,
  SPECIFIC_SEARCH_ALL_ACTION_TYPES,
} from './type';
import api from '@api';
import {dismissLoading, showLoading} from '@constants/functional';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';

const filterResponse = (
  data: ISpecificSearchResponse,
  params?: ISpecificSearchQuery,
) => {
  const obj: any = {};
  const isMateri = params?.global_type === 'materi';
  const isSoal = params?.global_type === 'soal';
  const isVideo = params?.global_type === 'video';
  const isLainnya = params?.global_type === 'lainnya';

  if (isMateri) {
    const materi = data.data?.filter(item => item.type === 'materi');
    obj.materi = materi;
  } else if (isSoal) {
    const soal = data.data?.filter(item => item.type === 'soal');
    obj.soal = soal;
  } else if (isVideo) {
    const video = data.data?.filter(item => item.type === 'video');
    obj.video = video;
  } else if (isLainnya) {
    const lainnya = data.data?.filter(item => item.type === 'lainnya');
    obj.lainnya = lainnya;
  } else {
    obj.semua = data.data;
  }

  return {obj, params};
};

const specificSearchRequest = () => {
  return {
    type: SPECIFIC_SEARCH_REQUEST,
  };
};
const specificSearchSuccess = (
  data: ISpecificSearchResponse,
  params: ISpecificSearchQuery,
) => {
  return {
    type: SPECIFIC_SEARCH_SUCCESS,
    payload: filterResponse(data, params),
  };
};
const specificSearchFailed = (error: any) => {
  return {
    type: SPECIFIC_SEARCH_FAILED,
    payload: error,
  };
};
export const specificSearchDestroy = () => {
  return {
    type: SPECIFIC_SEARCH_DESTROY,
  };
};

const specificSearchAllRequest = () => {
  return {
    type: SPECIFIC_SEARCH_ALL_REQUEST,
  };
};
const specificSearchAllSuccess = (data: ISpecificSearchResponse) => {
  return {
    type: SPECIFIC_SEARCH_ALL_SUCCESS,
    payload: filterResponse(data),
  };
};
const specificSearchAllFailed = (error: any) => {
  return {
    type: SPECIFIC_SEARCH_ALL_FAILED,
    payload: error,
  };
};
export const specificSearchAllDestroy = () => {
  return {
    type: SPECIFIC_SEARCH_ALL_DESTROY,
  };
};

export const fetchSpecificSearch = (params: ISpecificSearchQuery): any => {
  return async (
    dispatch: Dispatch<SPECIFIC_SEARCH_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(specificSearchRequest());
    try {
      const res = await api.get('/search/v1/global/', {
        params,
      });

      if (res?.status === 200) {
        dispatch(specificSearchSuccess(res?.data, params));
        return;
      }
    } catch (err) {
      dispatch(specificSearchFailed(err));
    }
  };
};

export const fetchSpecificSearchAll = (params: {words: string}): any => {
  return async (
    dispatch: Dispatch<SPECIFIC_SEARCH_ALL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(specificSearchAllRequest());
    try {
      showLoading();
      let res = await api.get('/search/v1/global/all', {
        params,
      });

      if (res?.status === 200) {
        dispatch(specificSearchAllSuccess(res?.data));
        return;
      }
    } catch (err) {
      dispatch(specificSearchAllFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
