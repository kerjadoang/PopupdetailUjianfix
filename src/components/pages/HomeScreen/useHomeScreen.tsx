import {useCallback, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {fetchGetSubjectsFavorite, fetchUpdateSubjectsFavorite} from '@redux';
import {getData} from '@hooks/getData';
import {useCoachmark} from '@hooks/useCoachmark';
import {Keys} from '@constants/keys';
import {isStringContains} from '@constants/functional';
import dayjs from 'dayjs';
import Config from 'react-native-config';
import {ParamList} from 'type/screen';
import {useActiveCurriculum, useActivePhaseClass} from '@features/IKM/zustand';
import {getHomeSubject} from './utils';
import {useQueryFetchUser} from '@services/uaa';

const useHomeScreen = () => {
  const [showChangeNumber, setShowChangeNumber] = useState(false);
  const [refForScroll, setRefForScroll] = useState<any>(null);
  const [heightViewLaporanMapel, setHeightViewLaporanMapel] = useState(0);
  const [isShowBtnLaporanMapel, setIsShowBtnLaporanMapel] = useState(true);
  const activeCuriculum = useActiveCurriculum();
  const activePhaseClass = useActivePhaseClass();

  const [servicesView, setServicesView] = useState<number>(0);
  const [isShowAllSubjects, setIsShowAllSubjects] = useState(false);
  const [isShowSettingFav, setIsShowSettingFav] = useState(false);
  const [listSubjectAll, setListSubjectAll]: any = useState([]);
  const [localListSubjectFav, setLocalListSubjectFav]: any = useState([]);
  const [isShowPracticeSubjects, setIsShowPracticeSubjects] = useState(false);
  const [isShowTestSubjects, setIsShowTestSubjects] = useState(false);
  const [isShowServicesSubjects, setIsShowServicesSubjects] = useState(false);
  const [isShowForbiddenAccess, setIsShowForbiddenAccess] =
    useState<boolean>(false);
  const [userData, setUserData]: any = useState({});
  const [classData, setClassData]: any = useState([]);
  const [selectedServices, setSelectedServices] = useState('');
  const [showPTNNotRelease, setShowPTNNotRelease] = useState(false);
  const {refetch: refetchUser} = useQueryFetchUser({
    disableLoadingAnimation: true,
  });

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreen'>>();
  const isFocused = useIsFocused();
  const dispatch: any = useDispatch();

  const getSubjectsByClass = useSelector(
    (state: RootState) => state.getSubjectsByClass,
  );
  const getSubjectsByUserClass = useSelector(
    (state: RootState) => state.getSubjectsByUserClass,
  );
  const getSubjectsFavorite = useSelector(
    (state: RootState) => state.getSubjectsFavorite,
  );
  const getUser: IGetUser = useSelector((state: RootState) => state.getUser);
  const coachmark = useSelector((state: RootState) => state.coachmark);

  const {scrollView, Coachmarks, doneCoachMark, _handlerCoachmark} =
    useCoachmark(Keys.coachmark_mobile_dashboard);

  const isPTNReleased = useCallback(() => {
    const isDateAfter = dayjs().isAfter('2023-10-16', 'day');
    if (isDateAfter || Config.ENV_MODE !== 'production') {
      navigation.navigate('PTNScreen');
      return;
    }

    setShowPTNNotRelease(true);
  }, [navigation]);

  const _isSubscribedServices = useCallback(
    (type: 'Guru' | 'Soal' | 'PTN') => {
      if (!getUser) {
        return;
      }

      const isAvailable = getUser?.data?.services?.find(
        (x: any) =>
          getUser?.data?.class_id === x?.class_id &&
          isStringContains(x?.name, type),
      );

      if (!isAvailable) {
        setIsShowServicesSubjects(true);
        return;
      }

      if (type === 'Guru') {
        navigation.navigate('GuruScreen');
        return;
      }

      if (type === 'Soal') {
        navigation.navigate('QuestionScreen', {
          subjectData: getSubjectsByClass?.data,
        });
      }

      if (type === 'PTN') {
        isPTNReleased();
        return;
      }
    },
    [getUser, navigation, getSubjectsByClass?.data, isPTNReleased],
  );

  const checkShowChangeNumber = useCallback(async () => {
    try {
      const data = await getData();

      if (data?.dummy && data?.first_login) {
        setShowChangeNumber(true);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    // if (!isFocused) return;
    const isCurriculumChange =
      activeCuriculum?.id != activePhaseClass?.curriculum_id;
    refetchUser();
    getHomeSubject(isCurriculumChange ? undefined : activePhaseClass?.id);
    checkShowChangeNumber();
    // dispatch(fetchGetUser());
  }, [activeCuriculum, activePhaseClass, checkShowChangeNumber, refetchUser]);

  const handleUpdateSubjectsFavorite: any = useCallback(
    async (data: any, isAdd: boolean) => {
      let dataArr: any[] = [];
      if (isAdd === true) {
        if (localListSubjectFav.length !== 4) {
          // dataArr?.push(data);
          dataArr = [...localListSubjectFav, data];
          // localListSubjectFav?.map(async (ie: any) => {
          //   dataArr?.push(ie);
          // });
          await setLocalListSubjectFav(dataArr);
        }
      } else {
        localListSubjectFav?.map((ie: any) => {
          if (data?.subject_id) {
            if (ie?.subject_id !== data?.subject_id) {
              dataArr.push(ie);
            }
          } else {
            if (ie?.id !== data?.id) {
              dataArr.push(ie);
            }
          }
        });
        setLocalListSubjectFav(dataArr);
      }
    },
    [localListSubjectFav],
  );

  useEffect(() => {
    setListSubjectAll(getSubjectsByUserClass);
  }, [getSubjectsByUserClass]);

  useEffect(() => {
    let _dataArr: any = [];
    for (let index = 0; index < 4; index++) {
      if (getSubjectsFavorite?.data?.[index]) {
        _dataArr.push(getSubjectsFavorite?.data?.[index]);
      }
    }
    setLocalListSubjectFav(_dataArr);
  }, [getSubjectsFavorite]);

  const handleSubmitFavorite = async (data?: any[]) => {
    let _dataArr: any = {
      subject_favorite: [],
    };
    (data || localListSubjectFav)?.map((ie: any, index: number) => {
      _dataArr?.subject_favorite?.push({
        subject_id: ie?.subject_id ? ie?.subject_id : ie?.id,
        order: index + 1,
      });
    });

    await dispatch(fetchUpdateSubjectsFavorite(_dataArr));
    setIsShowSettingFav(false);

    dispatch(fetchGetSubjectsFavorite());

    checkShowChangeNumber();
  };

  useEffect(() => {
    if (
      selectedServices === 'SOAL' ||
      selectedServices === 'TANYA' ||
      selectedServices === 'GURU' ||
      selectedServices === 'LMS' ||
      selectedServices === 'PTN'
    ) {
      const statusFTUEAsk = coachmark?.data?.popup_mobile_tanya;
      const statusFTUEPtn = getUser?.data?.class_id >= 10;
      if (selectedServices === 'SOAL') {
        _isSubscribedServices('Soal');
      } else if (selectedServices === 'TANYA' && statusFTUEAsk) {
        navigation.navigate('AskScreen');
      } else if (selectedServices === 'GURU') {
        _isSubscribedServices('Guru');
      } else if (selectedServices === 'PTN' && statusFTUEPtn) {
        isPTNReleased();
        // _isSubscribedServices('PTN');
      } else {
        setIsShowServicesSubjects(true);
      }
    }
  }, [
    _isSubscribedServices,
    coachmark?.data?.popup_mobile_tanya,
    getUser?.data?.class_id,
    isPTNReleased,
    navigation,
    selectedServices,
  ]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setSelectedServices('');
  }, [isFocused]);

  return {
    navigation,
    showChangeNumber,
    refForScroll,
    heightViewLaporanMapel,
    isShowBtnLaporanMapel,
    servicesView,
    isShowAllSubjects,
    isShowSettingFav,
    listSubjectAll,
    isShowPracticeSubjects,
    isShowTestSubjects,
    isShowServicesSubjects,
    isShowForbiddenAccess,
    userData,
    classData,
    selectedServices,
    localListSubjectFav,
    getSubjectsByClass,
    getUser,
    dispatch,

    setRefForScroll,
    setHeightViewLaporanMapel,
    setIsShowBtnLaporanMapel,
    setServicesView,
    setIsShowAllSubjects,
    setIsShowSettingFav,
    setListSubjectAll,
    setLocalListSubjectFav,
    setIsShowPracticeSubjects,
    setIsShowTestSubjects,
    setIsShowServicesSubjects,
    setIsShowForbiddenAccess,
    setUserData,
    setClassData,
    setSelectedServices,
    _isSubscribedServices,
    handleUpdateSubjectsFavorite,
    handleSubmitFavorite,
    setShowChangeNumber,
    showPTNNotRelease,
    setShowPTNNotRelease,

    //coachmark
    coachmark,
    scrollView,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
  };
};

export {useHomeScreen};
