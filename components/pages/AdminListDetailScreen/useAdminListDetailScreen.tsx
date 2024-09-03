import {useEffect} from 'react';
import {
  dismissLoading,
  showLoading,
  useMergeState,
} from '@constants/functional';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {INavigation, IRoute} from 'type/screen';

const useAdminListDetailScreen = () => {
  const navigation =
    useNavigation<INavigation<'AdminListVerificationScreen'>>();
  const route = useRoute<IRoute<'AdminListVerificationScreen'>>();
  const {getUser}: any = useSelector((state: RootState) => state);
  const {
    user_id,
    full_name,
    rombel_class_school_name,
    rombel_class_school_id,
    class_id,
    class_name,
    registration_number,
    request_tab,
    school_name,
  } = route?.params;
  const [state, setState] = useMergeState({
    isLoading: false,
    listData: false,
    tabData: ['perlu_verifikasi', 'riwayat'],
    selectedTab: request_tab || 'perlu_verifikasi',
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
    page: 0,
    limit: 10,
  });
  const isFocused = useIsFocused();
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
    page,
    limit,
  }: any = state;

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    _handlerGetData(selectedTab);
  }, [isFocused]);

  const _handlerGetData = async (selectedTab: any) => {
    // setState({isLoading: true});
    showLoading();
    try {
      const res = await provider.getClassRombelDetailAdmin(
        user_id,
        selectedTab,
        limit,
        page,
      );
      const resDataData = res?.data?.data || false;
      // console.log('abc resDataData>>>', JSON.stringify(resDataData, null, 2));
      setState({listData: resDataData});
    } catch (e: any) {
      const errorData = e?.response?.data;

      // setState({isLoading: false});
      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    } finally {
      dismissLoading();
      // setState({isLoading: false});
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
    _handlerGetData(item);
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
      _handlerGetData(selectedTab);
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

      _handlerGetData(selectedTab);
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
    navigation?.navigate('AdminUploadEvidenceScreen', {
      id: user_id,
      full_name,
      rombel_class_school_name,
      rombel_class_school_id,
      class_id,
      class_name,
      registration_number,
      student: `${registration_number}-${full_name}`,
      school_name: school_name,
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
    getUser,
    _handlerNavigateToAdminUploadEvidenceScreen,
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

export default useAdminListDetailScreen;
