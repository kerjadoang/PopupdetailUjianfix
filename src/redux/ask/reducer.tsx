import {ASK_REQUEST, ASK_SUCCESS, ASK_FAILED, ASK_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const askReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ASK_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ASK_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ASK_DESTROY:
      return state;
    default:
      return state;
  }
};

export default askReducer;
