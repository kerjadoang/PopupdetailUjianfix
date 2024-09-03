/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import SearchInput from '@components/atoms/SearchInput';
import api from '@api/index';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {showSuccessToast} from '@constants/functional';

const useRapatVirtualTeacherScreen = () => {
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

  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RapatVirtualTeacherScreen'>
    >();
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: 'DATE' | 'PARTICIPANT' | 'STATUS' | '';
  }>({status: false, type: ''});
  const [showMoreSwipeUp, setShowMoreSwipeUp] = useState<boolean>();
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
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<any>();

  const fetchList = async () => {
    try {
      const mapParticipant = filterParams.participant
        ?.map(item => item.id)
        .join(',');
      const mapStatus = filterParams?.status?.[0]?.value || 'scheduled';
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

  const cancelVirtualMeeting = async (meetingId: any) => {
    try {
      await apiPut({
        url: URL_PATH.put_cancel_virtual_meeting(meetingId),
      });

      fetchList();
      setShowConfirmCancel(false);
      showSuccessToast('Rapat virtual berhasil dibatalkan.');
    } catch (error) {}
  };

  useEffect(() => {
    fetchList();
  }, [filterParams, isFocused]);

  return {
    list,
    SearchInput,
    filterParams,
    setFilterParams,
    navigation,
    setShowFilterSwipeUp,
    showFilterSwipeUp,
    setDateFrom,
    setDateTo,
    dateFrom,
    dateTo,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
    dataItem,
    setDataItem,
    cancelVirtualMeeting,
  };
};
export {useRapatVirtualTeacherScreen};
