import {useMergeState} from '@constants/functional';
import provider from '@services/lms/provider';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

interface RootState {
  getUser: any;
}

const useAttendanceAprovalListHistoryScreen = () => {
  const listTab = [
    {
      label: 'Menunggu',
      onPress: () => {},
    },
    {
      label: 'Diterima',
      onPress: () => {},
    },
    {
      label: 'Ditolak',
      onPress: () => {},
    },
  ];

  const {getUser} = useSelector((state: RootState) => state);
  const [state, setState] = useMergeState({
    isShowSwipeUp: false,
    selectedTab: listTab[0]?.label,
    listHistoryAttendance: false,
    isLoading: false,
    limit: 10,
    currentOffset: 0,
  });
  const {
    selectedTab,
    listHistoryAttendance,
    isLoading,
    limit,
    currentOffset,
  }: any = state;

  useEffect(() => {
    _handlerGetDataListHistory(selectedTab, currentOffset);
  }, []);

  const _handlerGetDataListHistory = async (
    passParams: any = false,
    offset: any,
  ) => {
    setState({isLoading: true});

    const params = {
      approval_status: passParams,
    };

    try {
      const res = await provider.getAllListHistoryAttendance(
        offset,
        limit,
        params,
      );

      const resData = res?.data || false;

      if (resData?.data) {
        setTimeout(() => {
          setState({isLoading: false, listHistoryAttendance: resData});
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
            currentOffset: currentOffset,
            listHistoryAttendance: null,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false, listHistoryAttendance: null});
      }, 500);
    }
  };

  const _handlerGetNewDataListHistory = async (
    passParams: any = false,
    offset: any,
  ) => {
    setState({isLoading: true});

    const params = {
      approval_status: passParams,
    };

    try {
      const res = await provider.getAllListHistoryAttendance(
        offset,
        limit,
        params,
      );

      var resData = res?.data || false;
      if (resData?.data) {
        resData.data = resData?.data.concat(listHistoryAttendance?.data);

        setTimeout(() => {
          setState({
            isLoading: false,
            listHistoryAttendance: resData,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
            currentOffset: currentOffset,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerOnPressTab = (value: any) => {
    setState({selectedTab: value, currentOffset: 0});
    _handlerGetDataListHistory(value, 0);
  };

  const _handlerOnScroll = (event: any) => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const eventScroll = contentOffset.y;
    const maxLayout = contentSize?.height - layoutMeasurement?.height;
    const isBottomReached = Math.round(eventScroll) === Math.round(maxLayout);

    if (isBottomReached) {
      const offset = currentOffset + limit;
      setState({currentOffset: offset});
      _handlerGetNewDataListHistory(selectedTab, offset);
    }
  };

  return {
    isLoading,
    listHistoryAttendance,
    listTab,
    selectedTab,
    getUser,
    _handlerOnPressTab,
    _handlerOnScroll,
  };
};

export default useAttendanceAprovalListHistoryScreen;
