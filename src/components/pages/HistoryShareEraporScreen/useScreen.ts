import {apiGet} from '@api/wrapping';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {ParamList} from 'type/screen';

const useScreen = () => {
  const route = useRoute();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ERaportGuruScreen'>>();
  const {classes_data, academic_phase_id}: any = route.params;
  const {academicYearOngoing}: any = useSelector((state: RootState) => state);
  const [listStudent, setListStudent] = useState<any>();

  const fetchRiwayatShareStudentErapor = async () => {
    try {
      showLoading();

      const res = await apiGet({
        url: URL_PATH.get_history_sharelist_student_eraport(
          classes_data?.id,
          academicYearOngoing?.data?.data?.id,
          academic_phase_id,
          classes_data?.school_id,
          classes_data?.class_id,
        ),
      });

      setListStudent(res);
    } catch (err: any) {
      showErrorToast(err?.message || 'Terjadi kesalahan pada sistem kami');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    fetchRiwayatShareStudentErapor();
  }, []);

  return {navigation, classes_data, listStudent, setListStudent};
};

export {useScreen};
