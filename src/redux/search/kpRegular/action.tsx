import {Dispatch} from 'redux';

import {
  KP_REGULAR_SEARCH_ACTION_TYPES,
  KP_REGULAR_SEARCH_REQUEST,
  KP_REGULAR_SEARCH_SUCCESS,
  KP_REGULAR_SEARCH_FAILED,
  KP_REGULAR_SEARCH_DESTROY,
  IKpRegularSearchParams,
} from './type';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import api from '@api/index';
import {deepClone} from '@constants/functional';

const kpRegularSearchRequest = () => {
  return {
    type: KP_REGULAR_SEARCH_REQUEST,
  };
};

const kpRegularSearchSuccess = (data: any) => {
  return {
    type: KP_REGULAR_SEARCH_SUCCESS,
    payload: data,
  };
};

const kpRegularSearchFailed = (error: any) => {
  return {
    type: KP_REGULAR_SEARCH_FAILED,
    payload: error,
  };
};

export const kpRegularSearchDestroy = () => {
  return {
    type: KP_REGULAR_SEARCH_DESTROY,
  };
};

export const fetchKpRegularSearch = (params: {words: string}): any => {
  return async (
    dispatch: Dispatch<KP_REGULAR_SEARCH_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(kpRegularSearchRequest());

    try {
      const response = await api.get('/search/v1/global/kp-regular', {
        params,
      });

      if (response?.status === 200) {
        dispatch(kpRegularSearchSuccess(response?.data?.data));
      }
    } catch (error) {
      dispatch(kpRegularSearchFailed(error));
    }
  };
};

export const newFetchKpRegularSearch = (
  params: IKpRegularSearchParams,
): any => {
  return async (
    dispatch: Dispatch<KP_REGULAR_SEARCH_ACTION_TYPES>,
  ): Promise<void> => {
    try {
      dispatch(kpRegularSearchRequest());
      const resData: IKpRegularSearchResponseData = await apiGet({
        url: URL_PATH.get_search_kpreg(params.subjectId, params.words),
      });

      //sort learn
      resData?.learn?.sort(sortChapterMaterialData);
      //sort practice
      resData?.practice?.sort(sortChapterMaterialData);
      //sort test
      resData?.test?.sort(sortChapterMaterialData);

      resData.learn = mappingSearchData(resData.learn || []);
      resData.practice = mappingSearchData(resData.practice || []);
      resData.test = mappingSearchData(resData.test || []);

      dispatch(kpRegularSearchSuccess(resData));
    } catch (error) {
      dispatch(kpRegularSearchFailed(error));
    }
  };
};

const mappingSearchData = (data: KpRegularSearchMaterial[]) => {
  if (data.length === 0) {
    return data;
  }

  let mappedData: MappedKpRegularSearchMaterial[] = [];
  data.forEach(searchMaterial => {
    searchMaterial?.chapter_material?.forEach(searchMaterial => {
      searchMaterial.feature = [];

      const chapterMaterial = mappedData.find(mappedChapterMaterial => {
        return mappedChapterMaterial.chapter_id === searchMaterial.chapter_id;
      });

      if (!chapterMaterial) {
        mappedData.push(searchMaterial);
      }
    });
  });

  mappedData.forEach(item => {
    data.forEach(searchMaterial => {
      // console.log(searchMaterial.chapter_material)
      const chapterMaterial = searchMaterial?.chapter_material?.find(
        chapterMaterial => chapterMaterial.chapter_id === item.chapter_id,
      );
      if (chapterMaterial) {
        const newChapterMaterial: ChapterMaterial = deepClone(chapterMaterial);
        newChapterMaterial.feature = [];
        item?.feature?.push({
          id: searchMaterial.id,
          name: searchMaterial.name,
          description: searchMaterial.description,
          type: searchMaterial.type,
          orders: searchMaterial.orders,
          chapterMaterialData: newChapterMaterial,
        });
      }
    });
  });
  return mappedData;
};

const sortChapterMaterialData = (
  a: KpRegularSearchMaterial,
  b: KpRegularSearchMaterial,
) => {
  if ((a?.id || 0) > (b?.id || 0)) {
    return 1;
  }
  if ((a?.id || 0) < (b?.id || 0)) {
    return -1;
  }
  return 0;
};
