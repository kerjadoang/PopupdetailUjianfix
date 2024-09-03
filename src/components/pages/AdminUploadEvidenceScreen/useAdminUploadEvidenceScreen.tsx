import React, {useCallback, useEffect, useState} from 'react';
import {
  _handleUserTypeId,
  _handlerSubstringText,
  convertDate,
  dismissLoading,
  showLoading,
  size1Kb,
  useMergeState,
} from '@constants/functional';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '@constants/colors';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import IconCalenderBlue from '@assets/svg/ic_calendar_blue.svg';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import provider from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import dayjs from 'dayjs';
import {BackHandler, Platform} from 'react-native';
import Maskot3 from '@assets/svg/maskot_3.svg';
import DocumentPicker from 'react-native-document-picker';
import {listFileImageExtension} from '@constants/functional';
import {useUploadFile} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {ParamList} from 'type/screen';
import {RootState} from 'src/redux/rootReducer';
import {useSelector} from 'react-redux';
import {INewCurrentDatePickerDate} from '@components/atoms/NewDateTimePickerForm';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
  hour: any;
  minute: any;
  fullDate: string;
}

const useAdminUploadEvidenceScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AdminUploadEvidenceScreen'>
    >();

  const route: any = useRoute();
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month'),
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
    fullDate: dayjs().format(),
  });
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    isShowSwipeUpRegistrationNumber: false,
    isShowSwipeUpChooseDate: false,
    isShowSwipeUpPaymentMethod: false,
    isShowSwipeUpSchoolBankAccount: false,
    isShowSwipeUpPaymentCategory: false,
    searchQuery: '',
    listRegistrationNumber: false,
    listPaymentMethod: false,
    listSchoolBankAccount: false,
    listPaymentCategory: false,
    selectedRegistrationNumber: route?.params,
    selectedRegistrationNumberTemporary: false,
    selectedDate: {
      data: false,
      valueDatePicker: '',
      errorMessage: '',
    },
    selectedDateTemporary: false,
    selectedPaymentMethod: false,
    selectedPaymentMethodTemporary: false,
    selectedSchoolBankAccount: false,
    selectedSchoolBankAccountTemporary: false,
    otherSchoolBankDescription: {
      isValid: false,
      value: '',
      errorMessage: '',
    },
    selectedPaymentCategory: false,
    selectedPaymentCategoryTemporary: false,
    seletedAttachment: {
      id: false,
      data: false,
      errorMessage: '',
      progressUpload: '0%',
    },
    otherPaymentDescription: {
      isValid: false,
      value: '',
      errorMessage: '',
    },
    paymentAmount: {
      isValid: false,
      value: '',
      errorMessage: '',
    },
  });
  const {
    isLoading,
    isShowPopup,
    popupData,
    isShowSwipeUpRegistrationNumber,
    isShowSwipeUpChooseDate,
    isShowSwipeUpPaymentMethod,
    isShowSwipeUpSchoolBankAccount,
    isShowSwipeUpPaymentCategory,
    searchQuery,
    listRegistrationNumber,
    listPaymentMethod,
    listSchoolBankAccount,
    listPaymentCategory,
    selectedRegistrationNumber,
    selectedRegistrationNumberTemporary,
    selectedDate,
    selectedDateTemporary,
    selectedPaymentMethod,
    selectedPaymentMethodTemporary,
    selectedSchoolBankAccount,
    selectedSchoolBankAccountTemporary,
    otherSchoolBankDescription,
    selectedPaymentCategory,
    selectedPaymentCategoryTemporary,
    seletedAttachment,
    otherPaymentDescription,
    paymentAmount,
  }: any = state;

  const {mutate: uploadFile} = useUploadFile();
  const {data: user}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );
  const userType = _handleUserTypeId(user?.user_type_id!);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _handlerBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _handlerBackButton);
    };
  }, []);

  const _handlerBackButton = () => {
    setState({
      popupData: {
        icon: Maskot3,
        title: 'Belum Selesai!',
        description:
          'Apakah Anda yakin untuk keluar?\nBukti Pembayaran yang sedang dibuat belum disimpan.',
        labelConfirm: 'Lanjutkan',
        labelCancel: 'Keluar',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
          navigation.pop();
        },
      },
      isShowPopup: true,
    });

    return true;
  };

  const schoolBankWarning =
    selectedSchoolBankAccount?.errorMessage ==
    'Rekening Sekolah wajib dipilih.';
  const isSchoolBankValid =
    schoolBankWarning ||
    (!selectedPaymentMethod?.errorMessage &&
      !selectedSchoolBankAccount?.errorMessage &&
      selectedPaymentMethod?.id);

  const textInputData = [
    userType.role === 'ORANG-TUA'
      ? undefined
      : {
          label: 'NIS Murid',
          value: _handlerSubstringText(
            selectedRegistrationNumber?.registration_number,
            30,
          ),
          placeholder: 'Cari NIS/nama murid',
          errorMessage: selectedRegistrationNumber?.errorMessage,
          onPress: () => {
            _handlerShowSwipeUpRegistrationNumber();
          },
          backgroundColor: Colors.dark.neutral10,
          leftIcon: <IconSearchBlue width={24} height={24} />,
          rightIcon: false,
          isDisabled: false,
        },
    userType.role === 'ORANG-TUA'
      ? undefined
      : {
          label: 'Nama Murid',
          value: '',
          placeholder:
            selectedRegistrationNumber?.full_name || 'Pilih NIS terlebih dulu',
          errorMessage: '',
          onPress: () => {},
          backgroundColor: Colors.dark.neutral20,
          leftIcon: false,
          rightIcon: false,
          isDisabled: true,
        },
    userType.role === 'ORANG-TUA'
      ? undefined
      : {
          label: 'Kelas',
          value: '',
          placeholder:
            selectedRegistrationNumber?.class_name || 'Pilih NIS terlebih dulu',
          errorMessage: '',
          onPress: () => {},
          backgroundColor: Colors.dark.neutral20,
          leftIcon: false,
          rightIcon: false,
          isDisabled: true,
        },
    userType.role === 'ORANG-TUA'
      ? undefined
      : {
          label: 'Grup/Rombongan Belajar',
          value: '',
          placeholder:
            selectedRegistrationNumber?.rombel_class_school_name ||
            'Pilih NIS terlebih dulu',
          errorMessage: '',
          onPress: () => {},
          backgroundColor: Colors.dark.neutral20,
          leftIcon: false,
          rightIcon: false,
          isDisabled: true,
        },
    {
      label: 'Tanggal Pembayaran',
      value: selectedDate?.data,
      placeholder: 'Pilih tanggal',
      errorMessage: selectedDate?.errorMessage,
      onPress: () => {
        _handlerShowSwipeUpChooseDate();
      },
      backgroundColor: Colors.dark.neutral10,
      leftIcon: false,
      rightIcon: <IconCalenderBlue width={24} height={24} />,
      isDisabled: false,
    },
    {
      label: 'Metode Pembayaran',
      value: selectedPaymentMethod?.name,
      placeholder: 'Pilih metode pembayaran',
      errorMessage: selectedPaymentMethod?.errorMessage,
      onPress: () => {
        _handlerShowSwipeUpPaymentMethod();
      },
      backgroundColor: Colors.dark.neutral10,
      leftIcon: false,
      rightIcon: <IconArrowBottomBlue width={24} height={24} />,
      isDisabled: false,
    },
    {
      label: 'Rekening Sekolah',
      value: selectedSchoolBankAccount?.name,
      placeholder: isSchoolBankValid
        ? 'Pilih rekening sekolah'
        : 'Pilih metode pembayaran dulu',
      errorMessage: selectedSchoolBankAccount?.errorMessage,
      onPress: () => {
        _handlerShowSwipeUpSchoolBankAccount();
      },
      backgroundColor: Colors.dark.neutral10,
      leftIcon: false,
      rightIcon: isSchoolBankValid ? (
        <IconArrowBottomBlue width={24} height={24} />
      ) : null,
      isDisabled: isSchoolBankValid ? false : true,
    },
    {
      label: 'Deskripsi Rekening Lainnya',
      value: '',
      placeholder: 'Pilih kategori',
      errorMessage: selectedPaymentCategory?.errorMessage,
      onPress: () => {},
      onChange: () => {},
      backgroundColor: Colors.dark.neutral10,
      leftIcon: false,
      rightIcon: false,
      isDisabled: false,
    },
    {
      label: 'Kategori Pembayaran',
      value: selectedPaymentCategory?.name,
      placeholder: 'Pilih kategori',
      errorMessage: selectedPaymentCategory?.errorMessage,
      onPress: () => {
        _handlerShowSwipeUpPaymentCategory();
      },
      backgroundColor: Colors.dark.neutral10,
      leftIcon: false,
      rightIcon: <IconArrowBottomBlue width={24} height={24} />,
      isDisabled: false,
    },
  ];

  const _handlerGetListRegistrationNumberData = async (query: any) => {
    try {
      const res = await provider.getListRegistrationNumber(query);
      const resDataData = res?.data?.data || false;
      // console.log('abcde res>>>', JSON.stringify(resDataData, null, 2));
      setState({
        listRegistrationNumber: resDataData,
        isShowSwipeUpRegistrationNumber: true,
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

  const _handlerOnPressSelectedRegistrationNumber = (item: any) => {
    setState({selectedRegistrationNumberTemporary: item});
  };

  const _handlerOnPressSelectedDatePicker = (
    date?: INewCurrentDatePickerDate,
  ) => {
    const resDate = dayjs(date || valueDatePicker.fullDate).locale('id');
    setState({
      selectedDate: {
        errorMessage: '',
        data: resDate.format('ddd, DD/MM/YYYY • HH:mm'),
        valueDatePicker: date,
      },
      isShowSwipeUpChooseDate: false,
    });
  };

  const _handlerOnPressSelectedPaymentMethod = (item: any) => {
    setState({selectedPaymentMethodTemporary: item});
  };

  const _handlerOnPressSelectedSchoolBankAccount = (item: any) => {
    setState({selectedSchoolBankAccountTemporary: item});
  };

  const _handlerOnPressSelectedPaymentCategory = (item: any) => {
    setState({selectedPaymentCategoryTemporary: item});
  };

  const _handlerOnPressSaveRegistrationNumber = () => {
    setState({
      isShowSwipeUpRegistrationNumber: false,
      selectedRegistrationNumberTemporary: selectedRegistrationNumberTemporary,
      selectedRegistrationNumber: selectedRegistrationNumberTemporary,
    });
  };

  const _handlerOnPressApplyPaymentMethod = () => {
    setState({
      isShowSwipeUpPaymentMethod: false,
      selectedPaymentMethodTemporary: selectedPaymentMethodTemporary,
      selectedPaymentMethod: selectedPaymentMethodTemporary,
      listSchoolBankAccount: selectedPaymentMethodTemporary?.payment_method,
      selectedSchoolBankAccountTemporary: false,
      selectedSchoolBankAccount: false,
    });
  };

  const _handlerOnPressApplySchoolBankAccount = () => {
    setState({
      isShowSwipeUpSchoolBankAccount: false,
      selectedSchoolBankAccountTemporary: selectedSchoolBankAccountTemporary,
      selectedSchoolBankAccount: selectedSchoolBankAccountTemporary,
    });
  };

  const _handlerOnPressApplyPaymentCategory = () => {
    setState({
      isShowSwipeUpPaymentCategory: false,
      selectedPaymentCategoryTemporary: selectedPaymentCategoryTemporary,
      selectedPaymentCategory: selectedPaymentCategoryTemporary,
    });
  };

  const _handlerOnChangeSearchingRegistrationNumber = (val: any) => {
    setState({searchQuery: val});
  };

  const _handlerOnSubmitSearchRegistrationNumber = () => {
    _handlerGetListRegistrationNumberData(searchQuery);
  };

  const _handlerShowSwipeUpRegistrationNumber = () => {
    _handlerGetListRegistrationNumberData('');
  };

  const _handlerHideSwipeUpRegistrationNumber = () => {
    setState({
      isShowSwipeUpRegistrationNumber: false,
    });
  };

  const _handlerShowSwipeUpChooseDate = () => {
    setState({isShowSwipeUpChooseDate: true});
  };
  const _handlerHideSwipeUpChooseDate = () => {
    setState({isShowSwipeUpChooseDate: false});
  };

  const _handlerGetListPaymentMethod = async () => {
    try {
      const res = await provider.getListPaymentMethod();
      const resDataData = res?.data?.data || false;
      // console.log('abcde res>>>', JSON.stringify(resDataData, null, 2));
      setState({
        listPaymentMethod: resDataData,
        isShowSwipeUpPaymentMethod: true,
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

  const _handlerShowSwipeUpPaymentMethod = () => {
    _handlerGetListPaymentMethod();
  };
  const _handlerHideSwipeUpPaymentMethod = () => {
    setState({isShowSwipeUpPaymentMethod: false});
  };

  const _handlerShowSwipeUpSchoolBankAccount = () => {
    setState({isShowSwipeUpSchoolBankAccount: true});
  };
  const _handlerHideSwipeUpSchoolBankAccount = () => {
    setState({isShowSwipeUpSchoolBankAccount: false});
  };

  const _handlerGetListPaymentCategory = async () => {
    try {
      const res = await provider.getListPaymentCategory();
      const resDataData = res?.data?.data || false;
      // console.log('abcde res>>>', JSON.stringify(resDataData, null, 2));
      setState({
        listPaymentCategory: resDataData,
        isShowSwipeUpPaymentCategory: true,
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

  const _handlerShowSwipeUpPaymentCategory = () => {
    _handlerGetListPaymentCategory();
  };

  const _handlerHideSwipeUpPaymentCategory = () => {
    setState({isShowSwipeUpPaymentCategory: false});
  };

  const _handlerDocumentSelection = useCallback(async () => {
    setState({
      seletedAttachment: {
        id: false,
        data: false,
        errorMessage: '',
        progressUpload: '0%',
      },
    });

    try {
      const response: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const fileName = response?.[0]?.name;
      const fileSize = response?.[0]?.size;
      const extensionFile = fileName.split('.')?.pop();
      const limitFileInMb = 230;
      const maximalLimitFile = size1Kb * limitFileInMb;
      const isFileLowerThanMaxLimit = fileSize <= maximalLimitFile;
      const isFileHigherThanMaxLimit = fileSize > maximalLimitFile;
      const isFileFormatNotValid =
        !listFileImageExtension.includes(extensionFile);

      if (isFileFormatNotValid) {
        setState({
          seletedAttachment: {
            errorMessage:
              'Unggahan file tidak sesuai format (.png/.jpg/.jpeg).',
          },
        });
      } else if (isFileHigherThanMaxLimit) {
        setState({
          seletedAttachment: {
            errorMessage: 'Unggahan file melebihi batas ukuran.',
          },
        });
      } else if (isFileLowerThanMaxLimit) {
        setState({
          seletedAttachment: {
            id: false,
            data: response?.[0],
            errorMessage: '',
            progressUpload: '0%',
          },
        });
        _handlerUploadingFile(response);
      }
    } catch (err) {}
  }, []);

  const _handlerUploadingFile = (asset: any) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.name,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'attendance');
    formData.append('sub_type', 'approval');

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setState({
          seletedAttachment: {
            id: false,
            data: asset?.[0],
            errorMessage: '',
            progressUpload: `${i + 1}%`,
          },
        });
        i++;
      }
    }, 300);

    uploadFile(formData).then((res: IUploadImageResponse) => {
      clearInterval(intervalId);
      setState({
        seletedAttachment: {
          id: res?.data?.ID,
          data: asset?.[0],
          errorMessage: '',
          progressUpload: '99.9%',
        },
      });

      setTimeout(() => {
        setState({
          seletedAttachment: {
            id: res?.data?.ID,
            data: asset?.[0],
            errorMessage: '',
            progressUpload: '100%',
          },
        });
      }, 100);
    });
  };

  const _handlerValidateAllField = () => {
    const isRegistrationNumberNotValid =
      !selectedRegistrationNumber?.id ||
      !selectedRegistrationNumber?.rombel_class_school_id;
    const isDateNotValid = !selectedDate?.data;
    const isPaymentMethodNotValid = !selectedPaymentMethod?.id;
    const isSchoolBankAccountNotValid = !selectedSchoolBankAccount?.id;
    const isOtherSchoolBankAccountDescriptionNotValid =
      selectedSchoolBankAccount?.name === 'Lainnya' &&
      !otherSchoolBankDescription?.value;
    const isPaymentCategoryNotValid = !selectedPaymentCategory?.id;
    const isOtherPaymentDescriptionNotValid =
      selectedPaymentCategory?.id === 5 && !otherPaymentDescription?.value;
    const isPaymentAmountNotValid = paymentAmount?.value?.length == 0;
    const isAttachmentNotValid = !seletedAttachment?.id;

    if (
      isRegistrationNumberNotValid ||
      isDateNotValid ||
      isPaymentMethodNotValid ||
      isSchoolBankAccountNotValid ||
      isOtherSchoolBankAccountDescriptionNotValid ||
      isPaymentCategoryNotValid ||
      isPaymentAmountNotValid ||
      isAttachmentNotValid ||
      isOtherPaymentDescriptionNotValid
    ) {
      if (isRegistrationNumberNotValid) {
        setState({
          selectedRegistrationNumber: {
            errorMessage: 'NIS Murid wajib diisi.',
          },
        });
      }
      if (isDateNotValid) {
        setState({
          selectedDate: {
            errorMessage: 'Tanggal Pembayaran wajib dipilih.',
          },
        });
      }
      if (isPaymentMethodNotValid) {
        setState({
          selectedPaymentMethod: {
            errorMessage: 'Metode Pembayaran wajib dipilih.',
          },
        });
      }
      if (isSchoolBankAccountNotValid) {
        if (isPaymentMethodNotValid) {
          setState({
            selectedSchoolBankAccount: {
              errorMessage: 'Pilih metode pembayaran dulu',
            },
          });
        } else if (!isPaymentMethodNotValid) {
          setState({
            selectedSchoolBankAccount: {
              errorMessage: 'Rekening Sekolah wajib dipilih.',
            },
          });
        }
      }
      if (isOtherSchoolBankAccountDescriptionNotValid) {
        setState({
          otherSchoolBankDescription: {
            errorMessage: 'Deskripsi Rekening Lainnya.',
          },
        });
      }
      if (isPaymentCategoryNotValid) {
        setState({
          selectedPaymentCategory: {
            errorMessage: 'Kategori Pembayaran wajib dipilih.',
          },
        });
      }
      if (isOtherPaymentDescriptionNotValid) {
        setState({
          otherPaymentDescription: {
            errorMessage: 'Deskripsi Pembayaran wajib diisi.',
          },
        });
      }
      if (isPaymentAmountNotValid) {
        setState({
          paymentAmount: {
            errorMessage: 'Nominal Pembayaran wajib diisi.',
          },
        });
      }
      if (isAttachmentNotValid) {
        setState({
          seletedAttachment: {
            errorMessage: 'Bukti pembayaran wajib diunggah.',
          },
        });
      }
    } else {
      _handlerOnPressSubmitAllData();
    }
  };

  const _handlerOnPressSubmitAllData = async () => {
    // setState({isLoading: true});
    const requestBody = {
      user_id: selectedRegistrationNumber?.id,
      rombel_class_school_id:
        selectedRegistrationNumber?.rombel_class_school_id,
      payment_for_id: selectedPaymentCategory?.id,
      payment_for_notes: otherPaymentDescription?.value, //jikalau lainnya pada pada payment category notes ini jadi mandatory
      payment_category_id: selectedPaymentMethod?.id,
      payment_method_id: selectedSchoolBankAccount?.id,
      payment_method_notes: otherSchoolBankDescription?.value || '', // sengaja kosong kata request back end
      payment_date: convertDate(selectedDate.valueDatePicker).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      payment_proof_pict: seletedAttachment?.id,
      nominal: parseInt(paymentAmount?.value, 10),
    };

    try {
      showLoading();
      await provider.postSubmitPaymentEvidence(requestBody);

      // setState({isLoading: false});
      // navigation?.replace('AdminListDetailScreen', {
      //   request_tab: 'riwayat',
      //   class_id: class_id,
      //   rombel_class_school_id: rombel_class_school_id,
      //   user_id: user_id,
      //   full_name: full_name,
      //   rombel_class_school_name: name,
      //   class_name: rombel_class_school?.class?.name,
      //   registration_number: registration_number,
      // });
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Bukti pembayaran berhasil diunggah.',
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        setState({isLoading: false});
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    } finally {
      dismissLoading();
    }
  };

  const _handlerOnCloseAttachmentUpload = () => {
    setState({seletedAttachment: false});
  };

  const _handlerReUploadImage = () => {
    setState({seletedAttachment: false});
    _handlerDocumentSelection();
  };

  const _handlerOnChangePaymentAmount = (val: any) => {
    let textInput = val?.trim();

    setState({
      paymentAmount: {
        value: textInput,
        errorMessage:
          val?.length === 0 ? 'Nominal Pembayaran wajib diisi.' : '',
      },
    });
  };

  const _handlerOnChangeOtherPaymentDescription = (val: any) => {
    setState({
      otherPaymentDescription: {
        value: val,
        errorMessage:
          val?.length === 0 ? 'Deskripsi Pembayaran Lainnya wajib diisi.' : '',
      },
    });
  };

  const _handlerOnChangeOtherSchoolBanktDescription = (val: any) => {
    setState({
      otherSchoolBankDescription: {
        value: val,
        errorMessage:
          val?.length === 0 ? 'Deskripsi Rekening Lainnya wajib diisi.' : '',
      },
    });
  };

  return {
    isLoading,
    isShowPopup,
    popupData,
    navigation,
    searchQuery,
    textInputData,
    isShowSwipeUpRegistrationNumber,
    isShowSwipeUpChooseDate,
    isShowSwipeUpPaymentMethod,
    isShowSwipeUpSchoolBankAccount,
    isShowSwipeUpPaymentCategory,
    listRegistrationNumber,
    listPaymentMethod,
    listSchoolBankAccount,
    listPaymentCategory,
    selectedRegistrationNumber,
    selectedRegistrationNumberTemporary,
    valueDatePicker,
    selectedDate,
    selectedDateTemporary,
    selectedPaymentMethod,
    selectedPaymentMethodTemporary,
    selectedSchoolBankAccount,
    selectedSchoolBankAccountTemporary,
    otherSchoolBankDescription,
    selectedPaymentCategory,
    selectedPaymentCategoryTemporary,
    otherPaymentDescription,
    paymentAmount,
    seletedAttachment,
    userType,
    paymentDate: selectedDate,
    _handlerShowSwipeUpRegistrationNumber,
    _handlerHideSwipeUpRegistrationNumber,
    setValueDatePicker,
    _handlerShowSwipeUpChooseDate,
    _handlerHideSwipeUpChooseDate,
    _handlerOnPressSelectedDatePicker,
    _handlerShowSwipeUpPaymentMethod,
    _handlerHideSwipeUpPaymentMethod,
    _handlerShowSwipeUpSchoolBankAccount,
    _handlerHideSwipeUpSchoolBankAccount,
    _handlerShowSwipeUpPaymentCategory,
    _handlerHideSwipeUpPaymentCategory,
    _handlerOnChangeSearchingRegistrationNumber,
    _handlerOnSubmitSearchRegistrationNumber,
    _handlerOnPressSelectedRegistrationNumber,
    _handlerOnPressSelectedPaymentMethod,
    _handlerOnPressSelectedSchoolBankAccount,
    _handlerOnPressSelectedPaymentCategory,
    _handlerOnPressSaveRegistrationNumber,
    _handlerOnPressApplyPaymentMethod,
    _handlerOnPressApplySchoolBankAccount,
    _handlerOnPressApplyPaymentCategory,
    _handlerOnPressSubmitAllData,
    _handlerValidateAllField,
    _handlerBackButton,
    _handlerDocumentSelection,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerOnChangePaymentAmount,
    _handlerOnChangeOtherPaymentDescription,
    _handlerOnChangeOtherSchoolBanktDescription,
  };
};

export default useAdminUploadEvidenceScreen;
