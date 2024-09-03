import {
  GET_PERLU_DIPERIKSA_REQUEST,
  GET_PERLU_DIPERIKSA_SUCCESS,
  GET_PERLU_DIPERIKSA_FAILED,
  GET_PERLU_DIPERIKSA_DESTROY,
  GET_DIJADWALKAN_REQUEST,
  GET_DIJADWALKAN_SUCCESS,
  GET_DIJADWALKAN_FAILED,
  GET_DIJADWALKAN_DESTROY,
} from './type';

const initialState = {
  isLoadingDatas: false,
  perluDiperiksaDatas: null,
  perluDiperiksaDatasNextPage: true,
  dijadwalkanDatas: null,
  dijadwalkanDatasNextPage: true,
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PERLU_DIPERIKSA_REQUEST:
      return {
        ...state,
        isLoadingDatas: true,
      };
    case GET_PERLU_DIPERIKSA_SUCCESS:
      return {
        ...state,
        isLoadingDatas: false,
        error: null,
        perluDiperiksaDatas:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.perluDiperiksaDatas!, ...action.payload.data],
        perluDiperiksaDatasNextPage: action.payload.nextPage,
      };
    case GET_PERLU_DIPERIKSA_FAILED:
      return {
        ...state,
        isLoadingDatas: false,
        error: action.payload,
      };
    case GET_PERLU_DIPERIKSA_DESTROY:
      return {
        isLoadingDatas: false,
        perluDiperiksaDatas: null,
        perluDiperiksaDatasNextPage: true,
        dijadwalkanDatas: null,
        dijadwalkanDatasNextPage: true,
        error: null,
      };
    case GET_DIJADWALKAN_REQUEST:
      return {
        ...state,
        isLoadingDatas: true,
      };
    case GET_DIJADWALKAN_SUCCESS:
      return {
        ...state,
        isLoadingDatas: false,
        error: null,
        dijadwalkanDatas:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.dijadwalkanDatas!, ...action.payload.data],
        dijadwalkanDatasNextPage: action.payload.nextPage,
      };
    case GET_DIJADWALKAN_FAILED:
      return {
        ...state,
        isLoadingDatas: false,
        error: action.payload,
      };
    case GET_DIJADWALKAN_DESTROY:
      return {
        isLoadingDatas: false,
        perluDiperiksaDatas: null,
        perluDiperiksaDatasNextPage: true,
        dijadwalkanDatas: null,
        dijadwalkanDatasNextPage: true,
        error: null,
      };
    default:
      return state;
  }
};
