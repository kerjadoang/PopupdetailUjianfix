import {
  UPDATE_READ_ACTIVITY_CONFIRM_DESTROY,
  UPDATE_READ_ACTIVITY_CONFIRM_FAILED,
  UPDATE_READ_ACTIVITY_CONFIRM_REQUEST,
  UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const updateReadActivityConfirmReducer = (
  state = initialState,
  action: any,
) => {
  switch (action?.type) {
    case UPDATE_READ_ACTIVITY_CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_READ_ACTIVITY_CONFIRM_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case UPDATE_READ_ACTIVITY_CONFIRM_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case UPDATE_READ_ACTIVITY_CONFIRM_DESTROY:
      return state;
    default:
      return state;
  }
};

export default updateReadActivityConfirmReducer;
