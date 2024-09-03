/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import dayjs from 'dayjs';
import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DocumentPicker from 'react-native-document-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import mediaProvider from '@services/media/provider';
import styles from './style';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import Colors from '@constants/colors';
import provider from '@services/lms/provider';
import {useUploadFile, useUploadImage} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {Header} from '@components/atoms';
import {
  iosPhotoGalleryPermission,
  _handlerConvertDatePicker,
  convertDate,
  removeEmptyProperty,
} from '@constants/functional';
import {useActiveCurriculum} from '@features/IKM/zustand';
import {ParamList} from 'type/screen';

interface IDatePicker {
  fullDate?: any;
  day: any;
  date: any;
  month: any;
  year: any;
  hour: any;
  minute: any;
}

const IQUESTION_TYPES = {
  BUAT_SOAL: 'Buat Soal',
  UNGGAH_FILE: 'Unggah File',
} as const;

const TASK_TYPES = ['PR', 'Projek', 'Tugas'];
const QUESTION_TYPES = [IQUESTION_TYPES.BUAT_SOAL, IQUESTION_TYPES.UNGGAH_FILE];

const useLMSTeacherTaskCreateScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherTaskCreateScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'LMSTeacherTaskCreateScreen'>>();
  const duplicateTask = route?.params?.duplicateTask?.data;
  const editTask = route?.params?.editTask?.data?.task_teacher;
  const taskParamsRoute = route?.params?.taskParams;
  const taskParams = duplicateTask
    ? duplicateTask
    : editTask
    ? editTask
    : taskParamsRoute;
  const isFrom = route?.params?.isFrom;

  const isFocused = useIsFocused();

  const {mutate: uploadImage} = useUploadImage();
  const {mutate: uploadFile} = useUploadFile();

  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isShowPopUpSave, setIsShowPopUpSave] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');

  const [selectedQuestion, setSelectedQuestion] = useState<
    (typeof IQUESTION_TYPES)[keyof typeof IQUESTION_TYPES] | ''
  >('');

  const [curriculums, setCurriculums] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState<any>(null);
  const [isShowCurriculum, setIsShowCurriculum] = useState(false);
  const [classes, setClasses] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isShowClass, setIsShowClass] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [isShowSubject, setIsShowSubject] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [isShowChapter, setIsShowChapter] = useState(false);
  const [title, setTitle] = useState('');
  const [isShowDatePickerFrom, setIsShowDatePickerFrom] = useState(false);
  const [datePickerFrom, setDatePickerFrom] = useState<any>(null);
  const [datePickerFromError, setDatePickerFromError] =
    useState<boolean>(false);
  const [questions, setQuestions] = useState<any>(null);

  const [valueDatePickerFrom, setValueDatePickerFrom] = useState<IDatePicker>({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
    // fullDate: dayjs().format(),
  });

  const [isShowDatePickerTo, setIsShowDatePickerTo] = useState(false);
  const [datePickerTo, setDatePickerTo] = useState<any>(null);
  const [datePickerToError, setDatePickerToError] = useState<boolean>(false);

  const [valueDatePickerTo, setValueDatePickerTo] = useState<IDatePicker>({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
    // fullDate: dayjs().format(),
  });

  const fromDate = dayjs(valueDatePickerFrom.fullDate);
  const toDate = dayjs(valueDatePickerTo.fullDate);
  const currentDate = dayjs();

  const [instruction, setInstruction] = useState('');
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [attachmentTemporary, setAttachmentTemporary] = useState<any>(null);
  const [attachmentData, setAttachmentData] = useState<any>(null);
  const [progressUpload, setProgressUpload] = useState('0%');

  //get curriculum from home
  const curriculumActive = useActiveCurriculum();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: __renderHeader,
    });

    const __getDataClass = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getDropdownClassTeacher();

        if (status === 200) {
          setClasses(
            data?.map((value: any) => ({
              rombel_class_school: {
                id: value?.rombel_class_school_id,
                name: value?.rombel_class_school_name,
                class_id: value?.class_id,
              },
            })),
          );
        }
      } catch (_) {}
    };

    __getDataClass();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIsShowPopUp(true);
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const __getDataCurriculum = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getDropdownCurriculumTeacher();

        if (status === 200) {
          setCurriculums(data);
          if (curriculumActive) {
            const getNameCurriculum = data
              ?.filter((x: any) => x?.id === curriculumActive?.id)
              ?.map((x: any) => x?.name);
            setSelectedCurriculum({
              key: curriculumActive?.id,
              name: getNameCurriculum?.toString(),
            });
          }
        }
      } catch (_) {}
    };

    __getDataCurriculum();
  }, [isFocused, curriculumActive]);

  useLayoutEffect(() => {
    const __getDataSubject = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getTeacherClassSubject(
          classes.find(
            (val: any) => val?.rombel_class_school?.id === selectedClass?.key,
          )?.rombel_class_school?.class_id,
        );

        if (status === 200) {
          setSubjects(data);
        }
      } catch (_) {}
    };

    if (selectedClass) {
      __getDataSubject();
    }
  }, [classes, selectedClass]);

  useLayoutEffect(() => {
    const __getDataChapter = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getDropdownTaskChapterTeacher(selectedSubject?.key);

        if (status === 200) {
          setChapters(data);
        }
      } catch (_) {}
    };

    if (selectedSubject) {
      __getDataChapter();
    }
  }, [selectedSubject]);

  useEffect(() => {
    const _cekQuestionTotal = async () => {
      try {
        const {
          status,
          data: {data},
        } = taskParams
          ? await provider.getAllTeacherCheckTaskQUestion(taskParams?.id)
          : await provider.getAllTeacherTaskQuestion();

        if (status === 200) {
          setQuestions(data);
        }
      } catch (_) {}
    };
    _cekQuestionTotal();
  }, [isFocused, navigation]);

  const __handleSave = () => {
    setIsSubmit(true);

    const datas = [
      selectedTask,
      selectedQuestion,
      selectedCurriculum,
      selectedClass,
      selectedSubject,
      selectedChapter,
      title,
      datePickerFrom,
      datePickerTo,
      instruction,
    ];

    if (selectedQuestion === 'Unggah File') {
      datas.push(attachmentData);
    }

    if (selectedQuestion === 'Buat Soal' && questions === null) {
      return;
    }

    if (datas.indexOf('') === -1 && datas.indexOf(null) === -1) {
      setIsShowPopUpSave(true);
    }
  };

  const __handlerOnPressSwipeUpSelectDateFromButton = () => {
    const isAfterError = !!currentDate?.isAfter(fromDate);
    const isSameOrBeforeError = !!toDate?.isSameOrBefore(fromDate, 'minute');

    setDatePickerFromError(isAfterError || isSameOrBeforeError);
    setDatePickerToError(isSameOrBeforeError);

    setDatePickerFrom(_handlerConvertDatePicker(valueDatePickerFrom, 2));
    setIsShowDatePickerFrom(false);
  };

  const __handlerOnPressSwipeUpSelectDateToButton = () => {
    const isAfterError = !!currentDate?.isAfter(toDate);
    const isSameOrAfterError = !!fromDate?.isSameOrAfter(toDate, 'minute');

    setDatePickerToError(isAfterError || isSameOrAfterError);
    setDatePickerFromError(isSameOrAfterError && !isAfterError);

    setDatePickerTo(_handlerConvertDatePicker(valueDatePickerTo, 2));
    setIsShowDatePickerTo(false);
  };

  const __handlerAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
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
      __handlerAndroidPermission();
      __handleOnUploadImage();
    }
  };

  const __postTeacherTask = async () => {
    try {
      const body = removeEmptyProperty({
        type: selectedTask,
        question_type: selectedQuestion,
        curriculum_id: selectedCurriculum?.key,
        rombel_class_school_id: selectedClass?.key,
        subject_id: selectedSubject?.key,
        chapter_id: selectedChapter?.key,
        title,
        time_start: valueDatePickerFrom.fullDate,
        time_finish: valueDatePickerTo.fullDate,
        instructions: instruction,
        media_id: attachmentData?.ID,
      });

      if (selectedQuestion === 'Unggah File') {
        Object.assign(body, {image_id: attachmentData?.ID});
      }

      const {status} = taskParams // validate hit api (put or post)
        ? await provider.putTeacherTask(body, taskParams?.id)
        : await provider.postTeacherTask(body);

      if (status === 200) {
        setIsShowPopUpSave(false);

        Toast.show({
          type: 'success',
          text1: 'PR/Projek/Tugas berhasil dibuat.',
        });

        navigation.navigate('LMSTeacherTaskScreen');
      }
    } catch (_) {
      setIsShowPopUpSave(false);
      Toast.show({
        type: 'error',
        text1:
          'PR/Projek/Tugas gagal dibuat, silahkan coba beberapa saat lagi.',
      });
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

  const __renderHeader = useCallback(
    () => (
      <View style={{backgroundColor: Colors.white}}>
        <StatusBar barStyle="dark-content" translucent={true} />

        <Header
          label="Buat PR/Projek/Tugas"
          backgroundColor="transparent"
          onPressIconLeft={() => setIsShowPopUp(true)}
        />
      </View>
    ),
    [],
  );

  const setImage = async (image_id: any) => {
    let resImage = await mediaProvider.getImage(image_id);
    setAttachmentTemporary({
      name: resImage?.data?.name,
      type: resImage?.data?.content_type,
      uri: resImage?.data?.path_url,
    });
    setAttachmentData({ID: image_id});
  };

  //set data from duplicate task res
  useLayoutEffect(() => {
    if (taskParams && isFocused && isFrom === 'TaskScreen') {
      setSelectedTask(taskParams?.type); //set tipe tugas
      setSelectedQuestion(taskParams?.question_type); //set tipe soal
      setTitle(taskParams?.title); // set judul tugas
      setInstruction(taskParams?.instructions); // set instruksi pengerjaan
      setImage(taskParams?.media_id); // set image
      if (taskParams?.time_start) {
        const convertedDate = convertDate(taskParams?.time_start);
        const newDatePickerStartValue = {
          fullDate: convertedDate.format(),
          day: convertedDate.get('day'),
          date: convertedDate.get('date'),
          month: convertedDate.get('month') + 1,
          year: convertedDate.get('year'),
          hour: convertedDate.get('hour'),
          minute: convertedDate.get('minute'),
        };
        setValueDatePickerFrom(newDatePickerStartValue);
        setDatePickerFrom(
          _handlerConvertDatePicker(newDatePickerStartValue, 2),
        );
      } //set tanggal & jam pengumpulan
      if (taskParams?.time_finish) {
        const convertedDate = convertDate(taskParams?.time_finish);
        const newDatePickerFinishValue = {
          fullDate: convertedDate.format(),
          day: convertedDate.get('day'),
          date: convertedDate.get('date'),
          month: convertedDate.get('month') + 1,
          year: convertedDate.get('year'),
          hour: convertedDate.get('hour'),
          minute: convertedDate.get('minute'),
        };
        setValueDatePickerTo(newDatePickerFinishValue);
        setDatePickerTo(_handlerConvertDatePicker(newDatePickerFinishValue, 2));
      }
      if (taskParams?.curriculum) {
        setSelectedCurriculum({
          key: taskParams?.curriculum?.id,
          name: taskParams?.curriculum?.name,
        });
      }
      if (taskParams?.rombel_class_school) {
        setSelectedClass({
          key: taskParams?.rombel_class_school?.id,
          name: taskParams?.rombel_class_school?.name,
        });
      }
      if (taskParams?.subject) {
        setSelectedSubject({
          key: taskParams?.subject?.id,
          name: taskParams?.subject?.name,
        });
      }
      if (taskParams?.chapter) {
        setSelectedChapter({
          key: taskParams?.chapter?.id,
          name: taskParams?.chapter?.name,
        });
      }
    }
  }, [taskParams, isFocused]);

  return {
    navigation,
    isSubmit,
    setIsSubmit,
    isShowPopUp,
    setIsShowPopUp,
    isShowPopUpSave,
    setIsShowPopUpSave,
    selectedTask,
    setSelectedTask,
    selectedQuestion,
    setSelectedQuestion,
    curriculums,
    selectedCurriculum,
    setSelectedCurriculum,
    isShowCurriculum,
    setIsShowCurriculum,
    classes,
    selectedClass,
    setSelectedClass,
    isShowClass,
    setIsShowClass,
    subjects,
    selectedSubject,
    setSelectedSubject,
    isShowSubject,
    setIsShowSubject,
    chapters,
    selectedChapter,
    setSelectedChapter,
    isShowChapter,
    setIsShowChapter,
    title,
    setTitle,
    isShowDatePickerFrom,
    setIsShowDatePickerFrom,
    valueDatePickerFrom,
    setValueDatePickerFrom,
    datePickerFrom,
    datePickerFromError,
    __handlerOnPressSwipeUpSelectDateFromButton,
    isShowDatePickerTo,
    setIsShowDatePickerTo,
    valueDatePickerTo,
    setValueDatePickerTo,
    datePickerTo,
    datePickerToError,
    __handlerOnPressSwipeUpSelectDateToButton,
    instruction,
    setInstruction,
    isShowUpload,
    setIsShowUpload,
    __renderContentSwipeupUpload,
    attachmentTemporary,
    progressUpload,
    __resetAttachment,
    __onUploadImage,
    __handleSave,
    __postTeacherTask,
    questions,
    taskParams,
  };
};

export {
  IQUESTION_TYPES,
  TASK_TYPES,
  QUESTION_TYPES,
  useLMSTeacherTaskCreateScreen,
};
