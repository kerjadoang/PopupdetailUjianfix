import {XP_REQUEST, XP_SUCCESS, XP_FAILED, XP_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const xpReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case XP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case XP_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case XP_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case XP_DESTROY:
      return state;
    default:
      return state;
  }
};

export default xpReducer;
