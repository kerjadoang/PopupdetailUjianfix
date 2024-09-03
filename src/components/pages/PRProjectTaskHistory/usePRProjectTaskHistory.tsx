import api from '@api/index';
import {_handlerConvertDatePicker, useMergeState} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchgetPRProjectHistory} from '@redux';
import {useDuplicateTask} from '@services/lms';
import dayjs from 'dayjs';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {apiGet} from '@api/wrapping';
import {ParamList} from 'type/screen';

const mappedDatePickerFilter = (datePicker: any) => {
  return dayjs(datePicker)
    .set('month', datePicker?.month - 1)
    .format('YYYY-MM-DD');
};

const LIMIT_OFFSET = {
  limit: 10,
  offset: 0,
};

const usePRProjectTaskHistory = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'PRProjectTaskHistoryScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'PRProjectTaskHistoryScreen'>>();

  const isFromReport = route?.params?.isFromReport;
  const reportName = route?.params?.id?.name;
  const class_id = route?.params?.id?.id;

  const PrProjectHistoryStore: any = useSelector(
    (store: RootState) => store.getPRProjectHistory,
  );

  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);
  const dispatch = useDispatch();
  const {mutate: duplicateTask, isLoading} = useDuplicateTask();

  //modal
  const [isShowTypeFilter, setIsShowTypeFilter] = useState(false);
  const [isShowMapelFilter, setIsShowMapelFilter] = useState(false);
  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  const [isShowClassFilter, setIsShowClassFilter] = useState(false);
  //end modal

  //hooks
  const [selected, setSelected] = useState([]);

  const [filterMapel, setFilterMapel] = useState<any>(null);
  const [allMapel, setAllMapel] = useState<any>([]);
  const [filterClass, setFilterClass] = useState<any>(null);
  const [allClasses, setAllClasses] = useState<any>([]);
  //filter
  const [type, setType] = useState<any[]>([]);
  const [mapel, setMapel] = useState([]);

  const [date, setDate] = useState('');
  const [classes, setClasses] = useState<any[]>([]);

  //search
  const [query, setQuery] = useState<string>('');
  const [queryVal, setQueryVal] = useState<string>('');
  const searchInputRef = useRef<any>();

  //date
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

  const [valueDatePicker, setValueDatePicker] = useState<any>({
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

  const resetFilter = () => {
    setSelected([]);
    setMapel([]);
    setType([]);
    setClasses([]);
    setDate('');
    setTime({from: '', until: ''});
    setState({datePickerFrom: '', datePickerUntil: ''});
  };

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

  useEffect(() => {
    if (queryVal.length > 0) {
      searchInputRef.current?.focus?.();
    }
  }, [queryVal]);

  useEffect(() => {
    if (query.length < 1) {
      setQueryVal('');
    }
  }, [query]);
  //end search

  const buttonCategory = isFromReport
    ? [
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
            mapel?.length === 0
              ? null
              : mapel?.length < 2
              ? mapel.map((obj: any) => obj.name).toString()
              : mapel?.length < allMapel?.length
              ? mapel.length.toString() + ' mapel'
              : 'Semua mapel',
          onPress: () => {
            setIsShowMapelFilter(true);
          },
          isSelected: mapel?.length !== 0 ? true : false,
        },
        {
          id: 3,
          name: 'Semua Tipe',
          value:
            type?.length === 0
              ? null
              : type?.length < 2
              ? type.map((obj: any) => obj.name).toString()
              : type?.length < 3
              ? type.length.toString() + ' Tipe'
              : 'Semua Tipe',
          onPress: () => {
            setIsShowTypeFilter(true);
          },
          isSelected: type?.length !== 0 ? true : false,
        },
      ]
    : [
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
          name: 'Semua kelas',
          value:
            classes?.length === 0
              ? null
              : classes?.length < 2
              ? classes.map((obj: any) => obj.name).toString()
              : classes?.length < allMapel?.length
              ? classes.length.toString() + ' kelas'
              : 'Semua kelas',
          onPress: () => {
            setIsShowClassFilter(true);
          },
          isSelected: classes?.length !== 0 ? true : false,
        },
        {
          id: 3,
          name: 'Semua mapel',
          value:
            mapel?.length === 0
              ? null
              : mapel?.length < 2
              ? mapel.map((obj: any) => obj.name).toString()
              : mapel?.length < allMapel?.length
              ? mapel.length.toString() + ' mapel'
              : 'Semua mapel',
          onPress: () => {
            setIsShowMapelFilter(true);
          },
          isSelected: mapel?.length !== 0 ? true : false,
        },
        {
          id: 4,
          name: 'Semua Tipe',
          value:
            type?.length === 0
              ? null
              : type?.length < 2
              ? type.map((obj: any) => obj.name).toString()
              : type?.length < 3
              ? type.length.toString() + ' Tipe'
              : 'Semua Tipe',
          onPress: () => {
            setIsShowTypeFilter(true);
          },
          isSelected: type?.length !== 0 ? true : false,
        },
      ];

  const getDataMapel = async () => {
    try {
      const mappedClasses = classes?.map((obj: any) => obj?.class_id).join(',');
      const datas = await apiGet({
        url: URL_PATH.get_subject_all(mappedClasses),
      });

      const resData = datas.map(
        (subject: any) => subject?.subject_details?.[0],
      );

      setAllMapel(resData);
      setFilterMapel(resData);
    } catch (error) {}
  };

  const getDataClass = async () => {
    try {
      const res = await api.get(URL_PATH.get_dropdown_class_teacher);

      if (res?.status === 200) {
        const Class = res?.data?.data?.rombel_class_school_user?.map(
          (obj: any) => obj.rombel_class_school,
        );

        setAllClasses(Class);
        setFilterClass(Class);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataClass();
  }, []);

  useEffect(() => {
    getDataMapel();
  }, [classes]);

  useEffect(() => {
    setRiwayatPagination(LIMIT_OFFSET);
  }, [selected, query]);

  useEffect(() => {
    const body = {
      search: query ?? '',
      ...riwayatPagination,
      // class_id: classes?.map((obj: any) => obj?.id) ?? [],
      subject_id: mapel?.map((obj: any) => obj?.id) ?? [],
      rombel_class_school_id: isFromReport
        ? [class_id]
        : classes?.map((obj: any) => obj?.id) ?? [],
      type: type?.map((obj: any) => obj?.name) ?? ['PR', 'Projek', 'Tugas'],
      time_start:
        date === 'Semua Tanggal'
          ? ''
          : time.from
          ? mappedDatePickerFilter(datePickerFrom)
          : '',
      time_finish:
        date === 'Semua Tanggal'
          ? ''
          : time.until
          ? mappedDatePickerFilter(datePickerUntil)
          : '',
    };

    dispatch(fetchgetPRProjectHistory(body));
  }, [riwayatPagination, selected, query]);

  const __onEndReachedRiwayat = () => {
    const {nextPage, loading} = PrProjectHistoryStore;

    if (nextPage && !loading) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        offset: riwayatPagination.offset + riwayatPagination.limit,
      }));
    }
  };

  return {
    navigation,
    buttonCategory,
    isShowClassFilter,
    isShowDateFilter,
    isShowMapelFilter,
    isShowTypeFilter,

    setIsShowClassFilter,
    setIsShowDateFilter,
    setIsShowMapelFilter,
    setIsShowTypeFilter,
    resetFilter,

    selected,
    classes,
    mapel,
    type,

    setSelected,

    setClasses,
    setMapel,
    setDate,
    setType,

    date,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    _handlerSetDate,
    calendar,
    setCalendar,
    valueDatePicker,
    setValueDatePicker,
    time,
    setTime,

    query,
    setQuery,
    setQueryVal,
    searchInputRef,

    setRiwayatPagination,
    setState,

    filterMapel,
    setFilterMapel,
    filterClass,
    setFilterClass,
    allClasses,

    __onEndReachedRiwayat,
    PrProjectHistoryStore,

    duplicateTask,
    isLoading,

    isFromReport,
    reportName,
    route,
  };
};

export default usePRProjectTaskHistory;
