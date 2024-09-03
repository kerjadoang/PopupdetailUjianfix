interface IUseIAPPurchase {
  skus: string[] | undefined;
}
interface Packages {
  id?: number;
  name?: string;
  image?: string;
  mat_code?: string;
  type?: string;
  category_id?: number;
  duration?: number;
  price?: number;
  price_after_discount?: number;
  total_coin?: number;
  monthly_coin?: number;
  periode_start?: null;
  periode_end?: null;
  expired_reminder?: number;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  apple_product_id?: string;
  google_play_product_id?: string;
  category?: IPackageCoin;
  package_class?: null;
  package_feature?: null;
  creator?: null;
  updater?: null;
  deleter?: null;
}

interface IPackageCoin {
  id?: number;
  name?: string;
  image?: string;
  image_web_corp?: string;
  icon_web?: string;
  icon_mobile?: string;
  description?: string;
  package_category_url?: string;
  type?: string;
  is_coin_package?: boolean | null;
  is_combo?: boolean | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  service?: null;
  packages?: Packages[];
  creator?: null;
  updater?: null;
  deleter?: null;
}
