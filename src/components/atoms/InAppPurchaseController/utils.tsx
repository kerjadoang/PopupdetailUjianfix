import {
  ProductPurchase,
  PurchaseStateAndroid,
  getAvailablePurchases,
  validateReceiptIos,
} from 'react-native-iap';
import {
  IAndroidTransactionReceipt,
  ISubmitPurchaseToBackend,
  IValidatePurchaseStateAndroid,
  IValidateReceiptIOS,
} from './utilsType';
import {Storage} from '@constants/storage';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import {
  dismissLoading,
  isPlatformIOS,
  isText,
  showErrorToast,
  showSuccessToast,
} from '@constants/functional';
import {apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {StorageKeys} from '@constants/keys';

export const validatePurchaseStateAndroid = ({
  currentPurchase,
  onCancelled,
  onPending,
  onPurchased,
}: IValidatePurchaseStateAndroid<IAndroidTransactionReceipt>) => {
  const receipt: IAndroidTransactionReceipt = JSON.parse(
    currentPurchase.transactionReceipt,
  );
  if (
    currentPurchase.purchaseStateAndroid ==
    PurchaseStateAndroid.UNSPECIFIED_STATE
  ) {
    return onCancelled?.(receipt);
  }

  if (currentPurchase.purchaseStateAndroid == PurchaseStateAndroid.PENDING) {
    return onPending?.(receipt);
  }

  onPurchased?.(receipt);
};

export const validateReceiptIOS = async ({
  subs,
  callback,
  purchaseType,
}: IValidateReceiptIOS) => {
  try {
    const receiptBody = {
      'receipt-data': subs.transactionReceipt,
      password: StorageKeys.ios_shared_keys,
    };

    const result = await validateReceiptIos({
      receiptBody: receiptBody,
      // isTest: true, //!CHANGE THIS IN PRODUCTION
    });

    if (result?.status === 0) {
      callback?.(subs);
    }
  } catch (error) {
    sendErrorLog({
      feature:
        purchaseType === 'SUBSCRIPTION' ? 'iap_subscription' : 'iap_purchase',
      serviceName: 'iap',
      type: 'ERROR',
      message: error?.toString(),
      title: 'validateReceipt',
    });
    dismissLoading();
    showErrorToast(isText(error) ? error : 'Terjadi kesalahan.');
  } finally {
    // dismissLoading();
  }
};

export const getAvailablePurchasesAndroid = async () => {
  try {
    await getAvailablePurchases();
  } catch (error) {}
};

export const filterPendingPurchasesAndroid = (purchases: ProductPurchase[]) => {
  return purchases.filter(
    purchase =>
      purchase.purchaseStateAndroid === PurchaseStateAndroid.PURCHASED &&
      !purchase.isAcknowledgedAndroid,
  );
};

export const submitReceiptToBackendIos = async ({
  submitPurchasePayload,
}: ISubmitPurchaseToBackend) => {
  try {
    await apiPost({
      // config: {baseURL: 'https://wwf7qqmz-8001.asse.devtunnels.ms'},
      url:
        submitPurchasePayload?.purchaseType === 'CONSUMABLE'
          ? URL_PATH.post_android_payment_check_receipt_purchase()
          : URL_PATH.post_android_payment_check_receipt_subscription(),
      body: submitPurchasePayload,
    });
    Storage.remove({key: 'iapTransactionKeys'});
  } catch (error) {}
};

export const submitReceiptToBackendAndroid = async ({
  currentPurchase,
  submitPurchasePayload,
}: ISubmitPurchaseToBackend) => {
  try {
    if (
      currentPurchase.purchaseStateAndroid ==
      PurchaseStateAndroid.UNSPECIFIED_STATE
    ) {
      return;
    }

    if (currentPurchase.purchaseStateAndroid == PurchaseStateAndroid.PENDING) {
      showSuccessToast(
        'Pembayaran anda sedang diproses mohon tunggu beberapa saat',
      );
      return;
    }

    await apiPost({
      // config: {baseURL: 'https://wwf7qqmz-8001.asse.devtunnels.ms'},
      url:
        submitPurchasePayload?.purchaseType === 'CONSUMABLE'
          ? URL_PATH.post_android_payment_check_receipt_purchase()
          : URL_PATH.post_android_payment_check_receipt_subscription(),
      body: submitPurchasePayload,
    });

    Storage.remove({key: 'iapTransactionKeys'});
  } catch (error) {}
};

export const submitReceiptToBackend = async (
  props: ISubmitPurchaseToBackend,
) => {
  try {
    const {currentPurchase} = props;

    const res = await Storage.getFromStorage<ISubmitPurchase>({
      key: 'iapTransactionKeys',
    });

    const submitPurchasePayload: ISubmitPurchase = {
      token: currentPurchase.purchaseToken,
      packageName: currentPurchase.packageNameAndroid,
      productID: currentPurchase.productId,
      purchaseState: currentPurchase?.purchaseStateAndroid,
      receipt: currentPurchase.transactionReceipt,
      ...res?.data,
    };

    const mappedData: ISubmitPurchaseToBackend = {
      submitPurchasePayload: submitPurchasePayload,
      ...props,
    };

    if (isPlatformIOS) {
      return submitReceiptToBackendIos(mappedData);
    }

    return submitReceiptToBackendAndroid(mappedData);
  } catch (error: any) {
    sendErrorLog({
      message: error.toString(),
      feature: 'iap_purchase',
      serviceName: 'iap',
      type: 'ERROR',
      screenName: 'InAppPurchaseController',
      title: 'submitReceiptToBackend',
    });
  }
};
