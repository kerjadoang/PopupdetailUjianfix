import {
  SPECIFIC_SEARCH_REQUEST,
  SPECIFIC_SEARCH_SUCCESS,
  SPECIFIC_SEARCH_FAILED,
  SPECIFIC_SEARCH_DESTROY,
  ISpecificSearchState,
  SPECIFIC_SEARCH_ALL_REQUEST,
  SPECIFIC_SEARCH_ALL_SUCCESS,
  SPECIFIC_SEARCH_ALL_FAILED,
  SPECIFIC_SEARCH_ALL_DESTROY,
} from './type';

const initialState: ISpecificSearchState = {
  loading: false,
  data: {
    materi: [],
    lainnya: [],
    soal: [],
    video: [],
  },
  allData: {
    materi: [],
    lainnya: [],
    soal: [],
    video: [],
  },
  error: null,
};

const specificSearchReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SPECIFIC_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SPECIFIC_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data:
          action.payload?.params.page === 1
            ? {...state.data, ...action.payload.obj}
            : {
                ...state.data,
                [action.payload.params.global_type]: [
                  ...state.data[
                    action.payload.params
                      .global_type as keyof ISpecificSearchState['data']
                  ],
                  ...action.payload.obj[action.payload.params.global_type],
                ],
              },
        error: '',
      };
    case SPECIFIC_SEARCH_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SPECIFIC_SEARCH_DESTROY:
      return initialState;

    case SPECIFIC_SEARCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SPECIFIC_SEARCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        allData: action.payload.obj.semua,
        error: '',
      };
    case SPECIFIC_SEARCH_ALL_FAILED:
      return {
        ...state,
        loading: false,
        allData: {},
        error: action.payload,
      };
    case SPECIFIC_SEARCH_ALL_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default specificSearchReducer;
