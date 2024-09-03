interface PTNClassRecomendation {
  ID?: number;
  user_name?: string;
  subject_id?: number;
  subject_ptn?: SubjectPtn;
  time_start?: Date;
  time_finish?: Date;
  description?: string;
  lc_zoom?: null;
  module?: string;
  name?: string;
  discussion?: string;
}

interface SubjectPtn {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  icon_mobile?: string;
  icon_web?: string;
  is_active?: boolean;
  module?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface PTNBankSoalRecommendation {
  ID?: number;
  module?: string;
  subject_name?: string;
}
