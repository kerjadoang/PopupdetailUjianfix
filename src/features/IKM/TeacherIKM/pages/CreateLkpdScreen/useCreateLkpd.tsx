import {CreateLkpdScreenParam} from 'type/screen';
import {useCallback, useEffect, useState} from 'react';
import {useActiveCurriculum, useListPhaseClass} from '@features/IKM/zustand';
import {useForm} from 'react-hook-form';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {
  getChapterById,
  getDetailLKPD,
  getMapelById,
  getWorksheetMaster,
  teacherCreateLembarKerja,
  teacherEditLembarKerja,
} from '@features/IKM/services/lkpdServices';
import {
  convertDate,
  dismissLoading,
  handlerOpenFile,
  isText,
  rdxDispatch,
  removeEmptyProperty,
  showErrorToast,
  showLoading,
  showSuccessToast,
  sleep,
} from '@constants/functional';
import dayjs from 'dayjs';
import {useNavigate} from '@hooks/useNavigate';
import {apiGetMedia} from '@api/wrapping';
import {fetchRombelClassList} from '@redux';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useTeacherLkpdActions} from '../LkpdTeacherScreen/zustand';

type swipeUpType = {
  Fase: '';
  Rombel: '';
  Subject: '';
  Chapter: '';
  Docs: '';
  StartTime: '';
  EndTime: '';
};

type ISwipeup = {
  status: boolean;
  type: keyof swipeUpType | string;
  data?: any;
  currentData?: any;
  onSelected?: CallBackWithParams<void, any>;
};

const defaultLKPDForm: Partial<IFormLembarKerja> = {
  type: 'LKPD',
};

const defaultSwipeupData = {
  status: false,
  type: '',
  data: undefined,
  currentData: undefined,
  onSelected: () => {},
};

const useCreateLkpd = () => {
  const {navigation, getRouteParams} = useNavigate();
  const {mode, task_id} = getRouteParams<CreateLkpdScreenParam>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  // const [listRombelClass, setListRombelClass] = useState<IKMRombel[]>([]);
  const [detailTask, setDetailTask] = useState<ILKPDTask>();
  const activeCuriculum = useActiveCurriculum();
  const listPhase = useListPhaseClass();
  const {resetState, getDataChecked, getDataSchedule} = useTeacherLkpdActions();
  const {data: listRombelClass}: {data: IKMRombel[]} = useSelector(
    (state: RootState) => state.getRombelClassList,
  );
  const {
    control,
    handleSubmit,
    formState: {errors: formErrors},
    getValues: getFormValues,
    setValue: setFormValues,
    watch,
    reset,
  } = useForm<typeof defaultLKPDForm>({
    defaultValues: {...defaultLKPDForm, curriculum: activeCuriculum},
  });
  const classWatch = watch('class');
  const subjectWatch = watch('subject');

  const [showSwipeUp, setShowSwipeUp] = useState<ISwipeup>(defaultSwipeupData);

  const [documentType, setDocumentType] = useState<'Unggah' | 'Pilih'>(
    'Unggah',
  );

  const mappingToRadioButton = (data: any) => {
    return {
      ...data,
      id: data?.id,
      name: data?.name,
      value: data?.name,
    };
  };

  //get worksheet, getAllrombel, get detailTask
  useAsyncEffect(async () => {
    try {
      showLoading();
      const [listWorksheet, lkpdDetailTask] = await Promise.all([
        await getWorksheetMaster({is_active: true}),
        // await getAllRombelIKM({user_role: 'GURU'}),
        mode !== 'CREATE' && task_id
          ? await getDetailLKPD({user_role: 'GURU', task_id})
          : undefined,
      ]);

      if (listWorksheet && !!worksheets) {
        setWorksheets(listWorksheet);
      }

      // if (listrombelIKM && !!listRombelClass) {
      //   setListRombelClass(listrombelIKM);
      // }

      if (lkpdDetailTask) {
        setDetailTask(lkpdDetailTask);
      }
    } catch (error: any) {
      showErrorToast(error);
    } finally {
      dismissLoading();
    }
  }, []);

  //listen if class
  useEffect(() => {
    if (classWatch) {
      rdxDispatch(fetchRombelClassList(classWatch.id, 0));
    }
  }, [classWatch]);

  //listen if list rombel class
  useEffect(() => {
    const currentRombel = getFormValues('rombel_class_school');
    const isRombelInList = listRombelClass.some(
      item => item.class_id === currentRombel?.class_id,
    );

    setFormValues(
      'rombel_class_school',
      isRombelInList ? currentRombel : undefined,
    );
  }, [listRombelClass]);

  //mapping detail task to form if current mode != create
  useAsyncEffect(async () => {
    try {
      if (!detailTask) {
        return;
      }
      let resMedia;
      if (detailTask.task_teacher?.media_id) {
        resMedia = await apiGetMedia({
          imageId: detailTask.task_teacher.media_id,
          fullDataResponse: true,
          fullResponse: true,
        });
      }

      const resFormData = {
        chapter: mappingToRadioButton(detailTask.task_teacher?.chapter),
        rombel_class_school: mappingToRadioButton(
          detailTask.task_teacher?.rombel_class_school,
        ),
        curriculum:
          mappingToRadioButton(detailTask.task_teacher?.curriculum) ||
          activeCuriculum,
        subject: mappingToRadioButton(detailTask.task_teacher?.subject),
        instructions: detailTask.task_teacher?.instructions,
        title: detailTask.task_teacher?.title,
        media: resMedia,
        question_type: detailTask.task_teacher?.question_type,
        type: detailTask.task_teacher?.type,
        time_finish: convertDate(
          detailTask.task_teacher?.time_finish,
        ).toObject(),
        time_start: convertDate(detailTask.task_teacher?.time_start).toObject(),
        class: mappingToRadioButton(detailTask.task_teacher?.class),
        kp_ikm_worksheet_master: mappingToRadioButton(
          detailTask.task_teacher?.kp_ikm_worksheet_master,
        ),
      };

      if (detailTask.task_teacher?.kp_ikm_worksheet_master) {
        delete resFormData.media;
        setDocumentType('Pilih');
      } else {
        delete resFormData.kp_ikm_worksheet_master;
        setDocumentType('Unggah');
      }

      reset(resFormData);
    } catch (error: any) {
      showErrorToast(error);
    } finally {
      dismissLoading();
    }
  }, [detailTask]);

  //listen if class change
  useAsyncEffect(async () => {
    try {
      showLoading();
      if (!classWatch) {
        return;
      }
      const listMapel = await getMapelById({
        class_id: classWatch?.id || 0,
      });

      listMapel && setSubjects(listMapel);

      const currentSubject = listMapel?.find(
        item => item.id === getFormValues('subject.id'),
      );

      setFormValues(
        'subject',
        currentSubject ? getFormValues('subject') : undefined,
      );
    } catch (error) {
    } finally {
      dismissLoading();
    }
  }, [classWatch]);

  //listen if subject change
  useAsyncEffect(async () => {
    try {
      showLoading();
      if (!subjectWatch) {
        return;
      }

      const listChapter = await getChapterById({
        subject_id: subjectWatch?.id || 0,
      });

      listChapter && setChapters(listChapter);

      const currentChapter = listChapter?.find(
        item => item.id === getFormValues('chapter.id'),
      );

      setFormValues(
        'chapter',
        currentChapter ? getFormValues('chapter') : undefined,
      );
    } catch (error) {
    } finally {
      dismissLoading();
    }
  }, [subjectWatch]);

  const parseBodyDate = (date: any) =>
    dayjs(date).format('YYYY-MM-DD HH:mm:ss');

  const onUploadFile = async () => {
    try {
      const resData = await handlerOpenFile({
        uploadType: 'lkpd_teacher',
        uploadSubType: 'lembar_kerja',
      });
      setFormValues('media', resData);
    } catch (error) {}
  };

  const onSimpan = handleSubmit(async () => {
    try {
      showLoading();
      const body: IReqCreateLembarKerja = removeEmptyProperty({
        chapter_id: getFormValues('chapter.id'),
        class_id: getFormValues('class.id'),
        curriculum_id: getFormValues('curriculum.id'),
        instructions: getFormValues('instructions'),
        kp_ikm_worksheet_master_id: getFormValues('kp_ikm_worksheet_master.id'),
        media_id: getFormValues('media.ID'),
        question_type: 'Unggah File',
        rombel_class_school_id: getFormValues('rombel_class_school.id'),
        subject_id: getFormValues('subject.id'),
        title: getFormValues('title'),
        type: 'LKPD',
        time_finish: parseBodyDate(getFormValues('time_finish')),
        time_start: parseBodyDate(getFormValues('time_start')),
      });

      mode === 'EDIT'
        ? await teacherEditLembarKerja({body, task_id: task_id || 0})
        : await teacherCreateLembarKerja(body);

      refetchData();
      await sleep(500);

      navigation.pop();
      showSuccessToast(
        `Lembar kerja berhasil ${mode === 'EDIT' ? 'diubah' : 'dibuat'}`,
      );
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi kesalahan');
    } finally {
      dismissLoading();
    }
  });

  const refetchData = useCallback(() => {
    resetState();
    getDataChecked();
    getDataSchedule();
  }, []);

  return {
    defaultSwipeupData,
    navigation,
    showSwipeUp,
    setShowSwipeUp,
    documentType,
    setDocumentType,
    activeCuriculum,
    listPhase,
    setFormValues,
    getFormValues,
    control,
    worksheets,
    chapters,
    subjects,
    formErrors,
    onSimpan,
    listRombelClass,
    onUploadFile,
  };
};
export default useCreateLkpd;
