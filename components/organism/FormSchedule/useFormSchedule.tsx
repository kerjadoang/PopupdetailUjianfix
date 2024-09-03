import {useEffect, useState, useMemo, useCallback} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import SCHEDULE_TYPE from '@constants/scheduletype';
import api from '@api/index';
import {Alert} from 'react-native';
import apiWithoutToken from '@api/withoutToken';
import Config from 'react-native-config';
import {isStringContains, jwtDecode} from '@constants/functional';
import {ScheduleScreenParams} from 'type/screen';

const useFormSchedule = () => {
  const route = useRoute();
  const [snakbar, setSnakbar] = useState(false);
  const [schedule, setSchedule] = useState<any[]>();
  const [calendarIndicator, setCalendarIndicator] = useState<any[]>([]);
  const navigation: any = useNavigation();
  const [date, setDate] = useState<moment.Moment | string>(
    moment().format('YYYY-MM-DD HH:mm'),
  );
  const [type, setType] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [change, setChange] = useState(false);
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  const listDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const [tempFilter, setTempFilter] = useState<any[]>([]);
  const [filter, setFilter] = useState<any[]>([]);
  const params: ScheduleScreenParams = route?.params || {};
  const accountRole: AccountRole = params?.loginAs || 'MURID';
  const isFocused = useIsFocused();
  const {screen, token, subLabel}: any = params;

  const [options, setOptions] = useState({
    id: 0,
    status: false,
  });

  useEffect(() => {
    if (params?.filter === 'semua') {
      selectAllFilter();
    } else {
      setFilter([params?.filter]);
    }
  }, [params?.filter]);

  const fetchSchedule = useCallback(async () => {
    try {
      const user = jwtDecode<IBaseJWTUser>(token);
      const isHavePTNPackage = user.services?.some((item: Service) =>
        isStringContains(item.name || '', 'ptn'),
      );
      const url =
        screen === 'PTN'
          ? `${Config.BASEURL}/schedule/v1/ptn/${moment(date).format(
              'YYYY-MM-DD',
            )}?types=live_class`
          : `${Config.BASEURL}/schedule/v1/my-schedule/${moment(date).format(
              'YYYY-MM-DD',
            )}`;

      const res = await apiWithoutToken.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tempScheduleData: any[] = [];

      if (res?.data?.code === 100) {
        tempScheduleData.push(res?.data?.data || []);
      }

      if (isHavePTNPackage) {
        const urlSchedulePTN = `${Config.BASEURL}/schedule/v1/ptn/${moment(
          date,
        ).format('YYYY-MM-DD')}?types=live_class`;

        const resPTNData = await apiWithoutToken.get(urlSchedulePTN, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res?.data?.code === 100) {
          tempScheduleData.push(resPTNData?.data?.data || []);
        }
      }

      setSchedule(tempScheduleData.flat());
    } catch (err) {
      return;
    }
  }, [date, screen, token]);

  const fetchCalendarIndicator = useCallback(
    async (date?: any) => {
      try {
        const url = `${
          Config.BASEURL
        }/schedule/v1/my-schedule/calendar/${moment(date).format('YYYY-MM')}`;

        const res = await apiWithoutToken.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res?.data?.code === 100) {
          return setCalendarIndicator(res?.data?.data);
        }
      } catch (err) {
        return;
      }
    },
    [token],
  );

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    fetchSchedule();
    fetchCalendarIndicator(date);
  }, [date, fetchCalendarIndicator, fetchSchedule, isFocused]);

  const handleSheetChange = useCallback((index: number) => {
    setType(index);
  }, []);

  const prevMonth = () => {
    setDate(moment(date).clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setDate(moment(date).clone().add(1, 'month'));
  };

  const setDataFilter = (data: string) => {
    if (tempFilter?.includes(data)) {
      setTempFilter(prevState => prevState?.filter(item => item !== data));
    } else {
      setTempFilter(prevState => [...prevState, data]);
    }
  };

  const deleteSchedule = async () => {
    setPopUp(false);
    try {
      await api.delete(`/schedule/v1/student-schedule/${options.id}`);
    } catch (err) {
      // setSubject([]);
      Alert.alert('Pastikan koneksi Anda berjalan dengan normal');
    } finally {
      setPopUp(false);
      fetchSchedule();
      setSnakbar(true);
    }
  };

  const changeSchedule = async () => {
    // console.log('change schedule');
  };

  const terapkanFilter = () => {
    setFilter(tempFilter);
  };

  const selectAllFilter = () => {
    let data: any[] = [];
    SCHEDULE_TYPE?.map((item: any) => {
      data.push(item?.name);
    });
    setTempFilter(data);
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
    SCHEDULE_TYPE,
    tempFilter,
    filter,
    setTempFilter,
    setDataFilter,
    terapkanFilter,
    selectAllFilter,
    options,
    setOptions,
    deleteSchedule,
    changeSchedule,
    snakbar,
    setSnakbar,
    subLabel,
    calendarIndicator,
    params,
    refetchSchedule: fetchSchedule,
    accountRole,
  };
};

export default useFormSchedule;
