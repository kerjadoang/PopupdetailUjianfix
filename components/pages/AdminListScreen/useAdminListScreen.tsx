import {useEffect} from 'react';
import {useMergeState} from '@constants/functional';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useAdminListScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AdminListVerificationScreen'>
    >();
  const [state, setState] = useMergeState({
    isLoading: false,
    listData: false,
    tabData: false,
    selectedTab: false,
    evidenceData: false,
    isShowPopupApproved: false,
    isShowPopupRejected: false,
    isShowSwipeUpEvidence: false,
    popupAcceptData: {
      id: false,
      note: {
        isValid: false,
        value: '',
        errorMessage: '',
      },
    },
    popupDeclineData: {
      id: false,
      note: {
        isValid: false,
        value: '',
        errorMessage: '',
      },
    },
  });
  const {
    isLoading,
    listData,
    tabData,
    selectedTab,
    evidenceData,
    isShowPopupApproved,
    isShowPopupRejected,
    isShowSwipeUpEvidence,
    popupAcceptData,
    popupDeclineData,
  }: any = state;

  const isFocused = useIsFocused();
  const route = useRoute();
  const {class_id}: any = route?.params;

  useEffect(() => {
    if (isFocused) {
      _handlerGetTabData();
    }
  }, [isFocused]);

  const _handlerGetTabData = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getListClassRombel(class_id);
      const resDataData = res?.data?.data || false;

      if (selectedTab) {
        setState({
          tabData: resDataData,
          selectedTab: resDataData?.[0],
        });
        _handlerGetListData(selectedTab?.rombel_class_school_id);
      } else {
        setState({
          tabData: resDataData,
          selectedTab: resDataData?.[0],
        });
        _handlerGetListData(resDataData[0]?.rombel_class_school_id);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({isLoading: false});
      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerGetListData = async (rombel_class_school_id: number) => {
    setState({isLoading: true});
    try {
      const res = await provider.getListClassRombelDetail(
        rombel_class_school_id,
      );
      const resDataData = res?.data?.data || false;
      // console.log('abcde resDataData>>>', JSON.stringify(resDataData, null, 2));

      setState({
        listData: resDataData,
        isLoading: false,
      });

      if (popupAcceptData?.id) {
        Toast.show({
          type: 'success',
          text1: 'Pembayaran berhasil diterima.',
        });
        setState({popupAcceptData: false});
      } else if (popupDeclineData?.id) {
        Toast.show({
          type: 'success',
          text1: 'Pembayaran berhasil ditolak.',
        });
        setState({popupDeclineData: false});
      }
    } catch (e: any) {
      setState({isLoading: false});
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerGetEvidenceData = async (evidence_id: number) => {
    try {
      const res = await provider.getEvidenceDetail(evidence_id);
      var resDataData = res?.data?.data || false;
      const paymentEvidenceId = resDataData?.payment_proof_pict;
      const paymentCategoryImageId = resDataData?.payment_category?.image;
      const paymentMethodImageId = resDataData?.payment_method?.image;

      if (paymentEvidenceId) {
        const paymentEvidenceRes = await providerMedia.getImage(
          paymentEvidenceId,
        );

        if (paymentEvidenceRes?.code === 100) {
          resDataData.payment_proof_pict_path_url =
            paymentEvidenceRes?.data?.path_url || false;
        }
      }

      if (paymentCategoryImageId) {
        const paymentCategoryImageRes = await providerMedia.getImage(
          paymentCategoryImageId,
        );

        if (paymentCategoryImageRes?.code === 100) {
          resDataData.payment_category.image_path_url =
            paymentCategoryImageRes?.data?.path_url || false;
        }
      }

      if (paymentMethodImageId) {
        const paymentMethodImageRes = await providerMedia.getImage(
          paymentMethodImageId,
        );

        if (paymentMethodImageRes?.code === 100) {
          resDataData.payment_method.image_path_url =
            paymentMethodImageRes?.data?.path_url || false;
        }
      }

      setState({
        evidenceData: resDataData,
        isShowSwipeUpEvidence: !isShowSwipeUpEvidence,
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerOnChangeApproved = (text: any) => {
    setState({
      popupAcceptData: {
        id: popupAcceptData?.id,
        note: {
          value: text,
          isValid: true,
          errorMessage: '',
        },
      },
    });
  };

  const _handlerOnChangeRejected = (text: any) => {
    const isNoteLengthMin1 = text.length > 0;
    const isAllConditionValid = isNoteLengthMin1;

    setState({
      popupDeclineData: {
        id: popupDeclineData?.id,
        note: {
          value: text,
          isValid: isAllConditionValid,
          errorMessage: !isNoteLengthMin1 ? 'Keterangan wajib diisi.' : '',
        },
      },
    });
  };

  const _handlerShowPopupApproved = (id: number) => {
    setState({
      isShowPopupApproved: true,
      popupAcceptData: {id: id, note: popupAcceptData?.note},
    });
  };

  const _handlerShowPopupRejected = (id: number) => {
    setState({
      isShowPopupRejected: true,
      popupDeclineData: {id: id, note: popupDeclineData?.note},
    });
  };

  const _handlerOnPressCancelPopup = () => {
    setState({isShowPopupApproved: false, isShowPopupRejected: false});
  };

  const _handlerShowHideSwipeUpEvidence = (id: number) => {
    _handlerGetEvidenceData(id);
  };

  const _handlerHideSwipeUpEvidence = () => {
    setState({isShowSwipeUpEvidence: false});
  };

  const _handlerOnPressTab = (item: any) => {
    setState({selectedTab: item});
    _handlerGetListData(item.rombel_class_school_id);
  };

  const _handlerOnPressAccept = async () => {
    setState({isLoading: true});
    const {id, note} = popupAcceptData;
    const requestBody = {
      status: 'diterima',
      notes_status: note?.value || '',
    };

    try {
      await provider.putAcceptDeclineAdministration(id, requestBody);

      setState({
        isShowPopupApproved: false,
      });
      _handlerGetTabData();
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({
        isLoading: false,
        popupAcceptData: false,
        isShowPopupApproved: false,
      });
      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerOnPressDecline = async () => {
    setState({isLoading: true});
    const {id, note} = popupDeclineData;
    const requestBody = {
      status: 'ditolak',
      notes_status: note?.value || '',
    };

    try {
      await provider.putAcceptDeclineAdministration(id, requestBody);

      setState({
        isShowPopupRejected: false,
      });

      _handlerGetTabData();
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({
        isLoading: false,
        popupDeclineData: false,
        isShowPopupRejected: false,
      });
      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerNavigateToAdminUploadEvidenceScreen = () => {
    navigation?.navigate('AdminUploadEvidenceScreen', {});
  };

  const _handlerNavigateToAdminListHistoryScreen = (
    rombel_class_school_name: string,
    rombel_class_school_id: number,
    class_id: number,
    class_name: string,
  ) => {
    navigation.navigate('AdminListHistoryScreen', {
      rombel_class_school_name,
      rombel_class_school_id,
      class_id,
      class_name,
    });
  };

  return {
    isLoading,
    listData,
    tabData,
    navigation,
    selectedTab,
    isShowPopupApproved,
    isShowPopupRejected,
    isShowSwipeUpEvidence,
    evidenceData,
    popupDeclineData,
    _handlerNavigateToAdminUploadEvidenceScreen,
    _handlerNavigateToAdminListHistoryScreen,
    _handlerOnPressCancelPopup,
    _handlerOnPressTab,
    _handlerShowPopupApproved,
    _handlerShowPopupRejected,
    _handlerShowHideSwipeUpEvidence,
    _handlerHideSwipeUpEvidence,
    _handlerOnPressAccept,
    _handlerOnPressDecline,
    _handlerOnChangeApproved,
    _handlerOnChangeRejected,
  };
};

export default useAdminListScreen;
