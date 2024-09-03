import {
  iosPhotoGalleryPermission,
  isFileFormatMustMP4,
  useMergeState,
} from '@constants/functional';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {fetchMaterialTypes} from '@redux';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RobotClose from '@assets/svg/Robot_close.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid, Platform} from 'react-native';
import {useUploadFile, useUploadVideo} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {launchImageLibrary} from 'react-native-image-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import mediaProvider from '@services/media/provider';
import provider from '@services/lms/provider';

interface RootState {
  curriculum: any;
  getMaterialTypes: any;
  getClassByDegree: any;
  getUser: any;
}

const useEditSchoolMaterials = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'EditSchoolMaterialsScreen'>
    >();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<ParamList, 'EditSchoolMaterialsScreen'>>();
  const {materialsParams, fromScreen} = route?.params;

  //get curriculumData
  const {getMaterialTypes} = useSelector((state: RootState) => state);
  const loadingMaterials = getMaterialTypes?.loading;
  //get data fetching api
  useEffect(() => {
    dispatch(fetchMaterialTypes());
  }, [dispatch]);

  //set show swipeup
  const [isShowKurikulum, setIsShowKurikulum] = useState<boolean>(false);
  const [isShowClasses, setIsShowClasses] = useState<boolean>(false);
  const [isShowMaterialsType, setIsShowMaterialsType] =
    useState<boolean>(false);
  const [isShowAvoidNotSaved, setIsShowAvoidNotSaved] =
    useState<boolean>(false);

  //set data
  const [kurikulum, setKurikulum] = useState<any>({
    title: 'Kurikulum',
    initValue: 'Pilih Kurikulum',
    value: 'Pilih Kurikulum',
    error: false,
    onPress: () => {
      setIsShowKurikulum(true);
    },
  });
  const [classes, setClasses] = useState<any>({
    title: 'Kelas',
    initValue: 'Pilih Kelas',
    value: 'Pilih Kelas',
    onPress: () => {
      setIsShowClasses(true);
    },
  });

  const [subject, setSubject] = useState<any>({
    title: 'Mata Pelajaran',
    initValue: 'Pilih Mata Pelajaran',
    value: 'Pilih Mata Pelajaran',
    error: false,
  });

  const [chapter, setChapter] = useState<any>({
    title: 'Bab',
    initValue: 'Pilih Bab',
    value: 'Pilih Bab',
    error: false,
  });

  const [materialsType, setMaterialsType] = useState<any>({
    title: 'Tipe Materi',
    initValue: 'Pilih Materi',
    value: 'Pilih Materi',
    progressUpload: '0%',
    attachmentData: false,
    attachmentTemporary: false,
    error: false,
    onPress: () => {
      setIsShowMaterialsType(true);
    },
  });

  const [materialsTitle, setMaterialsTitle] = useState<any>('');
  const [submited, setSubmited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [attachmentTemporary, setAttachmentTemporary] = useState<any>(null);
  const [attachmentData, setAttachmentData] = useState<any>({});
  const [progressUpload, setProgressUpload] = useState<any>('');
  const [loadingFetchFile, setLoadingFetchFile] = useState<boolean>(true);

  const setFile = async (file_id: any) => {
    try {
      const resFile = await mediaProvider.getFile(file_id);
      if (resFile?.status === 200) {
        setAttachmentTemporary({
          uri: resFile?.data?.data?.path_url,
          fileType: 'file',
          name: resFile?.data?.data?.original_name
            ? resFile?.data?.data?.original_name
            : resFile?.data?.data?.name
            ? resFile?.data?.data?.name
            : '',
        });
        setProgressUpload('100%');
        setLoadingFetchFile(false);
      }
    } catch (_) {
      setLoadingFetchFile(false);
    }
  };

  const setVideo = async (file_id: any) => {
    try {
      const resFile = await mediaProvider.getVideoRecording(file_id);
      if (resFile?.code === 100) {
        setAttachmentTemporary({
          uri: resFile?.data?.thumbnail,
          fileType: 'video',
          name: resFile?.data?.original_name
            ? resFile?.data?.original_name
            : resFile?.data?.name
            ? resFile?.data?.name
            : '',
        });
        setProgressUpload('100%');
        setLoadingFetchFile(false);
      }
    } catch (_) {
      setLoadingFetchFile(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (materialsParams && !loadingMaterials) {
        setSubject({
          ...subject,
          value: materialsParams?.chapter?.subject?.name,
          id: materialsParams?.chapter?.subject?.id,
        });
        setClasses({
          ...classes,
          value: materialsParams?.chapter?.subject?.class?.name,
          id: materialsParams?.chapter?.subject?.class?.id,
        });
        setKurikulum({
          ...classes,
          value: materialsParams?.chapter?.subject?.curriculum?.name,
          id: materialsParams?.chapter?.subject?.curriculum?.id,
        });
        setChapter({
          ...chapter,
          value: materialsParams?.chapter?.name,
          id: materialsParams?.chapter?.id,
        });

        if (materialsParams?.learning_method_id) {
          //get type file
          const filteredMateri = getMaterialTypes?.data?.filter(
            (obj: any) => obj?.id === materialsParams?.learning_method_id,
          );

          const type =
            filteredMateri?.map((obj: any) => obj?.type)?.toString() ?? '';
          const materialsTypeName = filteredMateri
            ?.map((obj: any) => obj?.name)
            ?.toString();

          setMaterialsTitle(materialsParams?.title);
          setMaterialsType({
            ...materialsType,
            id: materialsParams?.learning_method_id,
            value: materialsTypeName,
            postTitle: materialsParams?.title,
            selected: true,
            name: materialsTypeName,
            type: type ?? '',
          });
          if (materialsParams?.file_id) {
            setAttachmentData({ID: materialsParams?.file_id ?? ''});
            setLoading(true);
            if (type === 'video') {
              setVideo(materialsParams?.file_id).finally(() =>
                setLoading(false),
              );
            } else {
              setFile(materialsParams?.file_id).finally(() =>
                setLoading(false),
              );
            }
          }
        }
      }
    }
  }, [isFocused, loadingMaterials]);

  const [state, setState] = useMergeState({
    isShowPopup: false,
    popupData: false,
    isShowSwipeUpUpload: false,
  });
  const {isShowPopup, popupData, isShowSwipeUpUpload} = state;
  const [indexAttachment, setIndexAttachment] = useState<number>(0);

  const _handlerClose = async () => {
    setState({
      popupData: {
        icon: RobotClose,
        title: 'Materi Sekolah Belum Disimpan',
        description:
          'Apakah Anda yakin untuk keluar? Materi sekolah belum disimpan.',
        labelConfirm: 'Lanjutkan',
        labelCancel: 'Keluar',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: async () => {
          setState({isShowPopup: false});
          navigation.goBack();
        },
      },
      isShowPopup: true,
    });
  };

  const handleValidData = () => {
    const validMaterials = !materialsType?.error;
    const validNameMaterials = materialsTitle !== '';
    const validProgressUpload =
      progressUpload !== null && progressUpload === '100%';
    const validAttachmentData = attachmentData && attachmentData?.ID !== '';

    if (
      !validMaterials ||
      !validNameMaterials ||
      !validProgressUpload ||
      !validAttachmentData
    ) {
      return false;
    }
    return true;
  };

  const postSchoolMaterial = async () => {
    setSubmited(true);
    if (handleValidData()) {
      const body: any = {
        chapter_id: chapter?.id,
        title: materialsTitle,
        learning_method_id: materialsType?.id ?? '',
        description: '',
        file_id: attachmentData?.ID ?? '',
      };
      const res = await provider.edit_school_materials(
        body,
        materialsParams?.id,
      );
      if (res?.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Materi Sekolah Berhasil Disimpan.',
        });
        if (materialsType?.type === 'ebook') {
          navigation.navigate('EbookScreen', {
            chapterData: res?.data?.data,
            isFromGuru: true,
            isFromSchoolMaterials: fromScreen !== 'EBookScreen' ? true : false,
          });
        } else if (materialsType?.type === 'presentation') {
          navigation.navigate('VideoPresentationScreen', {
            contentData: res?.data?.data,
            isFromGuru: true,
            isFromSchoolMaterials:
              fromScreen !== 'VideoPresentationScreen' ? true : false,
          });
        } else if (materialsType?.type === 'video') {
          navigation.navigate('VideoAnimationScreen', {
            isFromGuru: true,
            chapterData: res?.data?.data,
            isFromSchoolMaterials:
              fromScreen !== 'VideoAnimationScreen' ? true : false,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: res?.data?.message ?? '',
        });
      }
    } else {
      // set Error in unsubmitted field
      const updatedMaterials = materialsType.map((item: any) => {
        return {
          ...item,
          error: item?.value === item?.initValue,
        };
      });
      setMaterialsType(updatedMaterials);
    }
  };

  //upload
  const {mutate: uploadVideo} = useUploadVideo();
  const {mutate: uploadFile} = useUploadFile();

  const _handlerShowSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: !isShowSwipeUpUpload});
  };

  const resetAttachment = async () => {
    setAttachmentTemporary(null);
    setAttachmentData(null);
    setProgressUpload(null);
  };
  const _handlerOnCloseAttachmentUpload = () => {
    resetAttachment();
  };

  const _handlerReUploadImage = () => {
    resetAttachment();
    onUploadImage();
  };

  const _handlerReUploadFile = () => {
    resetAttachment();
    _handlerDocumentSelection()
      .then(() => _handlerOnCloseSwipeUpUpload())
      .catch(() => _handlerOnCloseSwipeUpUpload());
  };

  const _handlerOnCloseSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: false});
  };

  const _handlerDocumentSelection = async () => {
    try {
      const type =
        materialsType?.type === 'presentation'
          ? [DocumentPicker.types.ppt, DocumentPicker.types.pptx]
          : materialsType?.type === 'ebook'
          ? DocumentPicker.types.pdf
          : materialsType?.type === 'video'
          ? DocumentPicker.types.video
          : DocumentPicker.types.allFiles;
      const response: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: type,
      });

      if (response?.[0]?.size > 241172480) {
        Toast.show({
          type: 'error',
          text1: 'File tidak bisa melebihi 230MB',
        });
      } else {
        const isFileTypeImage = response?.[0]?.type?.includes('video');

        if (isFileTypeImage) {
          if (isFileFormatMustMP4(response?.[0]?.name)) {
            Toast.show({
              type: 'error',
              text1: 'Extensi video rekaman harus mp4!',
            });
            return;
          }
        }

        const data = {
          ...response?.[0],
          fileType: isFileTypeImage ? 'video' : 'file',
        };
        setAttachmentTemporary(data);
        setProgressUpload('0%');

        if (isFileTypeImage) {
          uploadingImage(response);
        } else {
          uploadingFile(response);
        }
      }
    } catch (err) {}
  };

  const _handlerAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const uploadList = [
    {
      icon: (
        <IconGalleryBlue width={24} height={24} style={{marginRight: 12}} />
      ),
      label: 'Ambil dari Galeri',
      onPress: () => {
        onUploadImage();
      },
    },
    {
      icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
      label: 'Ambil dari File',
      onPress: () => {
        _handlerDocumentSelection()
          .then(() => _handlerOnCloseSwipeUpUpload())
          .catch(() => _handlerOnCloseSwipeUpUpload());
      },
    },
  ];

  const uploadingFile = async (asset: any) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.name,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'school-material');
    formData.append('sub_type', '');

    var config = {
      onUploadProgress: function (progressEvent: any) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 90) / progressEvent.total,
        );
        if (percentCompleted) {
          setProgressUpload(`${percentCompleted}%`);
        }
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Content-Length': asset?.[0]?.size,
      },
    };

    uploadFile(formData, setProgressUpload, config).then(
      (res: IUploadImageResponse) => {
        setTimeout(() => {
          const dataAttachment = res?.data;
          setAttachmentData(dataAttachment);
        }, 100);
      },
    );
  };

  const uploadingImage = (asset: any) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.fileName,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'school-material');
    formData.append('sub_type', '');

    var config = {
      onUploadProgress: function (progressEvent: any) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 90) / progressEvent.total,
        );
        if (percentCompleted) {
          setProgressUpload(`${percentCompleted}%`);
        }
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Content-Length': asset?.[0]?.size,
      },
    };
    uploadVideo(formData, setProgressUpload, config).then(
      (res: IUploadImageResponse) => {
        setTimeout(() => {
          const dataAttachment = res?.data;
          setAttachmentData(dataAttachment);
        }, 100);
      },
    );
  };

  const onUploadImageIos = async () => {
    try {
      const permit = await iosPhotoGalleryPermission();

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'video',
          presentationStyle: 'fullScreen',
        });
        const data = {
          ...result?.assets?.[0],
          fileType: 'video',
        };

        if (isFileFormatMustMP4(result?.assets[0]?.fileName)) {
          Toast.show({
            type: 'error',
            text1: 'Extensi video rekaman harus mp4!',
          });
          return;
        }
        if (result?.assets?.[0]?.fileSize > 241172480) {
          Toast.show({
            type: 'error',
            text1: 'File tidak bisa melebihi 230MB',
          });
        } else {
          if (!result.didCancel) {
            setAttachmentTemporary(data);
            setProgressUpload('0%');
            uploadingImage(result?.assets);
          }
        }
      }
    } catch (e) {}
  };

  const onUploadImageAndroid = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'video',
        presentationStyle: 'fullScreen',
      });

      if (isFileFormatMustMP4(result?.assets[0]?.fileName)) {
        Toast.show({
          type: 'error',
          text1: 'Extensi video rekaman harus mp4!',
        });
        return;
      }

      if (result?.assets?.[0]?.fileSize > 241172480) {
        Toast.show({
          type: 'error',
          text1: 'File tidak bisa melebihi 230MB',
        });
      } else {
        if (!result.didCancel) {
          const data = {
            ...result?.assets?.[0],
            fileType: 'video',
          };
          setAttachmentTemporary(data);
          setProgressUpload('0%');
          uploadingImage(result?.assets);
        }
      }
    } catch (e) {}
  };

  const onUploadImage: any = () => {
    if (Platform.OS === 'ios') {
      onUploadImageIos()
        .then(() => {
          _handlerOnCloseSwipeUpUpload();
        })
        .catch(() => {
          _handlerOnCloseSwipeUpUpload();
        });
    } else {
      _handlerAndroidPermission()
        .then(() => _handlerOnCloseSwipeUpUpload())
        .catch(() => _handlerOnCloseSwipeUpUpload());
      onUploadImageAndroid()
        .then(() => _handlerOnCloseSwipeUpUpload())
        .catch(() => _handlerOnCloseSwipeUpUpload());
    }
  };

  return {
    kurikulum,
    classes,
    subject,
    materialsType,
    setKurikulum,
    setClasses,
    setSubject,
    setMaterialsType,
    navigation,
    chapter,
    setChapter,
    isShowClasses,
    isShowKurikulum,
    isShowMaterialsType,
    isShowAvoidNotSaved,
    setIsShowClasses,
    setIsShowKurikulum,
    setIsShowMaterialsType,
    setIsShowAvoidNotSaved,

    getMaterialTypes,

    _handlerClose,
    isShowPopup,
    popupData,
    postSchoolMaterial,
    materialsTitle,
    setMaterialsTitle,
    submited,
    materialsParams,

    //upload
    isShowSwipeUpUpload,
    attachmentTemporary,
    progressUpload,
    uploadList,
    indexAttachment,
    setIndexAttachment,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
    _handlerShowSwipeUpUpload,
    _handlerOnCloseSwipeUpUpload,
    _handlerDocumentSelection,
    loading,
    loadingFetchFile,
    handleValidData,
  };
};

export default useEditSchoolMaterials;
