interface IUjianViolation {
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
  student_exam?: StudentExam[];
  teacher_token?: string;
  room?: string;
  submitted?: number;
  total_students?: number;
}

interface StudentExam {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  start_at?: string | null;
  finished_at?: string | null;
  token?: string;
  room?: string;
  student_exam_violation?: StudentExamViolation[];
}

interface StudentExamViolation {
  id?: number;
  violation?: string;
  created_at?: Date;
  student_exam_id?: number;
}
