import {
  useMergeState,
  _handlerConvertDatePicker,
  iosPhotoGalleryPermission,
  _handlerConvertAllDate,
  parseImagePath,
  showLoading,
  dismissLoading,
  showErrorToast,
} from '@constants/functional';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import provider from '@services/lms/provider';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import DocumentPicker from 'react-native-document-picker';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Maskot3 from '@assets/svg/maskot_3.svg';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import {apiPost, apiUploadFormData, apiUploadingStatus} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {IMediaType} from '@api/types';
import {ParamList} from 'type/screen';
import {useActiveCurriculum} from '@features/IKM/zustand';
interface IDatePicker {
  day: any;
  date: any;
  month: any;
  year: any;
  hour: any;
  minute: any;
}

interface RootState {
  getUser: any;
}

const useLMSTeacherFormClassSessionScreen = () => {
  const route =
    useRoute<RouteProp<ParamList, 'LMSTeacherFormClassSessionScreen'>>();
  const {navigate_from, data, classSessionId, teacherId}: any = route?.params;
  const {getUser} = useSelector((state: RootState) => state);
  const {user_type_id} = getUser?.data;
  const isFromDetailLMS = navigate_from == 'LMSTeacherDetailClassSessionScreen';

  const dataPropsType =
    data?.type == 'live'
      ? 'Langsung'
      : data?.type == 'record'
      ? 'Rekaman'
      : false;

  const dataPropsPlatform =
    data?.platform == 'zoom'
      ? 'Zoom'
      : data?.platform == 'google_meet'
      ? 'Google Meet'
      : false;

  const dataPropsMediaId = data?.media?.media || false;
  const dataPropsCurriculumName = data?.curriculum?.name || false;
  const dataPropsCurriculumId = data?.curriculum?.id || false;
  const dataPropsClassId = data?.rombel_class?.id || false;
  const dataPropsClass = data?.rombel_class?.name || false;
  const dataPropsSubjectMatterId = data?.subject?.id || false;
  const dataPropsSubjectMatterName = data?.subject?.name || false;
  const dataPropsTitle = data?.title || false;
  const dataStartDate =
    _handlerConvertAllDate(data?.time_start, 7, 3, 2) || false;
  const dataPropsStartDate =
    !dataStartDate || dataStartDate == '-' ? false : dataStartDate;
  const dataPropsDuration = `${data?.duration || ''}`;
  const dataPropsDescription = data?.description || false;

  const [state, setState] = useMergeState({
    isLoading: false,
    isShowSwipeUpUpload: false,
    isShowSwipeUpInfromation: false,
    isShowSwipeUpChooseDate: false,
    isShowSwipeUpCurriculum: false,
    isShowSwipeUpClass: false,
    isShowSwipeUpSubjectMatter: false,
    isShowSnackBar: false,
    type: dataPropsType || 'Langsung',
    platform: dataPropsPlatform || 'Google Meet',
    isShowPopup: false,
    popupData: false,
    datePickerFrom: dataPropsStartDate,
    datePickerFromErrorMessage: '',
    curriculumId: dataPropsCurriculumId,
    curriculumName: dataPropsCurriculumName,
    curriculumData: false,
    curriculumErrorMessage: '',
    rombelClassId: false,
    classId: dataPropsClassId,
    className: dataPropsClass,
    classData: false,
    classErrorMessage: '',
    subjectMatterId: dataPropsSubjectMatterId,
    subjectMatterName: dataPropsSubjectMatterName,
    subjectMatterData: false,
    subjectMatterErrorMessage: '',
    title: {
      value: dataPropsTitle,
      isValid: dataPropsTitle || false,
      errorMessage: '',
    },
    duration: {
      value: dataPropsDuration,
      isValid: dataPropsDuration || false,
      errorMessage: '',
    },
    description: dataPropsDescription,
    attachmentData: false,
    attachmentDataId: dataPropsMediaId,
    attachmentErrorMessage: '',
    attachmentTemporary: false,
    snackBarLabel: false,
    snackBarType: 'SUCCESS',
    progressUpload: '0%',
  });

  const {
    isShowPopup,
    popupData,
    isLoading,
    isShowSwipeUpUpload,
    isShowSwipeUpInfromation,
    isShowSwipeUpChooseDate,
    isShowSwipeUpCurriculum,
    isShowSwipeUpClass,
    isShowSwipeUpSubjectMatter,
    isShowSnackBar,
    type,
    platform,
    datePickerFrom,
    datePickerFromErrorMessage,
    curriculumId,
    curriculumName,
    curriculumData,
    curriculumErrorMessage,
    rombelClassId,
    classId,
    className,
    classErrorMessage,
    subjectMatterId,
    subjectMatterName,
    subjectMatterData,
    subjectMatterErrorMessage,
    title,
    duration,
    description,
    attachmentDataId,
    attachmentErrorMessage,
    attachmentTemporary,
    snackBarLabel,
    snackBarType,
    progressUpload,
    classData,
  }: any = state;

  const isFocused = useIsFocused();

  const activeCuriculums = useActiveCurriculum();
  const listMp4Extension = ['mp4', 'MP4', 'mP4', 'Mp4'];
  const size1Kb = 1000000;
  const setMaxLimitInMb = 230; // change this value to set max limit in Mb
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherFormClassSessionScreen'>
    >();

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
        _handlerOnCloseSwipeUpUpload();

        setTimeout(() => {
          onUploadImage();
        }, 300);
      },
    },
    {
      icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
      label: 'Ambil dari File',
      onPress: () => {
        _handlerOnCloseSwipeUpUpload();

        setTimeout(() => {
          _handlerDocumentSelection();
        }, 300);
      },
    },
  ];

  const uploadingFile = async (asset: any) => {
    try {
      const formData = new FormData();
      formData.append('attachment', {
        name: asset?.[0]?.name,
        type: asset?.[0]?.type,
        uri: parseImagePath(asset?.[0]?.uri),
      });
      formData.append('type', 'attendance');
      formData.append('sub_type', 'approval');
      const resUploadVideo = await apiUploadFormData<IMediaType>({
        url: URL_PATH.upload_video,
        body: formData,
      });
      const resStatusUpload = await apiUploadingStatus({
        fileId: resUploadVideo.ID || '',
        mediaType: 'video',
        progress: 0,
        callbackProgress: (progress: number) => {
          setState({progressUpload: `${progress}%`});
        },
      });
      setTimeout(() => {
        setState({
          attachmentDataId: resStatusUpload?.ID,
          attachmentData: resStatusUpload,
          // progressUpload: '100%',
        });
      }, 500);
    } catch (error) {
      // console.log('error when upload file ', error);
    }
  };

  const uploadingImage = async (asset: ImagePickerResponse['assets']) => {
    try {
      const formData = new FormData();
      formData.append('attachment', {
        name: asset?.[0]?.fileName,
        type: asset?.[0]?.type,
        uri: parseImagePath(asset?.[0]?.uri || ''),
      });
      formData.append('type', 'attendance');
      formData.append('sub_type', 'approval');
      const resUploadVideo = await apiUploadFormData<IMediaType>({
        url: URL_PATH.upload_video,
        body: formData,
      });
      const resStatusUpload = await apiUploadingStatus({
        fileId: resUploadVideo.ID || '',
        mediaType: 'video',
        callbackProgress: (progress: number) => {
          setState({progressUpload: `${progress}%`});
        },
      });

      setTimeout(() => {
        setState({
          attachmentDataId: resStatusUpload?.ID,
          attachmentData: resStatusUpload,
          // progressUpload: '100%',
        });
      }, 500);
    } catch (error) {
      // console.log('error when upload image ', error);
    }
  };

  const onUploadImageIos = async () => {
    try {
      const permit = await iosPhotoGalleryPermission();

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'mixed',
          presentationStyle: 'fullScreen',
        });

        const data = {
          ...result?.assets?.[0],
          fileType: 'image',
        };

        if (!result.didCancel) {
          const maxLimit = size1Kb * setMaxLimitInMb;
          const fileName = result?.assets[0]?.fileName;
          const fileSize = result?.assets[0]?.fileSize;
          const extensionFile = fileName.split('.')?.pop();
          const isFileLowerThanMaxLimit = fileSize <= maxLimit;
          const isFileHigherThanMaxLimit = fileSize > maxLimit;
          const isFileFormatNotValid =
            !listMp4Extension.includes(extensionFile);

          if (isFileFormatNotValid) {
            setState({
              popupData: {
                title: 'Peringatan!',
                description: 'Extensi video rekaman harus mp4!',
                labelConfirm: 'Mengerti',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          } else if (isFileHigherThanMaxLimit) {
            setState({
              popupData: {
                title: 'Peringatan!',
                description: `Ukuran maksimal video rekaman ${setMaxLimitInMb}mb!`,
                labelConfirm: 'Mengerti',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          } else if (isFileLowerThanMaxLimit) {
            setState({
              attachmentTemporary: data,
              progressUpload: '0%',
            });
            uploadingImage(result?.assets);
          }
        }
      }
    } catch (e) {}
  };

  const onUploadImageAndroid = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'mixed',
        presentationStyle: 'fullScreen',
      });

      const data = {
        ...result?.assets?.[0],
        fileType: 'image',
      };

      if (!result.didCancel) {
        const maxLimit = size1Kb * setMaxLimitInMb;
        const fileName = result?.assets[0]?.fileName;
        const fileSize = result?.assets[0]?.fileSize;
        const extensionFile = fileName.split('.')?.pop();
        const isFileLowerThanMaxLimit = fileSize <= maxLimit;
        const isFileHigherThanMaxLimit = fileSize > maxLimit;
        const isFileFormatNotValid = !listMp4Extension.includes(extensionFile);

        if (isFileFormatNotValid) {
          setState({
            popupData: {
              title: 'Peringatan!',
              description: 'Extensi video rekaman harus mp4',
              labelConfirm: 'Mengerti',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        } else if (isFileHigherThanMaxLimit) {
          setState({
            popupData: {
              title: 'Peringatan!',
              description: `Ukuran maksimal video rekaman ${setMaxLimitInMb}mb!`,
              labelConfirm: 'Mengerti',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        } else if (isFileLowerThanMaxLimit) {
          setState({
            attachmentTemporary: data,
            progressUpload: '0%',
          });
          uploadingImage(result?.assets);
        }
      }
    } catch (e) {}
  };

  const onUploadImage: any = () => {
    if (Platform.OS === 'ios') {
      onUploadImageIos();
    } else {
      _handlerAndroidPermission();
      onUploadImageAndroid();
    }
  };

  const _handlerOnCloseAttachmentUpload = () => {
    setState({
      attachmentTemporary: false,
      attachmentDataId: false,
      progressUpload: '0%',
    });
  };

  const _handlerReUploadImage = () => {
    setState({
      attachmentTemporary: false,
      attachmentDataId: false,
      progressUpload: '0%',
    });
    onUploadImage();
  };

  const _handlerReUploadFile = () => {
    setState({
      attachmentTemporary: false,
      attachmentDataId: false,
      progressUpload: '0%',
    });
    _handlerDocumentSelection();
  };

  const _handlerOnPressSwipeUpSelectDateButton = () => {
    const datePicker = _handlerConvertDatePicker(valueDatePicker, 14);

    setState({
      isShowSwipeUpChooseDate: false,
      datePickerFrom: datePicker,
    });
  };

  const _handlerGetDataCurriculum = async () => {
    try {
      const result: any = await provider.getDropdownCurriculumTeacher();

      if (result?.data?.data) {
        setState({
          curriculumData: result?.data?.data,
          curriculumErrorMessage: '',
        });
        if (activeCuriculums) {
          setState({
            curriculumId: activeCuriculums?.id,
            curriculumName: activeCuriculums?.name,
          });
        }
      }
    } catch (e: any) {
      const err = {
        isError: true,
        data: e?.response?.data,
      };

      Toast.show({
        type: 'error',
        text1: err?.data?.message,
      });
    }
  };

  useEffect(() => {
    _handlerGetDataCurriculum();
  }, [isFocused]);

  const _handlerGetDataClass = async () => {
    try {
      var result;
      if (user_type_id === 6 && teacherId) {
        result = await provider.getDropdownClassAdmin(teacherId);
      } else {
        result = await provider.getDropdownClassTeacher();
      }

      if (result?.data?.data) {
        setState({
          classData: result?.data?.data,
          classErrorMessage: '',
          isShowSwipeUpClass: true,
        });
      }
    } catch (e: any) {
      const err = {
        isError: true,
        data: e?.response?.data,
      };

      Toast.show({
        type: 'error',
        text1: err?.data?.message,
      });
    }
  };

  const _handlerGetDataSubjectMatter = async () => {
    try {
      const result = await provider.getDropdownSubjectMatterTeacher(
        curriculumId,
        classId,
      );

      if (result?.data?.data) {
        setState({
          subjectMatterData: result?.data?.data,
          subjectMatterErrorMessage: '',
          isShowSwipeUpSubjectMatter: !isShowSwipeUpSubjectMatter,
        });
      }
    } catch (e: any) {
      const err = {
        isError: true,
        data: e?.response?.data,
      };

      Toast.show({
        type: 'error',
        text1: err?.data?.message,
      });
    }
  };

  const _handlerShowSwipeUpDate = () => {
    setState({
      isShowSwipeUpChooseDate: !isShowSwipeUpChooseDate,
      datePickerFromErrorMessage: '',
    });
  };

  const _handlerShowSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: !isShowSwipeUpUpload});
  };

  const _handlerShowSwipeUpInformation = () => {
    setState({isShowSwipeUpInfromation: !isShowSwipeUpInfromation});
  };

  const _handlerShowSwipeUpCurriculum = () => {
    setState({
      isShowSwipeUpCurriculum: true,
    });
  };

  const _handlerShowSwipeUpClass = () => {
    _handlerGetDataClass();
  };

  const _handlerShowSwipeUpSubjectMatter = () => {
    _handlerGetDataSubjectMatter();
  };

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });

  const currentDatePicker = _handlerConvertDatePicker(valueDatePicker, 3);
  const startDate = new Date(currentDatePicker);
  const startDateMiliSecond = startDate.getTime();
  const convStartDate =
    startDateMiliSecond + parseInt(duration?.value) * 60 * 1000;
  const endDate = new Date(convStartDate);
  const start = dayjs(startDate).locale('id').format('ddd, DD/MM/YYYY HH:mm');
  const end = dayjs(endDate).locale('id').format('HH:mm');
  const resultDate = `${start} - ${end}`;

  const _handlerDocumentSelection = useCallback(async () => {
    try {
      const response: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const fileName = response?.[0]?.name;
      const fileSize = response?.[0]?.size;
      const extensionFile = fileName.split('.')?.pop();
      const maxLimit = size1Kb * setMaxLimitInMb;
      const isFileLowerThanMaxLimit = fileSize <= maxLimit;
      const isFileHigherThanMaxLimit = fileSize > maxLimit;
      const isFileFormatNotValid = !listMp4Extension.includes(extensionFile);
      const isFileTypeImage = response?.[0]?.type?.includes('image');

      const data = {
        ...response?.[0],
        fileType: isFileTypeImage ? 'image' : 'file',
      };

      if (isFileFormatNotValid) {
        setState({
          popupData: {
            title: 'Peringatan!',
            description: 'Extensi video rekaman harus mp4',
            labelConfirm: 'Mengerti',
            onPressConfirm: () => {
              setState({isShowPopup: false});
            },
          },
          isShowPopup: true,
        });
      } else if (isFileHigherThanMaxLimit) {
        setState({
          popupData: {
            title: 'Peringatan!',
            description: `Ukuran maksimal video rekaman ${setMaxLimitInMb}mb!`,
            labelConfirm: 'Mengerti',
            onPressConfirm: () => {
              setState({isShowPopup: false});
            },
          },
          isShowPopup: true,
        });
      } else if (isFileLowerThanMaxLimit) {
        uploadingFile(response);
        setState({attachmentTemporary: data});
      }
    } catch (err) {}
  }, []);

  const _handlerOnCloseSwipeUpInformation = () => {
    setState({isShowSwipeUpInfromation: false});
  };

  const _handlerOnCloseSwipeUpChooseDate = () => {
    setState({isShowSwipeUpChooseDate: false});
  };

  const _handlerOnCloseSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: false});
  };

  const _handlerOnCloseSwipeUpCurriculum = () => {
    setState({isShowSwipeUpCurriculum: false});
  };

  const _handlerOnCloseSwipeUpClass = () => {
    setState({isShowSwipeUpClass: false});
  };

  const _handlerOnCloseSwipeUpSubjectMatter = () => {
    setState({isShowSwipeUpSubjectMatter: false});
  };

  const _handlerOnSelectCurriculum = (id: any, name: any) => {
    setState({
      curriculumId: id,
      curriculumName: name,
      isShowSwipeUpCurriculum: false,
    });
  };

  const _handlerOnSelectClass = (id: any, rombelClassId: number, name: any) => {
    setState({
      classId: id,
      className: name,
      rombelClassId: rombelClassId,
      isShowSwipeUpClass: false,
    });
  };

  const _handlerOnSelectSubjectMatter = (id: any, name: any) => {
    setState({
      subjectMatterId: id,
      subjectMatterName: name,
      isShowSwipeUpSubjectMatter: false,
    });
  };

  const _handlerOnChangeTitle = (text: any) => {
    const inputText = text;
    const isFirstConditionValid = inputText.length > 0;
    const isConditionInputTextValid = isFirstConditionValid;

    setState({
      title: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid,
        errorMessage: isConditionInputTextValid ? '' : 'Judul wajib diisi.',
      },
    });
  };

  const _handlerOnChangeDuration = (text: any) => {
    const inputText = text.trim();
    const isFirstConditionValid = inputText.length > 0;
    const isSecondConditionValid = !isNaN(text);
    const isThirdConditionValid = text.substring(0, 1) != 0;
    const isConditionInputTextValid =
      isFirstConditionValid && isSecondConditionValid && isThirdConditionValid;

    setState({
      duration: {
        value: isConditionInputTextValid ? inputText : false,
        isValid: isConditionInputTextValid,
        errorMessage: isConditionInputTextValid ? '' : 'Durasi wajib diisi.',
      },
    });
  };

  const _handlerOnChangeDescription = (text: any) => {
    setState({description: text});
  };

  const _handlerSelectedSessionClassType = (value: any) => {
    setState({type: value});
  };

  const _handlerSelectedSessionClassPlatform = (value: any) => {
    setState({platform: value});
  };

  const _handlerOnPressCloseSnackBar = () => {
    setState({isShowSnackBar: false});
  };

  const isDisableButtonSubmit =
    !curriculumId ||
    !className ||
    !subjectMatterName ||
    !title?.isValid ||
    !datePickerFrom ||
    !duration?.isValid ||
    type == 'Rekaman'
      ? !attachmentDataId
      : null;

  const _handlerValidateAllField = () => {
    const isCurriculumNotValid = !curriculumId;
    const isClassNameNotValid = !className;
    const isSubjectMatterNotValid = !subjectMatterName;
    const isTitleNotValid = !title?.isValid;
    const isDatePickerFromNotValid = !datePickerFrom;
    const isDurationNotValid = !duration?.isValid;
    const isTypeRekamanNotValid = type == 'Rekaman' ? !attachmentDataId : null;

    if (isDisableButtonSubmit) {
      if (isCurriculumNotValid) {
        setState({curriculumErrorMessage: 'Kurikulum wajib diisi.'});
      }
      if (isClassNameNotValid) {
        setState({classErrorMessage: 'Kelas wajib diisi.'});
      }
      if (isSubjectMatterNotValid) {
        if (!curriculumId || !classId) {
          setState({subjectMatterErrorMessage: 'Mata pelajaran wajib diisi.'});
        }
      }
      if (isTitleNotValid) {
        setState({title: {errorMessage: 'Judul wajib diisi.'}});
      }
      if (isDatePickerFromNotValid) {
        setState({datePickerFromErrorMessage: 'Tanggal & jam wajib diisi.'});
      }
      if (isDurationNotValid) {
        setState({duration: {errorMessage: 'Durasi wajib diisi.'}});
      }
      if (isTypeRekamanNotValid) {
        setState({curriculumErrorMessage: 'Video rekaman wajib diunggah.'});
      }
    } else {
      _handlerSubmitRequestApproval();
    }
  };

  const _handlerSubmitRequestApproval = () => {
    setState({
      popupData: {
        title: 'Simpan Sesi Kelas?',
        description: `Apakah Anda yakin untuk menyimpan\nsesi kelas yang telah dibuat?\n\n Sesi Kelas Langsung (${platform})\n${className}\n${subjectMatterName} ${title?.value}\n${resultDate}`,
        labelConfirm: 'Simpan',
        labelCancel: 'Batalkan',
        onPressConfirm: () => {
          setState({isShowPopup: false});

          const teacherIdFromAdmin =
            user_type_id === 6 ? {teacher_id: teacherId} : {};
          const mediaId = attachmentDataId ? {media_id: attachmentDataId} : {};
          const requestBody = {
            curriculum_id: curriculumId,
            rombel_class_id: rombelClassId,
            rombel_class: className,
            subject_id: subjectMatterId,
            subject: subjectMatterName,
            title: title?.value,
            description: description || '',
            time_start: _handlerConvertDatePicker(valueDatePicker, 15),
            duration: parseInt(duration?.value),
            type: type == 'Langsung' ? 'live' : 'record',
            platform:
              type == 'Rekaman'
                ? 'record'
                : platform === 'Zoom'
                ? 'zoom'
                : platform == 'Google Meet'
                ? 'google_meet'
                : platform,
            ...teacherIdFromAdmin,
            ...mediaId,
          };

          if (isFromDetailLMS) {
            _handlerSubmitUpdateData(requestBody);
          } else {
            _handlerSubmitCreateData(requestBody);
          }
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
    });
  };

  const _handlerPopupNotSaved = () => {
    setState({
      popupData: {
        icon: Maskot3,
        title: 'Jadwal Belum Disimpan',
        description:
          'Apakah Anda yakin untuk keluar?\nJadwal sesi kelas belum disimpan.',
        labelConfirm: 'Lanjutkan',
        labelCancel: 'Keluar',
        onPressConfirm: () => {
          setState({isShowPopup: false});
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
          navigation?.goBack();
          // karena kalau di akses dari homepage maka dia akan nested loop terus menerus ke LMSTeacherClassSessionScreen
          // maka dari itu Fajar ganti ke navigation.goBack() biar bisa kembali ke halaman homepage
          // navigation?.navigate('LMSTeacherClassSessionScreen', {});
        },
      },
      isShowPopup: true,
    });
  };

  const checkIsStartTimeValid = async (data: any) => {
    try {
      const body = {
        id: data?.id || 0,
        type: data?.form_type,
        time_start: data?.time_start,
        teacherId: teacherId,
      };
      await apiPost({
        url: URL_PATH.post_check_class_session,
        body,
      });
    } catch (error) {
      throw error;
    }
  };

  const _handlerSubmitCreateData = async (requestBody: any) => {
    try {
      showLoading();
      requestBody.form_type = 'add';
      await checkIsStartTimeValid(requestBody);
      const res = await provider.postCreateClassSession(requestBody);

      if (res?.status == 200) {
        setState({
          isLoading: false,
        });
        navigation.navigate('LMSTeacherClassSessionScreen', {});
        Toast.show({
          type: 'success',
          text1: 'Sesi kelas berhasil dijadwalkan.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sesi kelas gagal dijadwalkan.',
        });
      }
    } catch (e: any) {
      if (typeof e === 'string') {
        setState({datePickerFromErrorMessage: e});
        return;
      }
      const errorResponseData = e?.response?.data;

      if (errorResponseData?.code === 222) {
        navigation.navigate('LMSTeacherFormErrorClassSessionScreen');
      }

      if (errorResponseData?.message) {
        Toast.show({
          type: 'error',
          text1: errorResponseData?.message || 'Internal Server Error',
        });
      }
    } finally {
      dismissLoading();
    }
  };

  const _handlerSubmitUpdateData = async (requestBody: any) => {
    try {
      showLoading();
      requestBody.form_type = 'edit';
      await checkIsStartTimeValid(requestBody);
      const res = await provider.putUpdateClassSession(
        requestBody,
        classSessionId,
      );

      if (res?.status == 200) {
        setState({
          isShowSnackBar: true,
          snackBarType: 'SUCCESS',
          snackBarLabel: 'Perubahan disimpan.',
        });

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
          navigation.navigate('LMSTeacherClassSessionScreen', {});
        }, 500);
      } else {
        setState({
          isShowSnackBar: true,
          snackBarType: 'FAILED',
          snackBarLabel: 'Perubahan gagal disimpan.',
        });

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
        }, 500);
      }
    } catch (e: any) {
      if (typeof e === 'string') {
        return showErrorToast(e);
      }
      setState({
        isShowSnackBar: true,
        snackBarType: 'FAILED',
        snackBarLabel: e?.response?.data?.message || 'Perubahan gagal disimpan',
      });

      setTimeout(() => {
        setState({
          isShowSnackBar: false,
        });
      }, 500);
    } finally {
      dismissLoading();
    }
  };

  return {
    isLoading,
    valueDatePicker,
    isShowSwipeUpChooseDate,
    isShowSwipeUpInfromation,
    isShowSwipeUpUpload,
    isShowSwipeUpCurriculum,
    isShowSwipeUpClass,
    isShowSwipeUpSubjectMatter,
    type,
    platform,
    isShowPopup,
    popupData,
    attachmentTemporary,
    isShowSnackBar,
    snackBarLabel,
    snackBarType,
    progressUpload,
    uploadList,
    curriculumId,
    curriculumName,
    curriculumData,
    curriculumErrorMessage,
    classId,
    classData,
    className,
    classErrorMessage,
    subjectMatterId,
    subjectMatterName,
    subjectMatterData,
    subjectMatterErrorMessage,
    title,
    duration,
    description,
    datePickerFrom,
    datePickerFromErrorMessage,
    isDisableButtonSubmit,
    isFromDetailLMS,
    attachmentDataId,
    attachmentErrorMessage,
    setValueDatePicker,
    _handlerOnCloseSwipeUpChooseDate,
    _handlerOnCloseSwipeUpUpload,
    _handlerShowSwipeUpDate,
    _handlerShowSwipeUpUpload,
    _handlerShowSwipeUpInformation,
    _handlerSelectedSessionClassType,
    _handlerSelectedSessionClassPlatform,
    _handlerSubmitRequestApproval,
    _handlerOnPressSwipeUpSelectDateButton,
    _handlerOnChangeTitle,
    _handlerOnChangeDuration,
    _handlerOnChangeDescription,
    _handlerOnPressCloseSnackBar,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
    _handlerOnCloseSwipeUpInformation,
    _handlerOnCloseSwipeUpCurriculum,
    _handlerOnCloseSwipeUpClass,
    _handlerOnCloseSwipeUpSubjectMatter,
    _handlerShowSwipeUpCurriculum,
    _handlerShowSwipeUpClass,
    _handlerShowSwipeUpSubjectMatter,
    _handlerOnSelectCurriculum,
    _handlerOnSelectClass,
    _handlerOnSelectSubjectMatter,
    _handlerPopupNotSaved,
    _handlerValidateAllField,
  };
};

export default useLMSTeacherFormClassSessionScreen;
