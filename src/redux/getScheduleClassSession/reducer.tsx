import {
  GET_SCHEDULE_CLASS_SESSION_DESTROY,
  GET_SCHEDULE_CLASS_SESSION_FAILED,
  GET_SCHEDULE_CLASS_SESSION_REQUEST,
  GET_SCHEDULE_CLASS_SESSION_SUCCESS,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getScheduleClassSessionReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case GET_SCHEDULE_CLASS_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SCHEDULE_CLASS_SESSION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case GET_SCHEDULE_CLASS_SESSION_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case GET_SCHEDULE_CLASS_SESSION_DESTROY:
      return state;
    default:
      return state;
  }
};

export default getScheduleClassSessionReducer;
