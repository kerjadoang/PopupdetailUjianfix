import {
  SELECT_ROLE_REQUEST,
  SELECT_ROLE_SUCCESS,
  SELECT_ROLE_FAILED,
  SELECT_ROLE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const selectRoleReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SELECT_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECT_ROLE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SELECT_ROLE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SELECT_ROLE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default selectRoleReducer;
