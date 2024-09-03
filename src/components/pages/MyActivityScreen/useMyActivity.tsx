import apiWithoutToken from '@api/withoutToken';
import {useMergeState, _handlerConvertDatePicker} from '@constants/functional';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const useMyActivity = () => {
  const today = new Date();
  const todayDate = dayjs(today).format('YYYY-MM-DD');
  const startDate30daysAgo = dayjs(todayDate)
    .subtract(30, 'day')
    .format('YYYY-MM-DD');
  const startDate7daysAgo = dayjs(todayDate)
    .subtract(7, 'day')
    .format('YYYY-MM-DD');
  const route = useRoute<RouteProp<ParamList, 'MyActivityScreen'>>();

  const [state, setState] = useMergeState({
    isLoading: false,
    isShowSwipeUp: false,
    isShowSwipeUpDate: false,
    selectedFilter: false,
    selectedFilterType: false,
    selectedTemporaryFilter: false,
    selectedTemporaryFilterType: false,
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
    limit: 10,
    currentPage: 1,
    listActivity: false,
    selectedStartDate: startDate30daysAgo,
    selectedEndDate: todayDate,
  });
  const {
    isLoading,
    isShowSwipeUp,
    isShowSwipeUpDate,
    selectedFilter,
    selectedTemporaryFilter,
    selectedTemporaryFilterType,
    datePickerType,
    datePickerFrom,
    datePickerUntil,
    limit,
    currentPage,
    listActivity,
    selectedStartDate,
    selectedEndDate,
  }: any = state;

  useEffect(() => {
    _handlerGetDataListActivity(currentPage, startDate30daysAgo, todayDate);
  }, []);

  const childToken = route?.params?.userData?.access_token;
  const _handlerGetDataListActivity = async (
    page: any,
    selectedStartDate: any,
    selectedEndDate: any,
  ) => {
    setState({isLoading: true});

    try {
      const url = `${Config.BASEURL}/uaa/v1/user/my-activity?limit=${limit}&page=${page}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await apiWithoutToken.get(url, {
        headers: {
          Authorization: `Bearer ${childToken || tokenParse}`,
        },
      });

      const resData = res?.data || false;
      if (resData) {
        setState({isLoading: false, listActivity: resData});
      }
    } catch (e: any) {
      setState({isLoading: false});
      const errorCode = e?.response?.data?.code;

      if (errorCode == 500) {
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error',
        });
      }
    }
  };

  const _handlerGetNewDataListActivity = async (page: number) => {
    setState({isLoading: true});

    try {
      const url = `${Config.BASEURL}/uaa/v1/user/my-activity?limit=${limit}&page=${page}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await apiWithoutToken.get(url, {
        headers: {
          Authorization: `Bearer ${childToken || tokenParse}`,
        },
      });
      let resData = res?.data || false;
      if (!resData?.data) {
        return setState({isLoading: false});
      }
      resData.data = listActivity?.data.concat(resData?.data);

      if (resData) {
        setState({isLoading: false, listActivity: resData});
      }
    } catch (e: any) {
      setState({isLoading: false});
      const errorMessage = e?.response?.data?.message;
      Toast.show({
        type: 'error',
        text1: errorMessage || 'Internal Server Error',
      });
    }
  };

  const dataFilter = [
    {
      type: 1,
      label: 'Hari Ini',
    },
    {
      type: 7,
      label: '7 Hari Terakhir',
    },
    {
      type: 30,
      label: '30 Hari Terakhir',
    },
    {
      type: 0,
      label: 'Pilih Tanggal',
    },
  ];

  const _handlerShowSwipeUpDate = () => {
    setState({isShowSwipeUpDate: !isShowSwipeUpDate});
  };

  const _handlerShowSwipeUp = () => {
    setState({isShowSwipeUp: !isShowSwipeUp});
  };

  const _handlerPropsSwipeUp = (text: boolean) => {
    setState({isShowSwipeUp: text});
  };

  const _handlerPropsSwipeUpDate = (text: boolean) => {
    setState({isShowSwipeUpDate: text});
  };

  const _handlerSelectFilter = (text: any) => {
    setState({selectedFilter: text});
  };

  const _handlerSelectFilterType = (text: any) => {
    setState({selectedFilterType: text});
  };

  const _handlerSelectTemporaryFilter = (text: any, type: any) => {
    setState({
      selectedTemporaryFilter: text,
      selectedTemporaryFilterType: type,
    });
  };

  const _handlerSetDatePickerType = (text: any) => {
    setState({datePickerType: text});
  };

  const _handlerSetDatePickerFrom = (text: any) => {
    setState({datePickerFrom: text});
  };

  const _handlerSetDatePickerUntil = (text: any) => {
    setState({datePickerUntil: text});
  };

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const _handlerOnPressSwipeUpTemporaryButton = (value: any) => {
    _handlerSelectTemporaryFilter(value?.label, value?.type);
  };

  const _handlerOnPressSwipeUpFromButton = () => {
    _handlerShowSwipeUpDate();
    _handlerSetDatePickerType('from');
  };

  const _handlerOnPressSwipeUpUntilButton = () => {
    _handlerShowSwipeUpDate();
    _handlerSetDatePickerType('until');
  };

  const _handlerOnPressSwipeUpResetButton = () => {
    _handlerSelectFilter(false);
    _handlerSelectTemporaryFilter(false, false);
    _handlerSetDatePickerType(false);
    _handlerSetDatePickerFrom(false);
    _handlerSetDatePickerUntil(false);
  };

  const _handlerOnPressSwipeUpApplyButton = () => {
    _handlerPropsSwipeUp(!isShowSwipeUp);
    _handlerSelectFilter(selectedTemporaryFilter);
    _handlerSelectFilterType(selectedTemporaryFilterType);

    setState({currentPage: 1});
    let start = selectedStartDate;
    let end = selectedEndDate;

    const filtered30Days = selectedTemporaryFilterType == 30;
    const filtered7Days = selectedTemporaryFilterType == 7;
    const filtered1Days = selectedTemporaryFilterType == 1;

    if (filtered30Days) {
      start = startDate30daysAgo;
    } else if (filtered7Days) {
      start = startDate7daysAgo;
    } else if (filtered1Days) {
      start = todayDate;
    } else {
      start = _handlerConvertDatePicker(datePickerFrom, 7);
      end = _handlerConvertDatePicker(datePickerUntil, 7);
    }

    setState({selectedStartDate: start, selectedEndDate: end});
    _handlerGetDataListActivity(currentPage, start, end);
  };

  const _handlerOnPressSwipeUpDateSelectButton = () => {
    if (datePickerType == 'from') {
      _handlerSetDatePickerFrom(valueDatePicker);
      _handlerPropsSwipeUp(true);
      _handlerPropsSwipeUpDate(false);
    } else if (datePickerType == 'until') {
      _handlerSetDatePickerUntil(valueDatePicker);
      _handlerPropsSwipeUp(true);
      _handlerPropsSwipeUpDate(false);
    }
  };

  const _handlerOnPressTab = () => {
    _handlerSelectFilter(false);
    _handlerSelectTemporaryFilter(false, false);
  };

  const _handlerOnCloseSwipeUp = () => {
    _handlerPropsSwipeUp(false);
  };

  const _handlerOnCloseSwipeUpDate = () => {
    _handlerPropsSwipeUpDate(false);
  };

  const _handlerOnScroll = () => {
    const page = currentPage + 1;
    setState({currentPage: page});
    _handlerGetNewDataListActivity(page);
  };

  return {
    isLoading,
    dataFilter,
    listActivity,
    valueDatePicker,
    isShowSwipeUp,
    isShowSwipeUpDate,
    selectedFilter,
    selectedTemporaryFilter,
    datePickerFrom,
    datePickerUntil,
    setValueDatePicker,
    _handlerOnScroll,
    _handlerOnPressSwipeUpTemporaryButton,
    _handlerOnPressSwipeUpFromButton,
    _handlerOnPressSwipeUpUntilButton,
    _handlerOnPressSwipeUpResetButton,
    _handlerOnPressSwipeUpApplyButton,
    _handlerOnPressSwipeUpDateSelectButton,
    _handlerOnPressTab,
    _handlerOnCloseSwipeUp,
    _handlerOnCloseSwipeUpDate,
    _handlerShowSwipeUp,
  };
};

export default useMyActivity;
