import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/ptn/provider';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {useNavigate} from '@hooks/useNavigate';
import {DiagnoticCheckOpportunityParam, ParamList} from 'type/screen';
import {apiGetBulkImage, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

const useDiagnoticCheckOpportunity = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiagnoticCheckOpportunityScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'DiagnoticCheckOpportunityScreen'>>();
  const {getRouteParams} = useNavigate();
  const {profession, result: resultFromParam} =
    getRouteParams<DiagnoticCheckOpportunityParam>();
  const isFocused = useIsFocused();
  const [queryMajor1, setQueryMajor1] = useState<any>(null);
  const [queryMajor2, setQueryMajor2] = useState<any>(null);
  const [queryMajor3, setQueryMajor3] = useState<any>(null);
  const [queryUniversity1, setQueryUniversity1] = useState<any>(null);
  const [queryUniversity2, setQueryUniversity2] = useState<any>(null);
  const [queryUniversity3, setQueryUniversity3] = useState<any>(null);
  const [dataResult, setDataResult] = useState<IResMatchUniversity[]>([]);
  const [isShowSubmitResult, setIsShowSubmitResult] = useState<any>(false);
  const [rating, setRating] = useState<number>(0);
  const [result, setResult] = useState<IReqResultSearchUniversity[]>(
    resultFromParam ?? [],
  );

  const isResultValid =
    result?.findIndex(
      (item: IReqResultSearchUniversity) =>
        item?.university_id == undefined || item?.major_id == undefined,
    ) == -1 ?? false;
  //is valid user already choose atleast one major
  const isValid: boolean = isResultValid && result?.length === 3;

  //catch data query search from search screen
  useEffect(() => {
    if (isFocused) {
      if (route?.params?.queryMajor1) {
        setQueryMajor1(route?.params?.queryMajor1);
      }
      if (route?.params?.queryMajor2) {
        setQueryMajor2(route?.params?.queryMajor2);
      }
      if (route?.params?.queryMajor3) {
        setQueryMajor3(route?.params?.queryMajor3);
      }
      if (route?.params?.queryUniversity1) {
        setQueryUniversity1(route?.params?.queryUniversity1);
      }
      if (route?.params?.queryUniversity2) {
        setQueryUniversity2(route?.params?.queryUniversity2);
      }
      if (route?.params?.queryUniversity3) {
        setQueryUniversity3(route?.params?.queryUniversity3);
      }
    }
  }, [route?.params, isFocused]);

  //handle onclick button search to navigate screen search
  const _handlerOnPressSearch = (search: string, searchType: string) => {
    navigation.navigate('DiagnoticSearchScreen', {
      profession: profession,
      search: search,
      searchType: searchType,
      searchVal:
        search === 'queryMajor1'
          ? queryMajor1?.name
          : search === 'queryMajor2'
          ? queryMajor2?.name
          : search === 'queryMajor3'
          ? queryMajor3?.name
          : search === 'queryUniversity1'
          ? queryUniversity1?.name
          : search === 'queryUniversity2'
          ? queryUniversity2?.name
          : search === 'queryUniversity3'
          ? queryUniversity3?.name
          : '',
      queryMajor1: queryMajor1 ?? '',
      queryMajor2: queryMajor2 ?? '',
      queryMajor3: queryMajor3 ?? '',
      queryUniversity1: queryUniversity1 ?? '',
      queryUniversity2: queryUniversity2 ?? '',
      queryUniversity3: queryUniversity3 ?? '',
      queryUniversityId: route?.params?.queryUniversityId ?? '',
      queryUniversityMajorId: route?.params?.queryUniversityMajorId ?? '',
      result: result ?? resultFromParam,
    });
  };
  //reset function
  const _resetHandler = () => {
    //reset all state
    setQueryMajor1(null);
    setQueryMajor2(null);
    setQueryMajor3(null);
    setQueryUniversity1(null);
    setQueryUniversity2(null);
    setQueryUniversity3(null);
    setDataResult([]);
    setResult([]);
    //reset all route.params
    navigation.setParams({
      queryMajor1: null,
      queryMajor2: null,
      queryMajor3: null,
      queryUniversity1: null,
      queryUniversity2: null,
      queryUniversity3: null,
      result: undefined,
    });
  };

  //render see results
  const _renderSeeResults = async () => {
    try {
      // let tempBody = [];
      const params: IReqMatchUniversity[] =
        result?.map((item: IReqResultSearchUniversity) => ({
          major_id: item?.major_id,
          university_id: item?.university_id,
        })) || [];

      let resData = await apiPost<IResMatchUniversity[]>({
        url: URL_PATH.post_diagnostic_match_university,
        body: params,
      });

      resData = await apiGetBulkImage({
        datas: resData,
        dottedString: 'university.logo',
      });

      setDataResult(resData);
    } catch (e: any) {
      showErrorToast(e?.toString() || 'Terjadi Kesalahan');
    }
  };

  const _setProfessions = async () => {
    try {
      const profession = await provider.getDiagnoticProfession();
      const {status} = await provider.setProfession(profession?.id);
      if (status === 200) {
      }
    } catch (_) {}
  };

  const _setMajorsApi = async () => {
    try {
      const body: IReqSetUserPersonalMajor = {
        choosen_majors: dataResult?.map((item: IResMatchUniversity) => ({
          university_major_id: item?.id,
        })),
      };
      await apiPost({
        url: URL_PATH.set_user_personal_major,
        body,
      });
    } catch (_) {}
  };

  const _handlerSave = async () => {
    showLoading();
    await Promise.all([_setMajorsApi(), _setProfessions()]);
    setIsShowSubmitResult(false);
    await AsyncStorage.multiRemove([Keys.profession, Keys.majors]);
    dismissLoading();
    navigation.replace('BottomTabNavigator');
  };

  return {
    navigation,
    route,
    _handlerOnPressSearch,
    queryMajor1,
    queryMajor2,
    queryMajor3,
    queryUniversity1,
    queryUniversity2,
    queryUniversity3,
    setQueryMajor1,
    setQueryMajor2,
    setQueryMajor3,
    setQueryUniversity1,
    setQueryUniversity2,
    setQueryUniversity3,
    _resetHandler,
    dataResult,
    setDataResult,
    _renderSeeResults,
    isValid,
    isShowSubmitResult,
    setIsShowSubmitResult,
    rating,
    setRating,
    _handlerSave,
    result,
  };
};

export default useDiagnoticCheckOpportunity;
