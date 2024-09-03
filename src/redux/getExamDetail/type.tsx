const BASE_NAME = 'EXAM_DETAIL';
export const EXAM_DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const EXAM_DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const EXAM_DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const EXAM_DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface ExamDetailRequestAction {
  type: typeof EXAM_DETAIL_REQUEST;
}

interface ExamDetailSuccessAction {
  type: typeof EXAM_DETAIL_SUCCESS;
  payload: {data: any};
}

interface ExamDetailFailedAction {
  type: typeof EXAM_DETAIL_FAILED;
  payload: any;
}

interface ExamDetailDestroyAction {
  type: typeof EXAM_DETAIL_DESTROY;
}

export interface IExamDetailResponseData {
  exam_schedule?: IExamSchedule;
  student_status?: IStudentStatus;
}

export interface IExamSchedule {
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
  service?: IBaseService;
  subject?: IBaseSubject;
  class?: Class;
  package?: IBasePackage;
  teacher_token?: string;
}

export interface IStudentStatus {
  mengumpulkan?: null;
  belum_selesai?: IBelumSelesai[];
}

export interface IBelumSelesai {
  student_exam_id?: number;
  student_exam_history_id?: number;
  status?: string;
  fullname?: string;
  avatar?: string;
  point?: number;
  time_start?: string;
  time_finish?: string;
}

export type EXAM_DETAIL_ACTION_TYPES =
  | ExamDetailRequestAction
  | ExamDetailSuccessAction
  | ExamDetailFailedAction
  | ExamDetailDestroyAction;
export type IExamDetailResponse = IBaseResponseData<IExamDetailResponseData>;
