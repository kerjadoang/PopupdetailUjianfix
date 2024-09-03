import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListClass} from '@redux';
interface RootState {
  listClass: any;
}
const useListClass = () => {
  // setup dispatch
  const dispatch = useDispatch();

  // get state of redux
  const listClass = useSelector((state: RootState) => state?.listClass);
  const listClassData = listClass?.data;

  const schoolLevel = listClassData?.map((value: any) => {
    return {value: value?.name};
  });

  useEffect(() => {
    dispatch(fetchListClass());
  }, [dispatch]);

  return {
    schoolLevel,
    listClass,
  };
};

export default useListClass;
