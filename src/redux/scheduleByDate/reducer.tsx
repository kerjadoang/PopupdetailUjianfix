import {
  SCHEDULE_BY_DATE_REQUEST,
  SCHEDULE_BY_DATE_SUCCESS,
  SCHEDULE_BY_DATE_FAILED,
  SCHEDULE_BY_DATE_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const scheduleByDateReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case SCHEDULE_BY_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCHEDULE_BY_DATE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case SCHEDULE_BY_DATE_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case SCHEDULE_BY_DATE_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};

export default scheduleByDateReducer;
