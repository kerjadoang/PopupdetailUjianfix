export interface IResponsePTNRecordSession {
  ID?: number;
  created_by?: number;
  user?: User;
  image_url?: string;
  status?: string;
  class_id?: number;
  class?: Class;
  subject_id?: number;
  subject_ptn?: SubjectPtn;
  chapter_id?: number;
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
  academi_show_recording_class_session?: any[];
  path_url?: string;
}

export interface Class {
  id?: number;
  degree_id?: number;
  major_id?: number;
  name?: string;
  order?: number;
  degree?: Degree;
  major?: Major;
}

export interface Degree {
  id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
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
  password?: string;
  signature?: string;
  zak_token?: string;
  media_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubjectPtn {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  module?: string;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: number;
}

export interface User {
  id?: number;
  user_name?: string;
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
  fcm_token?: string;
  last_active?: Date;
  coachmark_web_dashboard?: boolean;
  coachmark_web_regular?: boolean;
  user_type?: UserType;
  coin?: number;
  image_url?: string;
}

export interface UserType {
  id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  description?: string;
  display?: boolean;
}

export interface IPTNModule {
  id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  image_url?: string;
  icon_web?: string;
  is_active?: boolean;
  type?: string;
  module?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface IPTNLiveClassRekaman {
  tps?: IPTNModule[];
  saintek?: IPTNModule[];
  soshum?: IPTNModule[];
}

export interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  module_type?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  creator?: null;
  updater?: null;
  deleter?: null;
}

export type IPTNLiveClassRekamanFilter = {
  dateStart?: string;
  dateEnd?: string;
  dateType?: FilterDateType;
  subjects?: BaseFilter<Subject>[];
  type?: BaseFilter<IPTNType>[];
  offset?: number;
  limit?: number;
  search?: string;
};

export type IPTNType = 'TPS' | 'Saintek' | 'Soshum';

export type IPTNFilterSwipeUpType = 'DATE' | 'TYPE' | 'SUBJECT' | '';

export type IReqPTNRecordSession = {
  search?: string;
  materi_video?: number[];
  mata_pelajaran?: number[];
  diunduh?: false;
  tanggal_awal?: string;
  tanggal_akhir?: string;
  module_ptn?: string[];
};
