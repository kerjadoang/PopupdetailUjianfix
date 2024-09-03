import {
  GET_SEARCH,
  GET_BELUM_DIKERJAKAN_REQUEST,
  GET_BELUM_DIKERJAKAN_SUCCESS,
  GET_BELUM_DIKERJAKAN_FAILED,
  GET_BELUM_DIKERJAKAN_DESTROY,
  GET_RIWAYAT_REQUEST,
  GET_RIWAYAT_SUCCESS,
  GET_RIWAYAT_FAILED,
  GET_RIWAYAT_DESTROY,
} from './type';

const initialState = {
  searchQuery: '',
  isLoadingDatas: false,
  belumDikerjakanDatas: null,
  belumDikerjakanDatasNextPage: true,
  riwayatDatas: null,
  riwayatDatasNextPage: true,
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case GET_BELUM_DIKERJAKAN_REQUEST:
      return {
        ...state,
        isLoadingDatas: true,
      };
    case GET_BELUM_DIKERJAKAN_SUCCESS:
      return {
        ...state,
        isLoadingDatas: false,
        error: null,
        belumDikerjakanDatas:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.belumDikerjakanDatas!, ...action.payload.data],
        belumDikerjakanDatasNextPage: action.payload.nextPage,
      };
    case GET_BELUM_DIKERJAKAN_FAILED:
      return {
        ...state,
        isLoadingDatas: false,
        error: action.payload,
      };
    case GET_BELUM_DIKERJAKAN_DESTROY:
      return {
        searchQuery: '',
        isLoadingDatas: false,
        belumDikerjakanDatas: null,
        belumDikerjakanDatasNextPage: true,
        riwayatDatas: null,
        riwayatDatasNextPage: true,
        error: null,
      };
    case GET_RIWAYAT_REQUEST:
      return {
        ...state,
        isLoadingDatas: true,
      };
    case GET_RIWAYAT_SUCCESS:
      return {
        ...state,
        isLoadingDatas: false,
        error: null,
        riwayatDatas:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.riwayatDatas!, ...action.payload.data],
        riwayatDatasNextPage: action.payload.nextPage,
      };
    case GET_RIWAYAT_FAILED:
      return {
        ...state,
        isLoadingDatas: false,
        error: action.payload,
      };
    case GET_RIWAYAT_DESTROY:
      return {
        searchQuery: '',
        isLoadingDatas: false,
        belumDikerjakanDatas: null,
        belumDikerjakanDatasNextPage: true,
        riwayatDatas: null,
        riwayatDatasNextPage: true,
        error: null,
      };
    default:
      return state;
  }
};
