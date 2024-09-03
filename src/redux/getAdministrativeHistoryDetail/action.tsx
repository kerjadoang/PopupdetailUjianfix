import {
  GET_ADMINISTRATIVE_HISTORY_DETAIL_ACTION_TYPES,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS,
} from './type';

import {Dispatch} from 'redux';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const getAllAdministrativeHistoryDetailRequest = () => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST,
  };
};

const getAllAdministrativeHistoryDetailSuccess = (data: any) => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS,
    payload: data,
  };
};

const getAllAdministrativeHistoryDetailFailed = (error: any) => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED,
    payload: error,
  };
};

export const getAllAdministrativeHistoryDetailDestroy = () => {
  return {
    type: GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY,
  };
};

export const fetchGetAllAdministrativeDetailHistory = (id: number): any => {
  return async (
    dispatch: Dispatch<GET_ADMINISTRATIVE_HISTORY_DETAIL_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getAllAdministrativeHistoryDetailRequest());
    try {
      const res = await api.get(URL_PATH.get_evidence_detail(id));
      if (res?.status === 200) {
        const data = res?.data || [];
        const imageProof = data?.data?.payment_category?.image;
        const imageMethod = data?.data?.payment_method?.image;
        const payment_proof = data?.data?.payment_proof_pict;
        if (imageProof) {
          const imgRes = await api.get(`/media/v1/image/${imageProof}`);
          if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
            data.data.image_proof = imgRes?.data?.data?.path_url;
            data.data.image_proof_path_id = imgRes?.data?.data?.ID;
          }
        }
        if (imageMethod) {
          const imgRes = await api.get(`/media/v1/image/${imageMethod}`);
          if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
            data.data.image_method = imgRes?.data?.data?.path_url;
            data.data.image_method_path_id = imgRes?.data?.data?.ID;
          }
        }
        if (payment_proof) {
          const imgRes = await api.get(`/media/v1/image/${payment_proof}`);
          if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
            data.data.payment_proof_path_url = imgRes?.data?.data?.path_url;
            data.data.payment_proof_path_id = imgRes?.data?.data?.ID;
          }
        }
        dispatch(getAllAdministrativeHistoryDetailSuccess(res?.data));
      } else {
        dispatch(getAllAdministrativeHistoryDetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(getAllAdministrativeHistoryDetailFailed(err));
    }
  };
};
