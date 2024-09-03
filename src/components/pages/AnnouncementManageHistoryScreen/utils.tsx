import dayjs from 'dayjs';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import provider from '@services/lms/provider';
import useDebounce from '@hooks/useDebounce';

type STATUS = 'history' | 'finish' | 'deleted';

const useAnnouncementManageHistoryScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AnnouncementManageHistoryScreen'>
    >();

  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = useDebounce(searchValue);
  const [isShowFilterDate, setIsShowFilterDate] = useState(false);
  const [isFilterDateAll, setIsFilterDateAll] = useState(0);
  const [isCalendar, setIsCalendar] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isAnnouncementNextData, setIsAnnouncementNextData] = useState(false);
  const [calendarType, setCalendarType] = useState<'from' | 'until'>('' as any);
  const [datePickerFrom, setDatePickerFrom] = useState<any>(null);
  const [datePickerUntil, setDatePickerUntil] = useState<any>(null);
  const [valueFilterDate, setValueFilterDate] = useState('');
  const [isShowFilterReceiver, setIsShowFilterReceiver] = useState(false);
  const [filterReceivers, setFilterReceivers] = useState([]);
  const [filterReceiversTemp, setFilterReceiversTemp] = useState<any>([]);
  const [isShowFilterStatus, setIsShowFilterStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState<STATUS | ''>('');
  const [filterStatusTemp, setFilterStatusTemp] = useState<STATUS | ''>('');

  const [valueDatePicker, setValueDatePicker] = useState({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const [announcementPagination, setAnnouncementPagination] = useState({
    offset: 0,
    limit: 10,
  });

  const __handleSetDate = () => {
    if (calendarType === 'from') {
      setDatePickerFrom(valueDatePicker);
    } else if (calendarType === 'until') {
      setDatePickerUntil(valueDatePicker);
    }

    setIsCalendar(false);
  };

  const __handleResetFilterDate = () => {
    setDatePickerFrom(null);
    setDatePickerUntil(null);
    setValueFilterDate('');
  };

  const __handleResetFilterAll = () => {
    __handleResetFilterDate();
    setFilterReceivers([]);
    setFilterReceiversTemp([]);
    setFilterStatus('');
    setFilterStatusTemp('');
  };

  const __getAnnouncements = async ({
    status,
    offset,
    limit,
    search,
    dateStart,
    dateEnd,
    userType,
  }: {
    status: STATUS;
    offset: number;
    limit: number;
    search: string;
    dateStart: string;
    dateEnd: string;
    userType: string;
  }) => {
    const {status: httpStatus, data} = await provider.getAnnouncements({
      status,
      offset,
      limit,
      search,
      dateStart,
      dateEnd,
      userType,
    });

    if (httpStatus === 200) {
      const datas = data?.data ?? [];
      setIsAnnouncementNextData(datas?.length > 0);
      setAnnouncements(offset === 0 ? datas : [...announcements, ...datas]);
    }
  };

  const __handleOnEndReached = () => {
    if (!isLoading && isAnnouncementNextData) {
      setAnnouncementPagination(prevState => ({
        ...prevState,
        offset: announcementPagination.offset + announcementPagination.limit,
      }));
    }
  };

  return {
    navigation,
    isLoading,
    setIsLoading,
    searchValue,
    setSearchValue,
    getSearchValue,
    isShowFilterDate,
    setIsShowFilterDate,
    isFilterDateAll,
    setIsFilterDateAll,
    isCalendar,
    setIsCalendar,
    valueDatePicker,
    setValueDatePicker,
    announcements,
    announcementPagination,
    setAnnouncementPagination,
    datePickerFrom,
    setDatePickerFrom,
    datePickerUntil,
    setDatePickerUntil,
    setCalendarType,
    valueFilterDate,
    setValueFilterDate,
    isShowFilterReceiver,
    setIsShowFilterReceiver,
    filterReceivers,
    setFilterReceivers,
    filterReceiversTemp,
    setFilterReceiversTemp,
    isShowFilterStatus,
    setIsShowFilterStatus,
    filterStatus,
    setFilterStatus,
    filterStatusTemp,
    setFilterStatusTemp,
    //
    __getAnnouncements,
    __handleSetDate,
    __handleResetFilterDate,
    __handleResetFilterAll,
    __handleOnEndReached,
  };
};

export {useAnnouncementManageHistoryScreen};
