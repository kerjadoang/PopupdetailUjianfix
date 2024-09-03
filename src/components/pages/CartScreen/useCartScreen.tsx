import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoin, fetchCatalog} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {isPlatformIOS} from '@constants/functional';
import {useCoachmark} from '@hooks/useCoachmark';
import {Keys} from '@constants/keys';
import Config from 'react-native-config';

interface RootState {
  coin: any;
  catalog: any;
  image: any;
}

const useCartScreen = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [snakbar, setSnakbar] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpBlock, setShowPopUpBlock] = useState(false);
  const {Coachmarks, doneCoachMark, _handlerCoachmark} = useCoachmark(
    Keys.coachmark_mobile_order,
    isPlatformIOS,
  );

  const link_langgqanan =
    Config.ENV_MODE === 'development'
      ? 'kelaspintar.dev/berlangganan/'
      : 'kelaspintar.id/berlangganan/';

  // get state of redux
  const {coin, catalog} = useSelector((state: RootState) => state);
  const filteredPackagesHaveProductId = (
    catalog?.data as IPackageCatalog[]
  )?.filter?.(item =>
    isPlatformIOS
      ? !!item?.package?.apple_product_id
      : !!item?.package?.google_play_product_id,
  );
  const fetchData = async () => {
    try {
      dispatch(fetchCoin());
      dispatch(fetchCatalog());
    } catch (error) {}
  };
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    dispatch(fetchCoin());
  }, [isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    coin,
    catalog,
    filteredPackagesHaveProductId,
    navigation,
    snakbar,
    setSnakbar,
    showPopUp,
    setShowPopUp,
    showPopUpBlock,
    setShowPopUpBlock,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
    link_langgqanan,
  };
};

export default useCartScreen;
