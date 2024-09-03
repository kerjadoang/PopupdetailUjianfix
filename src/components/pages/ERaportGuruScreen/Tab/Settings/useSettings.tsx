import {
  _handlerConvertAllDate,
  _handlerConvertDatePicker,
  showLoading,
  cloneArray,
  showErrorToast,
  showSuccessToast,
  showWarningToast,
  dismissLoading,
  rdxDispatch,
  _handlerCapitalizeFirstLetter,
} from '@constants/functional';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  fetchAcademicYear,
  fetchAcademicYearOngoing,
  fetchEraportShareList,
  fetchEraportDetail,
  fetchImage,
  sendAcademicYear,
  sendIssueDate,
  sendPaperSize,
} from '@redux';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {
  IDatePicker,
  initDatePicker,
  initListFormSettings,
  formSettings,
  SettingName,
  downloadEraport,
  shareEraport,
} from '../../utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {_IPayloadPaperSize} from 'src/redux/storePaperSize/type';
import {usePhase, usePhaseAction} from '../../zustand/phase';
import {ParamList} from 'type/screen';

export const useSettings = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ERaportGuruScreen'>>();
  const route = useRoute();
  const logoSekolah =
    'https://tse2.mm.bing.net/th?id=OIP.ebwPAp2F1kHTvDZNHDjvKgHaHa&pid=Api&P=0';
  const {academic_year_id, academic_phase, classes_data}: any = route.params;
  const paperList = ['A4', 'F4/Folio', 'Letter'];

  const {academicYearOngoing, eraportDetail, image}: any = useSelector(
    (state: RootState) => state,
  );
  const eraportShareList: IBaseReduxState<IEraportShareList> = useSelector(
    (state: RootState) => state.eraportShareList,
  );
  const getUser: IGetUser = useSelector((state: RootState) => state.getUser);
  const storeAcademicYear: IStoreAcademicYearRdx = useSelector(
    (state: RootState) => state.storeAcademicYear,
  );
  const academicYear: IAcademicPhaseRdx = useSelector(
    (state: RootState) => state.academicYear,
  );

  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const school = getUser?.data?.school;
  const [year, setYear] = useState(academicYearOngoing?.data?.data?.years);
  const [popUp, setPopUp] = useState(false);
  const [papperType, setPapperType] = useState('');
  const [alertPaper, setAlertPaper] = useState(false);
  const [officialPaper, setOfficialPaper] = useState(false);
  const [tempEraportShareList, setTempEraportShareList] = useState<
    AssessmentEraporShareStudent[]
  >([]);
  const [isAllChildSelected, setIsAllChildSelected] = useState(false);
  const [formatedDate, setFormatedDate] = useState<any>();
  const [eRaportPopup, setEraportPopup] = useState<IEraportPopup>();
  const [publishDate, setPublishDate] = useState('Belum diatur');
  const [listFormSettings, setListFormSettings] = useState<formSettings[]>([]);
  const [eraportData, setEraportData] = useState<IEraportData>();
  const phase = usePhase();
  const phaseId =
    phase?.id ||
    eraportData?.academicPhase?.id ||
    getUser?.data?.academi_phase?.id ||
    academic_phase?.id ||
    0;
  const {setPhase} = usePhaseAction();

  const [yearId, setYearId] = useState(
    getUser?.data?.academi_phase?.academic_year_id || 0,
  );

  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>();
  const [snakbar, setSnakbar] = useState({
    status: false,
    label: '',
  });
  const [swipe, setSwipe] = useState({
    show: false,
    type: '',
  });
  const [dateIssue, setDateIssue] = useState<any>('');

  const _handlerVisibleSwipe = () => {
    if (swipe?.show && swipe?.type?.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const _handlerSetDatePicker = (text: any) => {
    setFormatedDate(`${text.year}-${text.month}-${text.date}`);
  };

  useEffect(() => {
    rdxDispatch(fetchImage(getUser?.data?.school?.image || ''));
    rdxDispatch(fetchAcademicYear(getUser?.data?.school?.id || 0));
    rdxDispatch(fetchAcademicYearOngoing(getUser?.data?.school?.id || 0));
    setListFormSettings(cloneArray(initListFormSettings));
    fetchEraporData(phaseId);
    _handlerSetAcademicYear(yearId);
  }, []);

  const fetchEraporData = (phase_id?: number) => {
    phase_id = phase_id || phaseId;
    if (!phase_id) {
      return;
    }
    rdxDispatch(
      fetchEraportShareList(
        classes_data?.id,
        yearId,
        phase_id,
        classes_data?.school_id,
        classes_data?.class_id,
      ),
    );
  };

  useEffect(() => {
    if (!storeAcademicYear?.data || !academicYear?.data) {
      return;
    }

    const currentEraportShareList = eraportShareList?.data;
    const currentSetting = storeAcademicYear?.data;
    const currentAcademicYear = academicYear?.data?.data?.[0];
    const currentAcademicPhase = currentAcademicYear?.academic_phase?.find(
      academicPhase => academicPhase.id === currentSetting?.academic_phase_id,
    );

    setEraportData(prev => ({
      academicPhase: currentAcademicPhase ?? prev?.academicPhase,
      academicYear: currentAcademicYear ?? prev?.academicYear,
      settings: currentSetting ?? prev?.settings,
      studentEraportShareList:
        currentEraportShareList ?? prev?.studentEraportShareList,
    }));

    setYear(currentAcademicYear?.years);
    setPapperType(
      _handlerCapitalizeFirstLetter(currentSetting?.paper_size || ''),
    );
    setPhase({
      ...phase,
      id: currentAcademicPhase?.id || 0,
      type: currentAcademicPhase?.type || '',
    });
    setDateIssue(
      !currentSetting?.issue_date
        ? ''
        : _handlerConvertAllDate(dayjs(currentSetting?.issue_date), 1),
    );
    fetchEraporData(currentAcademicPhase?.id);
  }, [storeAcademicYear?.data, academicYear?.data]);

  useEffect(() => {
    if (!eraportShareList?.data) {
      return;
    }
    const currentEraportShareList = eraportShareList?.data;
    setEraportData(prev => ({
      ...prev,
      studentEraportShareList:
        currentEraportShareList ?? prev?.studentEraportShareList,
    }));
  }, [eraportShareList?.data]);

  useEffect(() => {
    if (eraportDetail?.data) {
      dismissLoading();
      _handlerCloseSwipe();
      navigation.navigate('DetailEraporScreen', {classes_name: classes_data});
    }
  }, [eraportDetail?.data]);

  const _handlerSetAcademicYear = async (_yearId?: any) => {
    const data = {
      academic_year_id: _yearId || yearId,
      rombel_class_school_id: classes_data?.id,
      class_id: classes_data?.class_id,
      school_id: classes_data?.school_id,
    };
    await rdxDispatch(sendAcademicYear(data));
  };

  const _handlersetPaper = async () => {
    updateFormSettings('kertas', '');
    if (papperType !== '') {
      await sendSetPaper();
      setAlertPaper(false);
      showSuccessToast('Kertas rapor berhasil diatur.');
    } else if (papperType === '') {
      setAlertPaper(true);
    }
  };

  const sendSetPaper = async () => {
    const body: _IPayloadPaperSize = {
      id: eraportShareList?.data?.data?.id || 0,
      paper_size: papperType?.toLowerCase(),
      official_paper: '',
    };
    rdxDispatch(sendPaperSize(body, () => {}));
  };

  const _handlerSetIssueDate = () => {
    const datePickerFormatedStore = _handlerConvertDatePicker(
      valueDatePicker || initDatePicker,
      5,
    );
    setDateIssue(
      _handlerConvertDatePicker(valueDatePicker || initDatePicker, 4),
    );
    rdxDispatch(
      sendIssueDate({
        id: academic_phase?.id || eraportShareList?.data?.data?.id,
        issue_date: datePickerFormatedStore,
        academic_phase: phase?.id,
      }),
    );
  };

  const _handlerCloseSwipe = () => {
    setSwipe({...swipe, show: false, type: ''});
  };

  const filterEraporChild = (data: any) => {
    const tempRaport = tempEraportShareList?.filter(
      eraport => eraport?.user_id === data?.user_id,
    );
    return tempRaport;
  };

  const selectChild = (data: any) => {
    const eraporIndex = tempEraportShareList?.findIndex(
      value => value?.user_id === data?.user_id,
    );
    //remove from checkboxList
    if (eraporIndex !== -1) {
      setIsAllChildSelected(false);
      setTempEraportShareList(
        tempEraportShareList?.filter(value => value?.user_id !== data?.user_id),
      );
      return;
    }
    //add to checkboxList
    setTempEraportShareList([...tempEraportShareList, data]);
    //checkboxList selectAll
    if (
      tempEraportShareList?.length ==
      (eraportShareList?.data?.data?.assessment_erapor_share_student?.length ||
        0) -
        1
    ) {
      setIsAllChildSelected(true);
    }
  };

  const onPressSelectAllChild = () => {
    if (!eraportShareList) {
      return;
    }
    if (isAllChildSelected) {
      setIsAllChildSelected(false);
      setTempEraportShareList([]);
      return;
    }

    setIsAllChildSelected(true);
    setTempEraportShareList(
      eraportShareList?.data?.data?.assessment_erapor_share_student || [],
    );
  };

  const onEducationYearChildPress = (item: any) => {
    setYear(item.years);
    setYearId(item.id);
    _handlerSetAcademicYear(item.id);
    setSwipe({...swipe, show: false, type: ''});
    fetchEraporData();
    showSuccessToast('Tahun Berhasil diatur');
  };

  const onTerapkanPublishDateChild = () => {
    _handlerSetDatePicker(valueDatePicker || initDatePicker);
    _handlerSetIssueDate();
    setSwipe({...swipe, show: true, type: ''});
  };

  const onDownloadEraport = useCallback(async () => {
    try {
      const isDownloadListEraport = tempEraportShareList.length != 0;
      showLoading();
      setSwipe({...swipe, show: false, type: ''});

      if (isDownloadListEraport) {
        const listDownloadEraportId = tempEraportShareList.map(eraport =>
          downloadEraport(eraport.user?.full_name, eraport.id || 0),
        );
        await Promise.all(listDownloadEraportId);
      } else {
        await downloadEraport(
          eRaportPopup?.user?.full_name || '',
          eRaportPopup?.id || 0,
        );
      }
      showSuccessToast('E-rapor berhasil diunduh');
    } catch (error: any) {
      showErrorToast('E-rapor gagal diunduh');
    } finally {
      dismissLoading();
    }
  }, [eRaportPopup, tempEraportShareList]);

  const onEraportShare = useCallback(async () => {
    try {
      setPopUp(false);
      setSwipe({...swipe, show: false, type: ''});
      if (!isFormValid()) {
        showWarningToast('Pastikan pengaturan e-Rapor diterapkan.');
        return;
      }
      showLoading();
      const listUserId = tempEraportShareList?.map(value => value?.user_id) || [
        eRaportPopup?.user_id || 0,
      ];
      await shareEraport(eraportShareList?.data?.data?.id || 0, listUserId);
      showSuccessToast('E-rapor berhasil dibagikan');
      fetchEraporData();
    } catch (error: any) {
      showErrorToast('E-rapor gagal dibagikan');
    } finally {
      setEraportPopup({});
      dismissLoading();
    }
  }, [eraportShareList, tempEraportShareList, eRaportPopup]);

  const onEraportSeeDetails = useCallback(() => {
    showLoading();
    rdxDispatch(fetchEraportDetail(eRaportPopup?.id || 0));
  }, [eRaportPopup]);

  const isFormValid = () => {
    updateFormSettings('kertas', '');
    updateFormSettings('penilaian raport', '');
    updateFormSettings('tanggal terbit', '');
    if (papperType && phase.type && dateIssue) {
      return true;
    }
    if (!papperType) {
      updateFormSettings('kertas', 'Kertas wajib diatur');
    }
    if (!phase.type) {
      updateFormSettings('penilaian raport', 'Penilaian rapor wajib diatur');
    }
    if (!dateIssue) {
      updateFormSettings('tanggal terbit', 'Tanggal terbit wajib diatur');
    }
    return false;
  };

  const updateFormSettings = (itemName: SettingName, errorMessage: string) => {
    listFormSettings.map(item => {
      if (item?.name === itemName) {
        item.errorMessage = errorMessage;
      }
    });
    setListFormSettings([...listFormSettings]);
  };

  const onEraportReset = () => {
    setIsAllChildSelected(false);
    setTempEraportShareList([]);
  };

  const onAturPenilaianRaport = () => {
    navigation.navigate('ERaportGuruAssesmentScreen', {
      classes_data: classes_data,
      academic_year_id: yearId || 0,
      phase_id: phaseId,
    });
  };

  return {
    school,
    year,
    setYear,
    publishDate,
    setPublishDate,
    papperType,
    setPapperType,
    swipe,
    setSwipe,
    paperList,
    officialPaper,
    setOfficialPaper,
    snakbar,
    setSnakbar,
    _handlersetPaper,
    alertPaper,
    getUser,
    logoSekolah,
    navigation,
    valueDatePicker,
    setValueDatePicker,
    formatedDate,
    _handlerSetDatePicker,
    _handlerCloseSwipe,
    popUp,
    setPopUp,
    academicYear,
    yearId,
    setYearId,
    academic_year_id,
    academic_phase,
    classes_data,
    fetchEraportShareList,
    eraportShareList: eraportData?.studentEraportShareList,
    tempEraportShareList,
    setTempEraportShareList,
    rdxDispatch,
    _handlerVisibleSwipe,
    _handlerSetIssueDate,
    _handlerSetAcademicYear,
    dateIssue,
    phase,
    fetchAcademicYearOngoing,
    academicYearOngoing,
    filterEraporChild,
    selectChild,
    onPressSelectAllChild,
    isAllChildSelected,
    onEducationYearChildPress,
    onTerapkanPublishDateChild,
    isSearchMode,
    setIsSearchMode,
    eRaportPopup,
    setEraportPopup,
    onDownloadEraport,
    onEraportShare,
    listFormSettings,
    onEraportReset,
    onEraportSeeDetails,
    onAturPenilaianRaport,
    image,
  };
};
