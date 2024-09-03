import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoin, fetchXp} from '@redux';

const useScoreStatusWidget = (token: any) => {
  // setup dispatch
  const dispatch = useDispatch();

  // get state of redux
  const {xp, coin}: any = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchXp(token));
    dispatch(fetchCoin(token));
  }, [token]);

  return {
    xp,
    coin,
  };
};

export default useScoreStatusWidget;
