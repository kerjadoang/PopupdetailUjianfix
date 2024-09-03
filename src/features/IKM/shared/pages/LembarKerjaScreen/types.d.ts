interface ILKPDTask {
  task_teacher?: ILKPDTaskTaskTeacher;
  task_student?: TaskStudent;
  student_media_id?: string;
}

interface TaskStudent {
  id?: number;
  task_teacher_id?: number;
  task_teacher?: TaskStudentTaskTeacher;
  user_id?: number;
  user?: User;
  correction_type?: string;
  status?: string;
  correct?: number;
  wrong?: number;
  skip?: number;
  value?: number;
  description?: string;
  image_id?: string;
  time_start?: string;
  time_finish?: string;
  time_correction?: string;
}

interface TaskStudentTaskTeacher {
  id?: number;
  user_id?: number;
  type?: string;
  question_type?: string;
  curriculum_id?: number;
  rombel_class_school_id?: number;
  subject_id?: number;
  chapter_id?: number;
  title?: string;
  time_start?: string;
  time_finish?: string;
  instructions?: string;
  media_id?: string;
  status?: string;
}

interface User {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  username?: string;
  gender?: string;
  phone_number?: string;
  full_name?: string;
  password?: string;
  max_password_failed?: number;
  otp?: string;
  max_otp_failed?: number;
  max_request_otp?: number;
  attempted_request_after_failed?: number;
  user_type?: Class;
  school?: School;
  class?: Class;
}

interface Class {}

interface School {
  degree?: Class;
}

interface ILKPDTaskTaskTeacher {
  id?: number;
  user_id?: number;
  user?: User;
  type?: string;
  question_type?: string;
  curriculum_id?: number;
  curriculum?: Curriculum;
  rombel_class_school_id?: number;
  rombel_class_school?: RombelClassSchool;
  subject_id?: number;
  subject?: Subject;
  chapter_id?: number;
  chapter?: Chapter;
  title?: string;
  time_start?: string;
  time_finish?: string;
  instructions?: string;
  media_id?: string;
  status?: string;
  kp_ikm_worksheet_master_id?: number;
  kp_ikm_worksheet_master?: IWorksheet;
  class_id?: number;
  class?: IPhaseClass | Class;
}

interface Chapter {
  id?: number;
  subject_id?: number;
  name?: string;
  is_active?: boolean;
  value?: any;
}

interface Curriculum {
  id?: number;
  name?: string;
  image?: string;
}

interface RombelClassSchool {
  id?: number;
  rombel_id?: number;
  class_id?: number;
  school_id?: number;
  name?: string;
}

interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  class?: Class;
  curriculum?: Class;
  major?: Class;
  value?: any;
}

interface IFileData {
  ID?: string;
  file_name?: string;
  path_url?: string;
  type?: string;
  file_type?: IFileExt;
}

interface IWorksheet {
  id?: number;
  name?: string;
  description?: string;
  media_id?: string;
  subject_id?: number;
  subject?: Subject;
  is_active?: boolean;
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
  value?: any;
}
