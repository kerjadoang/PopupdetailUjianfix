import {useDispatch, useSelector} from 'react-redux';
import {fetchClassSessionDetail} from '@redux';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';

const useScreen = () => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {id, service_type} = route.params;

  useEffect(() => {
    dispatch(fetchClassSessionDetail(service_type || 'guru', id));
  }, [dispatch, id]);
  const {classSessionDetail} = useSelector((state: RootState) => state);
  // console.log(JSON.stringify(classSessionDetail, null, 200));
  return {
    classSessionDetail,
    service_type,
  };
};
export {useScreen};
