import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {fetchPromo} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import {rdxDispatch} from '@constants/functional';

const usePromo = () => {
  // get state of redux/
  const promo: any = useSelector((state: RootState) => state.promo);

  // setup dispatch
  // const dispatch = useDispatch();

  useEffect(() => {
    rdxDispatch(fetchPromo());
  }, []);

  return {
    promo,
  };
};

export default usePromo;
