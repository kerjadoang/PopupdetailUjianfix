interface IUjianHistory {
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
  service?: Service;
  subject?: Subject;
  class?: Class;
  package?: Package;
  student_exam?: StudentExam[];
  teacher_token?: string;
  room?: string;
  submitted?: number;
  total_students?: number;
}

interface Class {
  id?: number;
  rombel_id?: number;
  class_id?: number;
  school_id?: number;
  name?: string;
}

interface Package {
  id?: number;
  name?: string;
  total_question?: number;
  class_id?: number;
  subject_id?: number;
  school_id?: number;
  multiple_choice_count?: number;
  essay_count?: number;
}

interface Service {
  id?: number;
  name?: string;
  description?: string;
  service?: string;
  class_id?: number;
}

interface StudentExam {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  start_at?: string;
  finished_at?: string;
  exam_history?: ExamHistory;
  token?: string;
  room?: string;
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
  user?: User;
  school_exam?: SchoolExam;
}

interface User {
  password?: string;
  active?: boolean;
  deleted_at?: null;
  coin?: number;
  referral_code?: string;
}

interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  module_type?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  creator?: null;
  updater?: null;
  deleter?: null;
}

interface IGotoExplanation {
  title: string;
  data: ExplanationData;
  navigation: any;
  questionServiceId: number;
  type?: string;
  showAnswered?: boolean;
}

interface ExplanationData {
  correct_answer?: ExplanationQuestionData[];
  pass?: ExplanationQuestionData[];
  wrong_answer?: ExplanationQuestionData[];
  answered?: ExplanationQuestionData[];
  package_type?: string;
}

type ExamHistory = {
  student_exam: IStudentExam;
} & ExplanationData;

interface ExplanationQuestionData {
  id?: string | number;
  orders?: string | number;
  question_type_id?: number;
  question?: string;
  question_image_id?: string;
  answer_user?: string;
  answer_user_image_id?: string;
  answer_system?: string;
  explanation?: string;
  explanation_image_id?: string;
}
