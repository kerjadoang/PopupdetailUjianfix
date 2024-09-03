/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useLayoutEffect} from 'react';
import SearchInput from '@components/atoms/SearchInput';
import api from '@api/index';
import {_handlerConvertDatePicker, useMergeState} from '@constants/functional';
import dayjs from 'dayjs';
import globalProvider from '@services/global/provider';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetTeacherExamHistory} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const LIMIT_OFFSET: {limit: number; offset: number} = {
  limit: 10,
  offset: 0,
};
const useHistoryExamScreenTeacher = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamList, 'HistoryExamScreenTeacher'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryExamScreenTeacher'>>();
  const class_id = route?.params?.id?.id;

  const ExamHistoryStore: any = useSelector(
    (store: RootState) => store.getTeacherExamHistory,
  );
  const list = ExamHistoryStore?.data?.data ?? [];
  const isFocused = useIsFocused();

  //data filter
  const [listMapel, setListMapel] = useState<any>([]);
  const [tipe, setTipe] = useState<any>([]);

  const [mapelSelected, setMapelSelected] = useState<number[]>([]);
  const [mapelName, setMapelName] = useState<number[]>([]);
  const [tipeSelected, setTipeSelected] = useState([]);

  //modal filter
  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  const [isShowTypeFilter, setIsShowTypeFilter] = useState(false);
  const [isShowMapelFilter, setIsShowMapelFilter] = useState(false);

  //paging
  const [pagination, setPagination] = useState(LIMIT_OFFSET);

  //date
  const [date, setDate] = useState('');
  const [state, setState] = useMergeState({
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
  });
  const [time, setTime] = useState({
    from: '',
    until: '',
  });
  const {datePickerFrom, datePickerUntil}: any = state;

  const [valueDatePicker, setValueDatePicker] = useState({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const datePickerConvertFrom = _handlerConvertDatePicker(datePickerFrom);
  const datePickerConvertUntil = _handlerConvertDatePicker(datePickerUntil);
  const [calendar, setCalendar] = useState({
    status: false,
    type: '',
  });

  const _handlerSetDatePickerFrom = (text: any) => {
    setState({datePickerFrom: text});
    setTime({...time, from: `${text.date}/${text.month}/${text.year}`});
  };

  const _handlerSetDatePickerUntil = (text: any) => {
    setState({datePickerUntil: text});
    setTime({...time, until: `${text.date}/${text.month}/${text.year}`});
  };

  const _handlerSetDate = () => {
    if (calendar.type === 'from') {
      _handlerSetDatePickerFrom(valueDatePicker);
    } else if (calendar.type === 'until') {
      _handlerSetDatePickerUntil(valueDatePicker);
    }
  };
  //end date

  const fetchMapel = async () => {
    try {
      const paramss = {
        class_id: class_id ? class_id?.toString() : '',
      };
      const res = await globalProvider.getAllSubjectByClass(paramss);
      if (res?.data?.code === 100) {
        return setListMapel(res?.data?.data);
      }
      return setListMapel([]);
    } catch (err) {
      return;
    }
  };

  const fetchTipe = async () => {
    try {
      const res = await api.get(
        '/backoffice/question/package/service?order_by=id&sort=asc&search=["service","=","\'EXAM\'"]',
      );
      if (res?.status === 200) {
        return setTipe(res?.data?.data);
      }
      return setTipe([]);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    const data = {
      search: search,
      ...pagination,
      status: ['done_scoring'],
      subject_id: mapelSelected.map((obj: any) => obj?.id) ?? [],
      rombel_id: [class_id],
      service_id: tipeSelected.map((obj: any) => obj?.id) ?? [],
    };
    const params = {
      from: date === 'Semua Tanggal' ? '' : time.from ? time.from : '',
      to: date === 'Semua Tanggal' ? '' : time.until ? time.until : '',
    };
    dispatch(fetchGetTeacherExamHistory(data, params));
  }, [search, selected, pagination]);

  useEffect(() => {
    setPagination(LIMIT_OFFSET);
  }, [search, selected]);

  useLayoutEffect(() => {
    fetchMapel();
    fetchTipe();
  }, [isFocused]);

  const __onEndReached = () => {
    const {nextPage, loading} = ExamHistoryStore;

    if (nextPage && !loading) {
      setPagination(prevState => ({
        ...prevState,
        offset: pagination.offset + pagination.limit,
      }));
    }
  };
  const buttonCategory = [
    {
      id: 1,
      name: 'Semua Tanggal',
      value:
        date === 'Pilih Tanggal'
          ? time.from + ' - ' + time.until
          : 'Semua Tanggal',
      onPress: () => {
        setIsShowDateFilter(true);
      },
      isSelected: date !== '' && date?.length !== 0 ? true : false,
    },
    {
      id: 2,
      name: 'Semua mapel',
      value:
        mapelSelected?.length === 0
          ? null
          : mapelSelected?.length < 2
          ? mapelSelected?.map((obj: any) => obj?.name)
          : mapelSelected?.length < listMapel?.length
          ? mapelSelected?.length.toString() + ' mapel'
          : 'Semua mapel',
      onPress: () => {
        setIsShowMapelFilter(true);
      },
      isSelected: mapelSelected?.length !== 0 ? true : false,
    },
    {
      id: 3,
      name: 'Semua Tipe',
      value:
        tipeSelected?.length === 0
          ? null
          : tipeSelected?.length < 2
          ? tipeSelected?.map((obj: any) => obj?.name)
          : tipeSelected?.length < tipe?.length
          ? tipeSelected?.length.toString() + ' Tipe'
          : 'Semua Tipe',
      onPress: () => {
        setIsShowTypeFilter(true);
      },
      isSelected: tipeSelected?.length !== 0 ? true : false,
    },
  ];

  return {
    SearchInput,
    search,
    setSearch,
    setMapelSelected,
    mapelSelected,
    tipeSelected,
    tipe,
    date,
    setDate,
    setTime,
    valueDatePicker,
    setValueDatePicker,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    calendar,
    setCalendar,
    _handlerSetDate,
    time,
    setState,
    isShowDateFilter,
    setIsShowDateFilter,
    buttonCategory,
    isShowMapelFilter,
    setIsShowMapelFilter,
    isShowTypeFilter,
    setIsShowTypeFilter,
    selected,
    setSelected,
    setTipeSelected,
    listMapel,
    setListMapel,
    mapelName,
    setMapelName,
    __onEndReached,
    list,
    route,
    navigation,
  };
};
export {useHistoryExamScreenTeacher};
