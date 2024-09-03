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

export const useIAPSubscription = ({skus}: IUseIAPSubscription) => {
  const [validateReceiptBody, setValidateReceiptBody] =
    useState<ISubmitPurchase>();

  const {
    subscriptions,
    getSubscriptions,
    currentPurchase,
    products,
    finishTransaction,
    requestSubscription,
    getProducts,
  } = useIAP();

  const getOffersProduct = (sku: Sku) => {
    const subscrition = subscriptions.find(i => i.productId === sku);
    const offers = subscrition?.subscriptionOfferDetails;
    if (!offers) {
      return undefined;
    }

    return offers[0].offerToken;
  };

  const fetchSubscriptionProducts = async () => {
    try {
      !isPlatformIOS && flushFailedPurchasesCachedAsPendingAndroid();
      getSubscriptions({skus: skus || ['']});
      getProducts({skus: skus || ['']});
    } catch (error: any) {}
  };

  const handlingPurchase = async (sku: Sku) => {
    try {
      let offerToken = !isPlatformIOS && getOffersProduct(sku);

      showLoading();
      const subs = await requestSubscription({
        sku,
        ...(!!offerToken && {subscriptionOffers: [{sku, offerToken}]}),
      });
      if (!subs || !isPlatformIOS) {
        return;
      }

      return validateReceiptIOS({
        subs,
        purchaseType: 'SUBSCRIPTION',
        callback: subs => {
          setValidateReceiptBody({
            transaction_id: subs?.transactionId,
          });
        },
      });
    } catch (error) {
      sendErrorLog({
        feature: 'iap_subscription',
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
    fetchSubscriptionProducts();
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
        purchaseState: currentPurchase.purchaseStateAndroid,
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
