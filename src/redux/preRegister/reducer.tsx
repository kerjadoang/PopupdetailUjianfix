import {
  PRE_REGISTER_REQUEST,
  PRE_REGISTER_SUCCESS,
  PRE_REGISTER_FAILED,
  PRE_REGISTER_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const preRegisterReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PRE_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRE_REGISTER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: false,
      };
    case PRE_REGISTER_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PRE_REGISTER_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default preRegisterReducer;
