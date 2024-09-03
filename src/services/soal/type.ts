export interface ISoalAllQuestionPackageResponseData {
  id?: number;
  name?: string;
  description?: string;
  instructions?: string;
  total_question?: number;
  question_package_service_id?: number;
  question_type_id?: number;
  class_id?: number;
  subject_id?: number;
  chapter_id?: number;
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
  question_discuss?: QuestionDiscuss;
}

export interface Option {
  id?: number;
  key?: string;
  answer?: string;
  is_correct?: boolean;
  question_id?: number;
  description?: string;
}

export interface QuestionDiscuss {
  id?: number;
  explanation?: string;
  question_id?: number;
}

export interface ISoalSubmitAnswerBody {
  question_package_id: any;
  duration: string;
  answer: Answer[] | [];
}

export interface Answer {
  question_id?: number;
  question_options_id?: number | null;
  status?: Status;
}

export enum Status {
  Answered = 'answered',
  Pass = 'pass',
}

export interface IDetailQuestionResponseData {
  answered?: boolean;
  total_question?: number;
  correct?: boolean;
  tagged?: boolean;
  question?: IBaseQuestionDetail;
  next?: string;
  prev?: string;
  quiz_timer_end?: string;
  locked?: boolean;
  answer_id?: string;
}

export interface ISoalAndAKMSubmitSingleAnswerBody {
  package_history_id: number;
  answer: {
    question_id: number;
    question_option_id: number;
    user_input?: null | string;
    status: string;
  };
}

export interface IReviewQuestionResponseData {
  id?: number;
  package_history_id?: number;
  status?: string;
  tagged?: boolean;
  question?: string;
  file_id?: string;
  user_input?: string;
  selected_option?: IBaseOption;
}

export interface ICheckUnfinishedResponseData {
  package_history_id?: number;
  question_package_id?: number;
  end_time?: Date;
  answered_count?: number;
  paused?: boolean;
  remaining_seconds?: number;
  answers?: CheckUnifinishedAnswer[];
}

export interface CheckUnifinishedAnswer {
  question_id?: number;
  order?: number;
  answered?: boolean;
  tagged?: boolean;
  correct?: boolean;
  last_accessed?: boolean;
}

export interface IDetailQuestionFilter {
  with_answer?: boolean;
}

export type ISoalAllQuestionPackageResponse =
  IBaseResponseData<ISoalAllQuestionPackageResponseData>;
export type IDetailQuestionResponse =
  IBaseResponseData<IDetailQuestionResponseData>;
export type IReviewQuestionResponse = IBaseResponseData<
  IReviewQuestionResponseData[]
>;
export type ICheckUnifinishedResponse =
  IBaseResponseData<ICheckUnfinishedResponseData>;
