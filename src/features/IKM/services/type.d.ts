interface IReqScheduleLKPD {
  search?: string;
  limit?: number;
  offset?: number;
  class_id?: number[];
  rombel_class_school_id?: number[];
  subject_id?: number[];
  type?: string[];
  userRole: UserRole;
  time_start?: string;
  time_finish?: string;
  currentType?: ILKPDType;
}

type ILKPDType = 'Checked' | 'Schedule' | 'History';

type IReqHistoryLKPD = IReqScheduleLKPD;
type IResHistoryLKPD = IResScheduleLKPD;

type IReqCheckedLKPD = IReqScheduleLKPD;
type IResCheckedLKPD = IResScheduleLKPD;

interface IResScheduleLKPD {
  list?: LKPDCardData[];
  total_rows?: number;
}

interface LKPDCardData {
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
  time_mengerjakan?: string;
  time_mengumpulkan?: string;
  time_finish?: string;
  instructions?: string;
  media_id?: string;
  status?: string;
  student_value?: string;
  student_info?: string;
  class_id?: number;
  class?: Class;
}

interface Chapter {
  id?: number;
  subject_id?: number;
  name?: string;
  is_active?: boolean;
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
}

interface Class {
  id: number;
  degree_id: number;
  name: string;
  order: number;
}

interface User {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  school_id?: number;
  username?: string;
  gender?: string;
  phone_number?: string;
  registration_number?: string;
  full_name?: string;
  password?: string;
  max_password_failed?: number;
  active?: boolean;
  max_otp_failed?: number;
  max_request_otp?: number;
  attempted_request_after_failed?: number;
  user_type?: Class;
  school?: School;
  class?: Class;
}

interface School {
  degree?: Class;
}

interface IStudentFinishLKPD {
  task_id: number;
  media_id: string;
}

interface ITeacherFinishCheckedLKPD {
  task_student_id?: number;
  correct?: number;
  wrong?: number;
  skip?: number;
  value?: number;
}

interface IReqGetDetailLKPD {
  task_id: number;
  task_student_id?: number;
  user_role: UserRole;
}
interface IReqChapterById {
  subject_id: number;
  user_role?: UserRole;
}
interface IReqMapelById {
  class_id: number;
  user_role?: UserRole;
}

interface IReqWorksheetMaster {
  is_active: boolean;
  pagination?: IBasePagination;
  user_role?: UserRole;
}
interface IReqAllRombelIKM {
  user_role?: UserRole;
}

interface IKMRombel {
  class_id?: number;
  class_name?: string;
  rombel_class_school_id?: number;
  rombel_class_school_name?: string;
}
