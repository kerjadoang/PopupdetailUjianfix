import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/ptn/provider';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import mediaProvider from '@services/media/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {ParamList} from 'type/screen';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';

const useDiagnoticProfessionResult = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiagnoticProfessionScreen'>
    >();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<ParamList, 'DiagnoticProfessionScreen'>>();
  const profession = route?.params?.profession;
  const [majors, setMajors] = useState<any>(null);
  const {getUser}: any = useSelector((state: RootState) => state);
  const [major, setMajor] = useState<any>([]);
  const [selected, setSelected] = useState<any>(major ? major : []);
  const [editedMajor, setEditedMajor] = useState<boolean>(false);
  const [universityMajors, setUniversityMajors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataTab, setDataTab] = useState<any>(null);
  const [isShowSubmitResult, setIsShowSubmitResult] = useState<any>(false);
  const [isShowSwipeUpNotSuscribed, setIsShowSwipeUpNotSuscribed] =
    useState<boolean>(false);
  const [isAlreadySetRating, setIsAlreadySetRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [navigateToCart, setNavigateToCart] = useState<boolean>(false);
  const TabLabel: any = {};

  const [tabActive, setTabActive] = useState<string>(
    TabLabel !== undefined
      ? Object.keys(TabLabel).length !== 0
        ? TabLabel[0]
        : ''
      : '',
  );
  const Tab = createMaterialTopTabNavigator();
  const handleOnPressTab: any = (tabName: string) => {
    setTabActive(tabName);
  };

  const _renderMajorsUsingProfession = async () => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getMajorsUsingProfession(profession?.id);
      if (status === 200) {
        setMajors(data);
      }
    } catch (_) {}
  };

  const _renderUserUniversityMajor = async () => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getUserUniversityMajor(getUser?.data?.id);
      if (status === 200) {
        setUniversityMajors(data);
      }
    } catch (_) {}
  };

  const _renderUserRating = async () => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getRating();
      if (status === 200) {
        if (data) {
          setIsAlreadySetRating(true);
        }
      }
    } catch (_) {}
  };

  const _renderUserUniversityRecommendation = async (major_id: any) => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getSaveUniversityRecomendation(major_id);
      if (status === 200) {
        const tempData = data;

        if (tempData?.best?.university?.logo) {
          const resImage = await mediaProvider.getImage(
            tempData?.best?.university?.logo,
          );
          tempData.best.university.logo_path_url = resImage?.data?.path_url;
        }
        if (tempData?.popular?.university?.logo) {
          const resImage = await mediaProvider.getImage(
            tempData?.popular?.university?.logo,
          );
          tempData.popular.university.logo_path_url = resImage?.data?.path_url;
        }
        if (tempData?.nearest?.university?.logo) {
          const resImage = await mediaProvider.getImage(
            tempData?.nearest?.university?.logo,
          );
          tempData.nearest.university.logo_path_url = resImage?.data?.path_url;
        }
        setDataTab(tempData);
      }
    } catch (_) {}
  };

  const getDiagnoticMajors = async () => {
    try {
      const majorsStorage = await provider.getDiagnoticMajors();
      setMajor(
        majorsStorage?.sort(function (a: any, b: any) {
          return a.id - b.id || a.name.localeCompare(b.name);
        }),
      );
      setTabActive(majorsStorage[0]?.major?.name);
    } catch (_) {}
  };

  useLayoutEffect(() => {
    if (isFocused) {
      _renderMajorsUsingProfession();
      _renderUserUniversityMajor();
      getDiagnoticMajors();
      _renderUserRating();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    const isSuscribedToPTNServices = getUser?.data?.services?.some(
      (obj: any) => obj.name === 'PTN',
    );
    if (!isSuscribedToPTNServices) {
      setIsShowSwipeUpNotSuscribed(true);
    }
  }, []);

  useEffect(() => {
    if (major) {
      setSelected(major);
    }
  }, [isFocused, major]);

  const _setStorageMajors = async (data: any) => {
    try {
      await provider.setDiagnoticMajors(data);
    } catch (_) {}
  };

  const _setMajors = async (data: any) => {
    setIsLoading(true);
    _setStorageMajors(data)
      .then(() => getDiagnoticMajors())
      .then(() => {
        setEditedMajor(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (editedMajor) {
      _setMajors(selected);
    }
  }, [editedMajor]);

  const _setSelectedMajors = async (obj: any) => {
    setSelected((prev: any) => {
      if (prev?.length !== 0 && major?.length !== 0) {
        if (prev?.some((o: any) => o?.id === obj?.id)) {
          setEditedMajor(true);
          return prev?.filter((o: any) => o?.id !== obj?.id);
        } else {
          if (prev?.length > 2) {
            return prev;
          }
          if (prev) {
            setEditedMajor(true);
            return [...prev, obj];
          } else {
            setEditedMajor(true);
            return [obj];
          }
        }
      } else {
        setEditedMajor(true);
        return [obj];
      }
    });
  };

  const _setProfessions = async () => {
    try {
      const professions = await provider.getDiagnoticProfession();
      const {status} = await provider.setProfession(professions?.id);
      if (status === 200) {
      }
    } catch (_) {}
  };

  const _setMajorsApi = async () => {
    try {
      const majorsStorage: any[] = await provider.getDiagnoticMajors();
      const params: IReqBatchUniversity[] = majorsStorage?.map((item: any) => ({
        major_id: item?.major?.id,
      }));
      await apiPost({
        url: URL_PATH.get_save_batch_university_recommendation(true),
        body: params,
      });
    } catch (_) {
    } finally {
    }
  };

  const _submitRating = async () => {
    try {
      const body = {
        rating: rating,
      };
      const {status} = await provider.submitRating(body);
      if (status === 200) {
        Toast.show({type: 'success', text1: 'Berhasi Memberikan Penilaian'});
      } else {
        Toast.show({type: 'error', text1: 'Terjadi Kesalahan'});
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err.data?.message ?? 'Terjadi Kesalahan',
      });
    }
  };

  const _handlerSave = async () => {
    showLoading();
    await Promise.all([_setProfessions(), _setMajorsApi(), _submitRating()]);
    await AsyncStorage.multiRemove([Keys.profession, Keys.majors]);
    dismissLoading();
    setIsShowSubmitResult(false);
    navigation.replace('BottomTabNavigator');
  };

  const _handlerLater = async () => {
    showLoading();
    await Promise.all([_setProfessions(), _setMajorsApi()]);
    await AsyncStorage.multiRemove([Keys.profession, Keys.majors]);
    dismissLoading();
    setIsShowSubmitResult(false);
    navigation.replace('BottomTabNavigator');
  };

  const onAnotherMajor = async () => {
    try {
      showLoading();
      await _setMajorsApi();
      navigation.navigate('DiagnoticCheckOpportunityScreen', {
        profession: profession,
      });
    } catch (error: any) {
      showErrorToast(error?.toString() || 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  const isValid =
    major !== undefined &&
    major?.length !== 0 &&
    selected?.length !== 0 &&
    !editedMajor;

  return {
    navigation,
    route,
    profession,
    majors,
    universityMajors,
    selected,
    setSelected,
    Tab,
    tabActive,
    TabLabel,
    handleOnPressTab,
    major,
    _setSelectedMajors,
    isLoading,
    setIsLoading,
    _renderUserUniversityRecommendation,
    dataTab,
    isValid,
    rating,
    setRating,
    isShowSubmitResult,
    setIsShowSubmitResult,
    _handlerSave,
    _handlerLater,
    isShowSwipeUpNotSuscribed,
    setIsShowSwipeUpNotSuscribed,
    navigateToCart,
    setNavigateToCart,
    isAlreadySetRating,
    onAnotherMajor,
  };
};

export default useDiagnoticProfessionResult;
