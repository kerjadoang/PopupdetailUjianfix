import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRank} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
const useRankTable = (token?: any) => {
  // get state of redux/
  const rank: any = useSelector((state: RootState) => state.rank);
  const currentUserRank = rank?.data?.find((userRank: any) => userRank.is_user);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const fetchRankData = useCallback(() => {
    dispatch(fetchRank(token));
  }, [dispatch, token]);
  // setup dispatch
  useEffect(() => {
    fetchRankData();
  }, [fetchRankData]);

  return {
    rank,
    currentUserRank,
    navigation,
    fetchRankData,
  };
};

export default useRankTable;
