import {TaskTeacher} from '@services/lms/type';

export interface ILkpdTeacherHistoryDetail {
  task_teacher: DataTaskTeacher;
  student_info: string;
  ttl_finish: number;
  ttl_not_yet: number;
  finish: Finish[];
  not_yet: NotYet[];
  list_student: ListStudent[];
}

export interface Finish {
  id: number;
  task_teacher_id: number;
  task_teacher: TaskTeacher;
  user_id: number;
  user: User;
  correction_type: string;
  status: string;
  correct: number;
  wrong: number;
  skip: number;
  value: number;
  time_correction: Date;
}

export interface NotYet {
  id: number;
  task_teacher_id: number;
  task_teacher: TaskTeacher;
  user_id: number;
  user: User;
  correction_type: string;
  status: string;
  correct: number;
  wrong: number;
  skip: number;
  value: number;
  time_correction: Date;
}

export interface ListStudent {
  id: number;
  task_teacher_id: number;
  task_teacher: TaskTeacher;
  user_id: number;
  user: User;
  correction_type: string;
  status: string;
  correct: number;
  wrong: number;
  skip: number;
  value: number;
  time_correction: Date;
}

export interface DataTaskTeacher {
  id: number;
  user_id: number;
  user: User;
  type: string;
  question_type: string;
  curriculum_id: number;
  curriculum: Curriculum;
  rombel_class_school_id: number;
  rombel_class_school: RombelClassSchool;
  subject_id: number;
  subject: Subject;
  chapter_id: number;
  chapter: Chapter;
  title: string;
  time_start: Date;
  time_finish: Date;
  time_correction: Date;
  instructions: string;
  status: string;
  class_id: number;
  class: Class;
}
