import {
  iosPhotoGalleryPermission,
  isFileFormatMustMP4,
  useMergeState,
} from '@constants/functional';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {fetchGetCurriculum, fetchMaterialTypes} from '@redux';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RobotClose from '@assets/svg/Robot_close.svg';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid, Platform} from 'react-native';
import {useUploadFile, useUploadVideo} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {launchImageLibrary} from 'react-native-image-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useGetCurriculumActive, useGetRombelClassList} from '@services/lms';

interface RootState {
  curriculum: any;
  getMaterialTypes: any;
  getClassByDegree: any;
  getUser: any;
}

const useAddSchoolMaterials = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'AddSchoolMaterialsScreen'>>();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamList, 'AddSchoolMaterialsScreen'>>();
  const subjectParams = route?.params?.subjectParams;
  const chapterParams = route?.params?.chapterParams;
  const materialsParams = route?.params?.materialsParams;
  const {refetch: getListClass, data: listClassRes} = useGetRombelClassList();
  const listClass = listClassRes?.data;
  //get curriculumData
  const {curriculum, getMaterialTypes, getUser} = useSelector(
    (state: RootState) => state,
  );

  const school_id: string = getUser?.data?.school?.id;

  //get data fetching api
  useEffect(() => {
    dispatch(fetchGetCurriculum());
    dispatch(fetchMaterialTypes());
  }, [dispatch]);

  //set show swipeup
  const [isShowKurikulum, setIsShowKurikulum] = useState<boolean>(false);
  const [isShowClasses, setIsShowClasses] = useState<boolean>(false);
  const [isShowMaterialsType, setIsShowMaterialsType] =
    useState<boolean>(false);
  const [isShowAvoidNotSaved, setIsShowAvoidNotSaved] =
    useState<boolean>(false);

  //get curriculum from home
  const {refetch: getActiveCurriculum, data: curriculumData} =
    useGetCurriculumActive();
  const curriculumActive = curriculumData;
  useEffect(() => {
    getListClass();
  }, []);

  useEffect(() => {
    if (curriculum) {
      getActiveCurriculum();
    }
  }, [curriculum]);

  const getCurriculum = async () => {
    const getNameCurriculum = curriculum?.data
      ?.filter((x: any) => x?.id === Number(curriculumActive?.curricullum_id))
      .map((x: any) => x?.name);

    setKurikulum({
      ...kurikulum,
      value: getNameCurriculum?.toString(),
      id: curriculumActive?.curricullum_id,
    });
  };
  useEffect(() => {
    if (curriculumActive) {
      getCurriculum();
    }
  }, [curriculumActive]);

  useEffect(() => {
    if (subjectParams) {
      setSubject({
        ...subject,
        value: subjectParams?.name,
        id: subjectParams?.id,
      });
    }
  }, [subjectParams]);

  useEffect(() => {
    if (chapterParams) {
      setChapter({
        ...chapter,
        value: chapterParams?.name,
        id: chapterParams?.id,
      });
    }
  }, [chapterParams]);

  //set data
  const [kurikulum, setKurikulum] = useState<any>({
    title: 'Kurikulum',
    initValue: 'Pilih Kurikulum',
    value: 'Pilih Kurikulum',
    error: false,
    onPress: () => {
      setIsShowKurikulum(true);
    },
    disabled: false,
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

  const [materialsType, setMaterialsType] = useState<any>([
    {
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
    },
  ]);
  const [materialsIndex, setMaterialsIndex] = useState<number>(0);
  const [materialsTitle, setMaterialsTitle] = useState<any>([]);
  const [submited, setSubmited] = useState<boolean>(false);
  const [dataType, setDataType] = useState([
    kurikulum,
    classes,
    subject,
    chapter,
  ]);
  useEffect(() => {
    setDataType([kurikulum, classes, subject, chapter]);
  }, [kurikulum, classes, subject, chapter]);

  useEffect(() => {
    if (materialsParams) {
      setSubject({
        ...subject,
        value: materialsParams?.subject?.name,
        id: materialsParams?.subject?.id,
      });
      setClasses({
        ...classes,
        value: materialsParams?.classes?.name,
        id: materialsParams?.classes?.id,
      });

      const getNameCurriculum = curriculum?.data
        ?.filter((x: any) => x?.id === Number(materialsParams?.curriculum))
        .map((x: any) => x?.name);

      setKurikulum({
        ...kurikulum,
        value: getNameCurriculum.toString(),
        id: materialsParams?.curriculum,
      });
    }
  }, []);

  useEffect(() => {
    const combinedMaterialsType = materialsType.map(
      (item: any, index: number) => {
        return {
          ...item,
          postTitle: materialsTitle[index] || '',
        };
      },
    );

    // Usage:
    setMaterialsType(combinedMaterialsType);
  }, [materialsTitle]);

  useEffect(() => {
    if (!materialsParams) {
      setSubject({
        title: 'Mata Pelajaran',
        initValue: 'Pilih Mata Pelajaran',
        value: 'Pilih Mata Pelajaran',
        error: false,
      });
    }
  }, [classes?.value, kurikulum?.value]); // reset pilih mata pelajaran setiap ada perubahan kelas

  useEffect(() => {
    if (!materialsParams) {
      setChapter({
        title: 'Bab',
        initValue: 'Pilih Bab',
        value: 'Pilih Bab',
        error: false,
      });
    }
  }, [classes?.value, subject?.value, curriculum?.value]); // reset pilih bab setiap ada perubahan kelas atau mata pelajaran

  const navigateToScreen = (type: string) => {
    if (type === 'Mata Pelajaran') {
      navigation.navigate('ListSubjectSchoolMaterialsScreen', {
        curriculum_id: kurikulum?.id,
        class_id: classes?.id,
        class_name: classes?.value,
        subject_id: subject?.id,
      });
    } else {
      navigation.navigate('ListChapterSchoolMaterialsScreen', {
        subject_id: subject?.id,
        class_name: `${classes?.value ?? ''} • ${subject?.value ?? ''}`,
        chapter_id: chapter?.id,
        materialsParams: materialsParams,
      });
    }
  };

  const handleDisabled = (type: string) => {
    if (type === 'Mata Pelajaran') {
      if (classes?.value === classes.initValue) {
        return true;
      }
    } else if (type === 'Bab') {
      if (subject?.value === subject.initValue) {
        return true;
      }
    }
    return false;
  };

  const [state, setState] = useMergeState({
    isShowPopup: false,
    popupData: false,
    isShowSwipeUpUpload: false,
  });
  const {isShowPopup, popupData, isShowSwipeUpUpload} = state;
  const [indexAttachment, setIndexAttachment] = useState<number>(0);
  const [attachmentTemporary, setAttachmentTemporary] = useState<any>([]);
  const [attachmentData, setAttachmentData] = useState<any[]>([]);
  const [progressUpload, setProgressUpload] = useState<any>([]);

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
    const valid = dataType?.every((item: any) => !item.error);
    const validValue = dataType?.every(
      (item: any) => item?.initValue !== item?.value,
    );
    const validMaterials = materialsType?.every(
      (item: any) => item.error && item?.initValue === item?.value,
    );

    const validNameMaterials = materialsTitle?.every((item: any) => !item);
    const validAttachmentData =
      attachmentData?.length !== 0 &&
      attachmentData?.length === materialsType?.length &&
      attachmentData?.every((item: any) => item?.ID !== '' && item !== null);
    const validProgressUpload =
      progressUpload.length !== 0
        ? progressUpload
            ?.filter((item: any) => item !== null)
            ?.every((item: any) => item === '100%')
        : true;

    if (
      !valid ||
      !validValue ||
      validMaterials ||
      validNameMaterials ||
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
      var content: any = [];
      materialsType?.map((i: any, index: number) => {
        content.push({
          title: materialsTitle[index],
          learning_method_id: i?.id ?? '',
          description: '',
          file_id: attachmentData[index]?.ID ?? '',
          orders: index + 1,
        });
      });

      const body = {
        school_id: school_id,
        curriculum_id: kurikulum?.id,
        class_id: classes?.id,
        subject_id: subject?.id,
        chapter_id: chapter?.id,
        content: content,
      };
      const res = await api.post(URL_PATH.post_school_materials, body);
      if (res?.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Materi Sekolah Berhasil Disimpan.',
        });
        navigation.navigate('ManageSchoolMaterialsScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: res?.data?.message ?? '',
        });
        const updatedDataType = dataType.map(item => {
          return {
            ...item,
            error: item.value === item.initValue,
          };
        });
        setDataType(updatedDataType);
        const updatedMaterials = materialsType.map((item: any) => {
          return {
            ...item,
            error: item.value === item.initValue,
          };
        });
        setMaterialsType(updatedMaterials);
      }
    } else {
      // set Error in unsubmitted field
      const updatedDataType = dataType.map(item => {
        return {
          ...item,
          error: item.value === item.initValue,
        };
      });
      setDataType(updatedDataType);
      const updatedMaterials = materialsType.map((item: any) => {
        return {
          ...item,
          error: item.value === item.initValue,
        };
      });
      setMaterialsType(updatedMaterials);
    }
  };

  const addSchoolMaterials = () => {
    setMaterialsType([
      ...materialsType,
      {
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
      },
    ]);
  };

  const _handlerRemoveMaterials = async (i: any, index: number) => {
    setState({
      popupData: {
        icon: RobotClose,
        title: 'Hapus Materi',
        description: 'Apakah Anda yakin untuk menghapus materi?',
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: async () => {
          setMaterialsType((prev: any) => prev?.filter((e: any) => e !== i));
          setAttachmentTemporary((prev: any) =>
            prev?.filter((e: any, ind: number) => index !== ind),
          );
          setAttachmentData((prev: any) =>
            prev?.filter((e: any, ind: number) => index !== ind),
          );
          setProgressUpload((prev: any) =>
            prev?.filter((e: any, ind: number) => index !== ind),
          );
          setState({isShowPopup: false});
          Toast.show({type: 'success', text1: 'Materi berhasil dihapus.'});
        },
      },
      isShowPopup: true,
    });
  };

  //upload
  const {mutate: uploadVideo} = useUploadVideo();
  const {mutate: uploadFile} = useUploadFile();

  const _handlerShowSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: !isShowSwipeUpUpload});
  };

  const resetAttachment = async (index: number) => {
    const newDataTemporary = [...attachmentTemporary];
    newDataTemporary[index] = null;
    const newData = [...attachmentData];
    newData[index] = null;
    const newDataProgress = [...progressUpload];
    newDataProgress[index] = null;
    setAttachmentTemporary(newDataTemporary);
    setAttachmentData(newData);
    setProgressUpload(newDataProgress);
  };
  const _handlerOnCloseAttachmentUpload = (index: number) => {
    resetAttachment(index);
  };

  const _handlerReUploadImage = (index: any) => {
    resetAttachment(index);
    onUploadImage(index);
  };

  const _handlerReUploadFile = (index: any) => {
    resetAttachment(index);
    _handlerDocumentSelection(index)
      .then(() => _handlerOnCloseSwipeUpUpload())
      .catch(() => _handlerOnCloseSwipeUpUpload());
  };

  const _handlerOnCloseSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: false});
  };

  const _handlerDocumentSelection = async (index: number) => {
    try {
      const type =
        materialsType[index]?.type === 'presentation'
          ? [DocumentPicker.types.ppt, DocumentPicker.types.pptx]
          : materialsType[index]?.type === 'ebook'
          ? DocumentPicker.types.pdf
          : materialsType[index]?.type === 'video'
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
        const newData = [...attachmentTemporary];
        newData[index] = data;
        setAttachmentTemporary(newData);
        const newDataProgress = [...progressUpload];
        newDataProgress[index] = '0%';
        setProgressUpload(newDataProgress);
        if (isFileTypeImage) {
          uploadingImage(response, index);
        } else {
          uploadingFile(response, index);
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
        _handlerDocumentSelection(indexAttachment)
          .then(() => _handlerOnCloseSwipeUpUpload())
          .catch(() => _handlerOnCloseSwipeUpUpload());
      },
    },
  ];

  const uploadingFile = (asset: any, index: number) => {
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
          setProgressUpload((prevState: any) => {
            const newData = [...prevState];
            newData[index] = `${percentCompleted}%`;
            return newData;
          });
        }
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Content-Length': asset?.[0]?.size,
      },
    };
    uploadFile(formData, null, config).then((res: IUploadImageResponse) => {
      setTimeout(() => {
        const dataA = res?.data;
        setAttachmentData(prev => {
          const newData = [...prev];
          newData[index] = dataA;
          return newData;
        });
        setProgressUpload((prevState: any) => {
          const newData = [...prevState];
          newData[index] = '100%';
          return newData;
        });
      }, 100);
    });
  };

  const uploadingImage = (asset: any, index: number) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.fileName || asset?.[0]?.name,
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
          setProgressUpload((prevState: any) => {
            const newData = [...prevState];
            newData[index] = `${percentCompleted}%`;
            return newData;
          });
        }
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Content-Length': asset?.[0]?.size,
      },
    };

    uploadVideo(formData, null, config).then((res: IUploadImageResponse) => {
      setTimeout(() => {
        const dataAttachment = res?.data;
        setAttachmentData(prev => {
          const newDataAttachment = [...prev];
          newDataAttachment[index] = dataAttachment;
          return newDataAttachment;
        });
        setProgressUpload((prevState: any) => {
          const newData = [...prevState];
          newData[index] = '100%';
          return newData;
        });
      }, 100);
    });
  };

  const onUploadImageIos = async (index: number) => {
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
            const newData = [...attachmentTemporary];
            newData[index] = data;
            setAttachmentTemporary(newData);
            const newDataProgress = [...progressUpload];
            newDataProgress[index] = '0%';
            setProgressUpload(newDataProgress);
            uploadingImage(result?.assets, index);
          }
        }
      }
    } catch (e) {}
  };

  const onUploadImageAndroid = async (index: number) => {
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
          const newData = [...attachmentTemporary];
          newData[index] = data;
          setAttachmentTemporary(newData);
          const newDataProgress = [...progressUpload];
          newDataProgress[index] = '0%';
          setProgressUpload(newDataProgress);
          uploadingImage(result?.assets, index);
        }
      }
    } catch (e) {}
  };

  const onUploadImage: any = () => {
    if (Platform.OS === 'ios') {
      onUploadImageIos(indexAttachment)
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
      onUploadImageAndroid(indexAttachment)
        .then(() => _handlerOnCloseSwipeUpUpload())
        .catch(() => _handlerOnCloseSwipeUpUpload());
    }
  };

  return {
    dataType,
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
    curriculum,
    getMaterialTypes,
    navigateToScreen,
    handleDisabled,
    listClass,
    _handlerClose,
    isShowPopup,
    popupData,
    postSchoolMaterial,
    materialsTitle,
    setMaterialsTitle,
    submited,
    materialsIndex,
    setMaterialsIndex,
    addSchoolMaterials,
    materialsParams,
    _handlerRemoveMaterials,

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
    handleValidData,
  };
};

export default useAddSchoolMaterials;
