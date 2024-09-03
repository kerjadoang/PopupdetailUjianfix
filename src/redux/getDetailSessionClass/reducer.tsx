import {
  GET_DETAIL_SESSION_CLASS_DESTROY,
  GET_DETAIL_SESSION_CLASS_FAILED,
  GET_DETAIL_SESSION_CLASS_REQUEST,
  GET_DETAIL_SESSION_CLASS_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getDetailSessionClassReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_DETAIL_SESSION_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DETAIL_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: '',
      };

    case GET_DETAIL_SESSION_CLASS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_DETAIL_SESSION_CLASS_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getDetailSessionClassReducer;
