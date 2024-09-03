import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSubjects} from '@redux';
interface RootState {
  subjectsAll: any;
}
const useSubjectsAll = () => {
  // setup dispatch
  const dispatch = useDispatch();

  // get state of redux
  const {subjectsAll} = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  return {
    subjectsAll,
  };
};

export default useSubjectsAll;
