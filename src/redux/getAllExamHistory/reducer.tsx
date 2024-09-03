import {
  GET_ALL_EXAM_HISTORY_DESTROY,
  GET_ALL_EXAM_HISTORY_FAILED,
  GET_ALL_EXAM_HISTORY_REQUEST,
  GET_ALL_EXAM_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  isLoadingDatas: false,
  riwayatDatas: null,
  riwayatDatasNextPage: true,
};

const getAllExamHistoryReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_EXAM_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EXAM_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoadingDatas: false,
        data:
          action.payload.params.offset === 0 || action.payload.resetList
            ? action.payload.data
            : [...state.data, ...action.payload.data],
        error: null,
      };
    case GET_ALL_EXAM_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        isLoadingDatas: false,
        data:
          action.payload.params.offset === 0
            ? null
            : {
                ...state.data,
                data: [...(state.data as any)],
              },
        error: action.payload,
      };
    case GET_ALL_EXAM_HISTORY_DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default getAllExamHistoryReducer;
