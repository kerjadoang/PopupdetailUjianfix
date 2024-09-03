export type IExamData = {
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
  created_at?: Date;
  start_time?: Date;
  end_time?: Date;
  service?: _Service;
  subject?: _Subject;
  class?: _Class;
  package?: _Package;
  student_exam?: _StudentExam[];
};

type _Class = {
  id?: number;
  rombel_id?: number;
  class_id?: number;
  school_id?: number;
  name?: string;
};

type _Package = {
  id?: number;
  name?: string;
  total_question?: number;
  class_id?: number;
  subject_id?: number;
  school_id?: number;
};

type _Service = {
  id?: number;
  name?: string;
  description?: string;
  service?: string;
};

type _StudentExam = {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  start_at?: Date;
  exam_history?: _ExamHistory;
};

type _ExamHistory = {
  id?: number;
  user_id?: number;
  student_exam_id?: number;
  point?: number;
  max_point?: number;
  duration?: string;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  created_at?: Date;
  user?: any;
  school_exam?: any;
};

type _Subject = {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  module_type?: string;
};
