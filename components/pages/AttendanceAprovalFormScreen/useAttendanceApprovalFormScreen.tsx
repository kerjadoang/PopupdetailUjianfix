import {
  useMergeState,
  _handlerConvertDatePicker,
  iosPhotoGalleryPermission,
  _handlerConvertAllDate,
  _handlerComplete2Digit,
} from '@constants/functional';
import {useUploadImage, useUploadFile} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import dayjs from 'dayjs';
import {useCallback, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Maskot13 from '@assets/svg/maskot_13.svg';
import provider from '@services/lms/provider';
import {useNavigation} from '@react-navigation/native';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import DocumentPicker from 'react-native-document-picker';
import React from 'react';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

interface RootState {
  getUser: any;
}

const useAttendanceApprovalFormScreen = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const addDays = (dateTime: any, count_days = 0) => {
    return new Date(
      new Date(dateTime).setDate(dateTime?.getDate() + count_days),
    );
  };

  const currentTime = new Date();
  const navigation: any = useNavigation();
  const tommorowTime = addDays(currentTime, 1);
  const convFromDatePicker = _handlerConvertAllDate(currentTime, 6, 3);
  const convUntilDatePicker = _handlerConvertAllDate(tommorowTime, 6, 3);
  const initialDatePickerFromUntil = `${_handlerConvertAllDate(
    currentTime,
    1,
    2,
  )} - ${_handlerConvertAllDate(tommorowTime, 1, 2)}`;

  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const currentMMYYYY = `${year}-${month + 1}`;

  const [state, setState] = useMergeState({
    isLoading: false,
    isShowSwipeUpUpload: false,
    isShowSwipeUpDate: false,
    isShowSwipeUpChooseDate: false,
    isShowSnackBar: false,
    selectedFilter: currentMMYYYY,
    attendanceReason: 'Sakit',
    isShowPopup: false,
    popupData: false,
    datePickerType: false,
    datePickerFrom: convFromDatePicker,
    datePickerUntil: convUntilDatePicker,
    note: '',
    absentCount: 1,
    datePickerFromUntil: initialDatePickerFromUntil,
    attachmentData: false,
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
    isShowSwipeUpDate,
    isShowSwipeUpChooseDate,
    isShowSnackBar,
    attendanceReason,
    datePickerType,
    datePickerFrom,
    datePickerUntil,
    note,
    absentCount,
    datePickerFromUntil,
    attachmentData,
    attachmentTemporary,
    snackBarLabel,
    snackBarType,
    progressUpload,
  }: any = state;

  const {mutate: uploadImage} = useUploadImage();
  const {mutate: uploadFile} = useUploadFile();

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const userTypeId = getUser?.data?.user_type_id;
  const isUserStudent = userTypeId == 1;
  const listAllowedExtension = [
    'doc',
    'DOC',
    'pdf',
    'PDF',
    'png',
    'PNG',
    'jpeg',
    'JPEG',
    'jpg',
    'JPG',
  ];
  const size1Kb = 1000000;
  const setMaxLimitInMb = 100; // change this value to set max limit in Mb
  const datePickerConvertFrom = _handlerConvertDatePicker(datePickerFrom);
  const datePickerConvertUntil = _handlerConvertDatePicker(datePickerUntil);
  const dateFromUntil =
    `${_handlerConvertDatePicker(datePickerFrom)} - ${_handlerConvertDatePicker(
      datePickerUntil,
    )}` || '-';

  const date1 = dayjs(
    `${datePickerFrom.year}-${datePickerFrom.month}-${datePickerFrom.date}`,
  );
  const date2 = dayjs(
    `${datePickerUntil.year}-${datePickerUntil.month}-${datePickerUntil.date}`,
  );
  const differentDateFromUntil = date2.diff(date1, 'day') + 1;
  const isDisableButtonReset = !datePickerFrom && !datePickerUntil;
  const isDisableButtonApply = !datePickerFrom || !datePickerUntil;

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
        }, 500);
      },
    },
    {
      icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
      label: 'Ambil dari File',
      onPress: () => {
        _handlerOnCloseSwipeUpUpload();

        setTimeout(() => {
          _handlerDocumentSelection();
        }, 500);
      },
    },
  ];

  const uploadingFile = (asset: any) => {
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
        setState({progressUpload: `${i + 1}%`});
        i++;
      }
    }, 300);

    uploadFile(formData).then((res: IUploadImageResponse) => {
      clearInterval(intervalId);
      setState({progressUpload: '99.9%'});

      setTimeout(() => {
        setState({
          attachmentData: res?.data,
          progressUpload: '100%',
        });
      }, 100);
    });
  };

  const uploadingImage = (asset: ImagePickerResponse['assets']) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.fileName,
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
        setState({progressUpload: `${i + 1}%`});
        i++;
      }
    }, 300);

    if (i > 99) {
      clearInterval(intervalId);
    }

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaData = res?.data;
      clearInterval(intervalId);

      if (mediaData) {
        setState({progressUpload: '99.9%'});

        setTimeout(() => {
          setState({
            attachmentData: mediaData,
            progressUpload: '100%',
          });
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

  const onUploadImageIos = async () => {
    try {
      const permit = await iosPhotoGalleryPermission();

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
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
            !listAllowedExtension.includes(extensionFile);

          if (isFileFormatNotValid) {
            setState({
              popupData: {
                title: 'Peringatan!',
                description: `Extensi file harus .doc/.pdf/.png/.jpeg,\nfile yang telah dikirim menggunakan ekstensi .${extensionFile}`,
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
                description: `Ukuran maksimal file ${setMaxLimitInMb}mb!`,
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
        mediaType: 'photo',
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
          !listAllowedExtension.includes(extensionFile);

        if (isFileFormatNotValid) {
          setState({
            popupData: {
              title: 'Peringatan!',
              description: `Extensi file harus .doc/.pdf/.png/.jpeg,\nfile yang telah dikirim menggunakan ekstensi .${extensionFile}`,
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
              description: `Ukuran maksimal file ${setMaxLimitInMb}mb!`,
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

  const _handlerShowSwipeUpDate = () => {
    setState({isShowSwipeUpDate: !isShowSwipeUpDate});
  };

  const _handlerOnCloseAttachmentUpload = () => {
    setState({
      attachmentTemporary: false,
      progressUpload: '0%',
    });
  };

  const _handlerReUploadImage = () => {
    setState({
      attachmentTemporary: false,
      progressUpload: '0%',
    });
    onUploadImage();
  };

  const _handlerReUploadFile = () => {
    setState({
      attachmentTemporary: false,
      progressUpload: '0%',
    });
    _handlerDocumentSelection();
  };

  const _handlerOnPressSwipeUpResetButton = () => {
    setState({
      datePickerType: false,
      datePickerFrom: false,
      datePickerUntil: false,
      datePickerFromUntil: '-',
      absentCount: 0,
    });
  };

  const _handlerOnPressSwipeUpApplyButton = () => {
    setState({
      isShowSwipeUpDate: false,
      datePickerFromUntil: dateFromUntil,
      absentCount: differentDateFromUntil,
    });
  };

  const _handlerOnPressSwipeUpSelectDateButton = () => {
    if (datePickerType == 'from') {
      setState({
        isShowSwipeUpChooseDate: false,
        datePickerFrom: valueDatePicker,
      });

      setTimeout(() => {
        setState({
          isShowSwipeUpDate: true,
        });
      }, 500);
    } else if (datePickerType == 'until') {
      setState({
        isShowSwipeUpChooseDate: false,
        datePickerUntil: valueDatePicker,
      });

      setTimeout(() => {
        setState({
          isShowSwipeUpDate: true,
        });
      }, 500);
    }
  };

  const _handlerOnPressSwipeUpFromButton = () => {
    setState({
      datePickerType: 'from',
    });

    setTimeout(() => {
      setState({
        isShowSwipeUpChooseDate: true,
      });
    }, 100);
  };

  const _handlerOnPressSwipeUpUntilButton = () => {
    setState({
      datePickerType: 'until',
    });

    setTimeout(() => {
      setState({
        isShowSwipeUpChooseDate: true,
      });
    }, 100);
  };

  const _handlerShowSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: !isShowSwipeUpUpload});
  };

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

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
      const isFileFormatNotValid =
        !listAllowedExtension.includes(extensionFile);
      const isFileTypeImage = response?.[0]?.type?.includes('image');

      const data = {
        ...response?.[0],
        fileType: isFileTypeImage ? 'image' : 'file',
      };

      if (isFileFormatNotValid) {
        setState({
          popupData: {
            title: 'Peringatan!',
            description: `Extensi file harus .doc/.pdf/.png/.jpeg/.jpg, \nfile yang telah dikirim menggunakan ekstensi .${extensionFile}`,
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
            description: `Ukuran maksimal file ${setMaxLimitInMb}mb!`,
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

  const _handlerOnCloseSwipeUpDate = () => {
    setState({isShowSwipeUpDate: false});
  };

  const _handlerOnCloseSwipeUpChooseDate = () => {
    setState({isShowSwipeUpChooseDate: false});
  };

  const _handlerOnCloseSwipeUpUpload = () => {
    setState({isShowSwipeUpUpload: false});
  };
  const _handlerOnChangeNote = (text: any) => {
    setState({note: text});
  };

  const _handlerSelectedAttendanceReason = (value: any) => {
    setState({attendanceReason: value});
  };

  const _handlerOnPressCloseSnackBar = () => {
    setState({isShowSnackBar: false});
  };

  const _handlerSubmitRequestApproval = () => {
    setState({
      popupData: {
        icon: Maskot13,
        title: 'Kirim Pengajuan Ketidakhadiran?',
        description: isUserStudent
          ? 'Pengajuan ketidakhadiran akan dikirim ke Guru untuk disetujui/ditolak. Harap cek status pengajuan secara berkala di Riwayat Pengajuan.'
          : 'Pengajuan ketidakhadiran akan dikirim ke Admin untuk disetujui/ditolak. Harap cek status pengajuan secara berkala di Riwayat Pengajuan.',
        labelConfirm: 'Kirim',
        labelCancel: 'Kembali',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          _handlerSubmitData();
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
    });
  };

  const _handlerSubmitData = async () => {
    setState({isLoading: true});

    const requestBody = {
      reason: attendanceReason,
      start_date: `${datePickerFrom.year}-${_handlerComplete2Digit(
        `${datePickerFrom.month}`,
      )}-${_handlerComplete2Digit(`${datePickerFrom.date}`)}`,
      end_date: `${datePickerUntil.year}-${_handlerComplete2Digit(
        `${datePickerUntil.month}`,
      )}-${_handlerComplete2Digit(`${datePickerUntil.date}`)}`,
      media_id: attachmentData?.ID,
      note: note,
    };

    try {
      const res = await provider.postRequestAbsent(requestBody);

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
            isShowSnackBar: true,
            snackBarType: 'SUCCESS',
            snackBarLabel: 'Ketidakhadiran berhasil diajukan.',
          });
        }, 500);

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
          navigation.replace('AttendanceAprovalListHistoryScreen');
        }, 2500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
            isShowSnackBar: true,
            snackBarType: 'FAILED',
            snackBarLabel: 'Ketidakhadiran gagal diajukan.',
          });
        }, 500);

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
        }, 2500);
      }
    } catch (e: any) {
      const errData = e?.response?.data;

      setTimeout(() => {
        setState({
          isLoading: false,
          isShowSnackBar: true,
          snackBarType: 'FAILED',
          snackBarLabel: errData?.message || 'Ketidakhadiran gagal diajukan.',
        });
      }, 500);

      setTimeout(() => {
        setState({
          isShowSnackBar: false,
        });
      }, 2500);
    }
  };

  return {
    isLoading,
    valueDatePicker,
    isShowSwipeUpDate,
    isShowSwipeUpChooseDate,
    isShowSwipeUpUpload,
    attendanceReason,
    isShowPopup,
    popupData,
    datePickerFrom,
    datePickerUntil,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFromUntil,
    isDisableButtonReset,
    isDisableButtonApply,
    absentCount,
    attachmentTemporary,
    isShowSnackBar,
    snackBarLabel,
    snackBarType,
    progressUpload,
    uploadList,
    setValueDatePicker,
    _handlerOnCloseSwipeUpDate,
    _handlerOnCloseSwipeUpChooseDate,
    _handlerOnCloseSwipeUpUpload,
    _handlerShowSwipeUpDate,
    _handlerShowSwipeUpUpload,
    _handlerSelectedAttendanceReason,
    _handlerSubmitRequestApproval,
    _handlerOnPressSwipeUpFromButton,
    _handlerOnPressSwipeUpUntilButton,
    _handlerOnPressSwipeUpResetButton,
    _handlerOnPressSwipeUpApplyButton,
    _handlerOnPressSwipeUpSelectDateButton,
    _handlerOnChangeNote,
    _handlerOnPressCloseSnackBar,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerReUploadFile,
  };
};

export default useAttendanceApprovalFormScreen;
