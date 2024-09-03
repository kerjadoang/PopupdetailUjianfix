import {
  GET_EXAM_HISTORY_DESTROY,
  GET_EXAM_HISTORY_FAILED,
  GET_EXAM_HISTORY_REQUEST,
  GET_EXAM_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  nextPage: true,
};

const getExamHistoryReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_EXAM_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EXAM_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data:
          action.payload.params?.offset === 0
            ? action.payload.data.data
              ? action.payload.data
              : []
            : {
                ...state.data,
                data: [
                  ...(state.data?.data as any),
                  ...action.payload.data.data,
                ],
              },
        error: null,
        nextPage: action.payload.nextPage,
      };

    case GET_EXAM_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        data:
          action.payload?.params?.offset === 0 && action.payload.error
            ? []
            : {
                ...state.data,
                data: [...(state.data?.data as any)],
              },
        error: action.payload?.error ?? null,
      };
    case GET_EXAM_HISTORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getExamHistoryReducer;
