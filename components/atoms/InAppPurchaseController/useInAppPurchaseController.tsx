import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {sendErrorLog, sendLog} from '@services/firebase/firebaseDatabase';
import {
  Purchase,
  PurchaseError,
  SubscriptionPurchase,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import {validatePurchaseStateAndroid} from './utils';
import {isPlatformIOS, isSimulator} from '@constants/functional';

export const useInAppPurchaseController = () => {
  const initIAP = async () => {
    try {
      await initConnection();
    } catch (error) {}
  };

  const handlePurchaseUpdatedListener = (
    purchase: SubscriptionPurchase | Purchase,
  ) => {
    if (isPlatformIOS) {
      return;
    }
    validatePurchaseStateAndroid({
      currentPurchase: purchase,
      onPending: data => {
        sendLog({
          feature: 'iap_info',
          serviceName: 'iap',
          type: 'INFO',
          data: data,
          screenName: 'InAppPurchaseController',
          title: 'useInAppPurchaseController',
        });
      },
      onPurchased: () => {},
    });
  };

  const handlePurchaseErrorListener = (error: PurchaseError) => {
    sendErrorLog({
      feature: 'iap_error',
      serviceName: 'iap',
      type: 'ERROR',
      screenName: 'InAppPurchaseController',
      title: 'handlePurchaseErrorListener',
      message: JSON.stringify(error),
    });
  };

  useAsyncEffect(async () => {
    if (isSimulator) {
      return;
    }

    await initIAP();
    const purchaseUpdate = purchaseUpdatedListener(
      handlePurchaseUpdatedListener,
    );
    const purchaseError = purchaseErrorListener(handlePurchaseErrorListener);

    return () => {
      purchaseUpdate.remove();
      purchaseError.remove();
    };
  }, []);
  return {};
};
