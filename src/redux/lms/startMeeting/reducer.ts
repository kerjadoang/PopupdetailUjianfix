import {
  START_MEETING_REQUEST,
  START_MEETING_SUCCESS,
  START_MEETING_FAILED,
  START_MEETING_DESTROY,
  IStartMeetingInitialState,
} from './type';

const initialState: IStartMeetingInitialState = {
  loading: false,
  data: null,
  error: null,
};

const lmsTeacherStartMeetingReducer = (
  state: IStartMeetingInitialState = initialState,
  action: any,
): IStartMeetingInitialState => {
  switch (action?.type) {
    case START_MEETING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case START_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case START_MEETING_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case START_MEETING_DESTROY:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

export default lmsTeacherStartMeetingReducer;
