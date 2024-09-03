import api from '@api/index';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {SubjectType} from '@constants/subjectType';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  fetchGetAllAkmTypePackage,
  fetchGetAllChapter,
  fetchGetAllPracticeChapter,
  fetchGetAllTestChapter,
  fetchGetLMSMateriSekolahMateri,
  fetchGetUlanganHarianChapterPracticePackage,
  fetchGetUlanganHarianChapterTestPackage,
  fetchGetUjianTengahSemester,
} from '@redux';
import ProviderLMS from '@services/lms/provider';
import ProviderSOAL from '@services/soal/provider';
import {useEffect, useRef, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {ILMSMateriSekolahMateriData, IMaterialContentData} from './type';
import {
  dismissLoading,
  isStringContains,
  rdxDispatch,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {SoalDataDetail} from '../ChapterSOALScreen/type';
import {useCoachmark} from '@hooks/useCoachmark';
import {ParamList} from 'type/screen';
import {Keys} from '@constants/keys';
import {useActiveCurriculum} from '@features/IKM/zustand';
import {RootState} from 'src/redux/rootReducer';

export type IAkmInstructionData = {
  id: number;
  ruleNotes: string;
  akmCategory: number;
  akmQuestionType: string;
  akmTotalQuestion: number;
  akmMaxDuration: number;
  akmType: string;
  akmTitle: string;
};

const useChapterLessonDetail = () => {
  const scrollViewRef: any = useRef();
  const isFocus = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'KPRegularDetailBab'>>();
  const route = useRoute<RouteProp<ParamList, 'KPRegularDetailBab'>>();

  const getAllChapter = useSelector((state: RootState) => state.getAllChapter);
  const getAllPracticeChapter = useSelector(
    (state: RootState) => state.getAllPracticeChapter,
  );
  const getAllPracticeChapterQuestion = useSelector(
    (state: RootState) => state.getAllPracticeChapterQuestion,
  );
  const getAllTestChapter = useSelector(
    (state: RootState) => state.getAllTestChapter,
  );
  const getAllAkmTypePackage = useSelector(
    (state: RootState) => state.getAllAkmTypePackage,
  );
  const getUlanganHarianChapterPracticePackage = useSelector(
    (state: RootState) => state.getUlanganHarianChapterPracticePackage,
  );
  const getUlanganHarianChapterTestPackage = useSelector(
    (state: RootState) => state.getUlanganHarianChapterTestPackage,
  );
  const getLMSMateriSekolahMateri = useSelector(
    (state: RootState) => state.getLMSMateriSekolahMateri,
  );

  const {data: user}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );
  const dispatch = useDispatch();
  const classId = user?.class_id;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpenInstruction, setIsOpenInstruction] = useState(false);
  const [instructionNotes, setInstructionNotes] = useState('');
  const [instructionTitle, setInstructionTitle] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [materialData, setMaterialData] = useState<any>({});
  const [contentData, setContentData] = useState<any[]>([]);
  const [listMaterial, setListMaterial] = useState<any>([]);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [soalDataDetail, setSoalDataDetail] = useState<SoalDataDetail>();
  const [akmInstructionData, setAkmInstructionData] =
    useState<IAkmInstructionData>({
      id: 0,
      ruleNotes: '',
      akmCategory: 1,
      akmQuestionType: 'pilihan ganda',
      akmTotalQuestion: 0,
      akmMaxDuration: 0,
      akmType: '',
      akmTitle: '',
    });
  const [instructionTotalQuestion, setInstructionTotalQuestion] = useState(0);
  let category: any = route.params.category;
  let subject_id = route.params.subject_id;
  let chapterData = route.params.chapterData;
  let subject_name = route.params.subject_name;
  let subject_icon = route.params.subject_icon;
  let isSoal = route.params.isSoal;
  let soal_type = route.params.soal_type;
  let questionTypeId = route.params.questionTypeId;
  let questionPackageServiceId = route.params.questionPackageServiceId;
  let subject_data = route?.params?.subject_data;

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    setIsLoading(true);
    chapterData?.data?.packages;
    // const getClassId = async () => {
    //   try {
    //     const data = await getToken();
    //     const decoded: any = jwtDecode(data) as {avatar: string};
    //     dispatch(fetchGetSubjectsByClass(decoded?.class_id));
    //     setClassId(decoded.class_id);
    //   } catch (error) {
    //     // console.log(error);
    //   }
    // };
    switch (category) {
      case SubjectType?.AKM.AKM:
        dispatch(
          fetchGetAllAkmTypePackage(
            questionPackageServiceId,
            questionTypeId,
            (res: any) => {
              setContentData(res?.data?.data?.packages);
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.KPRegular.Learn:
        dispatch(
          fetchGetAllChapter(
            chapterData?.chapter?.id,
            (res: any) => {
              setContentData(res?.data?.data);
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.LMS.MateriSekolah:
        dispatch(
          fetchGetLMSMateriSekolahMateri(
            chapterData?.id,
            (res: ILMSMateriSekolahMateriData) => {
              setIsLoading(false);
              setListMaterial(res?.data?.data);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.KPRegular.Practice:
        dispatch(
          fetchGetAllPracticeChapter(
            chapterData?.chapter?.id || chapterData?.id,
            (res: any) => {
              setContentData(res?.data?.data.service);
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.KPRegular.Test:
        dispatch(
          fetchGetAllTestChapter(
            chapterData?.chapter?.id || chapterData?.id,
            (res: any) => {
              setContentData(res?.data?.data.service);
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.SOAL.UlanganHarianPractice:
        dispatch(
          fetchGetUlanganHarianChapterPracticePackage(
            chapterData?.id,
            () => {
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      case SubjectType.SOAL.UlanganHarianTest:
        dispatch(
          fetchGetUlanganHarianChapterTestPackage(
            chapterData?.id,
            undefined,
            () => setIsLoading(false),
          ),
        ).then(() => {
          setIsLoading(false);
        });
        break;
      case SubjectType.SOAL.UjianTengahSemester:
        dispatch(
          fetchGetUjianTengahSemester(
            chapterData?.id,
            () => {
              setIsLoading(false);
            },
            () => setIsLoading(false),
          ),
        );
        break;
      default:
        break;
    }
    // getClassId();
  }, [
    category,
    chapterData?.chapter?.id,
    chapterData?.data?.packages,
    chapterData?.id,
    dispatch,
    isFocus,
    questionPackageServiceId,
    questionTypeId,
    route,
  ]);

  const fetchChapter = async (_category: string) => {
    setScrollPosition(0);
    try {
      showLoading();
      let URL = '';
      if (_category === SubjectType.KPRegular.Practice) {
        URL = `lpt/v1/practice?subject_id=${subject_id}`; // Practice
      } else if (_category === SubjectType.KPRegular.Test) {
        URL = `lpt/v1/tests/go_test?subject_id=${subject_id}`; // Test
      } else if (_category === SubjectType.KPRegular.Learn) {
        URL = `lpt/v1/learn/progress?subject_id=${subject_id}`; // Learn
      }
      const response = await api.get(URL);
      if (response?.status === 200) {
        switch (_category) {
          case SubjectType.KPRegular.Practice:
            response?.data.data?.map((ie: any) => {
              if (ie?.chapter?.id === chapterData?.chapter?.id) {
                navigation.navigate('KPRegularDetailBab', {
                  category: SubjectType.KPRegular.Practice,
                  chapterData: ie,
                  subject_icon: subject_icon,
                  subject_id: subject_id,
                  subject_name: subject_name,
                });
              }
            });
            break;
          case SubjectType.KPRegular.Test:
            response?.data.data?.map((ie: any) => {
              if (ie?.chapter?.id === chapterData?.chapter?.id) {
                navigation.navigate('KPRegularDetailBab', {
                  category: SubjectType.KPRegular.Test,
                  chapterData: ie,
                  subject_icon: subject_icon,
                  subject_id: subject_id,
                  subject_name: subject_name,
                });
              }
            });
            break;
          case SubjectType.KPRegular.Learn:
            response?.data.data?.map((ie: any) => {
              if (ie?.chapter?.id === chapterData?.chapter?.id) {
                navigation.navigate('KPRegularDetailBab', {
                  category: SubjectType.KPRegular.Learn,
                  chapterData: ie,
                  subject_icon: subject_icon,
                  subject_id: subject_id,
                  subject_name: subject_name,
                });
              }
            });
            break;
          default:
            break;
        }
      }
    } catch (err) {
      return;
    } finally {
      dismissLoading();
    }
  };

  const handleOpenInstruction = async (_materialData: any) => {
    switch (category) {
      case SubjectType?.KPRegular?.Practice:
        setInstructionTotalQuestion(_materialData?.rules?.total_question);
        setInstructionNotes(_materialData?.rules?.rules);
        setInstructionTitle(_materialData?.name);
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      case SubjectType.KPRegular.Test:
        setInstructionNotes(_materialData?.instructions);
        setInstructionTitle(_materialData?.name);
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      case SubjectType.AKM.AKM:
        setInstructionNotes(_materialData?.instructions);
        setInstructionTitle(_materialData?.name);
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      case SubjectType.SOAL.UlanganHarianPractice:
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      case SubjectType.SOAL.UlanganHarianTest:
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      case SubjectType.LMS.MateriSekolah:
        setMaterialData(_materialData);
        setIsOpenInstruction(true);
        break;
      default:
        break;
    }
  };

  const returnServiceType = () => {
    switch (category) {
      case SubjectType.KPRegular.Practice:
        return getAllPracticeChapter?.data?.type;
      case SubjectType.KPRegular.Test:
        return getAllTestChapter?.data?.type;
      case SubjectType.AKM.AKM:
        return getAllAkmTypePackage?.data?.type;
      case SubjectType.KPRegular.AKM:
        return getAllAkmTypePackage?.data?.type;
      case SubjectType.SOAL.AKM:
        return getAllAkmTypePackage?.data?.type;
      case SubjectType.SOAL.UlanganHarianPractice:
        return getUlanganHarianChapterPracticePackage?.data?.type;
      case SubjectType.SOAL.UlanganHarianTest:
        return getUlanganHarianChapterPracticePackage?.data?.type;
      default:
        break;
    }
    return null;
  };

  const handleNavigationContent = (chapter_type: any, title?: string): any => {
    //Paket Soal A Uraian
    setIsOpenInstruction(false);
    setInstructionNotes('');
    setInstructionTitle('');
    setInstructionTotalQuestion(0);
    //material data ada di state materialData pas kalian hit handleOpenInstruction
    const QuestionParamData: any = {
      chapter_id: chapterData?.chapter?.id,
      question_service_id: materialData?.id,
      question_package_id:
        category === SubjectType.AKM.AKM
          ? akmInstructionData?.id
          : materialData?.id,
      title: materialData?.name,
      number_of_attempts: materialData?.rules?.number_of_attempts ?? 1,
      subTitle: `${subject_name} \u25CF ${chapterData?.chapter?.name}`,
      is_done: materialData?.user_progress?.[0]?.is_done ?? false,
      service: returnServiceType(),
      rules: materialData?.rules,
      level_id: materialData?.level_id,
    };

    const _QuestionParamDataAKM = (questionData: any) => {
      return {
        chapter_id: chapterData?.chapter?.id,
        question_service_id:
          questionData?.data?.question_type_id === 1
            ? QUESTION_SERVICE_TYPE?.AKM_LITERASI_PILIHAN_GANDA
            : QUESTION_SERVICE_TYPE?.AKM_LITERASI_URAIAN,
        question_package_id: materialData?.question_package_service_id,
        title: materialData?.name,
        number_of_attempts: materialData?.rules?.number_of_attempts ?? 1,
        subTitle: `${
          akmInstructionData?.akmCategory === 1 ? 'Literasi' : 'Numerasi'
        } \u25CF ${
          materialData?.question_type?.id === 1 ? 'PG' : 'Uraian'
        } \u25CF ${materialData?.name}`,
        is_done: materialData?.user_progress?.[0]?.is_done ?? false,
        service: returnServiceType(),
        rules: materialData?.rules,
        question_data: questionData,
      };
    };

    const _QuestionParamDataSOAL = (questionData: any) => {
      return {
        chapter_id: materialData?.chapter_id,
        question_service_id: QUESTION_SERVICE_TYPE?.SOAL_PILIHAN_GANDA,
        question_package_id: materialData?.question_package_service_id,
        title: 'Ulangan Harian',
        number_of_attempts: materialData?.rules?.number_of_attempts ?? 1,
        subTitle: `${chapter_type === 1 ? 'Practice' : ''}`,
        is_done: materialData?.user_progress?.[0]?.is_done ?? false,
        service: returnServiceType(),
        rules: materialData?.instructions,
        question_data: questionData,
      };
    };

    const _handleNavigate = async (question_type_id: any) => {
      try {
        const _res = await ProviderSOAL?.startSoalOrAkm({
          question_package_service_id:
            materialData?.question_package_service_id,
          question_package_id: materialData?.id,
          duration_minutes: materialData?.rules?.max_duration ?? 0,
        });
        var resDataStartSoal: any = _res?.data || false;
        if (resDataStartSoal?.status === 500) {
          Toast?.show({
            type: 'error',
            text1: 'Internal server error 500',
          });
        } else {
          if (
            category === SubjectType.AKM.AKM ||
            category === SubjectType.SOAL.AKM
          ) {
            const _resNav = await ProviderLMS.getNavigateQuestionEssay(
              resDataStartSoal?.data?.package_history_id,
              1,
            );
            var resDataGetNavigation: any = _resNav?.data || false;
            if (resDataGetNavigation?.code === 100) {
              navigation.navigate(
                question_type_id === 1
                  ? 'MultipleChoiceQuestionScreen'
                  : 'EssayScreen',
                category === SubjectType?.AKM.AKM
                  ? _QuestionParamDataAKM(resDataStartSoal)
                  : _QuestionParamDataSOAL(resDataStartSoal),
              );
            } else if (resDataGetNavigation?.code === 910) {
              navigation.navigate('ResultScreen', {
                serviceType: 'AKM',
                historyId: resDataStartSoal?.data?.package_history_id,
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error Sistem',
              });
            }
          } else {
            navigation.navigate(
              question_type_id === 1
                ? 'MultipleChoiceQuestionScreen'
                : 'EssayScreen',
              category === SubjectType?.AKM.AKM
                ? _QuestionParamDataAKM(resDataStartSoal)
                : _QuestionParamDataSOAL(resDataStartSoal),
            );
          }
        }
      } catch (error: any) {
        if (
          error?.response?.data?.code === 906 ||
          error?.response?.data?.code === 100
        ) {
          if (
            category === SubjectType.AKM.AKM ||
            category === SubjectType.SOAL.AKM
          ) {
            try {
              const _resNav = await ProviderLMS.getNavigateQuestionEssay(
                error?.response?.data?.data?.package_history_id,
                1,
              );
              var resDataGetNavigation: any = _resNav?.data || false;
              if (
                resDataGetNavigation?.code === 100 ||
                resDataGetNavigation?.code === 906
              ) {
                navigation.navigate(
                  question_type_id === 1
                    ? 'MultipleChoiceQuestionScreen'
                    : 'EssayScreen',
                  category === SubjectType?.AKM.AKM
                    ? _QuestionParamDataAKM(error?.response?.data)
                    : _QuestionParamDataSOAL(error?.response?.data),
                );
              } else if (resDataGetNavigation?.code === 910) {
                navigation.navigate('ResultScreen', {
                  serviceType: 'AKM',
                  historyId: resDataStartSoal?.data?.data?.package_history_id,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Error Sistem',
                });
              }
            } catch (_error: any) {
              if (
                _error?.response?.data?.code === 906 ||
                _error?.response?.data?.code === 100
              ) {
                navigation.navigate(
                  question_type_id === 1
                    ? 'MultipleChoiceQuestionScreen'
                    : 'EssayScreen',
                  category === SubjectType?.AKM.AKM
                    ? _QuestionParamDataAKM(error?.response?.data)
                    : _QuestionParamDataSOAL(error?.response?.data),
                );
              } else if (_error?.response?.data?.code === 910) {
                navigation.navigate('ResultScreen', {
                  serviceType: 'AKM',
                  historyId: error?.response?.data?.data?.package_history_id,
                });
              } else {
                Toast?.show({
                  type: 'error',
                  text1:
                    error?.response?.data?.message ??
                    'Terjadi kesalahan pada sistem kami',
                });
              }
            }
          } else {
            navigation.navigate(
              question_type_id === 1
                ? 'MultipleChoiceQuestionScreen'
                : 'EssayScreen',
              category === SubjectType?.AKM.AKM
                ? _QuestionParamDataAKM(error?.response?.data)
                : _QuestionParamDataSOAL(error?.response?.data),
            );
          }
        } else {
          Toast?.show({
            type: 'error',
            text1:
              error?.response?.data?.message ?? 'Internal server error [500]',
          });
        }
      }
    };
    switch (chapter_type) {
      case 1:
        (category === SubjectType.AKM.AKM ||
          category === SubjectType.SOAL.AKM ||
          category === SubjectType.SOAL.UlanganHarianPractice ||
          category === SubjectType.SOAL.UlanganHarianTest) &&
          _handleNavigate(chapter_type);

        category === SubjectType.KPRegular.Practice &&
          navigation.navigate(
            'MultipleChoiceQuestionScreen',
            QuestionParamData,
          );

        category === SubjectType.KPRegular.Test &&
          navigation.navigate(
            'MultipleChoiceQuestionScreen',
            QuestionParamData,
          );
        break;
      case 2:
        (category === SubjectType.AKM.AKM ||
          category === SubjectType.SOAL.AKM ||
          category === SubjectType.SOAL.UlanganHarianPractice ||
          category === SubjectType.SOAL.UlanganHarianTest) &&
          _handleNavigate(chapter_type);

        category === SubjectType.KPRegular.Practice &&
          navigation.navigate('EssayScreen', QuestionParamData);

        category === SubjectType.KPRegular.Test &&
          navigation.navigate('EssayScreen', QuestionParamData);
        break;
      case 3:
        navigation.navigate('HotsScreen', {
          chapterData: chapterData,
          title: title ?? '',
          question_service_type_id: title === 'Soal HOTS' ? 5 : 4,
        });
        break;
      default:
        break;
    }
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setScrollPosition(scrollY);
  };

  const navigateToTest = async () => {
    try {
      showLoading();
      await rdxDispatch(
        fetchGetUlanganHarianChapterTestPackage(chapterData?.id, (res: any) => {
          let _dataRes: any = res?.data?.packages[0];
          _dataRes.chapter_name = subject_data?.name || '';
          setSoalDataDetail(_dataRes);
          setIsOpenPopUp(true);
        }),
      );
    } catch (error: any) {
      showErrorToast(error);
    } finally {
      dismissLoading();
    }
  };
  const navigateToWatchVideo = () => {
    navigation.navigate('QuestionBabScreen', {
      chapterData: subject_data,
      category: 'Soal',
      subject_id: subject_data?.id,
      subject_name: subject_data?.name,
      path_url: subject_data?.icon_path_url,
    });
  };

  const currentCuriculum = useActiveCurriculum();
  const isIKM = isStringContains(currentCuriculum.name || '', 'merdeka');
  const {Coachmarks, scrollView, doneCoachMark, _handlerCoachmark} =
    useCoachmark(Keys.coachmark_mobile_chapter);

  var totalCoachmark = 5;

  const hasDataPresentation = contentData?.some(
    (obj: IMaterialContentData) => obj?.type === 'presentation',
  );

  if (hasDataPresentation) {
    totalCoachmark++;
  }
  const hasDataAnimation = contentData?.some(
    (obj: IMaterialContentData) => obj?.type === 'video',
  );

  if (hasDataAnimation) {
    totalCoachmark++;
  }
  const hasDataEbook = contentData?.some(
    (obj: IMaterialContentData) => obj?.type === 'ebook',
  );

  if (hasDataEbook) {
    totalCoachmark++;
  }

  return {
    navigation,
    route,
    category,
    chapterData,
    subject_id,
    subject_name,
    handleScroll,
    subject_icon,
    isSoal,
    soal_type,
    questionTypeId,
    questionPackageServiceId,
    getAllChapter,
    getAllPracticeChapter,
    getAllPracticeChapterQuestion,
    getAllTestChapter,
    getAllAkmTypePackage,
    getUlanganHarianChapterPracticePackage,
    getUlanganHarianChapterTestPackage,
    getLMSMateriSekolahMateri,
    dispatch,
    classId,
    // setClassId,
    isOpenInstruction,
    setIsOpenInstruction,
    instructionNotes,
    setInstructionNotes,
    instructionTitle,
    setInstructionTitle,
    isLoading,
    setIsLoading,
    materialData,
    setMaterialData,
    listMaterial,
    setListMaterial,
    akmInstructionData,
    setAkmInstructionData,
    instructionTotalQuestion,
    setInstructionTotalQuestion,
    scrollViewRef,
    handleOpenInstruction,
    returnServiceType,
    handleNavigationContent,
    contentData,
    fetchChapter,
    scrollPosition,
    setScrollPosition,
    subject_data,
    isOpenPopUp,
    setIsOpenPopUp,
    soalDataDetail,
    setSoalDataDetail,
    navigateToTest,
    navigateToWatchVideo,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
    totalCoachmark,
    hasDataPresentation,
    hasDataAnimation,
    hasDataEbook,
    scrollView,
    isIKM,
  };
};

export default useChapterLessonDetail;
