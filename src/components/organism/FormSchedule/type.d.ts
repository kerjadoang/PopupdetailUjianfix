interface ISchedule {
  id_relation?: number;
  type?: string;
  filter_category?: string;
  title?: string;
  creator?: Creator;
  sub_title?: string;
  note_group?: NoteGroup[];
  date_time?: Date;
  link_url?: string;
  subject_id?: number;
  chapter_id?: number;
  tanya_session?: TanyaSession[] | null;
  start_exam_button?: boolean;
  media_id?: string;
  question_type?: string;
  time_start?: Date;
  time_finish?: Date;
  time_end?: Date;
  status?: string;
  rombel_class?: string;
  class_session_type?: string;
  class_session_platform?: string;
  ID?: string;
  subject_ptn?: SubjectPtn;
  description?: string;
  user?: IBaseUser;
  subject?: Subject;
}

interface Creator {
  deleted_at?: null;
  coin?: number;
  referral_code?: string;
  id?: number;
  full_name?: string;
  avatar?: string;
}

interface NoteGroup {
  icon?: string;
  description?: string;
  label?: string;
}

interface TanyaSession {
  session?: string;
  start?: string;
  end?: string;
}

type ScheduleType = 'ON_GOING' | 'EXPIRED_DONE_SCORING' | 'EXPIRED_DONE';
