const BASE_NAME_JOIN_LIVE_CLASS_SESSION = 'GET_JOIN_LIVE_CLASS_SESSION';
export const GET_JOIN_LIVE_CLASS_SESSION_REQUEST = `${BASE_NAME_JOIN_LIVE_CLASS_SESSION}_REQUEST`;
export const GET_JOIN_LIVE_CLASS_SESSION_SUCCESS = `${BASE_NAME_JOIN_LIVE_CLASS_SESSION}_SUCCESS`;
export const GET_JOIN_LIVE_CLASS_SESSION_FAILED = `${BASE_NAME_JOIN_LIVE_CLASS_SESSION}_FAILED`;
export const GET_JOIN_LIVE_CLASS_SESSION_DESTROY = `${BASE_NAME_JOIN_LIVE_CLASS_SESSION}_DESTROY`;

interface getJoinLiveClassSessionRequestAction {
  type: typeof GET_JOIN_LIVE_CLASS_SESSION_REQUEST;
}
interface getJoinLiveClassSessionSuccessAction {
  type: typeof GET_JOIN_LIVE_CLASS_SESSION_SUCCESS;
  payload: {data: any};
}
interface getJoinLiveClassSessionFailedAction {
  type: typeof GET_JOIN_LIVE_CLASS_SESSION_FAILED;
  payload: any;
}
interface getJoinLiveClassSessionDestroyAction {
  type: typeof GET_JOIN_LIVE_CLASS_SESSION_DESTROY;
}

export type GET_JOIN_LIVE_CLASS_SESSION_ACTION_TYPES =
  | getJoinLiveClassSessionRequestAction
  | getJoinLiveClassSessionSuccessAction
  | getJoinLiveClassSessionFailedAction
  | getJoinLiveClassSessionDestroyAction;

export interface IJoinLiveClassSessionResponseData {
  ID?: number;
  academi_class_session_id?: number;
  created_by?: number;
  time_start?: Date;
  time_finish?: string;
  status?: string;
  signature?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  sdkKey?: string;
  passWord?: string;
  userEmail?: string;
  userName?: string;
  id_zoom?: string;
  zak_token?: string;
}

export interface IJoinLiveClassSessionInitialState {
  loading: boolean;
  classData: IBaseResponseData<IJoinLiveClassSessionResponseData> | null;
  error: null;
}

export type IJoinLiveClassSessionResponse =
  IBaseResponseData<IJoinLiveClassSessionResponseData>;
