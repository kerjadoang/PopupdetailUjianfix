interface ISelectedPackage {
  id?: number;
  category_id?: number;
  duration?: number;
  price?: number;
  price_after_discount?: number;
  total_coin?: number;
  discount_percentage?: number;
  discount_amount?: number;
  class_available?: string;
  category?: Category;
  discount_package?: any[];
  fee_price?: number;
  package_class?: PackageClass[];
  package_feature?: PackageFeature[];
  apple_product_id?: string;
  google_play_product_id?: string;
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
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

interface PackageClass {
  package_id?: number;
  class_id?: number;
  class?: Class;
  subject?: string;
}

interface PackageFeature {
  id?: number;
  package_id?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface IDetailPackage {
  id?: number;
  name?: string;
  image?: string;
  icon_web?: string;
  icon_mobile?: string;
  description?: string;
  package_category_url?: string;
  type?: string;
  is_coin_package?: boolean;
  service?: ServiceElement[];
  package?: Package[];
  path_url?: string;
}

interface Package {
  id?: number;
  category_id?: number;
  duration?: number;
  price?: number;
  price_after_discount?: number;
  total_coin?: number;
  discount_percentage?: number;
  discount_amount?: number;
  class_available?: string;
  apple_product_id?: string;
  google_play_product_id?: string;
  category?: Category;
  discount_package?: any[];
  package_class?: PackageClass[];
  package_feature?: PackageFeature[];
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

interface Class {
  id?: number;
  name?: string;
}

interface ServiceElement {
  package_category_id?: number;
  service_id?: number;
  package_category?: null;
  service?: ServiceService;
}

interface ServiceService {
  id?: number;
  name?: string;
  image?: string;
  is_visible?: boolean;
  mobile_reference?: string;
  web_reference?: string;
  slug?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  creator?: null;
  updater?: null;
  deleter?: null;
}

interface IPromoVoucher {
  id?: number;
  name?: string;
  code?: string;
  discount_amount?: number;
  total_price?: number;
  fee_price?: number;
  total_discount?: number;
  price_after_discount?: number;
  package?: Package[];
}

interface Package {
  id?: number;
  name?: string;
  price?: number;
  price_after_discount?: number;
  apple_product_id?: string;
  google_play_product_id?: string;
  discount?: null;
}
interface IClass {
  id?: number;
  degree_id?: number;
  major_id?: number;
  name?: string;
  order?: number;
  curriculum_id?: number;
}
