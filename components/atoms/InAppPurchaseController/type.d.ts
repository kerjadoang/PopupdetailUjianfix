interface IReqSubmitPurchase {
  transaction_id?: string;
  token?: string;
  productID?: string;
  purchaseState?: number;
  receipt?: string;
  packageName?: string;
  class_id?: number;
  user_id?: number;
  payment_method_id?: number;
  sub_total_price?: number;
  parent_id?: number;
  total_discount?: number;
}

type ISubmitPurchase = IReqSubmitPurchase;

interface IUseIAPSubscription {
  skus: string[] | undefined;
}

interface IUseIAPPurchase {
  skus: string[] | undefined;
}
