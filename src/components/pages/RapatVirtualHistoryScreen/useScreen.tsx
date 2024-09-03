import api from '@api/index';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {ParamList} from 'type/screen';

const useScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'RapatVirtualHistoryScreen'>>();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RapatVirtualHistoryScreen'>
    >();

  const isFocused = useIsFocused();
  const [list, setList] = useState<any[]>([]);
  const [filterParams, setFilterParams] = useState<RapatVirtualFilter>({
    dateStart: '',
    dateEnd: '',
    participant: [],
    offset: 0,
    limit: 10,
    search: '',
    status: [],
  });
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: 'DATE' | 'PARTICIPANT' | 'STATUS' | '';
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

  const fetchList = async () => {
    try {
      const mapParticipant = filterParams.participant
        ?.map(item => item.id)
        .join(',');
      const mapStatus = filterParams?.status?.[0]?.value || 'history';
      const url = `/lms/v1/virtual-meeting/?dateStart=${filterParams.dateStart}&dateEnd=${filterParams.dateEnd}&participant=${mapParticipant}&status=${mapStatus}&limit=${filterParams.limit}&search=${filterParams.search}`;
      const res = await api.get(url);

      if (res?.data?.code === 100) {
        return setList(res?.data?.data);
      }
      return setList([]);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    fetchList();
  }, [filterParams, isFocused]);
  return {
    route,
    navigation,
    list,
    showFilterSwipeUp,
    setShowFilterSwipeUp,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filterParams,
    setFilterParams,
  };
};

export {useScreen};
