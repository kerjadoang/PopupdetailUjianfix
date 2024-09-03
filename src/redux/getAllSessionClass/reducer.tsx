import {
  GET_ALL_SESSION_CLASS_DESTROY,
  GET_ALL_SESSION_CLASS_FAILED,
  GET_ALL_SESSION_CLASS_REQUEST,
  GET_ALL_SESSION_CLASS_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  nextPage: true,
};

const getAllSessionClassReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_ALL_SESSION_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data:
          action.payload.params?.page === 1
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

    case GET_ALL_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        data:
          action.payload?.params?.page === 1 && action.payload.error
            ? []
            : {
                ...state.data,
                data: [...(state.data?.data as any)],
              },
        error: action.payload?.error ?? null,
      };
    case GET_ALL_SESSION_CLASS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllSessionClassReducer;
