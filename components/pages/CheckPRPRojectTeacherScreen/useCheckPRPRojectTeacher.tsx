/* eslint-disable react-hooks/exhaustive-deps */
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import {useCallback, useEffect, useState} from 'react';
import mediaProvider from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {getDetailLKPD} from '@features/IKM/services/lkpdServices';
import {
  dismissLoading,
  isText,
  removeEmptyProperty,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {ParamList} from 'type/screen';
import {IMediaType} from '@api/types';
import {apiGetMedia} from '@api/wrapping';
import {isEmpty} from 'lodash';

const useCheckPRPRojectTeacher = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'CreateQuestionTaskScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'CreateQuestionTaskScreen'>>();
  const isFocused = useIsFocused();
  const student: any = route?.params?.student;
  const task: any = route?.params?.task;
  const task_student_id: number = route?.params?.task_student_id;
  const taskId: number = route?.params?.taskId;
  const [totalQuestion, setTotalQuestion] = useState<number>(1);
  const [questionsTotalData, setQuestionsTotalData] = useState<any>(null);
  const [questionsDataByNumber, setQuestionsDataByNumber] = useState<any>(null);
  const [showGobackAlert, setShowGoBackAlert] = useState<boolean>(false);
  const [showPopupFinish, setShowPopupFinish] = useState<boolean>(false);
  const [showPopupNotFinish, setShowPopupNotFinish] = useState<boolean>(false);
  const [showPopup, setShowPopUp] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [filledArr, setFilledArr] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finishData, setFinishData] = useState<any>(null);
  const [questionType, setQuestionType] = useState<
    'Unggah File' | 'Buat Soal' | ''
  >('');
  const [taskData, setTaskData] = useState<ILKPDTask>({});
  const [teachertaskMedia, setTeacherTaskMedia] = useState<IMediaType>();
  const [studentTaskMedia, setStudentTaskMedia] = useState<IMediaType>();

  const [value, setValue] = useState<any>('');
  const [change, setChanged] = useState<boolean>(false);

  const isUnggahFile = questionType === 'Unggah File';

  const valid = value !== '' || (value !== 0 && change);
  const validValue = value <= (questionsDataByNumber?.question?.value || 100);

  const errorMessage =
    !validValue && change
      ? questionType === 'Buat Soal'
        ? 'Nilai tidak boleh melebihi bobot nilai yang telah ditentukan.'
        : 'Nilai tidak boleh melebihi 100'
      : undefined;

  const errorLimitScore = !validValue && change;

  const getMedia = useCallback(async (media_id: string) => {
    try {
      const resData = await apiGetMedia<IMediaType>({
        imageId: media_id,
        fullResponse: true,
        fullDataResponse: true,
      });
      return resData;
    } catch (error: any) {
      showErrorToast(error || 'Gagal mendapatkan Media');
    }
  }, []);

  const handleValue = (val: any) => {
    setValue(val);
    setChanged(true);
    if (!isUnggahFile) {
      return;
    }
    updateValueQuestion(val);
  };

  const _handleDataNotFound = (err: any) => {
    Toast.show({
      type: 'error',
      text1: err?.message ?? 'Unknown Error',
    });
  };

  const _cekQuestionTotal = async () => {
    setIsLoading(true);
    try {
      const {
        status,
        data: {data},
      } = await provider.getAllTeacherCheckTaskQUestion(task?.task_teacher?.id);
      if (status === 200) {
        setQuestionsTotalData(data);
        setTotalQuestion(data?.total_question !== 0 ? data?.total_question : 1);
      }
    } catch (err: any) {
      //unknown error
      _handleDataNotFound(err);
    } finally {
      setIsLoading(false);
    }
  };
  const updateValueQuestion = async (val?: any) => {
    if (isEmpty(value) ?? isEmpty(val)) {
      return;
    }
    try {
      const body = {
        answer_uuid: questionsDataByNumber?.answer?.uuid,
        value: val ? Number(val) : Number(value),
      };
      const {status} = await provider.submitValueTaskQuestion(
        task_student_id,
        questionsTotalData?._id ?? '',
        currentQuestion,
        body,
      );
      if (status === 200) {
      }
    } catch (_) {}
  };

  const _cekFinishData = async (condition?: string) => {
    setIsLoading(true);
    try {
      const {
        status,
        data: {data},
      } = await provider.getCheckFinishTaskQUestion(task_student_id);
      if (status === 200) {
        setFinishData(data);
        setFilledArr(data?.number_finish?.map((x: number) => x - 1) ?? []);
        if (condition === 'button') {
          setShowPopUp(true);
        }
      }
    } catch (_) {
      if (condition === 'finish') {
        setShowPopupNotFinish(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitCheckedQuestion = async () => {
    try {
      const body = removeEmptyProperty({
        task_student_id: task_student_id,
        value: isUnggahFile ? Number(value) : undefined,
        correct: isUnggahFile ? 0 : undefined,
        skip: isUnggahFile ? 0 : undefined,
        wrong: isUnggahFile ? 0 : undefined,
      });
      const {status} = await provider.submitFinishCheckedTask(body);
      if (status === 200) {
        setShowPopupFinish(false);
        setShowPopUp(false);
        navigation.navigate('TaskDetailTeacherScreen', {
          id: taskId,
        });
        Toast.show({
          type: 'success',
          text1: 'PR/Projek/Tugas selesai diperiksa.',
        });
      }
    } catch (_) {
      setShowPopupFinish(false);
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      if (finishData?.finish) {
        setShowPopupFinish(true);
      } else {
        setShowPopupNotFinish(true);
      }
    }
  }, [showPopup]);

  const _handlerFinishButton = () => {
    if (!validValue) {
      setChanged(true);
      return;
    }

    if (isUnggahFile) {
      if (isEmpty(value)) {
        setShowPopupNotFinish(true);
        return;
      }
      setShowPopupFinish(true);
      return;
    }

    updateValueQuestion()
      .then(() => {
        _cekFinishData('button');
      })
      .catch(_ => {});
  };

  const resetState = () => {};

  const _cekQuestionDataNumber = async () => {
    setIsLoading(true);
    try {
      const {
        status,
        data: {data},
      } = await provider.getTeacherCheckTaskQuestion(
        task_student_id,
        questionsTotalData?._id ?? '',
        currentQuestion,
      );
      if (status === 200) {
        const resImageQuestion = await mediaProvider.getImage(
          data?.question?.image_id,
        );
        const resImageAnswer = await mediaProvider.getImage(
          data?.answer?.media_id,
        );
        const newData = {
          ...data,
          question_file_name: resImageQuestion?.data?.file_name ?? null,
          question_path_url: resImageQuestion?.data?.path_url ?? null,
          answer_file_name: resImageAnswer?.data?.file_name ?? null,
          answer_path_url: resImageAnswer?.data?.path_url ?? null,
        };
        setQuestionsDataByNumber(newData);

        const matchingChoice = newData?.question?.choice?.find(
          (choice: any) =>
            choice?.key?.toLowerCase() ===
            newData?.answer?.answer?.toLowerCase(),
        );
        const values =
          data?.type !== 'uraian' &&
          newData?.question?.answer === newData?.answer?.answer &&
          matchingChoice
            ? newData?.question?.value?.toString()
            : newData?.answer?.correct_teacher
            ? newData?.answer?.value?.toString()
            : '';
        setValue(values ?? '');
      } else {
      }
    } catch (_) {
      resetState();
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskData = async () => {
    try {
      showLoading();
      const resData = await getDetailLKPD({
        task_id: task?.task_teacher?.id || 0,
        task_student_id: task_student_id,
        user_role: 'GURU',
      });
      const teacherMediaId = resData?.task_teacher?.media_id;
      const studentMediaId = resData?.student_media_id;

      const [teacherMedia, studentMedia] = await Promise.all([
        !!teacherMediaId && (await getMedia(teacherMediaId || '', 'teacher')),
        !!studentMediaId && (await getMedia(studentMediaId || '', 'student')),
      ]);

      if (teacherMedia) {
        setTeacherTaskMedia(teacherMedia);
      }

      if (studentMedia) {
        setStudentTaskMedia(studentMedia);
      }

      setTaskData(resData!);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Gagal ambil data');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (questionsTotalData?._id) {
      _cekQuestionDataNumber();
      _cekFinishData();
    }
  }, [currentQuestion, questionsTotalData?._id]);

  useEffect(() => {
    if (task) {
      setQuestionType(task?.task_teacher?.question_type);
    }
  }, [task]);

  useEffect(() => {
    if (task?.task_teacher?.question_type === 'Unggah File') {
      getTaskData();
      return;
    }
    _cekQuestionTotal();
    _cekFinishData();
  }, [isFocused]);

  const _handlerStepper = (text: any) => {
    const isNextButton = text === 'next';
    const isPreviousButton = text === 'previous';
    if (!errorLimitScore) {
      updateValueQuestion().then(() => {
        setCurrentQuestion(
          isNextButton
            ? currentQuestion + 1
            : isPreviousButton
            ? currentQuestion - 1
            : text,
        );
        setChanged(false);
      });
    }
  };

  const handleNextPrevButton = (direction: 'next' | 'previous') => {
    if (!errorLimitScore) {
      updateValueQuestion().then(() => {
        setCurrentQuestion(prevState =>
          direction === 'next' ? prevState + 1 : prevState - 1,
        );
        setChanged(false);
      });
    }
  };

  return {
    navigation,
    filledArr,
    totalQuestion,
    currentQuestion,
    _handlerStepper,
    student,
    task,
    taskData,
    teachertaskMedia,
    studentTaskMedia,
    questionType,
    questionsDataByNumber,
    handleNextPrevButton,
    value,
    change,
    valid,
    validValue,
    errorMessage,
    handleValue,
    isLoading,
    setIsLoading,
    showGobackAlert,
    showPopupFinish,
    setShowGoBackAlert,
    setShowPopupFinish,
    showPopupNotFinish,
    setShowPopupNotFinish,
    _handlerFinishButton,
    finishData,
    submitCheckedQuestion,
    showPopup,
    setShowPopUp,
    isUnggahFile,
  };
};

export default useCheckPRPRojectTeacher;
