/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import DocumentPicker from 'react-native-document-picker';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Platform, Text, TouchableOpacity, View} from 'react-native';

import styles from './style';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import provider from '@services/lms/provider';
import {getToken} from '@hooks/getToken';
import {
  dismissLoading,
  iosPhotoGalleryPermission,
  showLoading,
} from '@constants/functional';
import {useUploadFile, useUploadImage} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {ParamList} from 'type/screen';

const __formatDateTime = (value: any, isFormatForValue?: boolean) => {
  let formatValue: any = dayjs()
    .locale('id')
    .set('date', value.date)
    .set('hour', value.hour)
    .set('minute', value.minute);

  if (isFormatForValue) {
    formatValue = formatValue.format('YYYY-MM-DD HH:mm:00');
  } else {
    formatValue = formatValue.format('ddd, DD/MM/YYYY • HH:mm');
  }

  return formatValue;
};

const useAnnouncementManageCreateScreen = () => {
  const route =
    useRoute<RouteProp<ParamList, 'AnnouncementManageCreateScreen'>>();

  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AnnouncementManageCreateScreen'>
    >();

  const {mutate: uploadImage} = useUploadImage();
  const {mutate: uploadFile} = useUploadFile();

  const uploadList = [
    {
      icon: (
        <IconGalleryBlue width={24} height={24} style={{marginRight: 12}} />
      ),
      label: 'Ambil dari Galeri',
      onPress: () => __onUploadImage(),
    },
    {
      icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
      label: 'Ambil dari File',
      onPress: () => __handlerDocumentSelection(),
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [listReceivers, setListReceivers] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachmentData, setAttachmentData] = useState<any>(null);
  const [attachmentTemporary, setAttachmentTemporary] = useState<any>(null);
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [progressUpload, setProgressUpload] = useState('0%');
  const [datePickerSent, setDatePickerSent] = useState<any>(null);
  const [datePickerFinished, setDatePickerFinished] = useState<any>(null);
  const [receivers, setReceivers] = useState<any>([]);
  const [receiversTemp, setReceiversTemp] = useState<any>([]);
  const [isShowPopUpBack, setIsShowPopUpBack] = useState(false);

  const [valueDatePicker, setValueDatePicker] = useState({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });

  const [isShowSwipeUpDatePickerSent, setIsShowSwipeUpDatePickerSent] =
    useState(false);

  const [isShowSwipeUpDatePickerFinished, setIsShowSwipeUpDatePickerFinished] =
    useState(false);

  const [isShowSwipeUpListReceiver, setIsShowSwipeUpListReceiver] =
    useState(false);

  const equalsCheck = (a: any, b: any) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const generateAllClasses = () => {
    return Array.from({length: 12}, (_, i) => `Kelas ${i + 1}`);
  };

  const checkIsAllSelected = (data: any) => {
    const getClassName = data
      .map((val: any) => val?.name)
      .filter((val: any) => !val.includes('Semua'));

    return equalsCheck(getClassName, generateAllClasses());
  };

  const formatReceiversToText = useMemo(() => {
    if (receivers.length === 0) {
      return '';
    }
    return receivers
      ?.sort((a: any) => (a?.class ? 0 : -1))
      .map((val: any) => {
        if (val?.class) {
          let names = `${val?.name} (`;
          let isAll: any = null;
          let classList = val?.class?.sort(
            (n1: any, n2: any) => n1?.id - n2?.id,
          );

          isAll = checkIsAllSelected(classList);
          classList?.forEach((_val: any) => {
            // if (!_val?.parent_id) {
            //   isAll = _val;
            // }
            names += `${_val?.name}, `;
          });

          names = `${names.slice(0, -2)})`;

          if (isAll) {
            names = `Semua ${val?.name}`;
          }

          return names;
        }

        return val?.name;
      })
      ?.join(', ');
  }, [receivers]);

  const __handleSave = async () => {
    setIsSubmit(true);

    const validationData = [
      title,
      receivers,
      datePickerSent,
      datePickerFinished,
      content,
    ];

    if (
      receivers?.length &&
      validationData.indexOf('') === -1 &&
      validationData.indexOf(null) === -1
    ) {
      const {school_id} = jwtDecode(await getToken()) as any;

      const user_type = receivers?.map((val: any) => {
        let data = val;

        if (data?.class) {
          const classList = data?.class.map(({...values}: any) => values);
          data = {
            id: data?.id,
            name: data?.name,
            class: classList.filter((val: any) => !val.name.includes('Semua')),
          };
        }

        return data;
      });

      const body = {
        title,
        description: content,
        time_start: __formatDateTime(datePickerSent, true),
        time_end: __formatDateTime(datePickerFinished, true),
        school_id,
        user_type,
      };

      if (attachmentData) {
        Object.assign(body, {image: attachmentData?.ID});
      }

      try {
        showLoading();
        const {status} =
          route.params?.type !== 'EDIT'
            ? await provider.postAnnouncement(body)
            : await provider.putAnnouncement(route.params?.id!, body);

        if (status === 200) {
          Toast.show({
            type: 'success',
            text1:
              route.params?.type !== 'EDIT'
                ? 'Pengumuman berhasil dibuat.'
                : 'Pengumuman berhasil diperbarui.',
          });

          navigation.goBack();
        }
      } catch (_) {
        Toast.show({
          type: 'error',
          text1: 'Pengumuman gagal dibuat, silahkan coba beberapa saat lagi.',
        });
      } finally {
        dismissLoading();
      }
    }
  };

  const __handleSelectedReceivers = (value: any) => {
    const isSelectAll =
      JSON.stringify(listReceivers) === JSON.stringify(receiversTemp);

    /**
     * Handle all options
     */
    if (value?.id === 'ALL') {
      if (isSelectAll) {
        return setReceiversTemp([]);
      }

      return setReceiversTemp(listReceivers);
    }

    if (isSelectAll) {
      return;
    }

    /**
     * Handle option who have no children
     */
    if (value?.class === null) {
      if (receiversTemp.includes(value)) {
        return setReceiversTemp((prevState: any) =>
          prevState.filter((item: any) => item !== value),
        );
      }

      return setReceiversTemp((prevState: any) => [...prevState, value]);
    }

    /**
     * Handle option who have children
     */
    setReceiversTemp((prevState: any) => {
      let values = [];

      // Handle send all
      if (!value?.parent_id) {
        const data = prevState?.find((val: any) => val?.id === value?.id);
        const datas = listReceivers?.find((val: any) => val?.id === value?.id);

        if (data) {
          const newData = prevState.filter(
            (item: any) => item?.id !== value?.id,
          );

          if (datas?.class?.length === data?.class?.length) {
            return newData;
          }

          return [...newData, datas];
        }

        values = [datas];
      } else {
        const parent = prevState?.find(
          (item: any) => item?.id === value?.parent_id,
        );

        const datas = listReceivers?.find(
          (val: any) => val?.id === value?.parent_id,
        );

        if (parent) {
          const oldState = prevState?.filter(
            (item: any) => item?.id !== value?.parent_id,
          );

          if (parent?.class?.some((item: any) => item?.id === value?.id)) {
            if (parent?.class?.length === 1) {
              return oldState;
            } else if (datas?.class?.length === parent?.class?.length) {
              return prevState;
            }

            return [
              ...oldState,
              {
                ...parent,
                class: parent?.class?.filter(
                  (item: any) => item?.id !== value?.id,
                ),
              },
            ];
          }

          return [
            ...oldState,
            {
              ...parent,
              class: [...(parent?.class || []), value],
            },
          ];
        } else {
          values = [
            {
              ...datas,
              class: [value],
            },
          ];
        }
      }

      return [...prevState, ...values];
    });
  };

  const __handleSaveDatePicker = (type: 'SENT' | 'FINISHED') => {
    if (type === 'SENT') {
      setDatePickerSent(valueDatePicker);
      setIsShowSwipeUpDatePickerSent(false);
    } else if (type === 'FINISHED') {
      setDatePickerFinished(valueDatePicker);
      setIsShowSwipeUpDatePickerFinished(false);
    }
  };

  const __resetAttachment = () => {
    setAttachmentTemporary(null);
    setAttachmentData(null);
    setProgressUpload('0%');
  };

  const __onUploadImage: any = async () => {
    if (Platform.OS === 'ios') {
      if (await iosPhotoGalleryPermission()) {
        __handleOnUploadImage();
      }
    } else {
      if (await __handlerAndroidPermission()) {
        __handleOnUploadImage();
      }
    }
  };

  const __handlerAndroidPermission = async () => {
    // const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    // if (await PermissionsAndroid.check(permission)) {
    //   return true;
    // }

    // return (await PermissionsAndroid.request(permission)) === 'granted';
    return true;
  };

  const __handleOnUploadImage = async () => {
    try {
      const {assets, didCancel} = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });

      if (!didCancel) {
        setIsShowUpload(false);
        setAttachmentTemporary(assets![0]);
        __uploadingImage(assets);
      }
    } catch (_) {}
  };

  const __handlerDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const data = response?.[0];

      if (data) {
        setIsShowUpload(false);
        setAttachmentTemporary(data);
        __uploadingFile(data);
      }
    } catch (err) {}
  };

  const __uploadingImage = (asset: ImagePickerResponse['assets']) => {
    const formData = new FormData();
    formData.append('type', 'pr-projek-tugas');
    formData.append('sub_type', '');
    formData.append('attachment', {
      name: asset?.[0]?.fileName,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setProgressUpload(`${i + 1}%`);
        i++;
      }
    }, 300);

    uploadImage(formData).then((res: IUploadImageResponse) => {
      clearInterval(intervalId);
      setProgressUpload('99%');
      setTimeout(() => {
        setAttachmentData(res?.data);
        setProgressUpload('100%');
      }, 100);
    });
  };

  const __uploadingFile = (asset: any) => {
    const formData = new FormData();
    formData.append('type', 'pr-projek-tugas');
    formData.append('sub_type', '');
    formData.append('attachment', {
      name: asset?.name,
      type: asset?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.uri
          : asset?.uri?.replace('file://', ''),
    });

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setProgressUpload(`${i + 1}%`);
        i++;
      }
    }, 300);

    uploadFile(formData).then((res: IUploadImageResponse) => {
      clearInterval(intervalId);
      setProgressUpload('99%');
      setTimeout(() => {
        setAttachmentData(res?.data);
        setProgressUpload('100%');
      }, 100);
    });
  };

  const __getListReceivers = async () => {
    const {degree_id} = jwtDecode(await getToken()) as any;

    const {status, data} = await provider.getAnnouncementListReceivers(
      degree_id,
    );

    if (status === 200) {
      let datas = data?.data || [];

      if (datas.length > 0) {
        datas = datas.map((val: any) => {
          val.total_class = val?.class?.length || 0;
          if (val?.class?.length > 0) {
            val.class = val?.class
              ?.sort((n1: any, n2: any) => n1?.id - n2?.id)
              ?.map((subVal: any) => ({
                ...subVal,
                parent_id: val?.id,
              }));

            val?.class?.unshift({id: val?.id, name: `Semua ${val?.name}`});
            val.total_class = val?.class?.length || 0;
          }

          return val;
        });
      }

      setListReceivers(datas);
    }
  };

  const __renderContentSwipeupUpload = useCallback(() => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>

        {uploadList.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => value.onPress()}
              style={styles.swipeUpUploadContent}>
              {value.icon}
              <Text style={styles.swipeUpUploadLabel}>{value.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, []);

  return {
    route,
    navigation,
    isLoading,
    setIsLoading,
    isSubmit,
    setIsSubmit,
    title,
    setTitle,
    listReceivers,
    isShowSwipeUpListReceiver,
    setIsShowSwipeUpListReceiver,
    isShowSwipeUpDatePickerSent,
    setIsShowSwipeUpDatePickerSent,
    isShowSwipeUpDatePickerFinished,
    setIsShowSwipeUpDatePickerFinished,
    content,
    setContent,
    attachmentTemporary,
    setAttachmentTemporary,
    isShowUpload,
    setIsShowUpload,
    progressUpload,
    setProgressUpload,
    attachmentData,
    setAttachmentData,
    datePickerSent,
    setDatePickerSent,
    datePickerFinished,
    setDatePickerFinished,
    valueDatePicker,
    setValueDatePicker,
    receivers,
    setReceivers,
    receiversTemp,
    setReceiversTemp,
    formatReceiversToText,
    isShowPopUpBack,
    setIsShowPopUpBack,
    //
    __handleSave,
    __handleSelectedReceivers,
    __getListReceivers,
    __resetAttachment,
    __onUploadImage,
    __renderContentSwipeupUpload,
    __handleSaveDatePicker,
  };
};

export {__formatDateTime, useAnnouncementManageCreateScreen};
