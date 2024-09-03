import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGetAllAdministrativeHistory,
  fetchGetPaymentAdministrativeCategory,
} from '@redux';
import useGetFilteredData from './useGetFilteredData';
import {useMergeState, _handlerConvertDatePicker} from '@constants/functional';

import dayjs from 'dayjs';
interface RootState {
  getUser: any;
  getAllAdministrativeHistory: any;
  getAdministrativeHistoryDetail: any;
  getPaymentAdministrativeCategory: any;
  loading: any;
}

const useAdministrativeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    getUser,
    getAllAdministrativeHistory,
    getAdministrativeHistoryDetail,
    getPaymentAdministrativeCategory,
    loading,
  } = useSelector((state: RootState) => state);
  const [isShowPaymentFilter, setIsShowPaymentFilter] = useState(false);
  const [isShowStatusFilter, setIsShowStatusFilter] = useState(false);
  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  const [isShowPaymentProof, setIsShowPaymentProof] = useState(false);
  const category = getPaymentAdministrativeCategory?.data;
  const {
    selected,
    setSelected,
    paymentFor,
    paymentForName,
    status,
    setPaymentFor,
    setStatus,
    setPaymentForName,
    date,
    setDate,
  } = useGetFilteredData();
  const detail = getAdministrativeHistoryDetail?.data;

  const [time, setTime] = useState({
    from: '',
    until: '',
  });
  const [page, setPage] = useState(0);
  const buttonCategory = [
    {
      id: 1,
      name: 'Semua Pembayaran',
      value:
        paymentForName?.length === 0
          ? null
          : paymentForName?.length < 2
          ? paymentForName.toString()
          : paymentForName.length < category.length
          ? paymentForName.length.toString() + ' Pembayaran'
          : 'Semua Pembayaran',
      onPress: () => {
        setIsShowPaymentFilter(true);
      },
      isSelected: paymentFor.length > 0 ? true : false,
    },
    {
      id: 2,
      name: 'Semua Status',
      value:
        status?.length === 0
          ? null
          : status?.length < 2
          ? status.toString()
          : status?.length < 3
          ? status.length.toString() + ' Status'
          : 'Semua Status',
      onPress: () => {
        setIsShowStatusFilter(true);
      },
      isSelected: status.length > 0 ? true : false,
    },
    {
      id: 3,
      name: 'Semua Tanggal',
      value:
        date == 'Pilih Tanggal'
          ? time.from + ' - ' + time.until
          : 'Semua Tanggal',
      onPress: () => {
        setIsShowDateFilter(true);
      },
      isSelected: date !== '' ? true : false,
    },
  ];

  const [state, setState] = useMergeState({
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
  });

  const {datePickerFrom, datePickerUntil}: any = state;

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
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
    setStatus([]);
    setPaymentFor([]);
    setDate('');
    setTime({from: '', until: ''});
    setState({datePickerFrom: '', datePickerUntil: ''});
    setPaymentForName([]);
  };

  const _handlerSetDatePickerFrom = (text: any) => {
    setState({datePickerFrom: text});
    setTime({...time, from: `${text.year}-${text.month}-${text.date}`});
  };

  const _handlerSetDatePickerUntil = (text: any) => {
    setState({datePickerUntil: text});
    setTime({...time, until: `${text.year}-${text.month}-${text.date}`});
  };

  const _handlerSetDate = () => {
    if (calendar.type === 'from') {
      _handlerSetDatePickerFrom(valueDatePicker);
    } else if (calendar.type === 'until') {
      _handlerSetDatePickerUntil(valueDatePicker);
    }
  };

  useEffect(() => {
    dispatch(fetchGetPaymentAdministrativeCategory());
  }, []);

  const getMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const data = {
      limit: 10,
      page: 0,
      status: [],
      payment_for: [],
      time_start: '',
      time_finish: '',
    };

    dispatch(fetchGetAllAdministrativeHistory(data, getUser?.data?.id));
  }, []);

  useEffect(() => {
    const data = {
      limit: 10,
      page: page,
      status: status.includes('semua') ? [] : status ? status : [],
      payment_for: paymentFor ? paymentFor : [],
      time_start: date === 'Semua Tanggal' ? '' : time.from ? time.from : '',
      time_finish: date === 'Semua Tanggal' ? '' : time.until ? time.until : '',
    };

    dispatch(fetchGetAllAdministrativeHistory(data, getUser?.data?.id));
  }, [selected, page]);

  return {
    isShowPaymentFilter,
    setIsShowPaymentFilter,
    isShowStatusFilter,
    setIsShowStatusFilter,
    isShowDateFilter,
    setIsShowDateFilter,
    navigation,
    dispatch,
    getAllAdministrativeHistory,
    setIsShowPaymentProof,
    isShowPaymentProof,
    getAdministrativeHistoryDetail,
    category,
    buttonCategory,
    getUser,
    loading,
    detail,
    paymentFor,
    status,
    setPaymentFor,
    setStatus,
    paymentForName,
    setPaymentForName,
    date,
    setDate,
    selected,
    setSelected,
    resetFilter,
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
    getMoreData,
    setPage,
  };
};

export default useAdministrativeScreen;
