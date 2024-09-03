import {useMergeState} from '@constants/functional';
import provider from '@services/lms/provider';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

interface IDatePicker {
  month: any;
  year: any;
}

const useAttendancePresensiHistoryScreen = () => {
  const currentTime = new Date();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const currentMMYYYY = `${year}-${month + 1}`;

  const [state, setState] = useMergeState({
    isLoading: false,
    isShowSwipeUp: false,
    selectedFilter: currentMMYYYY,
    listHistoryPresensi: false,
  });
  const {isLoading, isShowSwipeUp, selectedFilter, listHistoryPresensi}: any =
    state;

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  useEffect(() => {
    _handlerGetDataListPresensiHistory();
  }, []);

  useEffect(() => {
    _handlerGetDataListPresensiHistory();
  }, [selectedFilter]);

  const _handlerGetDataListPresensiHistory = async () => {
    setState({isLoading: true});

    const params = {
      date: selectedFilter,
    };

    try {
      const res = await provider.getAttendanceHistory(params);

      if (res?.status == 200) {
        var resDataData = res?.data || false;

        setTimeout(() => {
          setState({
            isLoading: false,
            listHistoryPresensi: resDataData,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerShowSwipeUp = () => {
    setState({isShowSwipeUp: !isShowSwipeUp});
  };

  const _handlerPropsSwipeUp = (text: boolean) => {
    setState({isShowSwipeUp: text});
  };

  const _handlerOnPressSwipeUpDateSelectButton = () => {
    setState(
      {
        isShowSwipeUp: false,
        selectedFilter: `${valueDatePicker.year}-${valueDatePicker.month}`,
      },
      () => {
        _handlerGetDataListPresensiHistory();
      },
    );
  };

  const _handlerOnCloseSwipeUp = () => {
    _handlerPropsSwipeUp(false);
  };

  return {
    isLoading,
    listHistoryPresensi,
    valueDatePicker,
    isShowSwipeUp,
    selectedFilter,
    setValueDatePicker,
    _handlerOnPressSwipeUpDateSelectButton,
    _handlerOnCloseSwipeUp,
    _handlerShowSwipeUp,
  };
};

export default useAttendancePresensiHistoryScreen;
