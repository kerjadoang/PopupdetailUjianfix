import {
  GET_DOMICILE_REQUEST,
  GET_DOMICILE_SUCCESS,
  GET_DOMICILE_FAILED,
  GET_DOMICILE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getDomicileReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_DOMICILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DOMICILE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_DOMICILE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_DOMICILE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getDomicileReducer;
