export type ILMSMateriSekolahMateriData = {
  data?: Data;
  status?: number;
  headers?: any;
  config?: any;
  request?: any;
};

export type IMaterialContentData = {
  id?: any;
  name?: string;
  description?: string;
  type?: string;
  chapter_material?: ChapterMaterial[];
  chapter_id?: any;
  learning_method_id?: any;
  title?: string;
  orders?: number;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  is_done?: boolean;
  learning_method?: LearningMethod;
  user_progress?: any;
  level?: any;
  user_history?: [
    {
      id?: number;
      user_id?: number;
      question_package_id?: number;
      percentage?: number;
      point?: number;
      xp_gained?: number;
      created_at?: string;
      user?: {
        coin?: number;
      };
      question_package?: {};
      question_package_service?: {};
    },
  ];
  service_content?: ServiceContent[];
  pg_progress?: number;
};

export type IChapterMaterialData = {
  id?: any;
  chapter_id?: any;
  learning_method_id?: any;
  title?: string;
  description?: string;
  orders?: number;
  duration_formatted?: any;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  is_done?: boolean;
};

type ChapterMaterial = {
  id?: any;
  chapter_id?: any;
  learning_method_id?: any;
  title?: string;
  description?: string;
  orders?: number;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  is_done?: boolean;
};

type Data = {
  code?: number;
  message?: string;
  data?: Datum[];
  time?: Date;
  log_id?: string;
};

type Datum = {
  id?: number;
  chapter_id?: number;
  learning_method_id?: number;
  school_id?: number;
  title?: string;
  description?: string;
  orders?: number;
  file_id?: string;
  is_active?: boolean;
  learning_method?: LearningMethod;
};

type LearningMethod = {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
};

type ServiceContent = {
  id?: number;
  name?: string;
  question_service_type_id?: number;
  icon?: string;
  user_progress?: UserProgress;
};

type UserProgress = {
  id?: number;
  user_id?: number;
  chapter_id?: number;
  is_done?: boolean;
  xp_gained?: number;
  question_service_type_content_id?: number;
  question_service_type_id?: number;
};
