import {
  GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED,
  GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getAdministrativeHistoryDetailReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case GET_ADMINISTRATIVE_HISTORY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADMINISTRATIVE_HISTORY_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_ADMINISTRATIVE_HISTORY_DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_ADMINISTRATIVE_HISTORY_DETAIL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getAdministrativeHistoryDetailReducer;
