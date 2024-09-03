import {
  dismissLoading,
  isPlatformIOS,
  isSimulator,
  showLoading,
} from '@constants/functional';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import {useEffect, useState} from 'react';
import {
  Sku,
  clearTransactionIOS,
  flushFailedPurchasesCachedAsPendingAndroid,
  useIAP,
} from 'react-native-iap';
import {validateReceiptIOS} from './utils';

export const useIAPPurchase = ({skus}: IUseIAPPurchase) => {
  const [validateReceiptBody, setValidateReceiptBody] =
    useState<ISubmitPurchase>();

  const {
    currentPurchase,
    products,
    finishTransaction,
    requestPurchase,
    getProducts,
  } = useIAP();

  const fetchPurchasesProducts = async () => {
    try {
      !isPlatformIOS && flushFailedPurchasesCachedAsPendingAndroid();
      getProducts({skus: skus || ['']});
    } catch (error: any) {}
  };

  const handlingPurchase = async (sku: Sku) => {
    try {
      showLoading();
      const subs = await requestPurchase({sku});

      if (!subs || !isPlatformIOS) {
        return;
      }

      return validateReceiptIOS({
        subs,
        purchaseType: 'CONSUMABLE',
        callback: subs => {
          setValidateReceiptBody({
            transaction_id: subs?.transactionId,
          });
        },
      });
    } catch (error: any) {
      sendErrorLog({
        feature: 'iap_purchase',
        serviceName: 'iap',
        type: 'ERROR',
        message: error?.toString(),
        title: 'handlingPurchase',
      });
      dismissLoading({forceDismiss: true});
      // showErrorToast(isText(error) ? error : 'Gagal melakukan pembelian.');
    } finally {
      dismissLoading({forceDismiss: true});
    }
  };

  useEffect(() => {
    if (isSimulator) {
      return;
    }
    if (!skus) {
      return;
    }
    fetchPurchasesProducts();
    isPlatformIOS && clearTransactionIOS();
    return () => {
      setValidateReceiptBody(undefined);
    };
  }, [skus]);

  useEffect(() => {
    if (isSimulator) {
      return;
    }
    if (!currentPurchase) {
      return;
    }
    const receipt = currentPurchase.transactionReceipt;
    if (isPlatformIOS) {
      return;
    }
    if (receipt && currentPurchase.purchaseToken && !validateReceiptBody) {
      setValidateReceiptBody({
        token: currentPurchase.purchaseToken,
        packageName: currentPurchase.packageNameAndroid,
        productID: currentPurchase.productId,
        purchaseState: currentPurchase?.purchaseStateAndroid,
        receipt: receipt,
      });
    }
  }, [currentPurchase]);

  return {
    handlingPurchase,
    products,
    validateReceiptBody,
    currentPurchase,
    finishTransaction,
    setValidateReceiptBody,
  };
};
