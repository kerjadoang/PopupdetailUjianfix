import {
  GET_ADMINISTRATIVE_HISTORY_DESTROY,
  GET_ADMINISTRATIVE_HISTORY_FAILED,
  GET_ADMINISTRATIVE_HISTORY_REQUEST,
  GET_ADMINISTRATIVE_HISTORY_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAllAdministrativeHistoryReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_ADMINISTRATIVE_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADMINISTRATIVE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data:
          action.payload.params?.page >= 0 && action.payload.params?.page <= 1
            ? action.payload.data
            : {
                ...state.data,
                data: [
                  ...(state.data?.data as any),
                  ...action.payload.data.data,
                ],
              },
        error: '',
      };
    case GET_ADMINISTRATIVE_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: [...(state.data?.data as any)],
        },
        error: action.payload,
      };
    case GET_ADMINISTRATIVE_HISTORY_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAllAdministrativeHistoryReducer;
