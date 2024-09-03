import {useEffect, useState, useMemo, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import Config from 'react-native-config';
import api from '@api/index';
import {isStringContains, showErrorToast} from '@constants/functional';
import {getDetailRecording} from '../PTNLiveClassRecordScreen/utils';

const useFormSchedule = () => {
  const route = useRoute();
  const [schedule, setSchedule] = useState<any[]>([]);
  const navigation: any = useNavigation();
  const [date, setDate] = useState<any>(moment().format());
  const [calendarIndicator, setCalendarIndicator] = useState<any>();
  const [type, setType] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [change, setChange] = useState(false);
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  const listDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const {params} = route;

  //TIPE LIVE CLASS / TRY OUT
  const [types, setTypes] = useState([
    {id: 1, label: 'Live Class', value: 'live_class', selected: false},
    {id: 2, label: 'Try Out', value: 'tryout', selected: false},
  ]);
  const value = types?.map((item: any, _: number) => {
    if (item?.selected) {
      return item?.value;
    }
  });
  const selectedType = value?.filter((item: any) => {
    return item !== undefined;
  });
  const fetchSchedule = async () => {
    try {
      const url = `${Config.BASEURL}/schedule/v1/ptn/${moment(date).format(
        'YYYY-MM-DD',
      )}?types=${selectedType.toString()}`;

      const res = await api.get(url);
      if (res?.data?.code === 100) {
        return setSchedule(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const fetchCalendarIndicator = async (date?: any) => {
    try {
      const url = `${Config.BASEURL}/schedule/v1/ptn/calendar/${moment(
        date,
      ).format('YYYY-MM')}`;

      const res = await api.get(url);

      if (res?.data?.code === 100) {
        return setCalendarIndicator(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [date]);

  useEffect(() => {
    fetchCalendarIndicator(date);
  }, [date]);

  useEffect(() => {
    setTimeout(() => {
      setShowBottomSheet(true);
    }, 1000);
  }, []);

  const handleSheetChange = useCallback((index: any) => {
    setType(index);
  }, []);

  const prevMonth = () => {
    setDate(moment(date).clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setDate(moment(date).clone().add(1, 'month'));
  };

  const onClickScheduleCard = async (item: ISchedule) => {
    if (isStringContains(item?.type || '', 'try out')) {
      return navigation.navigate('TryOutScreen');
    }

    if (!isStringContains(item?.type || '', 'live class')) {
      return;
    }

    if (!isStringContains(item?.status || '', 'finish')) {
      return navigation.navigate('PTNLiveClassHomeScreen');
    }

    try {
      const rekamanData = await getDetailRecording(item?.id || 0, 'ptn');
      navigation.navigate('VideoAnimationScreen', {
        chapterData: rekamanData,
        type: 'PTN',
      });
    } catch (error) {
      showErrorToast('Data tidak ditemukan');
    }
  };

  return {
    navigation,
    schedule,
    type,
    setType,
    popUp,
    setPopUp,
    selectedItems,
    setSelectedItems,
    modalVisible,
    setModalVisible,
    change,
    setChange,
    snapPoints,
    handleSheetChange,
    setDate,
    date,
    listDay,
    prevMonth,
    nextMonth,
    params,
    types,
    setTypes,
    fetchSchedule,
    showBottomSheet,
    onClickScheduleCard,
    calendarIndicator,
    setCalendarIndicator,
  };
};

export default useFormSchedule;
