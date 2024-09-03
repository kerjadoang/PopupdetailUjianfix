interface IPRTugasData {
  id?: number;
  task_student_id?: number;
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
  time_mengerjakan?: string;
  time_mengumpulkan?: string;
  instructions?: string;
  media_id?: string;
  status?: string;
  student_value?: string;
  class_id?: number;
  class?: Class;
}

interface IDetailTaskData {
  task_teacher?: IDetailTaskTeacher;
  task_student?: TaskStudent;
  duration?: string;
  type?: string;
  subject_name?: string;
  correction_type?: string;
  title?: string;
  time_start?: string;
  time_finish?: string;
  value?: number;
  correct?: number;
  wrong?: number;
  skip?: number;
  time_correction?: string;
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
  image_id?: string;
  time_start?: Date;
  time_finish?: Date;
  time_correction?: Date;
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
  time_start?: Date;
  time_finish?: Date;
  time_correction?: Date;
  instructions?: string;
  media_id?: string;
  status?: string;
  class_id?: number;
}

interface IDetailTaskTeacher {
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
  time_start?: Date;
  time_finish?: Date;
  time_correction?: Date;
  instructions?: string;
  media_id?: string;
  status?: string;
  class_id?: number;
  class?: Class;
}
