import React from 'react';
import {
  useMergeState,
  _handlerCameraPermission,
  _handlerGalleryPermission,
} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Maskot1 from '@assets/svg/maskot_1.svg';
import IconCameraBlue from '@assets/svg/ic_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {IUploadImageResponse} from '@services/media/type';
import {useUploadImage} from '@services/media';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useDiscussionCreateGroupScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiscussionCreateGroupScreen'>
    >();
  const {mutate: uploadImage} = useUploadImage();

  const initialState = {
    groupName: {
      value: false,
      isValid: false,
      errorMessage: '',
    },
    isLoading: false,
    isShowSwipeUpAvatar: false,
    popupData: false,
    isShowPopup: false,
    attachmentId: '',
    tempAttachmentUri: false,
  };
  const [state, setState] = useMergeState(initialState);
  const {
    groupName,
    isLoading,
    isShowSwipeUpAvatar,
    popupData,
    isShowPopup,
    attachmentId,
    tempAttachmentUri,
  }: any = state;
  const size1Kb = 1000000;
  const setMaxLimitInMb = 20; // change this value to set max limit in Mb

  const requestBody = {
    name: groupName?.value,
    avatar_id: attachmentId,
    navigate_from: 'DiscussionCreateGroupScreen',
  };

  const _handlerOpenGallery = async () => {
    const permit = await _handlerGalleryPermission();

    if (permit) {
      const options: any = {
        mediaType: 'photo',
        saveToPhotos: true,
      };

      launchImageLibrary(options, response => {
        if (!response?.didCancel) {
          const {fileSize}: any = response?.assets?.[0];

          const maxLimit = size1Kb * setMaxLimitInMb;
          const isFileLowerThanMaxLimit = fileSize <= maxLimit;

          if (isFileLowerThanMaxLimit) {
            _handlerHideSwipeUpAvatar();
            setState({
              tempAttachmentUri: response?.assets?.[0]?.uri,
              isLoading: true,
            });
            _handlerUploadAvatar(response?.assets?.[0]);
          } else {
            setState({
              popupData: {
                icon: Maskot1,
                title: 'Gagal Upload!',
                description: `Ukuran maksimal foto adalah ${setMaxLimitInMb}Mb`,
                labelConfirm: 'Kembali',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          }
        }
      });
    }
  };

  const _handlerOpenCamera = async () => {
    const permit = await _handlerCameraPermission();

    if (permit) {
      const options: any = {
        mediaType: 'photo',
        saveToPhotos: true,
      };

      launchCamera(options, response => {
        if (!response?.didCancel) {
          const {fileSize}: any = response?.assets?.[0];
          const maxLimit = size1Kb * setMaxLimitInMb;
          const isFileLowerThanMaxLimit = fileSize <= maxLimit;

          if (isFileLowerThanMaxLimit) {
            _handlerHideSwipeUpAvatar();
            setState({
              tempAttachmentUri: response?.assets?.[0]?.uri,
              isLoading: true,
            });
            _handlerUploadAvatar(response?.assets?.[0]);
          } else {
            setState({
              popupData: {
                icon: Maskot1,
                title: 'Gagal Upload!',
                description: `Ukuran maksimal foto adalah ${setMaxLimitInMb}Mb`,
                labelConfirm: 'Kembali',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          }
        }
      });
    }
  };

  const _handlerUploadAvatar = (file: any) => {
    const {uri, fileName, type}: any = file;
    const formData = new FormData();

    formData.append('attachment', {
      uri: uri,
      type: type,
      name: fileName,
    });

    formData.append('sub_type', 'avatar');
    formData.append('type', 'user');

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaId = res?.data?.ID;
      if (mediaId) {
        setTimeout(() => {
          setState({attachmentId: mediaId, isLoading: false});
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

  const _handlerValidateGroupName = (text: string) => {
    const isConditionInputTextValid = text?.length > 0;

    setState({
      groupName: {
        value: isConditionInputTextValid ? text : false,
        isValid: isConditionInputTextValid ? true : false,
        errorMessage: isConditionInputTextValid
          ? ''
          : 'Nama group wajib diisi.',
      },
    });
  };

  const _handlerSubmitData = () => {
    if (groupName?.isValid) {
      navigation?.navigate('DiscussionGrupAddMemberScreen', requestBody);
    }
  };

  const _handlerShowSwipeUpAvatar = () => {
    setState({isShowSwipeUpAvatar: !isShowSwipeUpAvatar});
  };
  const _handlerHideSwipeUpAvatar = () => {
    setState({isShowSwipeUpAvatar: false});
  };

  const initialisationDataSwipeUp = [
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

  const _handlerOnPressGoBack = () => {
    if (groupName?.value?.length > 0) {
      setState({
        popupData: {
          icon: Maskot1,
          title: 'Belum Selesai!',
          description:
            'Apakah Anda yakin untuk keluar?\nBuat grup belum disimpan.',
          labelConfirm: 'Lanjutkan',
          labelCancel: 'Kembali',
          onPressConfirm: () => {
            setState({isShowPopup: false});
            navigation?.goBack();
          },
          onPressCancel: () => {
            setState({isShowPopup: false});
          },
        },
        isShowPopup: true,
      });
    } else {
      navigation?.goBack();
    }
  };

  return {
    isLoading,
    isShowPopup,
    popupData,
    groupName,
    isShowSwipeUpAvatar,
    initialisationDataSwipeUp,
    tempAttachmentUri,
    _handlerValidateGroupName,
    _handlerSubmitData,
    _handlerShowSwipeUpAvatar,
    _handlerHideSwipeUpAvatar,
    _handlerOnPressGoBack,
  };
};

export default useDiscussionCreateGroupScreen;
