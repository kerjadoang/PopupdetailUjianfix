import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchRombel} from '@redux';

const useRombel = () => {
  const {rombelList} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRombel());
  }, [dispatch]);

  return {
    rombelList,
  };
};
export default useRombel;
