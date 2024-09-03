/* eslint-disable react-hooks/exhaustive-deps */
import {withStopableScrollViewLib} from '@components/atoms';
import {useIsFocused} from '@react-navigation/native';
import {fetchAllCoachmark, updateCoachmark} from '@redux';
import {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {useCheckConnectivity} from '@services/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys as StorageKeys} from '@constants/keys';
const StopableScrollView: any = withStopableScrollViewLib(ScrollView);

const useCoachmark = (Keys: any, isOff?: boolean) => {
  const coachmark: any = useSelector((state: RootState) => state.coachmark);
  const getUser: any = useSelector((state: RootState) => state.getUser);
  const {isConnected} = useCheckConnectivity();
  const isLoading = useSelector((state: RootState) => state.getLoading.data);
  const [token, setToken] = useState<any>(null);
  const dispatch = useDispatch();
  const scrollView: any = useRef();
  const Coachmarks: any[] = [];
  const isFocused = useIsFocused();
  const [isValid, setIsValid] = useState<boolean>(false);

  const getToken = async () => {
    const val = await AsyncStorage.getItem(StorageKeys.token);
    setToken(val);
  };
  const checkCoachMarkStatus = useCallback(
    async (val?: boolean) => {
      if (!token || isOff) {
        return;
      }
      if (
        !val &&
        !coachmark.loading &&
        getUser?.data &&
        isConnected &&
        isValid
      ) {
        Coachmarks[0]?.show();
      }
    },
    [!coachmark.loading, isConnected, token, isValid],
  );

  //first render using res
  useEffect(() => {
    if (!isLoading && isFocused && isConnected) {
      dispatch(
        fetchAllCoachmark((res: any) => {
          if (res?.data?.code === 100) {
            //validate api coachmark is fine
            setIsValid(true);
          }
        }),
      );
      getToken();
    }
  }, [!isLoading, isFocused, isConnected]);

  //second render using state redux
  useEffect(() => {
    const getCoachmark = async () => {
      const val = await coachmark?.data?.[Keys];

      checkCoachMarkStatus(val);
    };
    if (!isLoading && !coachmark?.loading && isConnected) {
      getCoachmark();
    }
  }, [!coachmark?.loading, !isLoading, isConnected]);

  const _handlerCoachmark = (index: number) => {
    let indexCoachmark = 0;
    indexCoachmark = index;
    setTimeout(() => {
      Coachmarks[indexCoachmark]?.show();
    }, 300);

    //finish coachmark -> hit put coachmark api
    if (indexCoachmark === Coachmarks?.length) {
      doneCoachMark();
    }
  };

  const doneCoachMark = () => {
    dispatch(updateCoachmark(Keys));
  };

  return {
    coachmark,
    scrollView,
    Coachmarks,
    StopableScrollView,
    doneCoachMark,
    _handlerCoachmark,
  };
};

export {useCoachmark};
