export type ISessionData = {
  id: number;
  title: string;
  time_start: Date;
  time_end: Date;
  duration: number;
  description: string;
  platform: string;
  type: string;
  status: string;
  zoom_id: number;
  gmeet_id: number;
  rombel_class_id: number;
  rombel_class: RombelClass;
  subject_id: number;
  subject: Subject;
  created_by: number;
  user_created_by: UserCreatedBy;
  participant: Participant;
  path_url: string;
  path_id: string;
};

export type Participant = {
  join: null;
  not_join: null;
};

export type RombelClass = {
  id: number;
  rombel_id: number;
  class_id: number;
  school_id: number;
  name: string;
};

export type Subject = {
  id: number;
  class_id: number;
  curriculum_id: number;
  name: string;
  icon_mobile: string;
  icon_web: string;
  is_active: boolean;
  coin_default: number;
  module_type: string;
};

export type UserCreatedBy = {
  id: number;
  full_name: string;
};
