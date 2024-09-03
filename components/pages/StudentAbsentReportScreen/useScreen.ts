import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import {fetchDetailAbsentStudent} from '@redux';

const useScreen = () => {
  const route = useRoute();
  const dispatch: any = useDispatch();
  const {id_student}: any = route.params;
  const {studentDetail, getDetailAbsent}: any = useSelector(
    (state: RootState) => state,
  );
  const approvalType = ['diterima', 'ditolak'];

  const [filterApproval, setFilterApproval] = useState(approvalType[0]);

  useEffect(() => {
    dispatch(
      fetchDetailAbsentStudent({
        user_id: id_student,
        approval_status: filterApproval,
      }),
    );
  }, [filterApproval]);

  return {
    studentDetail,
    getDetailAbsent,
    approvalType,
    filterApproval,
    setFilterApproval,
  };
};
export {useScreen};
