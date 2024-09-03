interface IPackageCatalog {
  id?: number;
  name?: string;
  image?: string;
  image_web_corp?: string;
  description?: string;
  package_category_url?: string;
  type?: string;
  is_coin_package?: boolean;
  periode?: string;
  package?: Package;
}

interface Package {
  id?: number;
  name?: string;
  image?: string;
  mat_code?: string;
  type?: string;
  category_id?: number;
  duration?: number;
  price?: number;
  price_after_discount?: null;
  total_coin?: number;
  monthly_coin?: number;
  periode_start?: null;
  periode_end?: null;
  expired_reminder?: number;
  created_at?: null;
  updated_at?: null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  apple_product_id?: string;
  google_play_product_id?: string;
  category?: Category;
  package_class?: null;
  package_feature?: null;
  creator?: null;
  updater?: null;
  deleter?: null;
  fee_price?: number;
}

interface Category {
  id?: number;
  name?: string;
  image?: string;
  image_web_corp?: string;
  icon_web?: string;
  icon_mobile?: string;
  description?: string;
  package_category_url?: string;
  type?: string;
  is_coin_package?: null;
  is_combo?: null;
  created_at?: null;
  updated_at?: null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  service?: null;
  creator?: null;
  updater?: null;
  deleter?: null;
}
