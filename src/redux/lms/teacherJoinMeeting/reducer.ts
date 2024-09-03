import {
  TEACHER_JOIN_MEETING_REQUEST,
  TEACHER_JOIN_MEETING_SUCCESS,
  TEACHER_JOIN_MEETING_FAILED,
  TEACHER_JOIN_MEETING_DESTROY,
  ITeacherJoinMeetingInitialState,
} from './type';

const initialState: ITeacherJoinMeetingInitialState = {
  loading: false,
  data: null,
  error: null,
};

const lmsTeacherJoinMeetingReducer = (
  state: ITeacherJoinMeetingInitialState = initialState,
  action: any,
): ITeacherJoinMeetingInitialState => {
  switch (action?.type) {
    case TEACHER_JOIN_MEETING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEACHER_JOIN_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case TEACHER_JOIN_MEETING_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case TEACHER_JOIN_MEETING_DESTROY:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

export default lmsTeacherJoinMeetingReducer;
