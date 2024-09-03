export type TGetAllListHistoryAttendance = {
  approval_status: string;
};

export type TGetAttendanceHistory = {
  date: string;
};

export type TPostSubmitPaymentEvidence = {
  user_id: number;
  rombel_class_school_id: number;
  payment_for_id: number;
  payment_for_notes: string;
  payment_category_id: number;
  payment_method_id: number;
  payment_method_notes?: string;
  payment_date: string;
  payment_proof_pict: any;
  nominal: number;
};

export type TPostRequestAbsent = {
  reason: string;
  start_date: string;
  end_date: string;
  media_id: string;
  note: string;
};

export type TPostDiscusssionGroupMessage = {
  type: string;
  message: any;
  media_id: string;
};

export type TPostMeetingLiveSessionMessage = {
  academi_class_session_id: number;
  type: string;
  message: any;
  media_id: string;
};

export type TGetDiscussionGroupMessageSearch = {
  search: any;
};

export type TPutChangeGroupName = {
  group_name: string | number;
};

export type TPutChangeGroupAvatar = {
  group_name: string | number;
};

export type TPostDisccusionAddMember = {
  users: [] | any;
};

export type TPostDisccusionCreateGroup = {
  name: 'string';
  avatar_id: 'string';
  users: [] | any;
};

export type TPostCreateClassSession = {
  curriculum_id: number;
  rombel_class_id: number;
  rombel_class: string;
  subject_id: number;
  subject: string;
  title: string;
  description: string;
  time_start: string;
  duration: number;
  type: string;
  platform?: string;
};

export interface IDetailPRProjectTugasResponseData {
  uuid?: string;
  number?: number;
  type?: string;
  image_id?: string;
  question?: string;
  choice?: IBaseOption[];
  correct_student?: boolean;
  student_answer?: string;
  value?: string;
  path_url?: string;
}

export interface TaskTeacher {
  id?: number;
  user_id?: number;
  user?: IBaseUser;
  type?: string;
  question_type?: string;
  curriculum_id?: number;
  curriculum?: Curriculum;
  rombel_class_school_id?: number;
  rombel_class_school?: IBaseRombelClassSchool;
  subject_id?: number;
  subject?: IBaseSubject;
  chapter_id?: number;
  chapter?: IBaseChapter;
  title?: string;
  time_start?: string;
  time_finish?: string;
  instructions?: string;
  media_id?: string;
  status?: string;
}

export interface IStartPRProjectTugasResponseData {
  task_teacher?: TaskTeacher;
  student_media_id?: string;
  path_url?: string;
}

export interface Curriculum {
  id?: number;
  name?: string;
}

export interface TaskTeacherQuestion {
  ID?: string;
  task_teacher_id?: number;
  question?: IBaseQuestion[];
}

export interface AnswerBody {
  uuid?: string;
  type?: string;
  correct_student?: boolean;
  image_id?: string;
  answer?: string;
}
export interface UjianAnswerBody {
  question_id?: number;
  orders?: number;
  question_options_id?: number | null;
  user_input?: string;
  status?: string;
}

export interface IStorePRProjectTugasBody {
  id: any;
  answer: AnswerBody[];
  media_id?: string;
  status?: string;
}
export interface IStoreUjianBody {
  duration: string;
  answer: UjianAnswerBody[];
}

export type IDetailPRProjectTugasResponse =
  IBaseResponseData<IDetailPRProjectTugasResponseData>;

export interface ILMSTeacherClassSessionFilter extends IBasePaginationFilter {
  status?: string | undefined;
  rombel_class_school_id?: any | undefined;
  subject?: string | undefined;
  type?: string | undefined;
  platform?: string | undefined;
  search?: string | undefined;
}

export interface IRombelData {
  rombel_class_school_id?: number;
  rombel_class_school_name?: string;
}

export type LMSTeacherClassSessionFilter = {
  rombel_data: IRombelData[] | [];
  subject: IBaseSubject[] | [];
  type: string[] | [];
  platform: string[] | [];
  service_data?: IBaseService[] | [];
  chapter: IBaseChapter[] | [];
  date?: any;
  dateStart?: any;
  dateEnd?: any;
  dateType?: FilterDateType;
} & IBasePaginationFilter;

export type LMSFilteredSubmited = Omit<
  LMSTeacherClassSessionFilter,
  'type' | 'platform' | 'chapter'
>;

export type IGetTeacherClassSessionResponse = IBaseResponseData<
  IGetTeacherClassSessionResponseData[]
>;

export interface IGetTeacherClassSessionResponseData {
  getTeacherClassSession?: any;
  id?: number;
  curriculum_id?: string;
  rombel_class_id?: string;
  subject_id?: number;
  title?: string;
  time_start?: string;
  time_end?: string;
  duration?: number;
  platform?: string;
  type?: string;
  status?: string;
  created_by?: number;
  zoom_id?: number;
  gmeet_id?: number;
  start_soon_notif?: boolean;
  rombel_class?: IBaseRombelClassSchool;
  subject?: IBaseSubject;
  user_created_by?: IBaseUser;
  zoom?: IBaseZoom;
}

export interface ITeacherCancelMeetingBody {
  reason: string;
}

export interface ITeacherFinishMeetingBody {
  class_session_id?: number;
  type?: string;
  platform?: string;
  media?: string;
}
export interface StudentExam {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  score?: number;
}

export interface IGetLMSStudentExamQuestionStartCheckResponseData {
  id?: number;
  title?: string;
  teacher_id?: number;
  school_id?: number;
  curriculum_id?: number;
  student_exam_id?: any;
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
  student_exam?: StudentExam[];
  service?: IBaseService;
  subject?: IBaseSubject;
  package?: IBasePackage;
}

export interface StudentAnswer {
  id?: number;
  student_exam_history_id?: number;
  question_id?: number;
  question_options_id?: number;
  status?: 'answered' | 'pass';
  orders?: number;
}

export interface IStoreUjianResponseData {
  id?: number;
  user_id?: number;
  student_exam_id?: number;
  duration?: string;
  created_at?: string;
  student_answer?: StudentAnswer[];
}

export interface IListScheduledAndNeedToBeCheckResponseData {
  id?: number;
  teacher_id?: number;
  school_id?: number;
  curriculum_id?: number;
  question_package_service_id?: number;
  question_package_id?: number;
  rombel_class_school_id?: number;
  subject_id?: number;
  chapters?: string;
  title?: string;
  start_time?: string;
  created_at?: string;
  end_time?: string;
  completed_at?: string;
  duration?: number;
  instructions?: string;
  service?: IBaseService;
  subject?: IBaseSubject;
  class?: IBaseRombelClassSchool;
  package?: IBasePackage;
  status?: string[];
  submitted?: number;
  total_students?: number;
}

export interface IListScheduledAndNeedToBeCheckFilter {
  search?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  subject_id?: any[];
  rombel_id?: any[];
  service_id?: any[];
  status?: string[];
  reset?: boolean;
}

export interface ITeacherClassSubjectResponseData {
  class_id?: number;
  class?: IBaseRombelClassSchool;
  curriculum_id?: number;
  icon_mobile?: string;
  icon_web?: string;
  id?: number;
  is_active?: boolean;
  module_type?: string;
  name?: string;
  school_id?: number;
  path_url?: string;
}

export interface IRombelListClassResponseData {
  degree_id?: number;
  id?: number;
  major?: Major;
  major_id?: number;
  name?: string;
  order?: number;
  rombel_class_school?: IBaseRombelClassSchool[];
  path_url?: string;
}

export interface IListChapterBySubjectResponseData {
  id?: any;
  is_active?: boolean;
  name?: string;
  order?: number;
  subject_id?: number;
  subtitle?: any;
}

export interface IListPaketUjianByChapterResponseData {
  chapter_id?: number;
  class_id?: number;
  essay_count?: number;
  id?: number;
  multiple_choice_count?: number;
  multiple_choice_complex_count?: number;
  name?: string;
  school_id?: number;
  subject_id?: number;
}

export interface ICreatePaketSoalUjianPayload {
  name: string;
  class_id: number;
  subject_id: number;
  chapter_id: any;
}

export interface IDetailPaketSoalUjianListResponseData {
  id?: number;
  name?: string;
  total_question?: number;
  question_package_service_id?: number;
  class_id?: number;
  subject_id?: number;
  school_id?: number;
  package_question?: IBasePackageQuestion[];
}

// detail soal (paket soal/ujian)
export interface IDetailSoalResponseData {
  chapter?: Chapter;
  class_id?: number;
  created_at?: string;
  deleted_at?: string;
  id?: number;
  is_active?: boolean;
  marks?: number;
  question_discuss?: QuestionDiscuss;
  question_level_id?: number;
  question_type_id?: number;
  school_id?: number;
  subject_id?: number;
  tag?: string;
  total_question?: number;
  file_id?: string;
  path_url?: string;
  options?: IBaseOption[];
  updated_at?: string;
  question?: string;
  // question: {
  //   id?: number;
  //   instructions?: string;
  //   question?: string;
  //   marks?: number;
  //   file_id?: string;
  //   chapter_id?: number;
  //   subject_id?: number;
  //   class_id?: number;
  //   question_service_type_id?: number;
  //   question_type_id?: number;
  //   question_type?: IBaseQuestionType;
  //   question_level_id?: number;
  //   options?: IBaseOption[];
  //   path_url?: string;
  //   question_discuss?: IBaseQuestionDiscuss;
  // };
}
export interface IListBankSoalResponseData {
  count?: number;
  id?: number;
  name?: string;
  packages?: IBasePackage[];
  question?: IBaseQuestion;
}

export interface IListBankSoalResponseData {}

interface Question {
  question_id?: number;
  orders?: number;
}

export interface IAddToPaketSoalPayload {
  questions?: Question[];
}

export interface Discussion {
  explanation?: string;
  file_id?: null;
}

export interface ICreateSoalSendiriOptionPayload {
  key?: string;
  answer?: string;
  is_correct?: boolean;
  file_id?: string;
  test_option_content?: string;
}
export interface ICreateSoalSendiriPayload {
  instructions?: string;
  question: string;
  tag: string;
  marks: number;
  file_id?: string | null;
  chapter_id?: any;
  subject_id?: any;
  class_id?: any;
  question_type_id?: any;
  question_level_id?: any;
  options?: ICreatePaketSoalUjianPayload[];
  discussion?: Discussion;
}

export interface IBankSoalFilterParam {
  name?: string;
}

export interface IJadwalkanUjianPayload {
  curriculum_id: number;
  question_package_service_id: number;
  question_package_id: number;
  rombel_class_school_id?: number[];
  subject_id: number;
  title: string;
  chapter: {
    id: number;
    name: string;
  }[];
  chapters?: string;
  start_time: string;
  duration: number;
  instructions?: string;
  users: {id?: number}[];
  is_shuffle_answers?: boolean;
  is_shuffle_questions?: boolean;
}

export interface IListSubjectByCurriculumAndClassResponseData {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  major_id?: number;
  name?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  school_id?: number;
  module_type?: string;
  editable?: boolean;
}

export interface IRombelUserFilterParam {
  rombelClassId?: any;
  search?: string;
}

export interface IRombelUserResponseData {
  rombel_user?: IBaseRombelUser[];
  rombel_user_amount?: number;
}

export interface IDetailUjianResponseData {
  exam_schedule?: ExamSchedule;
  student_status?: StudentStatus;
}

export interface StudentStatus {
  belum_selesai?: BelumSelesai[];
  mengumpulkan?: any;
}

export interface BelumSelesai {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  student?: BelumSelesaiStudent;
}

export interface BelumSelesaiStudent {
  id?: number;
  user_type_id?: number;
  class_id?: number;
  school_id?: number;
  username?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  registration_number?: string;
  full_name?: string;
  max_password_failed?: number;
  active?: boolean;
  max_otp_failed?: number;
  max_request_otp?: number;
  attempted_request_after_failed?: number;
  avatar?: string;
  xp?: number;
  last_active?: string;
  coachmark_web_dashboard?: boolean;
}

export interface ExamSchedule {
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
  chapter?: {
    chapter?: IBaseChapter;
  }[];
  created_at?: string;
  start_time?: string;
  end_time?: string;
  service?: IBaseService;
  subject?: IBaseSubject;
  class?: IBaseRombelClassSchool;
  package?: IBasePackage;
  student_exam?: any;
  is_shuffle_questions?: boolean;
  is_shuffle_answers?: boolean;
}

export interface ILMSMuridUjianListResponseData {
  id?: number;
  id_relation?: number;
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
  service?: IBaseService;
  subject?: IBaseSubject;
  class?: IBaseRombelClassSchool;
  package?: IBasePackage;
  student_exam?: StudentExam[];
  time_start?: string;
  time_finish?: string;
  type?: string;
}

export interface StudentExam {
  id?: number;
  user_id?: number;
  school_exam_schedule_id?: number;
  status?: string;
  start_at?: string;
  exam_history?: ExamHistory;
}

export interface ExamHistory {
  id?: number;
  user_id?: number;
  student_exam_id?: number;
  duration?: string;
  created_at?: string;
  user?: SchoolExam;
  school_exam?: SchoolExam;
  point?: number;
}

export interface SchoolExam {}

export interface Subject {
  id?: number;
  class_id?: number;
  curriculum_id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  coin_default?: number;
  module_type?: string;
}

export interface ICekPRProjectTugasResponseData {
  _id?: string;
  total_question?: number;
  total_pilihan_ganda?: number;
  total_uraian?: number;
}

export interface IAnswerSingleQuestionPRProjectTugasPayload {
  uuid: string;
  media_id: string;
  answer: string;
}

export interface IAnswerSubmitTaskPRProjectTugasPayload {
  task_id: number;
  media_id: string;
}

export interface IDetailProgressQuestionPRProjectTugasResponseData {
  number_not_yet?: number[] | null;
  number_finish?: number[] | null;
}

export interface ILKSHistoryListFilter {
  search?: string;
  limit?: number;
  page?: number;
  subject_id?: any[];
  rombel_id?: any;
  chapter_id?: any[];
}

export interface ILKSHistoryListResponseData {
  rombel_id?: number;
  rombel?: string;
  chapter_id?: number;
  chapter?: string;
  subject_id?: number;
  subject?: string;
  average?: number;
  total_finish?: string;
}

export interface IDetailLKSResponseData {
  rombel_id?: number;
  rombel?: string;
  chapter_id?: number;
  chapter?: string;
  subject_id?: number;
  subject?: string;
  time_start?: string;
  time_finish?: string;
  time_correction?: string;
  instructions?: string;
  total_finish?: string;
  student?: ILKSStudent[];
}

export interface ILKSStudent {
  id?: number;
  user_id?: number;
  full_name?: string;
  avatar?: string;
  path_url?: string;
  time_finish?: string;
  point?: number;
  status?: string;
}
export interface ILKSReportResponseData {
  user_id?: number;
  subject_id?: number;
  total_lks?: number;
  kkm?: number;
  total_avg?: number;
  label_avg?: 'Di Atas KKM' | 'Di Bawah KKM' | 'KKM Belum Di Atur';
  avg_tertinggi?: AvgGrade[];
  avg_terendah?: AvgGrade[];
}

export interface AvgGrade {
  no?: number;
  subject_id?: number;
  subject_name?: string;
  chapter_id?: number;
  chapter_name?: string;
  poin?: number;
}

export interface ILKSSummaryReportResponseData {
  user_id?: number;
  total_lks?: number;
  total_completed_lks?: number;
  total_uncompleted_lks?: number;
  avg_tertinggi?: AvgGrade[];
  avg_terendah?: AvgGrade[];
}

export interface IHistoryLKSReportResponseData {
  subject_id?: number;
  subject_name?: string;
  chapter_id?: number;
  chapter_name?: string;
  message?: string;
  list?: ListGrade[];
}

export interface ListGrade {
  id?: number;
  created_at?: string;
  name?: string;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  duration?: string;
  point?: number;
  finished?: boolean;
}

export interface ILMSUjianAnswerSingleQuestionPayload {
  answer?: {
    question_id?: number;
    question_options_id?: number | null;
    question_options_complex_id?: any[] | null;
    user_input?: string;
    status?: string;
  }[];
}

export interface ILMSUjianSingleQuestionResponseData {
  total_question?: number;
  total_answered?: number;
  question?: IBaseQuestionDetail;
  next?: string;
  prev?: string;
  answer?: ILMSUjianSingleQuestionAnswer;
  user_input?: string;
}

export interface ILMSUjianSingleQuestionAnswer {
  user_input?: string;
  selected_options?: number;
  selected_options_complex?: any[];
  status?: string;
}

export interface ILMSUjianStartResponseData {
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
  service?: IBaseService;
  subject?: IBaseSubject;
  package?: IBasePackage;
  student_exam?: StudentExam[];
  teacher_token?: string;
  room?: string;
  is_active_proctoring?: boolean;
  is_display_result_exam?: boolean;
  start_exam_button?: boolean;
}

export interface StudentExam {
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

export interface ILMSUjianSubmitResponseData {
  id?: number;
  user_id?: number;
  student_exam_id?: number;
  duration?: string;
  created_at?: string;
  student_answer?: StudentAnswer[];
  user?: SchoolExam;
  school_exam?: SchoolExam;

  //kebutuhan dari kerjakan ujian murid
  is_essay?: boolean;
  correct?: number;
  wroing?: number; //typo from backend (delsoon)
  wrong?: number;
  point?: number;
  passed?: number;
}

export interface ISummaryLMSUjianResponseData {
  answers?: {
    question_id?: number;
    status?: string;
    orders?: number;
    last_access?: boolean;
  }[];
}

export interface IAnsweredLMSUjianResponseData {
  order?: number;
  answered?: boolean;
}

export interface IScoredLMSUjianResponseData {
  order?: number;
  scored?: boolean;
}

export interface ISubmitLMSUjianViolationPayload {
  student_exam_id: number;
  violation: 'minimize_app' | 'open_multi_window' | 'off_camera';
}

export interface SchoolExam {}

export type IGetLMSStudentExamQuestionStartCheckResponse =
  IBaseResponseData<IGetLMSStudentExamQuestionStartCheckResponseData>;
export type IStoreUjianResponse = IBaseResponseData<IStoreUjianResponseData>;
export type IListScheduledAndNeedToBeCheckResponse = IBaseResponseData<
  IListScheduledAndNeedToBeCheckResponseData[]
>;
export type ITeacherClassSubjectResponse = IBaseResponseData<
  ITeacherClassSubjectResponseData[]
>;
export type IRombelListClassResponse = IBaseResponseData<
  IRombelListClassResponseData[]
>;
export type IListChapterBySubjectResponse = IBaseResponseData<
  IListChapterBySubjectResponseData[]
>;
export type IListPaketUjianByChapterResponse = IBaseResponseData<
  IListPaketUjianByChapterResponseData[]
>;
export type IDetailPaketSoalUjianListResponse =
  IBaseResponseData<IDetailPaketSoalUjianListResponseData>;
export type IDetailSoalResponse = IBaseResponseData<IDetailSoalResponseData>;
export type IListBankSoalResponse = IBaseResponseData<
  IListBankSoalResponseData[]
>;
export type IListSubjectByCurriculumAndClassResponse = IBaseResponseData<
  IListSubjectByCurriculumAndClassResponseData[]
>;
export type IListRombelUserResponse =
  IBaseResponseData<IRombelUserResponseData>;
export type IDetailUjianResponse = IBaseResponseData<IDetailUjianResponseData>;
export type ILMSMuridUjianListResponse = IBaseResponseData<
  ILMSMuridUjianListResponseData[]
>;
export type ICekPRProjectTugasResponse =
  IBaseResponseData<ICekPRProjectTugasResponseData>;
export type IStartPRProjectTugasResponse =
  IBaseResponseData<IStartPRProjectTugasResponseData>;
export type IDetailProgressQuestionPRProjectTugasResponse =
  IBaseResponseData<IDetailProgressQuestionPRProjectTugasResponseData>;
export type ILKSHistoryListResponse = IBaseResponseData<
  ILKSHistoryListResponseData[]
>;
export type IDetailLKSResponse = IBaseResponseData<IDetailLKSResponseData>;
export type ILKSReportResponse = IBaseResponseData<ILKSReportResponseData>;
export type IHistoryLKSReportResponse = IBaseResponseData<
  IHistoryLKSReportResponseData[]
>;
export type ILKSSummaryReportResponse =
  IBaseResponseData<ILKSSummaryReportResponseData>;
export type ILMSUjianSingleQuestionResponse =
  IBaseResponseData<ILMSUjianSingleQuestionResponseData>;
export type ILMSUjianStartResponse =
  IBaseResponseData<ILMSUjianStartResponseData>;
export type ILMSUjianSubmitResponse =
  IBaseResponseData<ILMSUjianSubmitResponseData>;
export type ISummaryLMSUjianResponse =
  IBaseResponseData<ISummaryLMSUjianResponseData>;
export type IAnsweredLMSUjianResponse = IBaseResponseData<
  IAnsweredLMSUjianResponseData[]
>;
