interface IKpRegularSearchResponseData {
  total?: number;
  learn?: KpRegularSearchMaterial[];
  practice?: KpRegularSearchMaterial[];
  test?: KpRegularSearchMaterial[];
  school_material?: any;
}

interface KpRegularSearchMaterial {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  orders?: number;
  chapterMaterialData?: ChapterMaterial;
  chapter_material?: ChapterMaterial[];
  chapter?: any;
}

interface ChapterMaterial {
  id?: number;
  chapter_id?: number;
  learning_method_id?: number;
  title?: string;
  description?: string;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  created_at?: null;
  updated_at?: null;
  deleted_at?: null;
  chapter?: Chapter;
  feature?: Feature[];
}

interface Chapter {
  id?: number;
  name?: string;
  created_at?: null;
  updated_at?: null;
  deleted_at?: null;
}

interface MappedKpRegularSearchMaterial {
  chapter_id?: number;
  title?: string;
  description?: string;
  file_id?: string;
  is_active?: boolean;
  service?: string;
  created_at?: null;
  updated_at?: null;
  deleted_at?: null;
  chapter?: Chapter;
  feature?: Feature[];
}

interface Feature {
  id?: number;
  name?: Name;
  description?: string;
  type?: string;
  orders?: number;
  chapterMaterialData?: ChapterMaterial;
}
