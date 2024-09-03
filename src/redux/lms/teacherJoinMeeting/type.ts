const BASE_TEACHER_JOIN_MEETING = 'TEACHER_JOIN_MEETING';
export const TEACHER_JOIN_MEETING_REQUEST = `${BASE_TEACHER_JOIN_MEETING}_REQUEST`;
export const TEACHER_JOIN_MEETING_SUCCESS = `${BASE_TEACHER_JOIN_MEETING}_SUCCESS`;
export const TEACHER_JOIN_MEETING_FAILED = `${BASE_TEACHER_JOIN_MEETING}_FAILED`;
export const TEACHER_JOIN_MEETING_DESTROY = `${BASE_TEACHER_JOIN_MEETING}_DESTROY`;

interface teacherJoinMeetingRequestAction {
  type: typeof TEACHER_JOIN_MEETING_REQUEST;
}

interface teacherJoinMeetingSuccessAction {
  type: typeof TEACHER_JOIN_MEETING_SUCCESS;
  payload: {data: any};
}

interface teacherJoinMeetingFailedAction {
  type: typeof TEACHER_JOIN_MEETING_FAILED;
  payload: any;
}

interface teacherJoinMeetingDestroyAction {
  type: typeof TEACHER_JOIN_MEETING_DESTROY;
}

export type TEACHER_JOIN_MEETING_ACTION_TYPES =
  | teacherJoinMeetingRequestAction
  | teacherJoinMeetingSuccessAction
  | teacherJoinMeetingFailedAction
  | teacherJoinMeetingDestroyAction;

export interface ITeacherJoinMeetingResponseData {
  id?: number;
  class_session_id?: number;
  platform?: string;
  meet_id?: string;
  host_email?: string;
  topic?: string;
  time_start?: Date;
  time_end?: Date;
  duration?: number;
  start_url?: string;
  join_url?: string;
  signature?: string;
  zak_token?: string;
  created_by?: string;
  userName?: string;
  id_zoom?: string;
  passWord?: string;
}

export type ITeacherJoinMeetingResponse =
  IBaseResponseData<ITeacherJoinMeetingResponseData>;

export interface ITeacherJoinMeetingInitialState {
  loading: boolean;
  data: ITeacherJoinMeetingResponse | null;
  error: null;
}
