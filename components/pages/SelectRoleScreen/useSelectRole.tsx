import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetRole} from '@redux';
interface RootState {
  listRole: any;
}
const useSelectRole = () => {
  const dispatch = useDispatch();
  const {listRole} = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchGetRole());
  }, [dispatch]);

  return {
    listRole,
  };
};

export default useSelectRole;
