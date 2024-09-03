import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPackageDetail} from '@redux';

const useActivePackageWidget = token => {
  // setup dispatch
  const dispatch = useDispatch();

  // get state of redux
  const {packageDetail} = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchPackageDetail(token));
  }, [token]);

  return {
    packageDetail,
  };
};

export default useActivePackageWidget;
