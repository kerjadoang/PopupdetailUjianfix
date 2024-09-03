import {
  GET_TERJAWAB_REQUEST,
  GET_TERJAWAB_SUCCESS,
  GET_TERJAWAB_FAILED,
  GET_TERJAWAB_DESTROY,
  GET_BELUM_DIJAWAB_REQUEST,
  GET_BELUM_DIJAWAB_SUCCESS,
  GET_BELUM_DIJAWAB_FAILED,
  GET_BELUM_DIJAWAB_DESTROY,
  GET_TIDAK_SESUAI_REQUEST,
  GET_TIDAK_SESUAI_SUCCESS,
  GET_TIDAK_SESUAI_FAILED,
  GET_TIDAK_SESUAI_DESTROY,
  IHistoryTanyaInitialState,
} from './type';

const initialState: IHistoryTanyaInitialState = {
  loadingList: false,
  terjawab: null,
  belumDijawab: null,
  tidakSesuai: null,
  historyTanyaDetail: null,
  terjawabNextPage: true,
  tidakSesuaiNextPage: true,
  belumDijawabNextPage: true,
  error: null,
};

const notesReducer = (
  state: IHistoryTanyaInitialState = initialState,
  action: any,
): IHistoryTanyaInitialState => {
  switch (action?.type) {
    case GET_TERJAWAB_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_TERJAWAB_SUCCESS:
      return {
        ...state,
        loadingList: false,
        terjawab:
          action.payload.params?.page === 1
            ? action.payload.data
            : {
                ...state.terjawab,
                data: [
                  ...(state.terjawab?.data as any),
                  ...action.payload.data.data,
                ],
              },
        terjawabNextPage: action.payload.nextPage,
        error: null,
      };
    case GET_TERJAWAB_FAILED:
      return {
        ...state,
        loadingList: false,
        terjawab: null,
        terjawabNextPage: action.payload.nextPage,
        error: action.payload,
      };
    case GET_TERJAWAB_DESTROY:
      return {
        ...state,
        loadingList: false,
        terjawab: null,
      };

    case GET_BELUM_DIJAWAB_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_BELUM_DIJAWAB_SUCCESS:
      return {
        ...state,
        loadingList: false,
        belumDijawab:
          action.payload.params?.page === 1
            ? action.payload.data
            : {
                ...state.belumDijawab,
                data: [
                  ...(state.belumDijawab?.data as any),
                  ...action.payload.data.data,
                ],
              },
        belumDijawabNextPage: action.payload.nextPage,
        error: null,
      };
    case GET_BELUM_DIJAWAB_FAILED:
      return {
        ...state,
        loadingList: false,
        belumDijawab: null,
        error: action.payload,
      };
    case GET_BELUM_DIJAWAB_DESTROY:
      return {
        ...state,
        loadingList: false,
        belumDijawab: null,
      };

    case GET_TIDAK_SESUAI_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_TIDAK_SESUAI_SUCCESS:
      return {
        ...state,
        loadingList: false,
        tidakSesuai:
          action.payload.params?.page === 1
            ? action.payload.data
            : {
                ...state.tidakSesuai,
                data: [
                  ...(state.tidakSesuai?.data as any),
                  ...action.payload.data.data,
                ],
              },
        tidakSesuaiNextPage: action.payload.nextPage,
        error: null,
      };
    case GET_TIDAK_SESUAI_FAILED:
      return {
        ...state,
        loadingList: false,
        tidakSesuai: null,
        error: action.payload,
      };
    case GET_TIDAK_SESUAI_DESTROY:
      return {
        ...state,
        loadingList: false,
        tidakSesuai: null,
      };
    default:
      return state;
  }
};

export default notesReducer;
