/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {
  fetchPTNSchedule,
  fetchsummaryTryout,
  fetchLeaderboardTryout,
  fetchCheckDiagnostic,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import {isStringContains, showErrorToast} from '@constants/functional';
import {getDetailRecording} from '../PTNLiveClassRecordScreen/utils';

const useScreen = () => {
  const isFocused = useIsFocused();
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [swipe, setSwipe] = useState({
    show: false,
    show2: false,
  });
  const [isCollaps, setIsCollaps] = useState(true);
  const [validation, setValidation] = useState({
    degreeMatch: false,
    isSubs: false,
    show: false,
  });
  const isHavePackage = validation.degreeMatch && validation.isSubs;

  const today = new Date().toISOString().slice(0, 10);

  const {
    ptnSchedule,
    checkDiagnostic,
    summaryTryout,
    leaderboardTryout,
    getUser,
  }: any = useSelector((state: RootState) => state);
  useEffect(() => {
    if (isFocused) {
      dispatch(fetchsummaryTryout());
      dispatch(fetchLeaderboardTryout());
      dispatch(fetchPTNSchedule(today, ''));
      dispatch(fetchCheckDiagnostic());
    }
  }, [dispatch, today, isFocused, navigation]);

  const [cartLabels, setCartLabels] = useState([]);
  const [cartFullLabels, setCartFullLabels] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (summaryTryout) {
      const name = summaryTryout?.data?.data?.map((item: any, _: number) => {
        if (item?.name?.length <= 13) {
          return item?.name;
        }
        return item.name?.substring(0, 10) + '...';
      });
      const nameFull = summaryTryout?.data?.data?.map(
        (item: any, _: number) => {
          return item.name;
        },
      );
      const point = summaryTryout?.data?.data?.map((item: any, _: number) => {
        return item.point;
      });
      setCartLabels(name);
      setCartFullLabels(nameFull);
      setCartData(point);
    }
  }, []);

  const dummyCartLabels = [
    'TryOut1',
    'TryOut2',
    'TryOut3',
    'TryOut4',
    'TryOut5',
  ];
  const dummyCartData = [0, 0, 0, 0, 0];

  const _handlerValidation = () => {
    if (!getUser) {
      return;
    }
    const userData = getUser?.data;
    const isAvailable = userData?.services?.find((x: any) => x.name === 'PTN');
    const isSMA = userData?.class?.id === 10 || 11 || 12;

    if (isAvailable && isSMA) {
      return setValidation({...validation, degreeMatch: true, isSubs: true});
    }

    if (isAvailable) {
      return setValidation({...validation, isSubs: true});
    }

    if (isSMA) {
      return setValidation({...validation, degreeMatch: true});
    }

    return validation;
  };

  useEffect(() => {
    _handlerValidation();
  }, []);

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

    // go to detail recording / video animation
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
    isCollaps,
    setIsCollaps,
    ptnSchedule,
    summaryTryout,
    leaderboardTryout,
    navigation,
    swipe,
    setSwipe,
    cartLabels,
    cartFullLabels,
    cartData,
    checkDiagnostic,
    getUser,
    validation,
    setValidation,
    dummyCartData,
    dummyCartLabels,
    isHavePackage,
    onClickScheduleCard,
  };
};
export {useScreen};
