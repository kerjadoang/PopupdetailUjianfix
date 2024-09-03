export interface IDeleteMyNoteParam {
  note_id: any;
}

export type CreateNoteBody = {
  notes: string;
  chapter_material_id?: number;
  file_path?: string | null;
  path_url?: string | null;
  project_id?: any;
  file?: any;
};

export interface IChapterPGQuestionResponseData {
  id?: number;
  instructions?: string;
  question?: string;
  marks?: number;
  file_id?: string;
  chapter_id?: number;
  subject_id?: number;
  class_id?: number;
  question_service_type_id?: number;
  question_type_id?: number;
  options?: Option[];
  question_level_id?: number;
  question_discuss?: QuestionDiscuss;
  user_progress?: UserProgress[];
}

export interface Option {
  id?: number;
  key?: string;
  answer?: string;
  description?: string;
  is_correct?: boolean;
  question_id?: number;
}

export interface IAKMQuestionResponseData {
  id?: number;
  name?: string;
  description?: string;
  instructions?: string;
  total_question?: number;
  rules?: Rules;
  question_package_service_id?: number;
  question_type_id?: number;
  class_id?: number;
  question_type?: QuestionType;
  package_question?: PackageQuestion[];
}

export interface PackageQuestion {
  id?: number;
  question_package_id?: number;
  question_id?: number;
  orders?: number;
  question_detail?: QuestionDetail;
}

export interface QuestionDetail {
  id?: number;
  instructions?: string;
  question?: string;
  marks?: number;
  file_id?: string;
  chapter_id?: number;
  subject_id?: number;
  class_id?: number;
  question_service_type_id?: number;
  question_type_id?: number;
  question_level_id?: number;
  options?: Option[];
}

export interface QuestionType {
  id?: number;
  description?: string;
  evaluation_type?: string;
  question_type?: string;
}

export interface Rules {
  id?: number;
  rules?: string;
  max_duration?: number;
  min_point?: number;
  question_package_id?: number;
}

export interface UserProgress {
  id?: number;
  user_id?: number;
  chapter_id?: number;
  is_done?: boolean;
  question_service_type_id?: number;
}

export interface QuestionDiscuss {
  id?: number;
  explanation?: string;
  file_id?: string;
  question_id?: number;
}

export interface PracticeTypeProgressBody {
  chapter_id: number | string;
  question_service_type_id: number | string;
  is_done?: boolean;
}

export interface ITestMCQBody {
  chapter_id: number;
  question_service_type_id: number;
  question_service_type_level_id: number | null;
  test_duration: string;
  answer: Answer[];
}

export interface ITestEssayBody {
  chapter_id: number;
  question_service_type_id: number;
  question_service_type_level_id: number | null;
  test_duration: string;
  remaining_time: number;
  answer: Answer[];
}

export interface IAKMEssayBody {
  chapter_id: number;
  question_service_type_id: number;
  question_service_type_level_id: number | null;
  test_duration: string;
  answer: Answer[];
}

export interface Answer {
  question_id: number;
  question_options_id?: number | null;
  status: string;
  user_input?: string;
}

export interface IAKMMCQBody {
  question_package_id: any;
  duration: string;
  answer: Answer[];
}
export interface ISubmitAKMPGResponseData {
  id?: number;
  user_id?: number;
  question_package_id?: number;
  question_package_service_id?: number;
  point?: number;
  duration?: string;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  created_at?: Date;
  user_answer?: UserAnswer[];
  user?: QuestionPackage;
  question_package?: QuestionPackage;
  question_package_service?: QuestionPackage;
}

export interface QuestionPackage {}

export interface UserAnswer {
  id?: number;
  user_question_package_history_id?: number;
  question_id?: number;
  question_options_id?: number;
  status?: Status;
}

export enum Status {
  Answered = 'answered',
  Pass = 'pass',
}

export interface IKPTestQuestionResponseData {
  is_adaptif?: boolean;
  time_start?: number;
  duration?: number;
  questions?: IBaseQuestionDetail[];
  question_levels?: IBaseQuestionDetail[];
  adaptif_question?: {
    level_1?: IBaseQuestionDetail[];
    level_2?: IBaseQuestionDetail[];
    level_3?: IBaseQuestionDetail[];
  };
}

export interface ISubmitQuestionSinglePayload {
  chapter_id: number;
  question_service_type_id: number;
  question_service_type_level_id: number;
  test_duration?: any;
  remaining_time: number;
  answer: Answer[] | [];
}

export type IAKMQuestionResponse = IBaseResponseData<IAKMQuestionResponseData>;
export type ISubmitAKMPGResponse = IBaseResponseData<ISubmitAKMPGResponseData>;
export type IKPTestQuestionResponse =
  IBaseResponseData<IKPTestQuestionResponseData>;
