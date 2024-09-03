import {AxiosError} from 'axios';

const BASE_NAME = 'CS_DETAIL';
export const CS_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const CS_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const CS_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const CS_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

export interface IClassSessionDetailResponseData {
  ID?: number;
  created_by?: number;
  user?: User;
  user_name?: string;
  status?: string;
  class_id?: number;
  class?: Class;
  subject_id?: number;
  subject?: Subject;
  chapter_id?: number;
  chapter?: Chapter;
  time_start?: Date;
  time_finish?: Date;
  time_open?: string;
  time_presentation?: string;
  time_class_interaction?: string;
  time_closed?: string;
  minutes?: string;
  id_liveclass?: number;
  lc_zoom?: LcZoom;
  service_type?: string;
  participant?: Participant[];
}

export interface Chapter {
  id?: number;
  subject_id?: number;
  name?: string;
  is_active?: boolean;
  order?: number;
}

export interface Class {
  id?: number;
  degree_id?: number;
  major_id?: number;
  name?: string;
  order?: number;
  degree?: Degree;
  major?: Major;
  curriculum_id?: number;
}

export interface Degree {
  id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  description?: string;
}

export interface Major {
  id?: number;
  name?: string;
}

export interface LcZoom {
  ID?: number;
  created_by?: number;
  uuid?: string;
  id_zoom?: string;
  host_id?: string;
  topic?: string;
  type?: number;
  status?: string;
  start_time?: Date;
  end_time?: Date;
  duration?: number;
  timezone?: string;
  start_url?: string;
  join_url?: string;
  signature?: string;
  zak_token?: string;
  media_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Participant {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ID?: number;
  academi_class_session_id?: number;
  created_by?: number;
  user?: User;
  time_start?: Date;
  time_finish?: Date;
  status?: string;
  signature?: string;
  DeletedAt?: null;
}

export interface User {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  school_id?: number;
  username?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  registration_number?: string;
  full_name?: string;
  max_password_failed?: number;
  dummy?: boolean;
  active?: boolean;
  max_otp_failed?: number;
  max_request_otp?: number;
  attempted_request_after_failed?: number;
  avatar?: string;
  xp?: number;
  last_active?: Date;
  coachmark_mobile_dashboard?: boolean;
  coachmark_web_dashboard?: boolean;
  coachmark_mobile_leaderboard?: boolean;
  coachmark_web_leaderboard?: boolean;
  coachmark_web_regular?: boolean;
  coachmark_mobile_tanya?: boolean;
  coachmark_web_tanya?: boolean;
  coachmark_mobile_coin?: boolean;
  prefered_video_quality?: number;
  user_type?: Degree;
  path_url?: string;
}

export interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  school_id?: number;
  path_url?: string;
}

export interface IInitialStateGetClassSession {
  loading: boolean;
  data: IBaseResponseData<IClassSessionDetailResponseData> | null;
  error: AxiosError | null;
}

interface ClassSessionDetailRequestAction {
  type: typeof CS_DETAIL_REQUEST;
}

interface ClassSessionDetailSuccessAction {
  type: typeof CS_DETAIL_SUCCESS;
  payload: {data: any};
}

interface ClassSessionDetailFailedAction {
  type: typeof CS_DETAIL_FAILED;
  payload: any;
}

interface ClassSessionDetailDestroyAction {
  type: typeof CS_DETAIL_DESTROY;
}

export type CS_DETAIL_ACTION_TYPES =
  | ClassSessionDetailRequestAction
  | ClassSessionDetailSuccessAction
  | ClassSessionDetailFailedAction
  | ClassSessionDetailDestroyAction;
