/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useNavigate} from '@hooks/useNavigate';
import {DiagnoticSearchParam, ParamList} from 'type/screen';
import {URL_PATH} from '@constants/url';
import {apiGet, apiGetBulkImage} from '@api/wrapping';
import {deepClone, isStringContains} from '@constants/functional';
import useDebounce from '@hooks/useDebounce';

const LIMIT_OFFSET = {
  limit: 25,
  offset: 0,
};

const useDiagnoticSearch = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DiagnoticSearchScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'DiagnoticSearchScreen'>>();
  const {getRouteParams} = useNavigate();
  const {
    profession,
    search,
    searchType,
    searchVal,
    queryMajor1,
    queryMajor2,
    queryMajor3,
    queryUniversity1,
    queryUniversity2,
    queryUniversity3,
    queryUniversityId,
    result,
  } = getRouteParams<DiagnoticSearchParam>();
  const [query, setQuery] = useState<string>(searchVal || '');
  const queryDebounce = useDebounce(query, 300);
  const [dataResult, setDataResult] = useState<any>([]);
  const [pagination, setPagination] = useState<any>(LIMIT_OFFSET);

  const isSearchJurusan = searchType === 'jurusan';
  const extractedSearchNum = search?.replace(/\D/g, '');

  const currResult = result?.find((item: IReqResultSearchUniversity) =>
    isStringContains(item.univ_major_choice || '', extractedSearchNum),
  );

  //render search  jurusan
  const _searchUniversityMajor = async (
    querySearch: string,
    majorPagination: any,
    reset?: boolean,
  ) => {
    try {
      const params: IReqSearchUniversityMajorV2 = {
        // professionId: profession?.id,
        majorName: querySearch,
        universityId: currResult?.university_id || '',
        distinct_major: true,
        ...majorPagination,
      };

      const resData = await apiGet<IResSearchUniversityMajorV2[]>({
        url: URL_PATH.search_university_major_v2(params),
      });

      const mappedData = resData?.map(data => data.major);

      setDataResult((prev: any) => {
        if (prev?.length !== 0 && !reset) {
          return [...(prev || []), ...(mappedData || [])]?.removeDuplicate?.();
        }
        return mappedData;
      });
    } catch (_) {
      setDataResult((prev: any) => {
        if (prev?.length !== 0 && !reset) {
          return [...prev];
        }
        return [];
      });
    }
  };

  //render search  universitas
  const _searchUniversity = async (
    querySearch: string,
    universityPagination: any,
    reset?: boolean,
  ) => {
    try {
      const params: IReqSearchUniversityV2 = {
        // professionId: profession?.id,
        name: querySearch,
        majorId: currResult?.major_id || '',
        ...universityPagination,
      };

      let resData = await apiGet<IResSearchUniversityMajorV2[]>({
        url: URL_PATH.search_university_v2(params),
      });

      resData = await apiGetBulkImage<IResSearchUniversityMajorV2>({
        datas: resData,
        dottedString: 'logo',
      });

      setDataResult((prev: any) => {
        if (prev?.length !== 0 && !reset) {
          return [...(prev || []), ...(resData || [])]?.removeDuplicate?.();
        }
        return resData;
      });
    } catch (_) {
      setDataResult((prev: any) => {
        if (prev?.length !== 0 && !reset) {
          return [...prev];
        }
        return [];
      });
    }
  };

  const mappedResult = (obj: any) => {
    const resItem: IReqResultSearchUniversity = {
      univ_major_choice: search || '',
    };

    if (isSearchJurusan) {
      resItem.major_id = obj?.id;
      resItem.major = obj;
    } else {
      resItem.university_id = obj?.id;
      resItem.university = obj;
    }

    let mappedRes = result ?? [];
    const currSearchChoiceIdx = mappedRes?.findIndex(
      (item: IReqResultSearchUniversity) =>
        isStringContains(item?.univ_major_choice || '', extractedSearchNum),
    );

    if (currSearchChoiceIdx == -1) {
      mappedRes.push(resItem);
    } else {
      mappedRes[currSearchChoiceIdx] = {
        ...mappedRes[currSearchChoiceIdx],
        ...resItem,
      };
    }

    return mappedRes;
  };

  //handle navigate to main screen and set jurusan
  const _handleNavigateMajor = (obj: any) => {
    if (obj?.id) {
      if (obj?.university) {
        obj.university.major_id = obj?.id;
      } else {
        obj.university = {
          // university_major_id: obj?.id,
          major_id: obj?.id,
        };
      }
    }
    navigation.navigate('DiagnoticCheckOpportunityScreen', {
      profession: profession,
      queryMajor1:
        search === 'queryMajor1' ? obj : queryMajor1 ? queryMajor1 : '',
      queryMajor2:
        search === 'queryMajor2' ? obj : queryMajor2 ? queryMajor2 : '',
      queryMajor3:
        search === 'queryMajor3' ? obj : queryMajor3 ? queryMajor3 : '',
      result: mappedResult(obj),
      queryUniversityMajorId: obj?.id,
    });
  };

  //handle navigate to main screen and set universitas
  const _handleNavigateUniversity = (obj: any) => {
    if (obj?.id) {
      if (obj?.university) {
        obj.university.university_id = obj?.id;
      } else {
        obj.university = {
          university_id: obj?.id,
        };
      }
    }
    navigation.navigate('DiagnoticCheckOpportunityScreen', {
      profession: profession,
      queryUniversity1:
        search === 'queryUniversity1'
          ? obj
          : queryUniversity1
          ? queryUniversity1
          : '',
      queryUniversity2:
        search === 'queryUniversity2'
          ? obj
          : queryUniversity2
          ? queryUniversity2
          : '',
      queryUniversity3:
        search === 'queryUniversity3'
          ? obj
          : queryUniversity3
          ? queryUniversity3
          : '',
      result: mappedResult(obj),
      queryUniversityId: obj?.id,
    });
  };

  //handle if user change text on search component
  useEffect(() => {
    const resetPagination = deepClone(LIMIT_OFFSET);
    setPagination(resetPagination);
    if (isSearchJurusan) {
      _searchUniversityMajor(queryDebounce, resetPagination, true);
    } else {
      _searchUniversity(queryDebounce, resetPagination, true);
    }
  }, [queryDebounce]);

  useEffect(() => {
    if (!queryDebounce) {
      return;
    }

    if (isSearchJurusan) {
      _searchUniversityMajor(queryDebounce, pagination);
    } else {
      _searchUniversity(queryDebounce, pagination);
    }
  }, [pagination]);

  const _onEndReached = () => {
    setPagination((prevState: any) => {
      return {
        ...prevState,
        offset: pagination.offset + pagination.limit,
      };
    });
  };

  return {
    navigation,
    route,
    query,
    setQuery,
    searchType,
    search,
    dataResult,
    _searchUniversityMajor,
    searchVal,
    _handleNavigateMajor,
    _handleNavigateUniversity,
    queryUniversityId,
    _onEndReached,
    isSearchJurusan,
  };
};

export default useDiagnoticSearch;
