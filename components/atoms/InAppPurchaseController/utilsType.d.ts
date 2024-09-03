import {Purchase, SubscriptionPurchase} from 'react-native-iap';

type IValidatePurchaseState<T = any> = {
  onPurchased?: CallBackWithParams<void, T>;
  onPending?: CallBackWithParams<void, T>;
  onCancelled?: CallBackWithParams<void, T>;
};
type IValidatePurchaseStateAndroid<T = any> = {
  currentPurchase: Purchase;
} & IValidatePurchaseState<T>;

type IPurchaseType = 'SUBSCRIPTION' | 'CONSUMABLE';

interface IAndroidTransactionReceipt {
  packageName?: string;
  productID?: string;
  purchaseState?: number;
  token?: string;
}

type ISubmitPurchasePayload = {
  purchaseType?: IPurchaseType;
} & ISubmitPurchase;

interface ISubmitPurchaseToBackend {
  currentPurchase: Purchase;
  submitPurchasePayload?: ISubmitPurchasePayload;
}

type ISubmitPurchaseToBackendAndroid = {} & ISubmitPurchaseToBackend;

type ISubmitPurchaseToBackendIOS = {} & ISubmitPurchaseToBackend;

type IValidateReceiptIOS = {
  subs: SubscriptionPurchase | Purchase;
  callback?: CallBackWithParams<void, any>;
  purchaseType: IPurchaseType;
};
