/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {useUploadFile} from '@services/media';
import DocumentPicker from 'react-native-document-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Platform} from 'react-native';
import {useCreateQuestionProjectTask} from '@services/lms';
import mediaProvider from '@services/media/provider';
import {iosPhotoGalleryPermission} from '@constants/functional';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import {ParamList} from 'type/screen';

const arr: any = [];
let arrStepper: any = [];

const questionTypeData = {
  data: [
    {
      description: 'Multiple Choice Base Question',
      evaluation_type: 'objective',
      id: 1,
      question_type: 'pilihan ganda',
    },
    {
      description: 'Essay Base Question',
      evaluation_type: 'subjective',
      id: 2,
      question_type: 'uraian',
    },
  ],
};
const useCreateQuestionTask = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'CreateQuestionTaskScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'CreateQuestionTaskScreen'>>();
  const totalQuestionDataRoute: any = route?.params?.totalQuestion;
  const fromParent: boolean = route?.params?.fromParent;
  const taskParams = route?.params?.taskParams;

  const [fromForm, setFromForm] = useState<boolean>(fromParent);

  //const {data: questionTypeData} = useGetQuestionType();

  const {mutate: createQuestionTask} = useCreateQuestionProjectTask();

  const [questionsTotalData, setQuestionsTotalData] = useState<any>(null);
  const [questionsDataByNumber, setQuestionsDataByNumber] = useState<any>(null);

  const [totalQuestion, setTotalQuestion] = useState<number>(
    totalQuestionDataRoute,
  );

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const essayState = arr;
  const [filledArr, setFilledArr] = useState<any>([]);
  const keys = ['A', 'B', 'C', 'D'];
  // const keys = Array.from({length: 26}, (_, index) =>
  //   String.fromCharCode(65 + index),
  // );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    setFocus,
    formState: {errors},
  } = useForm({
    defaultValues: {
      number: questionsDataByNumber?.number ?? 1,
      image_id: questionsDataByNumber?.image_id ?? '',
      question: questionsDataByNumber?.question ?? '',
      choice: [
        {
          key: 'A',
          description: '',
          correct: false,
        },
      ] as IBaseOption[],
      answer: questionsDataByNumber?.answer ?? ('' as any),
      marks: questionsDataByNumber?.value ?? ('' as any),
      question_level: '' as any,
      tags: '' as any,
      type: questionsDataByNumber?.type ?? ('pilihan ganda' as any),
      discussion: {
        explanation: '',
        file_id: '',
      },
    },
  });

  const {fields, append, remove} = useFieldArray({
    name: 'choice',
    control: control,
  });

  const isPG = watch('type')?.question_type === 'pilihan ganda' ?? true;

  const options = watch('choice');
  const typeQuestion = watch('type');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [inputSwipeUpVisible, setInputSwipeUpVisible] =
    useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<any>();
  const [showDeleteAlert, setShowDeleteAlert] = useState<{
    status: boolean;
    selectedKey: any;
  }>({status: false, selectedKey: {}});
  const [showDeleteQuestionAlert, setShowDeleteQuestionAlert] = useState<{
    status: boolean;
    selectedKey: any;
  }>({status: false, selectedKey: {}});
  const [showGobackAlert, setShowGoBackAlert] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [errorAnswer, setErrorAnswer] = useState<boolean>(false);

  //upload file
  const [progressUpload, setProgressUpload] = useState<string>('0%');
  const [uploadFileData, setUploadFileData] = useState<{
    path_url?: string;
    type?: string;
    name?: string;
  }>({path_url: '', type: ''});

  const {mutate: uploadFile, data: dataUploadFile, loading} = useUploadFile();

  const onDeleteAnswer = () => {
    if (fields.length > 1) {
      const optionIndex = getValues('choice').findIndex(
        option => option.key === showDeleteAlert.selectedKey.key,
      );

      remove(optionIndex);

      const newData = [...getValues('choice')];

      newData.forEach((data, index) => {
        data.key = keys[index];
      });
      setValue('choice', newData);
      setValue('answer', ''); //reset jawaban benar
      setShowDeleteAlert({status: false, selectedKey: {}});
    }
  };

  useEffect(() => {
    if (questionsDataByNumber) {
      const optionIndex = watch('choice')?.map((obj: any) => {
        return {
          key: obj?.key?.toUpperCase(),
          correct: obj?.correct,
          description: obj?.description,
        };
      });
      remove(optionIndex);

      questionsDataByNumber?.choice?.map((obj: any) =>
        append({
          key: obj?.key?.toUpperCase(),
          correct: false,
          description: obj?.description,
        }),
      );
    }
  }, [questionsDataByNumber, currentQuestion]);

  useEffect(() => {
    //set type default to pilihan ganda
    if (questionTypeData) {
      setValue('type', questionTypeData.data?.[0] ?? {});
    }
  }, [questionTypeData]);

  useEffect(() => {
    //set data every user change question on stepper
    if (questionsDataByNumber) {
      setValue('type', {
        id: questionsDataByNumber?.type === 'pilihan ganda' ? 1 : 2,
        question_type: questionsDataByNumber?.type,
      });
      setValue('question', questionsDataByNumber?.question);
      setValue('number', questionsDataByNumber?.number ?? currentQuestion);
      setValue('marks', questionsDataByNumber?.value.toString());
      setValue('answer', questionsDataByNumber?.answer?.toUpperCase());
      setSelectedOption({key: questionsDataByNumber?.answer?.toUpperCase()});
      const choice = questionsDataByNumber?.choice?.map((obj: any) => {
        return {
          key: obj?.key?.toUpperCase(),
          correct: false,
          description: obj?.description,
        };
      });
      setValue('choice', choice);
      clearErrors('question');
      clearErrors('choice');
      clearErrors('answer');
      clearErrors('marks');

      //set image
      setValue('image_id', questionsDataByNumber?.image_id);
      setImage(questionsDataByNumber?.image_id);
    } else {
      resetState();
    }
  }, [currentQuestion, questionsDataByNumber]);

  const _cekQuestionTotal = async () => {
    setIsLoading(true);
    try {
      const {
        status,
        data: {data},
      } = taskParams
        ? await provider.getAllTeacherCheckTaskQUestion(taskParams?.id)
        : await provider.getAllTeacherTaskQuestion();
      if (status === 200) {
        setQuestionsTotalData(data);
        setTotalQuestion(data?.total_question === 0 ? 1 : data?.total_question);
        setIsLoading(false);
      }
    } catch (_) {
      setIsLoading(false);
      if (!fromForm) {
        setTotalQuestion(0);
      }
    }
  };

  useLayoutEffect(() => {
    _cekQuestionTotal().then(() => {
      setFromForm(false);
    });
  }, [navigation]);

  const resetState = () => {
    setQuestionsDataByNumber(null);
    setValue('answer', '');
    setValue('image_id', '');
    setValue('question', '');
    setValue('type', {
      id: 1,
      question_type: 'pilihan ganda',
    });
    setUploadFileData({
      path_url: '',
      type: '',
    });
    setValue('choice', [
      {
        key: 'A',
        description: '',
        correct: false,
      },
    ] as IBaseOption[]);
    setValue('marks', '');
    clearErrors('question');
    clearErrors('choice');
    clearErrors('answer');
    clearErrors('marks');
  };

  useEffect(() => {
    if (questionsTotalData?._id) {
      setIsLoading(true);
      const _cekQuestionDataNumber = async () => {
        try {
          const {
            status,
            data: {data},
          } = await provider.getTeacherTaskQuestion(
            questionsTotalData?._id
              ? questionsTotalData?._id
              : taskParams
              ? taskParams?.id
              : '',
            currentQuestion,
          );

          if (status === 200) {
            setQuestionsDataByNumber(data);
          } else {
          }
        } catch (_) {
          resetState();
        }
      };
      _cekQuestionDataNumber().then(() => {
        setIsLoading(false);
        handleSubmit(onSubmit);
      });
    }
  }, [currentQuestion, questionsTotalData?._id]);

  const _handlerStepper = (text: any) => {
    const isMessageFilled =
      essayState[currentQuestion - 1]?.user_input?.length > 0;
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';

    if (!arrStepper.includes(currentQuestion - 1)) {
      if (isMessageFilled) {
        arrStepper.push(...filledArr, currentQuestion - 1);
      } else {
        arrStepper = filledArr.filter?.(
          (idx: number) => idx !== currentQuestion - 1,
        );
      }
    } else if (!isMessageFilled) {
      arrStepper = filledArr.filter?.(
        (idx: number) => idx !== currentQuestion - 1,
      );
    }
    setFocus('question');

    if (Object.keys(errors).length === 0) {
      resetState();
      setCurrentQuestion(
        isNextButton
          ? currentQuestion + 1
          : isPreviousButton
          ? currentQuestion - 1
          : text,
      );
      setFilledArr(arrStepper);
    }
  };

  const validateData = () => {
    if (getValues('type').question_type === 'pilihan ganda') {
      if (
        getValues('choice').length < 2 ||
        getValues('answer') === '' ||
        getValues('marks') === '' ||
        getValues('marks') > 100
      ) {
        return false;
      }
    } else {
      if (
        getValues('question') === '' ||
        getValues('marks') === '' ||
        getValues('marks') > 100
      ) {
        return false;
      }
    }
    return true;
  };

  const _handlerAddStepper = () => {
    if (validateData()) {
      setTotalQuestion((prev: any) => prev + 1);
    }
  };

  const onUploadImageIos = async () => {
    try {
      const permit = await iosPhotoGalleryPermission(true);

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        });

        if (!result.didCancel) {
          const fileSize = result?.assets[0]?.fileSize;
          setUploadFileData({
            path_url:
              Platform.OS === 'android'
                ? result?.assets?.[0]?.uri
                : result?.assets?.[0]?.uri?.replace('file://', ''),
            type: result?.assets?.[0]?.type ?? '',
          });
          if (fileSize && fileSize > 104857600) {
            Toast.show({
              type: 'error',
              text1: 'File tidak bisa melebihi 100MB',
            });
            setUploadFileData({
              path_url: '',
              type: '',
            });
            return;
          }
          uploadImage(result?.assets);
        }
        {
          setShowUpload(false);
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

      if (!result.didCancel) {
        const fileSize = result?.assets[0]?.fileSize;
        setUploadFileData({
          path_url:
            Platform.OS === 'android'
              ? result?.assets?.[0]?.uri
              : result?.assets?.[0]?.uri?.replace('file://', ''),
          type: result?.assets?.[0]?.type ?? '',
        });
        if (fileSize && fileSize > 104857600) {
          Toast.show({
            type: 'error',
            text1: 'File tidak bisa melebihi 100MB',
          });
          setUploadFileData({
            path_url: '',
            type: '',
          });
          return;
        }
        uploadImage(result?.assets);
      }
    } catch (e) {}
  };

  const onUploadImage: any = async () => {
    if (Platform.OS === 'ios') {
      onUploadImageIos();
    } else {
      _handlerAndroidPermission();
      onUploadImageAndroid();
    }
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
        setShowUpload(false);
        setTimeout(() => {
          onUploadImage().then(() => {});
        }, 500);
      },
    },
    {
      icon: <IconFileBlue width={24} height={24} style={{marginRight: 12}} />,
      label: 'Ambil dari File',
      onPress: () => {
        onUploadFile().then(() => {
          setShowUpload(false);
        });
      },
    },
  ];

  const onRemoveFile = () => {
    setUploadFileData({path_url: '', type: ''});
    setValue('image_id', '');
  };

  const setImage = async (image_id: any) => {
    let resImage = await mediaProvider.getImage(image_id);
    setUploadFileData({
      path_url: resImage?.data?.path_url,
      type: resImage?.data?.content_type,
    });
  };

  const upload = (asset: DocumentPickerResponse) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.name,
      type: asset?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.uri
          : asset?.uri?.replace('file://', ''),
    });
    formData.append('type', 'managetask');
    formData.append('sub_type', 'addquestion');

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setProgressUpload(`${i + 4}%`);
        i++;
      }
    }, 1000);

    uploadFile(formData)
      .then(res => {
        setValue('image_id', res.data?.ID ?? '');

        if (res.data?.ID) {
          setImage(res?.data?.ID);
        }
      })
      .catch(() => {
        setUploadFileData({
          path_url: '',
          type: '',
        });
      })
      .finally(() => {
        setProgressUpload('0%');
        clearInterval(intervalId);
      });
  };

  const uploadImage = (asset: any) => {
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

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= 100) {
        clearInterval(intervalId);
      } else {
        setProgressUpload(`${i + 4}%`);
        i++;
      }
    }, 300);

    uploadFile(formData)
      .then(res => {
        setValue('image_id', res.data?.ID ?? '');

        if (res.data?.ID) {
          setImage(res?.data?.ID);
        }
      })
      .catch(() => {
        setUploadFileData({
          path_url: '',
          type: '',
        });
      })
      .finally(() => {
        setProgressUpload('0%');
        clearInterval(intervalId);
      });
  };

  const onUploadFile = async () => {
    try {
      const fileResult = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });
      setUploadFileData({
        path_url: fileResult.uri,
        type: fileResult.type ?? '',
      });
      if (fileResult.size && fileResult.size > 104857600) {
        Toast.show({
          type: 'error',
          text1: 'File tidak bisa melebihi 100MB',
        });
        setUploadFileData({
          path_url: '',
          type: '',
        });
        return;
      }
      upload(fileResult);
    } catch (e) {}
  };

  const onDeletePress = (val: any) => {
    if (fields.length > 1) {
      setShowDeleteAlert({status: true, selectedKey: val});
    }
    setErrorAnswer(true);
  };

  const onSelectCorrectAnswer = (val: any) => {
    setValue('answer', val.key!);
    clearErrors('answer');
    const optionIndex = getValues('choice').findIndex(
      option => option.key === val.key,
    );
    setSelectedOption(val);
    if (optionIndex > -1) {
      const newData = [...getValues('choice')];
      newData[optionIndex].is_correct = true;
      setValue('choice', newData);
      clearErrors('choice');
    }
    setInputSwipeUpVisible(false);
  };

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length === 0 && data) {
      const choice = data?.choice?.map((obj: any) => {
        return {
          ...obj,
          correct: obj?.key?.toUpperCase() === data?.answer?.toUpperCase(),
          key: obj?.key?.toLowerCase(),
        };
      });

      const payload = {
        number: questionsDataByNumber?.number ?? currentQuestion,
        type: data?.type?.question_type,
        image_id: data?.image_id,
        question: data?.question,
        answer:
          watch('type')?.question_type === 'pilihan ganda'
            ? data?.answer?.toLowerCase()
            : data?.answer,
        value: Number(data?.marks) ?? 0,
        choice: choice ?? [],
      };
      //define task_teacher_id for create / update question, if zero the backend will process create
      const task_teacher_id = taskParams?.id ?? 0;
      createQuestionTask(payload, task_teacher_id)
        .then(() => {
          _cekQuestionTotal();
        })
        .catch(_ => {
          Toast.show({
            type: 'error',
            text1: _?.message,
          });
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Harap isi semua kolom wajib.',
      });
    }
  };

  const onDeleteQuestion = async () => {
    setIsLoading(true);
    if (questionsDataByNumber) {
      try {
        await provider.deleteQuestionTask(
          questionsTotalData?._id ?? '',
          questionsDataByNumber?.uuid ?? '',
        );
        Toast.show({
          type: 'success',
          text1: 'Soal berhasil dihapus.',
        });
        if (totalQuestion > 1) {
          _cekQuestionTotal();
        } else {
          setTotalQuestion(0);
        }
        setCurrentQuestion((prev: any) => prev - 1);
        setShowDeleteQuestionAlert({status: false, selectedKey: 0});
        return Promise.resolve();
      } catch (err: any) {
        setIsLoading(false);
        return Promise.reject(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (totalQuestion > 1) {
        _cekQuestionTotal();
      } else {
        setTotalQuestion(0);
      }
      setCurrentQuestion((prev: any) => prev - 1);
      setShowDeleteQuestionAlert({status: false, selectedKey: 0});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fields?.length > 2) {
      setErrorAnswer(false);
    }
  }, [fields?.length]);

  return {
    navigation,
    questionsTotalData,
    totalQuestion,
    setTotalQuestion,
    currentQuestion,
    setCurrentQuestion,
    _handlerStepper,
    filledArr,
    _handlerAddStepper,
    questionTypeData,
    keys,

    //hook form
    control,
    handleSubmit,
    getValues,
    setValue,
    errors,
    append,

    //form
    typeQuestion,
    options,
    onDeleteAnswer,
    onSubmit,

    //upload
    onUploadFile,
    onRemoveFile,
    uploadFileData,
    dataUploadFile,
    progressUpload,
    loading,

    isLoading,
    isPG,
    fields,
    onDeletePress,
    inputSwipeUpVisible,
    setInputSwipeUpVisible,
    onSelectCorrectAnswer,
    selectedOption,
    setSelectedOption,
    onDeleteQuestion,
    showDeleteAlert,
    setShowDeleteAlert,
    showDeleteQuestionAlert,
    setShowDeleteQuestionAlert,
    showGobackAlert,
    setShowGoBackAlert,
    totalQuestionDataRoute,
    fromParent,
    watch,
    errorAnswer,
    setErrorAnswer,
    uploadList,
    showUpload,
    setShowUpload,
    taskParams,
  };
};

export default useCreateQuestionTask;
