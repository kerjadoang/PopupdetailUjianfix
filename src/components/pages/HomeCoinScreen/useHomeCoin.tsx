import {useEffect, useState} from 'react';
import {useMergeState, _handlerConvertDatePicker} from '@constants/functional';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCoin,
  fetchHistoryCoin,
  fetchFreeCoin,
  historyCoinDestroy,
} from '@redux';
import dayjs from 'dayjs';
import {RootState} from 'src/redux/rootReducer';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useQueryFetchUser} from '@services/uaa';
import {IRoute} from 'type/screen';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const useHomeCoin = () => {
  const [type, setType] = useState<any[]>([]);
  const {refetch: refetchUser} = useQueryFetchUser();
  const [showPopUp, setShowPopUp] = useState(false);
  const [snakbar, setSnakbar] = useState(false);
  const [info, setInfo] = useState(false);
  const [snakbar2, setSnakbar2] = useState(false);
  const isFocused = useIsFocused();
  const [state, setState] = useMergeState({
    isLoading: false,
    isShowSwipeUp: false,
    isShowSwipeUpDate: false,
    selectedFilter: false,
    selectedFilterType: false,
    selectedTemporaryFilter: false,
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
  });
  const [time, setTime] = useState({
    from: '',
    until: '',
  });
  const {datePickerFrom, datePickerUntil}: any = state;
  const dispatch: any = useDispatch();
  const [selectedType, setSelectedType] = useState([]);
  const [isUseFilter, setIsUseFilter] = useState(false);
  const {data: paramsData} = useRoute<IRoute>().params || {};

  const freeCoin: any = useSelector((state: RootState) => state.freeCoin);
  const coin: any = useSelector((state: RootState) => state.coin);
  const historyCoin: any = useSelector((state: RootState) => state.historyCoin);
  const getUser: any = useSelector((state: RootState) => state.getUser);

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const today = {
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  };

  const datePickerConvertFrom = _handlerConvertDatePicker(datePickerFrom);
  const datePickerConvertUntil = _handlerConvertDatePicker(datePickerUntil);

  const [calendar, setCalendar] = useState({
    status: false,
    type: '',
  });
  const historyCoinFilter = `startDate=${time?.from}&endDate=${
    time?.until
  }&type=${type?.toString()}`;

  const _handlerSetDatePickerFrom = (text: any) => {
    setState({datePickerFrom: text});
    setTime({...time, from: `${text.year}-${text.month}-${text.date}`});
  };

  const _handlerSetDatePickerUntil = (text: any) => {
    setState({datePickerUntil: text});
    setTime({...time, until: `${text.year}-${text.month}-${text.date}`});
  };

  const _handlerSetDatePickerBoth = () => {
    setValueDatePicker({
      date: dayjs().get('date'),
      month: dayjs().get('month') + 1,
      year: dayjs().get('year'),
    });
    setState({
      datePickerFrom: {
        date: dayjs().get('date'),
        month: dayjs().get('month') + 1,
        year: dayjs().get('year'),
      },
      datePickerUntil: {
        date: dayjs().get('date'),
        month: dayjs().get('month') + 1,
        year: dayjs().get('year'),
      },
    });
    setTime({
      ...time,
      from: `${dayjs().get('year')}-${dayjs().get('month') + 1}-${dayjs().get(
        'date',
      )}`,
      until: `${dayjs().get('year')}-${dayjs().get('month') + 1}-${dayjs().get(
        'date',
      )}`,
    });
  };

  const _handlerSetDate = () => {
    if (calendar.type === 'from') {
      _handlerSetDatePickerFrom(valueDatePicker);
    } else if (calendar.type === 'until') {
      _handlerSetDatePickerUntil(valueDatePicker);
    } else {
      _handlerSetDatePickerBoth();
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    fetchData();
    return () => {
      dispatch(historyCoinDestroy());
    };
  }, [isFocused]);

  const fetchData = () => {
    dispatch(fetchCoin(paramsData?.access_token));
    getHistoryCoin();
  };

  const getHistoryCoin = (withFilter = false) => {
    const filterPagination = 'page=0&limit=100';
    const resFilter = withFilter
      ? `${historyCoinFilter}&${filterPagination}`
      : filterPagination;
    dispatch(fetchHistoryCoin(resFilter, paramsData?.access_token));
  };

  const getFreecoin = () => {
    dispatch(
      fetchFreeCoin(() => {
        refetchUser();
        fetchData();
      }),
    );
  };

  const resetFilter = () => {
    setState({
      ...state,
      datePickerFrom: false,
      datePickerUntil: false,
    });
    setTime({
      ...time,
      from: '',
      until: '',
    });
  };

  const parseLabelHistoryCoin = (type: string) => {
    switch (type) {
      case 'expired':
        return 'Koin Kadaluarsa';
      case 'free':
        return 'Koin Gratis';
      case 'campaign':
        return 'Koin';
      case 'topup':
        return 'Beli Koin';
      default:
        return type;
    }
  };

  return {
    coin,
    historyCoin,
    showPopUp,
    setShowPopUp,
    snakbar,
    setSnakbar,
    info,
    setInfo,
    snakbar2,
    setSnakbar2,
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
    state,
    setState,
    getUser,
    fetchFreeCoin,
    freeCoin,
    dispatch,
    selectedType,
    setSelectedType,
    fetchHistoryCoin,
    fetchCoin,
    isUseFilter,
    setIsUseFilter,
    today,
    fetchData,
    getFreecoin,
    resetFilter,
    parseLabelHistoryCoin,
    type,
    setType,
    getHistoryCoin,
    historyCoinFilter,
    paramsData,
  };
};

export default useHomeCoin;
