/* eslint-disable react-hooks/exhaustive-deps */
import {SubjectType} from '@constants/subjectType';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  fetchGetAllKuisChapter,
  fetchGetUjianAkhirSemester,
  fetchGetUjianAkhirTahun,
  fetchGetUjianSekolah,
  fetchGetUjianTengahSemester,
  fetchGetUlanganHarianChapter,
} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SoalData, SoalDataDetail, _IResQuizData} from './type';

const useChapterSOAL = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ChapterSOALScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'ChapterSOALScreen'>>();
  const subject_type = route.params.subject_type;
  const subject_data = route.params.subject_data;
  const dispatch: any = useDispatch();
  const isFocus = useIsFocused();
  const {
    getAllAkm,
    getAllKuisChapter,
    getUlanganHarianChapter,
    getUjianTengahSemesterPackage,
    getUjianAkhirSemesterPackage,
    getUjianAkhirTahunPackage,
    getUjianSekolahPackage,
    getLMSMateriSekolahBab,
  }: any = useSelector(state => state);

  const [modalVisible, setModalVisible] = useState(false);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [isOpenForbiddenPopup, setIsOpenForbiddenPopup] =
    useState<boolean>(false);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [akmData, setAkmData] = useState<any>([]);
  const [soalUTS, setSoalUTS] = useState<any>([]);
  const [soalUAS, setSoalUAS] = useState<any>([]);
  const [soalUAT, setSoalUAT] = useState<any>([]);
  const [soalUS, setSoalUS] = useState<any>([]);
  const [isActiveSoalUTS, setIsActiveSoalUTS] = useState<boolean>(false);
  const [isActiveSoalUAS, setIsActiveSoalUAS] = useState<boolean>(false);
  const [isActiveSoalUAT, setIsActiveSoalUAT] = useState<boolean>(false);
  const [isActiveSoalUS, setIsActiveSoalUS] = useState<boolean>(false);
  const [soalData, setSoalData] = useState<SoalData>();
  const [soalType, setSoalType] = useState<any>('');
  const [soalDataDetail, setSoalDataDetail] = useState<SoalDataDetail>();

  useEffect(() => {
    if (getUlanganHarianChapter?.loading === false) {
      setSoalData(getUlanganHarianChapter?.data);
    }
  }, [getUlanganHarianChapter]);

  useEffect(() => {
    switch (subject_type) {
      case SubjectType.SOAL.Kuis:
        dispatch(
          fetchGetAllKuisChapter(subject_data?.id, (_res: _IResQuizData) => {
            setIsLoading(false);
          }),
        );
        break;
      case SubjectType.SOAL.UlanganHarian:
        dispatch(fetchGetUlanganHarianChapter(subject_data?.id));
        break;
      case SubjectType.SOAL.UjianTengahSemester ||
        SubjectType.SOAL.UjianAkhirSemester ||
        SubjectType.SOAL.UjianAkhirTahun ||
        SubjectType.SOAL.UjianSekolah:
        dispatch(
          fetchGetUjianTengahSemester(subject_data?.id, (_res: any) => {
            setIsLoading(false);
            setSoalUTS(_res?.data?.data?.package);
          }),
        );
        dispatch(
          fetchGetUjianAkhirSemester(subject_data?.id, (_res: any) => {
            setIsLoading(false);
            setSoalUAS(_res?.data?.data?.package);
          }),
        );
        dispatch(
          fetchGetUjianAkhirTahun(subject_data?.id, (_res: any) => {
            setIsLoading(false);
            setSoalUAT(_res?.data?.data?.package);
          }),
        );
        dispatch(
          fetchGetUjianSekolah(subject_data?.id, (_res: any) => {
            setIsLoading(false);
            setSoalUS(_res?.data?.data?.package);
          }),
        );
        break;
      default:
        break;
    }
  }, []);

  const handleActionUjianCategory = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        setIsActiveSoalUTS(true);
        setIsActiveSoalUAS(false);
        setIsActiveSoalUS(false);
        setIsActiveSoalUAT(false);
        break;
      case 2:
        setIsActiveSoalUTS(false);
        setIsActiveSoalUAS(true);
        setIsActiveSoalUS(false);
        setIsActiveSoalUAT(false);
        break;
      case 3:
        setIsActiveSoalUTS(false);
        setIsActiveSoalUAS(false);
        setIsActiveSoalUS(false);
        setIsActiveSoalUAT(true);
        break;
      case 4:
        setIsActiveSoalUTS(false);
        setIsActiveSoalUAS(false);
        setIsActiveSoalUS(true);
        setIsActiveSoalUAT(false);
        break;
      default:
        break;
    }
  };

  return {
    navigation,
    dispatch,
    route,
    isFocus,
    modalVisible,
    setModalVisible,
    isOpenPopUp,
    setIsOpenPopUp,
    isOpenForbiddenPopup,
    setIsOpenForbiddenPopup,
    chapters,
    setChapters,
    isLoading,
    setIsLoading,
    akmData,
    setAkmData,
    soalUTS,
    setSoalUTS,
    soalUAS,
    setSoalUAS,
    soalUAT,
    setSoalUAT,
    soalUS,
    setSoalUS,
    isActiveSoalUTS,
    setIsActiveSoalUTS,
    isActiveSoalUAS,
    setIsActiveSoalUAS,
    isActiveSoalUAT,
    setIsActiveSoalUAT,
    isActiveSoalUS,
    setIsActiveSoalUS,
    soalData,
    setSoalData,
    soalType,
    setSoalType,
    soalDataDetail,
    setSoalDataDetail,
    getAllAkm,
    getAllKuisChapter,
    getUlanganHarianChapter,
    getUjianTengahSemesterPackage,
    getUjianAkhirSemesterPackage,
    getUjianAkhirTahunPackage,
    getUjianSekolahPackage,
    getLMSMateriSekolahBab,
    handleActionUjianCategory,
    subject_type,
    subject_data,
  };
};

export default useChapterSOAL;
