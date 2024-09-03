// BANK SOAL SUBJECT
export interface IBankSoalSubjectData {
  tps: TpsSubjectList[];
  saintek: SaintekSubjectList[];
  soshum: SoshumSubjectList[];
}

export interface TpsSubjectList {
  id: number;
  name: string;
  total_question: number;
}

export interface SaintekSubjectList {
  id: number;
  name: string;
  total_question: number;
}

export interface SoshumSubjectList {
  id: number;
  name: string;
  total_question: number;
}

// BANK SOAL QUESTION
export interface IBankSoalQuestionData {
  id: number;
  question: string;
  instructions: string;
  marks: number;
  module: string;
  subject_id: number;
  file_id: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  question_options: IBankSoalQuestionOptionData[];
}

export interface IBankSoalQuestionOptionData {
  id: number;
  key: string;
  answer: string;
  is_correct?: boolean;
  file_id: string;
  question_id: number;
  created_at: string;
  updated_at: string;
}

// BANK SOAL SUBMIT PRACTICE
export interface IBankSoalSubmitPracticeData {
  id: number;
  practice_user_history_id: number;
  module: string;
  subject: string;
  correct_answer: number;
  wrong_answer: number;
  point: number;
  duration: number;
}

export interface IDiagnoticTestQuestion {
  question_group: string;
  question_gender: string;
}

export type IStaryTryoutCondition = 'start' | 'change_question' | 'paused';

export interface IStartTryoutPerSubjectPayload {
  tryout_user_history_id: number;
  subject_id: number;
  condition: IStaryTryoutCondition;
}

export interface IAnswerPerTryoutQuestionPayload {
  tryout_user_history_id: number;
  question_id: number;
  question_option_id: number;
}

export interface ISubmitTryoutPayload {
  tryout_id: number;
  tryout_user_history_id: number;
  subject: Subject[];
}

export interface Subject {
  id: number;
  name: string;
}

export interface ITryoutQuestionResponseData {
  total_question?: number;
  question?: Question;
  question_answer?: IBaseQuestion;
  next?: string;
  prev?: string;
}

export interface Question {
  id?: number;
  question?: string;
  module?: string;
  subject_id?: number;
  file_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  path_url?: string;
  question_options?: IBaseOption[];
}
export interface IStartTryoutPersubjectResponseData {
  tryout_user_history_id?: number;
  tryout_id?: number;
  subject_id?: number;
  time_start?: string;
  time_end?: string;
  remain_duration: number;
  status?: string;
  answers?: AnswerPersubject[];
}

export interface AnswerPersubject {
  question_id?: number;
  order?: number;
  answered?: boolean;
  last_accessed?: boolean;
}

export interface IListTryoutProgressResponseData {
  tps: ProgressData[];
  saintek: ProgressData[];
  soshum: ProgressData[];
}

export interface ProgressData {
  total_question: number;
  total_duration: number;
  subject: SubjectProgress[];
}

export interface SubjectProgress {
  id?: number;
  name?: string;
  icon_web?: string;
  icon_mobile?: string;
  time_start?: Date;
  description?: string;
  time_end?: Date;
  total_question?: number;
  total_question_finish?: number;
  total_question_unfinish?: number;
  total_duration?: number;
  status?: string;
  path_url?: string;
  is_locked?: boolean;
}

export type ITryoutQuestionResponse =
  IBaseResponseData<ITryoutQuestionResponseData>;
export type IStartTryoutPersubjectResponse =
  IBaseResponseData<IStartTryoutPersubjectResponseData>;
export type IListTryoutProgressResponse =
  IBaseResponseData<IListTryoutProgressResponseData>;
