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

export const useHistory = () => {
  const route = useRoute();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ERaportGuruScreen'>>();

  const {academicYearOngoing}: any = useSelector((state: RootState) => state);

  const {academic_year_id, classes_data}: any = route.params;

  const yearId = academic_year_id || academicYearOngoing?.data?.data?.id;

  const [listGage, setListGage] = useState<any>();

  const fetchRiwayatShareErapor = async () => {
    try {
      showLoading();

      const res = await apiGet({
        url: URL_PATH.get_history_sharelist_eraport(
          classes_data?.id,
          yearId,
          classes_data?.school_id,
          classes_data?.class_id,
        ),
      });

      setListGage(res);
    } catch (err: any) {
      showErrorToast(err?.message || 'Terjadi kesalahan pada sistem kami');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    fetchRiwayatShareErapor();
  }, []);

  return {navigation, classes_data, listGage, setListGage};
};
