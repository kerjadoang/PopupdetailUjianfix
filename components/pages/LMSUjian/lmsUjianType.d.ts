type IExamHistoryData = {
  student_exam: IStudentExam;
} & ExplanationData;

interface IStudentExam {
  id?: number;
  status?: string;
  start_at?: string;
  finished_at?: string;
  student?: Student;
  exam?: Exam;
  exam_history?: ExamHistory;
}

interface Exam {
  id?: number;
  title?: string;
  teacher_id?: number;
  school_id?: number;
  curriculum_id?: number;
  question_package_service_id?: number;
  question_package_id?: number;
  rombel_class_school_id?: number;
  subject_id?: number;
  chapters?: string;
  duration?: number;
  instructions?: string;
  status?: string;
  created_at?: string;
  start_time?: string;
  end_time?: string;
  completed_at?: string;
  service?: Service;
  subject?: Subject;
  package?: Package;
  teacher_token?: string;
  room?: string;
  submitted?: number;
  total_students?: number;
  is_active_proctoring?: boolean;
  is_display_result_exam?: boolean;
  is_ready_paper?: boolean;
}

interface ExamHistory {
  id?: number;
  user_id?: number;
  student_exam_id?: number;
  point?: number;
  max_point?: number;
  duration?: string;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  submitted_answer?: number;
  created_at?: string;
  student_answer?: StudentAnswer[];
  user?: IBaseUser;
  school_exam?: SchoolExam;
}

// interface SchoolExam {
//     start_at?: any;
//     finished_at?: any;
// }

interface StudentAnswer {
  id?: number;
  student_exam_history_id?: number;
  question_id?: number;
  question_options_id?: number;
  status?: string;
  is_scoring?: boolean;
  user_input?: string;
  orders?: number;
  question?: Question;
  selected_option?: Option;
}

interface Question {
  id?: number;
  question?: string;
  tag?: string;
  marks?: number;
  file_id?: string;
  chapter_id?: number;
  subject_id?: number;
  class_id?: number;
  question_type_id?: number;
  question_level_id?: number;
  school_id?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  question_type?: QuestionType;
  options?: Option[];
  question_discuss?: QuestionDiscuss;
  chapter?: Chapter;
}

interface Option {
  id?: number;
  key?: string;
  answer?: string;
  question_id?: number;
  is_correct?: boolean;
  point?: number;
}

interface QuestionDiscuss {
  id?: number;
  explanation?: string;
  question_id?: number;
  file_id?: string;
}

interface QuestionType {
  id?: number;
  description?: string;
  evaluation_type?: string;
  question_type?: string;
}

interface Student {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  school_id?: number;
  school_name?: string;
  username?: string;
  email?: string;
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
  avatar?: string;
  xp?: number;
  last_active?: string;
  address?: string;
  coachmark_mobile_dashboard?: boolean;
  coachmark_web_dashboard?: boolean;
  coachmark_web_regular?: boolean;
  coachmark_web_tanya?: boolean;
  coachmark_web_coin?: boolean;
  coachmark_mobile_soal?: boolean;
  coachmark_web_soal?: boolean;
  popup_mobile_tanya?: boolean;
  domicile_id?: number;
  parent_phone_number?: string;
  prefered_video_quality?: number;
  deleted_at?: any;
  created_at?: string;
  register_platform?: string;
  xp_rank?: number;
  coin?: number;
  referral_code?: string;
}
