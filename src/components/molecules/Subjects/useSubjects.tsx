import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSubjectsFav} from '@redux';
interface RootState {
  subjectsFav: any;
}
const useSubjects = () => {
  // setup dispatch
  const dispatch = useDispatch();

  // get state of redux
  const subjectsFav = useSelector((state: RootState) => state.subjectsFav);

  useEffect(() => {
    dispatch(fetchSubjectsFav());
  }, [dispatch]);

  return {
    subjectsFav,
  };
};

export default useSubjects;
