export interface _IResQuizData {
  data: ISoalDataData;
  status: number;
  headers: any;
  config: any;
  request: any;
}

interface ISoalDataData {
  code: number;
  message: string;
  data: DataData;
  time: Date;
  log_id: string;
}

interface DataData {
  type: string;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  name: string;
  order: number;
  unlocked: boolean;
}

export type SoalData = {
  class_id?: any;
  description?: string;
  chapter_id?: any;
  id?: any;
  instructions?: string;
  name?: string;
  question_package_service_id?: number;
  question_type?: {
    description?: string;
    evaluation_type?: string;
    id?: any;
    question_type?: string;
  };
  question_type_id?: number;
  subject_id?: any;
  total_question?: number;
  rules?: any;
};

export type SoalDataDetail = {
  chapter_id?: any;
  class_id?: any;
  description?: string;
  chapter_name?: string;
  id?: any;
  instructions?: string;
  name?: string;
  question_package_service_id?: number;
  question_type?: {
    description?: string;
    evaluation_type?: string;
    id?: any;
    question_type?: string;
  };
  question_type_id?: number;
  subject_id?: any;
  total_question?: number;
  rules?: any;
};
