interface IAnnouncementDetail {
  id?: number;
  title?: string;
  description?: string;
  time_start?: Date;
  time_end?: Date;
  announce_to?: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  path_url?: string;
  announcement_user_type?: AnnouncementUserType[];
}

interface AnnouncementUserType {
  id?: number;
  announcement_id?: number;
  user_type_id?: number;
  created_at?: Date;
  updated_at?: Date;
  user_type?: UserType;
  announcement_class?: AnnouncementClass[];
  total_class?: number;
}

interface AnnouncementClass {
  id?: number;
  announcement_user_id?: number;
  class_id?: number;
  created_at?: Date;
  updated_at?: Date;
  class?: Class;
}

interface Class {
  id?: number;
  degree_id?: number;
  name?: string;
  order?: number;
  curriculum_id?: number;
}

interface UserType {
  id?: number;
  name?: string;
  icon_mobile?: string;
  icon_web?: string;
  description?: string;
  display?: boolean;
}

type IAnnouncementDetailState = {
  loading: boolean;
  data: IAnnouncementDetail;
};
