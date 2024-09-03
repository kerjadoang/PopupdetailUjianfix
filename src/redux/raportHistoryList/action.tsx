import {
  RAPOR_HISTORY_ACTION_TYPES,
  RAPOR_HISTORY_DESTROY,
  RAPOR_HISTORY_FAILED,
  RAPOR_HISTORY_REQUEST,
  RAPOR_HISTORY_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getRaporHistoryListRequest = () => {
  return {
    type: RAPOR_HISTORY_REQUEST,
  };
};

const getRaporHistoryListSuccess = (data: any) => {
  return {
    type: RAPOR_HISTORY_SUCCESS,
    payload: data,
  };
};

const getRaporHistoryListFailed = (error: any) => {
  return {
    type: RAPOR_HISTORY_FAILED,
    payload: error,
  };
};

export const getRaporHistoryListDestroy = () => {
  return {
    type: RAPOR_HISTORY_DESTROY,
  };
};

export const fetchRaportHistoryList = (
  academic_year: any,
  class_id: any,
  rombel_id: any,
  phase_id: any,
): any => {
  return async (
    dispatch: Dispatch<RAPOR_HISTORY_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getRaporHistoryListRequest());
    try {
      const res = await api.get(
        URL_PATH.rapor_history_list(
          academic_year,
          class_id,
          rombel_id,
          phase_id,
        ),
      );
      if (res?.status === 200) {
        const data = res?.data;
        const promises = data?.data?.rapors?.map(async (obj: any) => {
          if (obj?.avatar) {
            const imgRes = await api.get(URL_PATH.get_image(obj?.avatar));

            if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
              obj.path_url = imgRes?.data?.data?.path_url;
            }
          }
        });

        await Promise.all(promises);
        dispatch(getRaporHistoryListSuccess(res?.data));
      } else {
        dispatch(getRaporHistoryListFailed(res?.data));
      }
    } catch (err) {
      dispatch(getRaporHistoryListFailed(err));
    }
  };
};
