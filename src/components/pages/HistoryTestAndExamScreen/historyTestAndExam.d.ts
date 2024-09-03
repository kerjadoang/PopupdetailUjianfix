type ISOALReportPackage = {
  id?: number;
  subject_id?: number;
  name?: string;
  is_active?: boolean;
  order?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  is_live_teaching?: boolean;
  package?: IPackage[];
  user_history?: UserHistory[];
};

type IPackage = {
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
  multiple_choice_count?: number;
  question_package_paper_id?: string;
  created_at?: Date;
  updated_at?: Date;
  user_history?: UserHistory[];
};

type UserHistory = {
  id?: number;
  attempt?: string;
  user_id?: number;
  question_package_id?: number;
  question_package_service_id?: number;
  point?: number;
  xp_gained?: number;
  duration?: string;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  created_at?: Date;
  finished?: boolean;
  end_time?: Date;
  user?: User;
  question_package?: QuestionPackage;
  question_package_service?: QuestionPackageService;
  user_history?: UserHistory[];
};

type QuestionPackage = {
  total_question?: number;
  question_package_paper_id?: string;
};

type QuestionPackageService = {};

type User = {
  password?: string;
  active?: boolean;
  deleted_at?: null;
  coin?: number;
  class_profile?: number;
  disable_update_profile?: boolean;
  referral_code?: string;
  has_xp_rank?: boolean;
};
