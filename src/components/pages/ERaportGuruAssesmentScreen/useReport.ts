import {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AssesmentSetDestroy,
  fetchAssesmentSet,
  fetchEraportShareList,
} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import {
  deepClone,
  rdxDispatch,
  showErrorToast,
  showSuccessToast,
} from '@constants/functional';
import {apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {
  useEraportGuruAssesmentActions,
  useFormAssesmentSetting,
  useTempAssesmentSetting,
} from './zustand/eraportGuruAssesment';
// import { AssessmentSettings } from './zustand/eraportGuruAssesment/type';
import {usePhaseAction} from '../ERaportGuruScreen/zustand/phase';

const useReport = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();
  const assesmentSettings: IBaseReduxState<IEraportAssesmentSettings> =
    useSelector((state: RootState) => state.assesmentSettings);
  const {classes_data, academic_year_id, phase_id}: any = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formAssesmentSetting = useFormAssesmentSetting();
  const tempAssesmentSetting = useTempAssesmentSetting();
  const {setPhase} = usePhaseAction();

  const {setFormAssesmentSetting, setTempAssesmentSetting} =
    useEraportGuruAssesmentActions();
  useEffect(() => {
    if (!tempAssesmentSetting) {
      dispatch(
        fetchAssesmentSet(
          classes_data?.id,
          classes_data?.class_id,
          academic_year_id,
          classes_data?.school_id,
          phase_id || 0,
        ),
      );
    }
    return () => {
      dispatch(AssesmentSetDestroy());
    };
  }, []);

  useEffect(() => {
    if (!tempAssesmentSetting) {
      const newAssesmentSetting: IEraportAssesmentSettingsData = deepClone(
        assesmentSettings?.data?.data,
      );
      setTempAssesmentSetting(newAssesmentSetting);
      const formSemester = assesmentSettings?.data?.data?.semester?.find(
        semester => semester.choose,
      );
      setFormAssesmentSetting({
        type_assessment: newAssesmentSetting.type_assessment,
        semester: formSemester,
      }); //
    }
  }, [assesmentSettings?.data?.data]);

  const onPressPenilaianSemester = (data: Semester) => {
    setFormAssesmentSetting({...formAssesmentSetting, semester: data});
  };

  const onSimpanAturKD = (typeAssesment: TypeAssessment) => {
    setFormAssesmentSetting({
      ...formAssesmentSetting,
    });
    _handleInsertTypeAssessment(typeAssesment);
    showSuccessToast('KD berhasil diatur.');
  };

  const _handleInsertTypeAssessment = (typeAssesment: TypeAssessment) => {
    const indexTypeAssesment = formAssesmentSetting?.type_assessment?.findIndex(
      (item: TypeAssessment) => item?.subject_id === typeAssesment?.subject_id,
    );
    if (indexTypeAssesment === -1) {
      setTypeAssesment([
        ...formAssesmentSetting?.type_assessment,
        typeAssesment,
      ]);
      return;
    }
    const typeAssesmentData = formAssesmentSetting?.type_assessment.map(
      data => {
        return data?.name === typeAssesment?.name ? typeAssesment : data;
      },
    );
    setTypeAssesment(typeAssesmentData);
  };

  const setTypeAssesment = (data: TypeAssessment[]) => {
    setFormAssesmentSetting({
      ...formAssesmentSetting,
      type_assessment: data,
    });
  };

  const onSimpanPenilaianRaport = async () => {
    try {
      setIsLoading(true);
      if (!validateForm()) {
        setFormAssesmentSetting({
          ...formAssesmentSetting,
          validateForm: true,
        });
        return;
      }

      let basicCompetenciesDetail: BasicCompetencyDetail[] = [];
      formAssesmentSetting?.type_assessment.forEach(item => {
        const filterCompetencies =
          item?.basic_competency_detail?.filter(
            (data: BasicCompetencyDetail) => data.choose,
          ) || [];
        if (filterCompetencies) {
          basicCompetenciesDetail.push(...filterCompetencies);
        }
      });
      await storePenilaianRaport(basicCompetenciesDetail);
      rdxDispatch(
        fetchEraportShareList(
          classes_data?.id,
          academic_year_id,
          phase_id,
          classes_data?.school_id,
          classes_data?.class_id,
        ),
      );
      setPhase({
        id: formAssesmentSetting?.semester?.id || 0,
        type: formAssesmentSetting?.semester?.type || '',
      });
      navigation.goBack();
    } catch (error: any) {
      showErrorToast(error || 'Terjadi Kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const storePenilaianRaport = async (
    basicCompetenciesDetail: BasicCompetencyDetail[],
  ) => {
    const body = {
      semester_id: formAssesmentSetting?.semester?.id,
      basic_competency_detail: basicCompetenciesDetail,
    };
    const resData = await apiPost({
      url: URL_PATH.get_assesment(
        classes_data?.id,
        classes_data?.class_id,
        academic_year_id,
        classes_data?.school_id,
      ),
      body: body,
    });
    return resData;
  };

  const validateForm = () => {
    let isTypeAssesmentValid = false;
    tempAssesmentSetting?.type_assessment?.forEach(typeAssessment => {
      isTypeAssesmentValid = false;
      if (
        typeAssessment.basic_competency_detail?.some(
          competency => competency.choose,
        )
      ) {
        isTypeAssesmentValid = true;
        return;
      }
    });
    if (formAssesmentSetting?.semester && isTypeAssesmentValid) {
      return true;
    }
    return false;
  };

  return {
    onPressPenilaianSemester,
    formAssesmentSetting,
    tempAssesmentSetting,
    onSimpanAturKD,
    onSimpanPenilaianRaport,
    isLoading,
  };
};
export default useReport;
