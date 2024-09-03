interface ITeacherExamDetail {
  exam_schedule?: ExamSchedule;
  student_status?: StudentStatus;
}

interface ExamSchedule {
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
  is_shuffle_questions?: boolean;
  is_shuffle_answers?: boolean;
  submitted?: number;
  total_students?: number;
  teacher_paper_id?: string;
  is_active_proctoring?: boolean;
  is_ready_paper?: boolean;
  status?: string;
}

interface Class {
  id?: number;
  rombel_id?: number;
  class_id?: number;
  school_id?: number;
  name?: string;
  updated_at?: string;
  deleted_at?: null;
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
  question_package_paper_id?: string;
  created_at?: string;
  updated_at?: string;
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
  full_name?: string;
  school_exam_schedule_id?: number;
  status?: Status;
  start_at?: Date | null;
  finished_at?: Date | null;
  token?: string;
  room?: string;
  student_paper_id?: string;
}

type Status = 'dikumpulkan' | 'ditugaskan' | 'selesai' | 'mengerjakan';

// enum Status {
//     Dikumpulkan = "dikumpulkan",
//     Ditugaskan = "ditugaskan",
// }

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
  is_live_teaching?: boolean;
  creator?: null;
  updater?: null;
  deleter?: null;
  path_url?: string;
}

interface StudentStatus {
  mengumpulkan?: BelumSelesai[];
  tidak_mengumpulkan?: BelumSelesai[];
  belum_selesai?: BelumSelesai[];
}

interface BelumSelesai {
  student_exam_id?: number;
  student_exam_history_id?: number;
  status?: Status;
  fullname?: string;
  avatar?: string;
  point?: number;
  time_start?: string;
  time_finish?: string;
  path_url?: string;
  point2?: number;
}
