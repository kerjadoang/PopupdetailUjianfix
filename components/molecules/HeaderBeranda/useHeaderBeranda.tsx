import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {fetchCoin, fetchPackageDetail} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import useRankTable from '@components/organism/RankTable/useRankTable';
import {rdxDispatch} from '@constants/functional';

interface RootState {
  coin: any;
  xp: any;
  image: any;
  packageDetail: any;
  getUser: any;
}
const useHeaderBeranda = () => {
  // setup dispatch
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  // get state of redux
  const getUser = useSelector((state: RootState) => state.getUser);
  const packageDetail = useSelector((state: RootState) => state.packageDetail);
  const coin = useSelector((state: RootState) => state.coin);
  const {currentUserRank} = useRankTable();
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    // dispatch(fetchGetUser());
    rdxDispatch(fetchCoin());
    // rdxDispatch(fetchXp());
    rdxDispatch(fetchPackageDetail());
  }, [isFocused]);

  return {
    getUser,
    coin,
    packageDetail,
    navigation,
    currentUserRank,
  };
};

export default useHeaderBeranda;
