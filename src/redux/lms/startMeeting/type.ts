const BASE_START_MEETING = 'START_MEETING';
export const START_MEETING_REQUEST = `${BASE_START_MEETING}_REQUEST`;
export const START_MEETING_SUCCESS = `${BASE_START_MEETING}_SUCCESS`;
export const START_MEETING_FAILED = `${BASE_START_MEETING}_FAILED`;
export const START_MEETING_DESTROY = `${BASE_START_MEETING}_DESTROY`;

interface startMeetingRequestAction {
  type: typeof START_MEETING_REQUEST;
}

interface startMeetingSuccessAction {
  type: typeof START_MEETING_SUCCESS;
  payload: {data: any};
}

interface startMeetingFailedAction {
  type: typeof START_MEETING_FAILED;
  payload: any;
}

interface startMeetingDestroyAction {
  type: typeof START_MEETING_DESTROY;
}

export type START_MEETING_ACTION_TYPES =
  | startMeetingRequestAction
  | startMeetingSuccessAction
  | startMeetingFailedAction
  | startMeetingDestroyAction;

export interface IStartMeetingResponseData {
  id?: number;
  class_session_id?: number;
  platform?: string;
  id_zoom?: string;
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
  passWord?: string;
}

export type IStartMeetingResponse =
  IBaseResponseData<IStartMeetingResponseData>;

export interface IStartMeetingInitialState {
  loading: boolean;
  data: IStartMeetingResponse | null;
  error: null;
}

export interface IStartMeetingBody {
  class_session_id?: number;
  subject_id?: number;
  subject?: string;
  rombel_class_id?: number;
  rombel_class?: string;
  platform?: string;
}
