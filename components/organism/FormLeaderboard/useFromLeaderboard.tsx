import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRank} from '@redux';

const useFromLeaderboard = (navigation: any) => {
  // get state of redux/
  const rank = useSelector(state => state?.rank);
  // setup dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRank());
  }, [dispatch]);

  return {
    rank,
    navigation,
  };
};

export default useFromLeaderboard;
