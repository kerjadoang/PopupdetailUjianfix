import {
  _handleUserTypeId,
  dismissLoading,
  isPlatformIOS,
  isText,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useEffect, useState} from 'react';
import {apiGet, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useDisclosure} from '@hooks/useDisclosure';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import {useIAPPurchase} from '@components/atoms/InAppPurchaseController/useIapPurchase';
import {validatePurchaseStateAndroid} from '@components/atoms/InAppPurchaseController/utils';
import {isAxiosError} from 'axios';

const promoStatusInitState = {
  isUse: false,
  statusError: false,
  messageError: '',
  statusSuccess: false,
  messageSuccess: '',
};

const usePackageCoin = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PackageCoinScreen'>>();
  const platform = Platform.OS;
  const [packageCoin, setPackageCoin] = useState<IPackageCoin>();
  const [skus, setSkus] = useState<string[]>();

  const [showSuccessPayment, setShowSuccessPayment] = useState<boolean>(false);
  const {
    setData: setDetailPayment,
    data: detailPayment,
    isVisible: isShowDetailPayment,
    show: showDetailPayment,
    hide: hideDetailPayment,
    toggle: toggleDetailPayment,
  } = useDisclosure<ISelectedPackage, any>();
  const [methodId, setMethodId] = useState<number>();
  const [promoVoucher, setPromoVoucher] = useState<any>();
  const [promoStatus, setPromoStatus] =
    useState<typeof promoStatusInitState>(promoStatusInitState);

  const {getUser}: any = useSelector((state: RootState) => state);
  const userRole: UserType = _handleUserTypeId(
    getUser?.data?.user_type_id ?? 0,
  );
  const {
    handlingPurchase,
    validateReceiptBody,
    currentPurchase,
    finishTransaction,
    setValidateReceiptBody,
  } = useIAPPurchase({skus});

  const getPackageCoinList = async () => {
    try {
      showLoading();
      const resData = await apiGet<IPackageCoin[]>({
        url: URL_PATH.get_package_coin_list(),
      });

      const filteredPackagesWithProductID = resData?.map(item => {
        item.packages = item.packages?.filter(packageCoin =>
          isPlatformIOS
            ? !!packageCoin.apple_product_id
            : !!packageCoin.google_play_product_id,
        );
        return item;
      });

      setPackageCoin(filteredPackagesWithProductID?.[0]);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan.');
    } finally {
      dismissLoading();
    }
  };

  const getPaymentMethod = async () => {
    try {
      const resData = await apiGet({
        url: URL_PATH.get_payment_method(),
      });

      const method = resData?.filter(
        (items: any) => items?.name === platform.toUpperCase(),
      );
      setMethodId(method?.[0]?.id);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi kesalahan.');
    }
  };

  const onValidateReceipt = async (data: ISubmitPurchase) => {
    try {
      showLoading();
      const body: ISubmitPurchase = {
        ...data,
        user_id: getUser?.data?.id,
        payment_method_id: methodId,
        sub_total_price: detailPayment?.price,
        total_discount: promoVoucher?.total_discount ?? 0,
      };

      await apiPost({
        // config: {baseURL: 'https://wwf7qqmz-8001.asse.devtunnels.ms'},
        url: isPlatformIOS
          ? URL_PATH.post_ios_payment_receipt()
          : URL_PATH.post_android_payment_check_receipt_purchase(),
        body: body,
        sendLog: {type: ['ERROR']},
      });

      // clearState();
      if (isPlatformIOS) {
        setShowSuccessPayment(true);
        return;
      }

      if (currentPurchase) {
        validatePurchaseStateAndroid({
          currentPurchase: currentPurchase,
          onPending: () => {
            showSuccessToast(
              'Pembayaran sedang diproses mohon tunggu beberapa saat',
              {visibilityTime: 6000},
            );
            navigation.pop();
          },
          onPurchased: () => {
            setShowSuccessPayment(true);
          },
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return;
      }
      sendErrorLog({
        feature: 'iap_purchase',
        serviceName: 'iap',
        type: 'ERROR',
        message: error?.toString(),
        title: 'onValidateReceipt',
        screenName: 'usePackageCoin',
      });
      showErrorToast('Gagal melakukan pembayaran.');
    } finally {
      currentPurchase &&
        finishTransaction({
          purchase: currentPurchase,
          isConsumable: true,
        }).catch(() => {});

      setValidateReceiptBody(undefined);
      dismissLoading({forceDismiss: true});
    }
  };

  const checkDiscount = async (code: string) => {
    try {
      showLoading();
      const body = {
        code: code.toUpperCase(),
        package: [
          {
            id: detailPayment?.id,
            name: packageCoin?.name,
          },
        ],
      };

      const resData = await apiPost({
        url: URL_PATH.post_check_discount(),
        body,
      });

      setPromoVoucher(resData);

      setPromoStatus({
        isUse: true,
        statusError: false,
        messageError: '',
        statusSuccess: true,
        messageSuccess: 'Kode Promo berhasil digunakan.',
      });
    } catch (error) {
      setPromoStatus({
        isUse: true,
        statusError: true,
        messageError: 'Kode Promo salah atau sudah tidak berlaku.',
        statusSuccess: false,
        messageSuccess: '',
      });
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    getPackageCoinList();
    getPaymentMethod();
    return () => {
      // clearState();
    };
  }, []);

  useEffect(() => {
    if (!validateReceiptBody) {
      return;
    }
    onValidateReceipt(validateReceiptBody);
  }, [validateReceiptBody]);

  useEffect(() => {
    if (skus) {
      return;
    }
    const sku = isPlatformIOS
      ? detailPayment?.apple_product_id
      : detailPayment?.google_play_product_id || '';
    setSkus(!sku ? undefined : [sku]);
  }, [detailPayment]);

  const resetPromo = () => {
    setPromoVoucher(undefined);
    setPromoStatus(promoStatusInitState);
  };

  return {
    navigation,
    userRole,
    setDetailPayment,
    detailPayment,
    isShowDetailPayment,
    showDetailPayment,
    hideDetailPayment,
    showSuccessPayment,
    setShowSuccessPayment,
    packageCoin,
    checkDiscount,
    promoStatus,
    setPromoStatus,
    promoVoucher,
    setPromoVoucher,
    handlingPurchase,
    toggleDetailPayment,
    resetPromo,
  };
};
export default usePackageCoin;
