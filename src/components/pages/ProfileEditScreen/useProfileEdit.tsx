import React, {useEffect} from 'react';
import {
  regexEmail,
  useMergeState,
  _handlerCameraPermission,
  _handlerGalleryPermission,
  maximalLimitImage,
  limitImageInMb,
} from '@constants/functional';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Maskot1 from '@assets/svg/maskot_1.svg';
import IconCameraBlue from '@assets/svg/ic_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconTrashBlue from '@assets/svg/ic_trash_blue.svg';
import {useUploadImage} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import provider from '@services/uaa/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getHomeSubject} from '../HomeScreen/utils';
import {useQueryFetchUser} from '@services/uaa';

interface RootState {
  getUser: any;
}

const useProfileEdit = () => {
  const navigation: any = useNavigation();
  const {mutate: uploadImage} = useUploadImage();
  const {getUser} = useSelector((state: RootState) => state);
  const {
    full_name,
    school_id,
    user_type_id,
    phone_number,
    class_profile,
    disable_update_profile,
  } = getUser?.data;
  const {refetch: refetchUser} = useQueryFetchUser();

  const phoneNumber =
    phone_number?.substring(0, 3) == '+62'
      ? `0${phone_number?.substring(3, phone_number.length)}`
      : phone_number || 'phone_number';
  const emailUser = getUser?.data?.email;
  const genderUser = getUser?.data?.gender == 'L' ? 0 : 1;
  const school_name = getUser?.data?.school?.name || getUser?.data?.school_name;
  const imageUser = getUser?.data?.avatar;
  const genderItems = ['Laki-Laki', 'Perempuan'];
  const {avatar}: any = getUser?.data;
  const isDisableSchoolField = school_id;
  const userTypeId = user_type_id;

  const initialState = {
    fullName: {
      value: full_name,
      isValid: false,
      errorMessage: '',
    },
    userClass: {
      // id: class_id,
      // label: getUser?.data?.class?.name,
      id: class_profile,
      label: `Kelas ${class_profile}`,
    },
    schoolName: {
      value: school_name,
      isValid: false,
      errorMessage: '',
    },
    gender: genderItems[genderUser],
    email: {
      value: emailUser,
      isValid: false,
      errorMessage: '',
    },
    isShowSwipeUpAvatar: false,
    isShowSwipeUpClass: false,
    popupData: false,
    isShowPopup: false,
    isLoading: false,
  };
  const [state, setState] = useMergeState(initialState);
  const {
    userClass,
    isShowSwipeUpAvatar,
    isShowSwipeUpClass,
    fullName,
    schoolName,
    gender,
    email,
    popupData,
    isShowPopup,
    isLoading,
  }: any = state;

  const _handlerOpenGallery = async () => {
    const permit = await _handlerGalleryPermission();

    if (permit) {
      const result: any = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (!result?.didCancel) {
        const {size}: any = result;
        const isFileLowerThanMaxLimit = size <= maximalLimitImage;

        if (isFileLowerThanMaxLimit) {
          _handlerHideSwipeUpAvatar();
          _handlerUploadAvatar(result);
        } else {
          setState({
            popupData: {
              icon: Maskot1,
              title: 'Gagal Upload!',
              description: `Ukuran maksimal foto adalah ${limitImageInMb}Mb`,
              labelConfirm: 'Kembali',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        }
      }
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    refetchUser();
    // dispatch(fetchGetUser());
  }, [isFocused]);

  const _handlerOpenCamera = async () => {
    const permit = await _handlerCameraPermission();

    if (permit) {
      const result: any = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (!result?.didCancel) {
        const {size}: any = result;
        const isFileLowerThanMaxLimit = size <= maximalLimitImage;

        if (isFileLowerThanMaxLimit) {
          _handlerHideSwipeUpAvatar();
          _handlerUploadAvatar(result);
        } else {
          setState({
            popupData: {
              icon: Maskot1,
              title: 'Gagal Upload!',
              description: `Ukuran maksimal foto adalah ${limitImageInMb}Mb`,
              labelConfirm: 'Kembali',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        }
      }
    }
  };

  const _handlerDeleteAvatar = async () => {
    setState({isLoading: true});

    try {
      const reqBody = {
        avatar_id: '',
      };
      const res = await provider.putChangeAvatar(reqBody);
      refetchUser();
      // dispatch(fetchGetUser());

      if (res.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Perubahan berhasil disimpan.',
          });
        }, 500);
      }
    } catch (e: any) {
      setTimeout(() => {
        const err = {
          isError: true,
          data: e?.response?.data,
        };

        Toast.show({
          type: 'error',
          text1: err?.data?.message,
        });

        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerUploadAvatar = (file: any) => {
    setState({isLoading: true});

    const {mime, path}: any = file;
    const fileName = path?.split('/')?.pop();
    const formData = new FormData();

    formData.append('attachment', {
      uri: Platform.OS === 'android' ? path : path?.replace('file://', ''),
      type: mime,
      name: fileName,
    });

    formData.append('sub_type', 'avatar');
    formData.append('type', 'user');

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaId = res?.data?.ID;
      if (mediaId) {
        setTimeout(() => {
          _handlerChangeAvatar(mediaId);
        }, 100);
      } else {
        setState({isLoading: false});
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error',
        });
      }
    });
  };

  const _handlerChangeAvatar = async (avatarId: any) => {
    try {
      const requestBody = {
        avatar_id: avatarId,
      };

      const res = await provider.putChangeAvatar(requestBody);
      refetchUser();
      // dispatch(fetchGetUser());

      if (res.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Perubahan berhasil disimpan.',
          });
        }, 500);
      }
    } catch (e: any) {
      setTimeout(() => {
        const err = {
          isError: true,
          data: e?.response?.data,
        };

        Toast.show({
          type: 'error',
          text1: err?.data?.message,
        });

        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerValidateFullName = (text: string) => {
    const isConditionInputTextValid = text?.length > 0;

    setState({
      fullName: {
        value: isConditionInputTextValid ? text : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid
          ? ''
          : 'Nama lengkap wajib diisi.',
      },
    });
  };

  const _handlerSelectClass = (id: number, label: string) => {
    setState({
      userClass: {
        id: id,
        label: label,
      },
      isShowSwipeUpClass: false,
    });
  };

  const _handlerValidateSchoolName = (text: string) => {
    const isConditionInputTextValid = text?.length > 0;

    setState({
      schoolName: {
        value: isConditionInputTextValid ? text : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid
          ? ''
          : 'Penulisan nama sekolah salah.',
      },
    });
  };

  const _handlerOnPressGender = (text: string) => {
    setState({
      gender: text,
    });
  };

  const _handlerValidateEmail = (text: string) => {
    const inputText = text.trim();
    const isConditionInputTextValid =
      inputText?.length > 0 && regexEmail.test(inputText);

    setState({
      email: {
        value: inputText,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid ? '' : 'Penulisan email salah.',
      },
    });
  };

  const _handlerSubmitData = async () => {
    setState({isLoading: true});

    try {
      const requestBody = {
        full_name: fullName?.value,
        gender: gender == 'Laki-Laki' ? 'L' : 'P',
        email: email?.value,
        school_name: schoolName?.value,
        class_id: userClass?.id,
      };

      const res = await provider.putEditProfile(requestBody);
      refetchUser();
      // dispatch(fetchGetUser());

      if (res.status == 200) {
        getHomeSubject();
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Perubahan berhasil disimpan.',
          });
          // navigation.navigate('Profil', {});
        }, 500);
      }
    } catch (e: any) {
      setTimeout(() => {
        const err = {
          isError: true,
          data: e?.response?.data,
        };

        Toast.show({
          type: 'error',
          text1: err?.data?.message,
        });

        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerShowSwipeUpAvatar = () => {
    setState({isShowSwipeUpAvatar: !isShowSwipeUpAvatar});
  };
  const _handlerHideSwipeUpAvatar = () => {
    setState({isShowSwipeUpAvatar: false});
  };

  const _handlerShowSwipeUpClass = () => {
    setState({isShowSwipeUpClass: !isShowSwipeUpClass});
  };

  const _handlerHideSwipeUpClass = () => {
    setState({isShowSwipeUpClass: false});
  };

  const initialisationDataSwipeUpWithTrash = [
    {
      icon: <IconCameraBlue style={{marginRight: 12}} width={24} height={24} />,
      label: 'Ambil dari Kamera',
      onPress: () => {
        _handlerHideSwipeUpAvatar();

        setTimeout(() => {
          _handlerOpenCamera();
        }, 500);
      },
    },
    {
      icon: (
        <IconGalleryBlue style={{marginRight: 12}} width={24} height={24} />
      ),
      label: 'Ambil dari Galeri',
      onPress: () => {
        _handlerHideSwipeUpAvatar();

        setTimeout(() => {
          _handlerOpenGallery();
        }, 500);
      },
    },
    {
      icon: <IconTrashBlue style={{marginRight: 12}} width={24} height={24} />,
      label: 'Hapus foto profil',
      onPress: () => {
        _handlerHideSwipeUpAvatar();

        setTimeout(() => {
          _handlerDeleteAvatar();
        }, 500);
      },
    },
  ];

  const initialisationDataSwipeUpNoTrash = [
    {
      icon: <IconCameraBlue style={{marginRight: 12}} width={24} height={24} />,
      label: 'Ambil dari Kamera',
      onPress: () => {
        _handlerHideSwipeUpAvatar();

        setTimeout(() => {
          _handlerOpenCamera();
        }, 500);
      },
    },
    {
      icon: (
        <IconGalleryBlue style={{marginRight: 12}} width={24} height={24} />
      ),
      label: 'Ambil dari Galeri',
      onPress: () => {
        _handlerHideSwipeUpAvatar();

        setTimeout(() => {
          _handlerOpenGallery();
        }, 500);
      },
    },
  ];

  const initialisationDataSwipeUp = avatar
    ? initialisationDataSwipeUpWithTrash
    : initialisationDataSwipeUpNoTrash;

  const _handlerOnPressChangeNumber = () => {
    navigation.navigate('ChangeNumberScreen', {
      phoneNumber: phoneNumber,
    });
  };
  const handleDisabled = () => {
    var disabled: boolean = false;

    if (
      fullName?.value === initialState?.fullName?.value &&
      email?.value === initialState?.email?.value &&
      userClass?.id === initialState?.userClass?.id &&
      initialState?.gender === gender
    ) {
      disabled = true;
    }

    if (disable_update_profile) {
      disabled = true;
    }
    return disabled;
  };

  return {
    isLoading,
    imageUser,
    isShowPopup,
    popupData,
    fullName,
    userClass,
    schoolName,
    genderUser,
    email,
    genderItems,
    isShowSwipeUpAvatar,
    isShowSwipeUpClass,
    initialisationDataSwipeUp,
    isDisableSchoolField,
    userTypeId,
    phoneNumber,
    disable_update_profile,
    _handlerValidateFullName,
    _handlerSelectClass,
    _handlerValidateSchoolName,
    _handlerOnPressGender,
    _handlerValidateEmail,
    _handlerSubmitData,
    _handlerShowSwipeUpAvatar,
    _handlerHideSwipeUpAvatar,
    _handlerShowSwipeUpClass,
    _handlerHideSwipeUpClass,
    _handlerOnPressChangeNumber,
    handleDisabled,
  };
};

export default useProfileEdit;
