import {
  GET_LMS_LIST_UJIAN_DESTROY,
  GET_LMS_LIST_UJIAN_FAILED,
  GET_LMS_LIST_UJIAN_REQUEST,
  GET_LMS_LIST_UJIAN_RESET,
  GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY,
  GET_LMS_LIST_UJIAN_RIWAYAT_FAILED,
  GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST,
  GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS,
  GET_LMS_LIST_UJIAN_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  loadingRiwayat: false,
  data: [],
  riwayatData: [],
  error: null,
  errorRiwayat: null,
  nextPage: false,
  riwayatNextPage: false,
};

const getLMSListUjianReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_LMS_LIST_UJIAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LMS_LIST_UJIAN_RESET:
      return {
        ...state,
        data: [],
      };
    case GET_LMS_LIST_UJIAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data:
          action?.payload?.params?.page === 0 || action?.payload?.resetList
            ? action.payload.data
            : [...state.data, ...action.payload.data],
        error: '',
        nextPage: action?.payload?.nextPage,
      };
    case GET_LMS_LIST_UJIAN_FAILED:
      return {
        ...state,
        loading: false,
        data:
          action?.payload?.params?.page === 0
            ? null
            : {
                ...state.data,
                data: [...(state.data as any)],
              },
        error: action.payload,
        nextPage: action?.payload?.nextPage,
      };
    case GET_LMS_LIST_UJIAN_DESTROY:
      return initialState;

    case GET_LMS_LIST_UJIAN_RIWAYAT_REQUEST:
      return {
        ...state,
        loadingRiwayat: true,
      };
    case GET_LMS_LIST_UJIAN_RIWAYAT_SUCCESS:
      return {
        ...state,
        loadingRiwayat: false,
        riwayatData:
          action?.payload?.params?.page === 0 || action?.payload?.resetList
            ? action.payload.data
            : [...state.riwayatData, ...action.payload.data],
        errorRiwayat: '',
        riwayatNextPage: action?.payload?.nextPage,
      };
    case GET_LMS_LIST_UJIAN_RIWAYAT_FAILED:
      return {
        ...state,
        loadingRiwayat: false,
        riwayatData:
          action?.payload?.params?.page === 0
            ? null
            : {
                ...state.riwayatData,
                data: [...(state.riwayatData as any)],
              },
        error: action.payload,
        riwayatNextPage: action?.payload?.nextPage,
      };
    case GET_LMS_LIST_UJIAN_RIWAYAT_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getLMSListUjianReducer;
