import {
  PTN_SCHEDULE_REQUEST,
  PTN_SCHEDULE_SUCCESS,
  PTN_SCHEDULE_FAILED,
  PTN_SCHEDULE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const PTNScheduleReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case PTN_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PTN_SCHEDULE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case PTN_SCHEDULE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case PTN_SCHEDULE_DESTROY:
      return state;
    default:
      return state;
  }
};

export default PTNScheduleReducer;
