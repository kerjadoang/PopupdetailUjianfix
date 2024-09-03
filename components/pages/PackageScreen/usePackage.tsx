import {
  _handleUserTypeId,
  dismissLoading,
  isPlatformIOS,
  isStringContains,
  isText,
  rdxDispatch,
  removeEmptyProperty,
  showErrorToast,
  showLoading,
  showSuccessToast,
  sleep,
} from '@constants/functional';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {ParamList} from 'type/screen';
import {apiGet, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useNavigate} from '@hooks/useNavigate';
import useAnakSaya from '@components/organism/AnakSaya/useAnakSaya';
import {detailPackageDestroy, fetchDetailPackage} from '@redux';
import {useIAPSubscription} from '../../atoms/InAppPurchaseController/useIapSubscription';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import {validatePurchaseStateAndroid} from '@components/atoms/InAppPurchaseController/utils';
import {isAxiosError} from 'axios';
import {useQuery} from '@tanstack/react-query';

//list products

const promoStatusInitState = {
  isUse: false,
  statusError: false,
  messageError: '',
  statusSuccess: false,
  messageSuccess: '',
};

const usePackage = () => {
  const route = useRoute<RouteProp<ParamList, 'PackageScreen'>>();
  const {navigateScreen, popScreen, navigation} = useNavigate();
  const {package_id}: any = route.params;

  const {getUser}: {getUser: IGetUser} = useSelector(
    (state: RootState) => state,
  );
  const platform = Platform.OS;
  const [skus, setSkus] = useState<string[]>();
  const [promoVoucher, setPromoVoucher] = useState<IPromoVoucher>();
  const [methodId, setMethodId] = useState<number>();
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<
    ISelectedPackage | Package
  >({});
  const {data: listClass} = useQuery<IClass[]>({
    queryKey: ['listClass', selectedPackage],
    queryFn: async () => {
      const data = await apiGet({
        url: URL_PATH.get_purchase_list_class(selectedPackage.id || 0),
      });
      return data;
    },
    refetchOnMount: 'always',
  });
  const [showDetailPayment, setShowDetailPayment] = useState<boolean>(false);
  const [showSuccessPayment, setShowSuccessPayment] = useState<boolean>(false);
  const {data: detail}: {data: IDetailPackage} = useSelector(
    (state: RootState) => state.detailPackage,
  );
  // const detail = detailPackage?.data;
  const filteredPackageHaveProductId = detail.package?.filter?.(item =>
    isPlatformIOS ? !!item.apple_product_id : !!item.google_play_product_id,
  );
  const [showSelectClass, setShowSelectClass] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const userRole: UserType = _handleUserTypeId(
    getUser?.data?.user_type_id ?? 0,
  );
  const {getAllChildren, user, setUser} = useAnakSaya();
  const notPending = getAllChildren.data.filter(
    (d: any) => d.approval_status !== 'pending',
  );
  const [promoStatus, setPromoStatus] =
    useState<typeof promoStatusInitState>(promoStatusInitState);
  const isPTN = isStringContains(detail?.name || '', 'ptn');
  const isGURU = isStringContains(detail?.name || '', 'guru');

  const {
    products,
    handlingPurchase,
    validateReceiptBody,
    currentPurchase,
    setValidateReceiptBody,
    finishTransaction,
  } = useIAPSubscription({skus});

  useEffect(() => {
    if (!validateReceiptBody) {
      return;
    }
    onValidateReceipt(validateReceiptBody);
  }, [validateReceiptBody]);

  const onValidateReceipt = async (data: ISubmitPurchase) => {
    try {
      showLoading();
      const body: IReqSubmitPurchase = removeEmptyProperty({
        ...data,
        payment_method_id: methodId,
        class_id: selectedClass,
        user_id:
          userRole?.name === 'Orang tua' ? user?.user_id : getUser?.data?.id,
        sub_total_price:
          selectedPackage?.price_after_discount ?? selectedPackage?.price,
        total_discount: promoVoucher?.total_discount ?? 0,
        parent_id:
          userRole?.name === 'Orang tua' ? getUser?.data?.id : undefined,
      });
      await apiPost({
        // config: {baseURL: 'https://wwf7qqmz-8001.asse.devtunnels.ms'},
        url: isPlatformIOS
          ? URL_PATH.post_ios_payment_receipt()
          : URL_PATH.post_android_payment_check_receipt_subscription(),
        body: body,
        sendLog: {type: ['ERROR']},
      });

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
        feature: 'iap_subscription',
        serviceName: 'iap',
        type: 'ERROR',
        message: error?.toString(),
        title: 'onValidateReceipt',
        screenName: 'usePackageCoin',
      });
    } finally {
      currentPurchase &&
        finishTransaction({purchase: currentPurchase}).catch(() => {});

      setValidateReceiptBody(undefined);
      dismissLoading({forceDismiss: true});
    }
  };

  const clearState = () => {
    setMethodId(undefined);
  };

  useEffect(() => {
    // if (isPTN) {
    //   return setSelectedClass(10);
    // }
    // if (isGURU) {
    //   return setSelectedClass(4);
    // }
    setSelectedClass(listClass?.[0].id || 1);
  }, [detail, listClass]);

  const fetchPackage = async () => {
    showLoading();
    dispatch(
      fetchDetailPackage(package_id, async () => {
        await sleep(500);
        dismissLoading();
      }),
    );
  };

  useEffect(() => {
    setTimeout(fetchPackage, 500);
  }, [package_id]);

  useEffect(() => {
    if (detail?.package && JSON.stringify(selectedPackage) === '{}') {
      setSelectedPackage(detail?.package?.[0]);
    }
  }, [detail]);

  const resetPromo = () => {
    setPromoVoucher(undefined);
    setPromoStatus(promoStatusInitState);
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

  const checkDiscount = async (code: string) => {
    try {
      showLoading();
      const body = {
        code: code.toUpperCase(),
        package: [
          {
            id: selectedPackage?.id,
            name: detail?.name,
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
    getPaymentMethod();
    return () => {
      rdxDispatch(detailPackageDestroy());
      setSelectedPackage({});
      clearState();
    };
  }, []);

  useEffect(() => {
    if (skus) {
      return;
    }
    const sku = isPlatformIOS
      ? selectedPackage?.apple_product_id
      : selectedPackage?.google_play_product_id || '';
    setSkus(!sku ? undefined : [sku]);
  }, [selectedPackage]);

  return {
    navigateScreen,
    popScreen,
    user,
    userRole,
    setUser,
    detail,
    notPending,
    showSelectClass,
    setShowSelectClass,
    products,
    handlingPurchase,
    skus,
    checkDiscount,
    getUser,
    selectedClass,
    setSelectedClass,
    selectedPackage,
    setSelectedPackage,
    showDetailPayment,
    setShowDetailPayment,
    showSuccessPayment,
    setShowSuccessPayment,
    promoStatus,
    setPromoStatus,
    promoVoucher,
    filteredPackageHaveProductId,
    resetPromo,
    isPTN,
    isGURU,
    listClass,
  };
};
export default usePackage;
