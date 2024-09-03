import {LembarKerjaScreenParam} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useForm} from 'react-hook-form';
import {useCallback, useMemo, useState} from 'react';
import {apiGetMedia} from '@api/wrapping';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {IMediaType} from '@api/types';
import {
  dismissLoading,
  isText,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {
  getDetailLKPD,
  studentFinishLKPDTask,
  studentStartLKPDTask,
  teacherFinishCheckedLKPDTask,
} from '@features/IKM/services/lkpdServices';
import {useLkpdActions} from '@features/IKM/StudentIKM/pages/LkpdStudentScreen/zustand';
import {useDisclosure} from '@hooks/useDisclosure';
import RobotHappy from '@assets/svg/maskot_2.svg';
import {PopUpProps} from '@components/atoms';

const dummyDataPDF = {
  file_id: '6508a68e39a8863ca574bea4',
};

const dummyImage = {
  file_id: '653f57dbe29e21116102aa52',
};

const defaultFormTeacher = {
  score: '',
};

const useLembarKerja = () => {
  const {getRouteParams, navigation, popScreen} = useNavigate();

  const {
    title,
    userRole,
    id: task_id,
    task_student_id,
  } = getRouteParams<LembarKerjaScreenParam>();

  const [taskData, setTaskData] = useState<ILKPDTask>({});
  const [teachertaskMedia, setTeacherTaskMedia] = useState<IMediaType>();
  const [studentTaskMedia, setStudentTaskMedia] = useState<IMediaType>();
  const [fileData, setFileData] = useState<IFileData>({
    file_name: '',
    path_url: '',
    type: '',
  });

  const isMurid = useMemo(() => userRole === 'MURID', []);

  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues,
    setValue,
  } = useForm<typeof defaultFormTeacher>({
    defaultValues: defaultFormTeacher,
  });

  const {
    getDataHistory: studentGetDataHistory,
    getDataSchedule: studentGetDataSchedule,
    resetState: studentResetLKPD,
  } = useLkpdActions();

  const {
    isVisible: isShowPopupFinish,
    show: showPopupFinish,
    hide: hidePopupFinish,
  } = useDisclosure();

  const {
    isVisible: isShowModalDone,
    show: showModalDone,
    hide: hideModalDone,
  } = useDisclosure();

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

  useAsyncEffect(async () => {
    try {
      showLoading();
      userRole === 'MURID' && studentStartLKPDTask({task_id: task_id || 0});
      const resData = await getDetailLKPD({
        task_id: task_id || 0,
        task_student_id: task_student_id,
        user_role: userRole,
      });
      setTaskData(resData!);
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Gagal ambil data');
    } finally {
      dismissLoading();
    }
  }, []);

  useAsyncEffect(async () => {
    if (!taskData) {
      return;
    }
    const teacherMediaId = taskData.task_teacher?.media_id;
    const studentMediaId = taskData.student_media_id;

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
  }, [taskData]);

  const submitTaskStudent = async () => {
    try {
      if (!fileData.ID) {
        throw 'Anda belum mengunggah jawaban';
      }
      showLoading();
      await studentFinishLKPDTask({
        media_id: fileData.ID || '',
        task_id: task_id || 0,
      });
      // popScreen();
      // showSuccessToast('Berhasil mengumpulkan lembar kerja');
      refetchLKPDDataStudent();
      showModalDone();
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  const submitTaskTeacher = async () => {
    try {
      showLoading();
      await teacherFinishCheckedLKPDTask({
        task_student_id: task_student_id || 0,
        value: Number(getValues('score')),
      });
      popScreen();
      showSuccessToast('Berhasil menilai lembar kerja');
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  const refetchLKPDDataStudent = useCallback(() => {
    studentResetLKPD();
    studentGetDataHistory();
    studentGetDataSchedule();
  }, []);

  const finishPopupContent = useMemo(() => {
    return {
      titleConfirm: 'Kumpulkan',
      Icon: RobotHappy,
      titleCancel: 'Periksa Ulang',
      title: 'Siap Dikumpulkan!',
      desc: 'Keren! Kamu sudah mengerjakan seluruh Tugas LKPD.',
      close: hidePopupFinish,
      actionCancel: hidePopupFinish,
      actionConfirm: () => {
        hidePopupFinish();
        submitTaskStudent();
      },
    } as PopUpProps;
  }, [fileData]);

  const onModalDonePress = useCallback(() => {
    popScreen();
  }, []);

  return {
    taskData,
    navigation,
    dummyDataPDF,
    dummyImage,
    title,
    userRole,
    control,
    setValue,
    teachertaskMedia,
    studentTaskMedia,
    fileData,
    setFileData,
    formErrors,
    isMurid,
    handleSubmit,
    submitTaskTeacher,
    submitTaskStudent,
    isShowPopupFinish,
    showPopupFinish,
    hidePopupFinish,
    isShowModalDone,
    showModalDone,
    hideModalDone,
    finishPopupContent,
    onModalDonePress,
  };
};
export default useLembarKerja;
