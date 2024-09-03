import {useNavigation, useRoute} from '@react-navigation/native';
import {EraportDetailDestroy, fetchEraportDetail} from '@redux';
import moment from 'moment';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {downloadEraport, shareEraport} from '../ERaportGuruScreen/utils';
import {
  dismissLoading,
  rdxDispatch,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';

export const useDetailErapor = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {id_rapor} = route?.params || false;
  const {eraportDetail, eraportShareList}: any = useSelector(
    (state: RootState) => state,
  );

  useEffect(() => {
    return () => {
      dispatch(EraportDetailDestroy());
    };
  }, []);

  const eraportData = eraportDetail?.data?.data;
  const raporStudent = eraportDetail?.data?.data?.rapor_student;
  const raporSchool = eraportDetail?.data?.data?.rapor_school;
  const startYear = new Date(
    eraportDetail?.data?.data?.academic_year?.start_date,
  );
  const endYear = new Date(eraportDetail?.data?.data?.academic_year?.end_date);
  const issueDate = new Date(eraportDetail?.data?.data?.issue_date);

  const detail = {
    full_name: `${raporStudent?.full_name ?? '-'} (NIS: ${
      raporStudent?.registration_number ?? '-'
    })`,
    school: raporSchool?.name ?? '-',
    address: raporSchool?.address ?? '-',
    semester: `${eraportData?.rombel_class_school?.name ?? '-'} • Semester ${
      eraportData?.academic_phase?.type ?? '-'
    } • ${startYear.getFullYear()} - ${endYear.getFullYear()}`,
    issueDate: `Tanggal terbit: ${moment(issueDate).format('D MMM YYYY')}`,
  };

  const KKMandPredicate = [
    {
      title: 'Nilai KKM',
      description: '70',
    },
    {
      title: 'E (Excellent)',
      description: '91-100',
    },
    {
      title: 'VG (Very Good)',
      description: '81-90',
    },
    {
      title: 'G (Good)',
      description: '71-80',
    },
    {
      title: 'F (Failed)',
      description: '<70',
    },
  ];
  const onDownloadEraport = async () => {
    try {
      showLoading();
      await downloadEraport(
        raporStudent?.full_name,
        eraportData?.assessment_erapor_share_student_id,
      );
      showSuccessToast('E-rapor berhasil diunduh');
    } catch (error: any) {
      showErrorToast('E-rapor gagal diunduh');
    } finally {
      dismissLoading();
    }
  };
  const onShareEraport = async () => {
    try {
      showLoading();
      await shareEraport(eraportShareList?.data?.data.id, [raporStudent?.id]);
      showSuccessToast('E-rapor berhasil dibagikan');
    } catch (error: any) {
      showErrorToast('E-rapor gagal dibagikan');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (id_rapor) {
      rdxDispatch(fetchEraportDetail(id_rapor));
    }
  }, [id_rapor]);

  return {
    dispatch,
    navigation,
    eraportData,
    detail,
    KKMandPredicate,
    onDownloadEraport,
    onShareEraport,
  };
};
