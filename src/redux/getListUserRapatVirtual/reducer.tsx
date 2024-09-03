import {
  LIST_USER_RAPAT_VIRTUAL_REQUEST,
  LIST_USER_RAPAT_VIRTUAL_SUCCESS,
  LIST_USER_RAPAT_VIRTUAL_FAILED,
  LIST_USER_RAPAT_VIRTUAL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listUserRapatVirtualReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LIST_USER_RAPAT_VIRTUAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_USER_RAPAT_VIRTUAL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case LIST_USER_RAPAT_VIRTUAL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LIST_USER_RAPAT_VIRTUAL_DESTROY:
      return state;
    default:
      return state;
  }
};

export default listUserRapatVirtualReducer;
