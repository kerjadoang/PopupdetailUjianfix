/* eslint-disable react-hooks/exhaustive-deps */

import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  useGetAllRombelClass,
  useGetAllService,
  useGetChapterListBySubject,
} from '@services/global';
import {
  useCreateJadwalUjian,
  useGetAllRombelUser,
  useGetDetailJadwalUjian,
  useGetSubjecByCurriculumAndClass,
  useUpdateJadwalUjian,
} from '@services/lms';
import {
  IJadwalkanUjianPayload,
  IRombelUserFilterParam,
} from '@services/lms/type';
import useDebounce from '@hooks/useDebounce';
import {
  convertDate,
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {ParamList} from 'type/screen';
import {IJadwalkanUjianFormValues} from '.';
import _ from 'lodash';
import {useListCuriculum, useActiveCurriculum} from '@features/IKM/zustand';
import {isAxiosError} from 'axios';

export const useCreateJadwalUjianScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'CreateJadwalUjianScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'CreateJadwalUjianScreen'>>();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    // setError,
    reset,
    getValues,
    trigger,
    formState: {errors},
  } = useForm<IJadwalkanUjianFormValues>({
    defaultValues: {
      options: {
        shuffleAnswersSelected: false,
        shuffleQuestionSelected: false,
      },
    },
    mode: 'onChange',
  });

  const [rombelUserDataFilter, setRombelUserDataFilter] =
    useState<IRombelUserFilterParam>();
  const [searchRombelUserQuery, setSearchRombelUserQuery] = useState<string>();
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const {data: serviceData} = useGetAllService();
  // const {data: curriculumData} = useGetAllCurriculum();
  const listCurriculum = useListCuriculum();
  const curriculumData = {
    data: listCurriculum,
  };
  const activeCuriculums = useActiveCurriculum();

  //get curriculum from home
  // const {refetch: getActiveCurriculum, data: curriculumActiveData} =
  // useGetCurriculumActive();
  // console.log("🚀 ~ useCreateJadwalUjianScreen ~ curriculumActiveData:", curriculumActiveData)
  // const curriculumActive = curriculumActiveData;
  const {data: classData} = useGetAllRombelClass();
  const {data: rombelUserData} = useGetAllRombelUser(1, rombelUserDataFilter);
  const {data: subjectData} = useGetSubjecByCurriculumAndClass(
    getValues('curriculum')?.id,
    getValues('list_rombel_class_school')?.[0]?.class_id,
  );
  const {data: chapterData} = useGetChapterListBySubject(
    getValues('subject')?.id,
  );
  const {mutate: createJadwalUjian, loading: loadingCreateJadwalUjian} =
    useCreateJadwalUjian();
  const {mutate: updateJadwalUjian, loading: loadingUpdateJadwalUjian} =
    useUpdateJadwalUjian();
  const {refetch, loading: loadingGetJadwalUjian} = useGetDetailJadwalUjian();
  const {schedule_id} = route.params || {};
  const isDuplicate = route?.params?.isDuplicate;
  const isEdit = route?.params?.isEdit;
  const isEditOrDuplicate = isDuplicate || isEdit;

  const [inputCurriculumVisible, setInputCurriculumVisible] =
    useState<boolean>(false);
  const [inputClassVisible, setInputClassVisible] = useState<boolean>(false);
  const [inputRombelUserVisible, setInputRombelUserVisible] =
    useState<boolean>(false);
  const [inputSubjectVisible, setInputSubjectVisible] =
    useState<boolean>(false);
  const [inputChapterVisible, setInputChapterVisible] =
    useState<boolean>(false);
  const [inputServiceVisible, setInputServiceVisible] =
    useState<boolean>(false);
  const [inputDatePickerVisible, setInputDatePickerVisible] =
    useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [listUsersByRombel, setListUsersByRombel] = useState<any>();

  const rombelClass = watch('rombel_class_school');
  const listRombelClass = watch('list_rombel_class_school');
  const curriculum = watch('curriculum');
  const subject = watch('subject');
  const duration = watch('duration');
  const chapters = watch('chapters');
  const query = useDebounce(searchRombelUserQuery, 250);
  const isCreateMode = mode === 'create';

  useEffect(() => {
    if (rombelClass) {
      setRombelUserDataFilter(prevState => ({
        ...prevState,
        rombelClassId: rombelClass.rombel_class_school_id,
      }));
    }
  }, [rombelClass]);

  useEffect(() => {
    if (listRombelClass) {
      setRombelUserDataFilter(prevState => ({
        ...prevState,
        rombelClassId: joinRombelClass('id'),
      }));
    }
  }, [listRombelClass]);

  useEffect(() => {
    setRombelUserDataFilter(prevState => ({
      ...prevState,
      search: query,
    }));
  }, [query]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && curriculumData) {
      // getActiveCurriculum();
    }
  }, [curriculumData, isFocused]);

  useEffect(() => {
    if (activeCuriculums && curriculumData?.data && isFocused) {
      const getNameCurriculum = curriculumData?.data
        ?.filter((x: any) => x?.id === activeCuriculums?.id)
        ?.map((x: any) => x?.name);
      setValue('curriculum', {
        id: activeCuriculums?.id,
        name: getNameCurriculum?.toString(),
      });
    }
  }, [isFocused, activeCuriculums]);

  useEffect(() => {
    const rombelUsers = rombelUserData?.data?.rombel_user;

    const groupedByRombelClass = _.groupBy(
      rombelUsers,
      'user_rombel[0].rombel_class_school_name',
    );

    const filteredRombelUsers = _.map(
      groupedByRombelClass,
      (users: IBaseRombelUser[], rombel_class_school_name: string) => {
        return {
          rombel_class_school_name,
          rombel_class_school_id:
            users?.[0]?.user_rombel?.[0].rombel_class_school_id,
          rombel_user: users,
        };
      },
    );

    setListUsersByRombel(filteredRombelUsers);
  }, [rombelUserData]);

  const getDetailData = async () => {
    showLoading();
    try {
      const res = await refetch(schedule_id);
      const curriculum = curriculumData?.data?.filter(
        item => item.id === res.data?.exam_schedule?.curriculum_id,
      )?.[0];
      // const rombelClassSchool = classData?.data?.filter(
      //   item =>
      //     item.rombel_class_school_id ===
      //     res.data?.exam_schedule?.rombel_class_school_id,
      // )?.[0];
      const listRombelClassSchool = classData?.data?.filter(
        item =>
          item.rombel_class_school_id ===
          res.data?.exam_schedule?.rombel_class_school_id,
      );
      const questionPackageService = res.data?.exam_schedule?.service;
      const chapters =
        (res.data?.exam_schedule?.chapter?.map(
          chapter => chapter?.chapter,
        ) as IBaseChapter[]) ?? undefined;
      const questionPackage = res.data?.exam_schedule?.package;
      const subject = res.data?.exam_schedule?.subject;
      const title = res.data?.exam_schedule?.title;
      const startTime = res.data?.exam_schedule?.start_time
        ? convertDate(res.data?.exam_schedule?.start_time).format(
            'YYYY-MM-DD HH:mm:ss',
          )
        : undefined;
      const instructions = res.data?.exam_schedule?.instructions;
      const duration = res.data?.exam_schedule?.duration;
      const is_shuffle_answers = res.data?.exam_schedule?.is_shuffle_answers;
      const is_shuffle_questions =
        res.data?.exam_schedule?.is_shuffle_questions;
      var users = [];
      const users_belum_selesai = res.data?.student_status?.belum_selesai;
      const users_mengumpulkan = res.data?.student_status?.mengumpulkan;
      if (users_belum_selesai && users_mengumpulkan) {
        users = [...users_belum_selesai, ...users_mengumpulkan];
      } else if (users_belum_selesai) {
        users = users_belum_selesai;
      } else if (users_mengumpulkan) {
        users = users_mengumpulkan;
      }

      const mappedUsers = users?.map?.((obj: any) => {
        const matchingExam = res?.data?.exam_schedule?.student_exam?.find?.(
          (exam: any) => exam?.id === obj?.student_exam_id,
        );
        if (matchingExam) {
          return {
            ...(obj || {}),
            student_exam_id: obj?.student_exam_id,
            id: matchingExam?.user_id,
          };
        }
        return null;
      });
      const tempUsers = mappedUsers?.length !== 0 ? mappedUsers : users;
      // setValue('users', mappedUsers?.length !== 0 ? mappedUsers : users);
      setMode('update');
      reset({
        chapters: chapters,
        curriculum: curriculum,
        duration: duration,
        instructions: instructions,
        question_package: questionPackage,
        question_package_service: questionPackageService,
        // rombel_class_school: rombelClassSchool,
        list_rombel_class_school: listRombelClassSchool,
        start_time: startTime,
        subject: subject,
        title: title,
        users: tempUsers,
        options: {
          shuffleAnswersSelected: is_shuffle_answers ?? false,
          shuffleQuestionSelected: is_shuffle_questions ?? false,
        },
      });
      dismissLoading();
    } catch (e: any) {
      dismissLoading();
      if (isEditOrDuplicate) {
        navigation?.goBack();
        showErrorToast(e?.data?.message ?? 'Terjadi Kesalahan');
      }
    }
  };

  useEffect(() => {
    if (schedule_id && curriculumData && classData) {
      getDetailData();
    }
  }, [schedule_id, classData, isEditOrDuplicate]);

  const onSelectInputSwipeUp = (
    name: keyof IJadwalkanUjianFormValues,
    val: any,
  ) => {
    setValue(name, val);
    switch (name) {
      case 'list_rombel_class_school':
        setValue('users', []);
        setValue('subject', undefined);
        setValue('chapters', undefined);
        setInputClassVisible(false);
        break;
      case 'curriculum':
        setValue('subject', undefined);
        setInputCurriculumVisible(false);
        break;
      case 'users':
        setInputRombelUserVisible(false);
        break;
      case 'subject':
        setValue('chapters', undefined);
        setInputSubjectVisible(false);
        break;
      case 'chapters':
        setInputChapterVisible(false);
        break;
      case 'question_package_service':
        setInputServiceVisible(false);
        break;
      case 'start_time':
        setInputDatePickerVisible(false);
        break;
      case 'question_package':
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const onNavigateToBankSoal = () => {
    navigation.navigate('BankSoalScreen', {
      title: 'Pilih Paket Soal',
      subtitle: `Kelas ${
        getValues('list_rombel_class_school')?.[0]?.class_id
      } \u2022 ${getValues('subject')?.name}`,
      subject_id: getValues('subject')?.id,
      class_id: getValues('list_rombel_class_school')?.[0]
        ?.rombel_class_school_id,
      chapter_id: '',
      fromCreateJadwal: true,
      // package_id: data?.data?.id,
      onSelectFromCreateJadwal: param =>
        onSelectInputSwipeUp('question_package', param),
    });
  };

  const onCreateJadwalUjain = async () => {
    const bodyPayload: IJadwalkanUjianPayload = {
      curriculum_id: getValues('curriculum.id')!,
      question_package_service_id: getValues('question_package_service.id')!,
      question_package_id: getValues('question_package.id')!,
      rombel_class_school_id: getValues('list_rombel_class_school')?.map(data =>
        Number(data.rombel_class_school_id),
      ),
      // rombel_class_school_id: getValues(
      //   'rombel_class_school.rombel_class_school_id',
      // )!,
      subject_id: getValues('subject.id')!,
      title: getValues('title')!,
      chapter: getValues('chapters')!.map(chapter => {
        return {
          id: chapter.id!,
          name: chapter.name!,
        };
      }),
      start_time: convertDate(getValues('start_time'), {
        toUTC: false,
      })?.format(),
      duration: Number(getValues('duration')!),
      instructions: getValues('instructions'),
      users: getValues('users')?.map(user => {
        return {
          id: user?.id,
        };
      })!,
      is_shuffle_answers: getValues('options.shuffleAnswersSelected'),
      is_shuffle_questions: getValues('options.shuffleQuestionSelected'),
    };
    try {
      if (isCreateMode || isDuplicate) {
        await createJadwalUjian(bodyPayload);
      } else {
        await updateJadwalUjian(schedule_id, bodyPayload);
      }
      navigation.pop();
    } catch (error: any) {
      setShowConfirm(false);
      if (isAxiosError(error)) {
        showErrorToast(error.response?.data?.message || '');
        return;
      }
      showErrorToast('Terjadi Kesalahan');
    }
  };

  const onNavigateToDetailSoal = () => {
    navigation?.navigate('DetailSoalScreen', {
      order: 1,
      title: 'Detail Paket Soal',
      subtitle: getValues('question_package')?.name,
      subject_id: getValues('question_package')?.subject_id,
      class_id: getValues('question_package')?.class_id,
      package_id: getValues('question_package')?.id,
      chapter_id: getValues('question_package')?.chapter_id,
    });
  };

  const joinRombelClass = (type: 'id' | 'name') => {
    return getValues('list_rombel_class_school')
      ?.map(item =>
        type === 'name'
          ? item.rombel_class_school_name
          : item.rombel_class_school_id,
      )
      ?.join(', ');
  };

  const validateRombelClass = useCallback((value: any) => {
    const allSameClassId = _.every(
      value,
      item => item.class_id === value[0].class_id,
    );

    if (!allSameClassId) {
      return 'Tidak dapat memilih rombel di kelas yang berbeda.';
    }

    return;
  }, []);

  return {
    getValues,
    onSubmit,
    onCreateJadwalUjain,
    onNavigateToDetailSoal,
    onNavigateToBankSoal,
    onSelectInputSwipeUp,
    setInputSubjectVisible,
    handleSubmit,
    setInputCurriculumVisible,
    setInputServiceVisible,
    setInputClassVisible,
    setInputRombelUserVisible,
    setInputChapterVisible,
    setValue,
    setInputDatePickerVisible,
    setSearchRombelUserQuery,
    setShowConfirm,
    control,
    errors,
    curriculum,
    rombelClass,
    subject,
    duration,
    loadingCreateJadwalUjian,
    schedule_id,
    loadingGetJadwalUjian,
    curriculumData,
    inputCurriculumVisible,
    classData,
    inputClassVisible,
    subjectData,
    inputSubjectVisible,
    chapterData,
    inputChapterVisible,
    serviceData,
    inputServiceVisible,
    inputDatePickerVisible,
    showConfirm,
    loadingUpdateJadwalUjian,
    rombelUserData,
    inputRombelUserVisible,
    searchRombelUserQuery,
    joinRombelClass,
    listRombelClass,
    listUsersByRombel,
    validateRombelClass,
    trigger,
    chapters,
  };
};
