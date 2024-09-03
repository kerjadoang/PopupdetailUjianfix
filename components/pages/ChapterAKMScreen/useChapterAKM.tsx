/* eslint-disable react-hooks/exhaustive-deps */
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchGetAllAkm} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useChapterAKM = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ChapterAKMScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'ChapterAKMScreen'>>();
  const subject_type = route.params.subject_type;
  const subject_data = route.params?.subject_data;
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
  const [soalData, setSoalData] = useState<{
    class_id?: any;
    description?: string;
    chapter_id?: any;
    id?: any;
    instructions?: string;
    name?: string;
    question_package_service_id?: number;
    question_type?: {
      description?: string;
      evaluation_type?: string;
      id?: any;
      question_type?: string;
    };
    question_type_id?: number;
    subject_id?: any;
    total_question?: number;
    rules?: any;
  }>();
  const [soalType, setSoalType] = useState<any>('');
  const [soalDataDetail, setSoalDataDetail] = useState<{
    chapter_id?: any;
    class_id?: any;
    description?: string;
    id?: any;
    instructions?: string;
    name?: string;
    question_package_service_id?: number;
    question_type?: {
      description?: string;
      evaluation_type?: string;
      id?: any;
      question_type?: string;
    };
    question_type_id?: number;
    subject_id?: any;
    total_question?: number;
    rules?: any;
  }>();

  useEffect(() => {
    dispatch(
      fetchGetAllAkm((_res: any) => {
        setIsLoading(false);
        setAkmData(_res?.data?.data);
      }),
    );
  }, []);

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
    subject_type,
    subject_data,
  };
};

export default useChapterAKM;
