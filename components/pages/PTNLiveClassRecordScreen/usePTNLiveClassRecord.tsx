import {
  dismissLoading,
  showLoading,
  useMergeState,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {URL_PATH} from '@constants/url';
import {apiPost} from '@api/wrapping';
import {
  IPTNFilterSwipeUpType,
  IPTNLiveClassRekamanFilter,
  IPTNModule,
  IReqPTNRecordSession,
  IResponsePTNRecordSession,
} from './type';
import {ParamList} from 'type/screen';
import {putRecordSession} from './utils';
import {mappingBaseFilter} from '@components/atoms';
import {useMutation, useQuery} from '@tanstack/react-query';
import useDebounce from '@hooks/useDebounce';

const usePTNLiveClassRecord = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PTNLiveClassRecordScreen'>>();
  const [state, setState] = useMergeState({
    isLoading: false,
    tempClassSessionRekaman: [],
  });

  const [swipeUpFilterDate, setSwipeUpFilterDate] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filterParams, setFilterParams] = useState<IPTNLiveClassRekamanFilter>({
    dateStart: '',
    dateEnd: '',
    offset: 0,
    limit: 10,
    subjects: [],
    type: [],
    search: '',
  });
  // fetch subjects
  const {data: ptnSubjects} = useQuery({
    queryKey: ['live_class_subjects', filterParams.type],
    initialData: [],
    queryFn: async () => {
      const resData = await apiPost<IPTNModule[]>({
        url: URL_PATH.get_live_class_list_subject_ptn,
        body: {
          feature: ['live_class'],
          module: filterParams.type?.map(type => type.value.toLowerCase()),
        },
      });
      return mappingBaseFilter<IPTNModule>(resData, subject => ({
        id: subject.id!,
        name: subject.name!,
        value: subject,
      }));
    },
  });
  // fetch rekaman
  const {
    data: classSessionRekaman,
    isError,
    mutate: fetchRekaman,
  } = useMutation({
    mutationKey: ['live_class_records'],
    mutationFn: async () => {
      showMore && setShowMore(false);
      const body: IReqPTNRecordSession = {
        mata_pelajaran: filterParams.subjects?.map(subject => subject.id),
        module_ptn: filterParams.type?.map(type => type.value.toLowerCase()),
        search: filterParams.search,
        tanggal_akhir: !filterParams.dateEnd
          ? ''
          : dayjs(filterParams.dateEnd).format('YYYY-MM-DD'),
        tanggal_awal: !filterParams.dateEnd
          ? ''
          : dayjs(filterParams.dateStart).format('YYYY-MM-DD'),
      };
      showLoading();
      const resData = await apiPost<IResponsePTNRecordSession[]>({
        url: URL_PATH.post_ptn_record_session(
          'ptn',
          filterParams.offset,
          filterParams.limit,
        ),
        body: body,
      });
      dismissLoading();

      setState({
        tempClassSessionRekaman: resData.slice(0, 3),
      });
      return resData;
    },
    onError: () => {
      dismissLoading();
      return [];
    },
  });

  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: IPTNFilterSwipeUpType;
  }>({status: false, type: ''});
  const [dateFrom, setDateFrom] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [dateTo, setDateTo] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = useDebounce(searchValue);

  useEffect(() => {
    fetchRekaman();
  }, [filterParams]);

  const onShowMorePress = () => {
    setShowMore(!showMore);
    onShowMore(!showMore);
  };

  const onShowMore = (isShow: boolean) => {
    if (!isShow) {
      setState({
        tempClassSessionRekaman: classSessionRekaman?.slice(0, 3) || [],
      });
      return;
    }

    setState({
      tempClassSessionRekaman: classSessionRekaman,
    });
  };

  const onShowRekaman = async (item: IResponsePTNRecordSession) => {
    putRecordSession(item?.ID || 0, item?.lc_zoom?.media_id || '');
    navigation.navigate('VideoAnimationScreen', {
      chapterData: item,
      type: 'PTN',
    });
  };

  const {tempClassSessionRekaman}: any = state;

  return {
    tempClassSessionRekaman,
    onShowRekaman,
    showMore,
    onShowMorePress,
    swipeUpFilterDate,
    setSwipeUpFilterDate,
    setDateFrom,
    setDateTo,
    dateFrom,
    dateTo,
    setShowFilterSwipeUp,
    showFilterSwipeUp,
    filterParams,
    setFilterParams,
    ptnSubjects,
    getSearchValue,
    searchValue,
    setSearchValue,
    isError,
  };
};
export default usePTNLiveClassRecord;
