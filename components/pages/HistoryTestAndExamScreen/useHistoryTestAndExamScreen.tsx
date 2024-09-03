import api from '@api/index';
import {Keys} from '@constants/keys';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import {INavigation, IRoute} from 'type/screen';
import {goToExplanationUtils} from '../StudentHistoryExamScreen/utils';
const btn = ['UTS', 'UAS', 'Ujian Akhir Tahun'];

const SOAL_CATEGORY = {
  ULANGAN_HARIAN: 'SOAL Ulangan Harian',
  UTS: 'SOAL Ujian Tengah Semester',
  UAS: 'SOAL Ujian Akhir Semester',
  UJIAN_AKHIR_TAHUN: 'SOAL Ujian Akhir Tahun',
};

const rulesSOALTest: string[] = [
  'Perhatikan waktu pengerjaan soal.Pengerjaan dikumpulkan otomatis jika waktu habis.',
  'Pilih nomor halaman soal untuk lompat ke soal yang ingin dikerjakan.',
  'Gunakan fitur tandai pertanyaan agar lebih mudah mengerjakan soal secara tidak berurutan.',
];

const useHistoryTestAndExamScreen = () => {
  const route = useRoute<IRoute<'HistoryTestAndExamScreen'>>();
  const {type, subjectData, questionPackageServiceId, user} = route.params;
  const navigation = useNavigation<INavigation<'HistoryTestAndExamScreen'>>();
  const [activeBtn, setActiveBtn] = useState(0);
  const [questionPackages, setQuestionPackages] = useState<
    ISOALReportPackage[]
  >([]);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [popUpData, setPopupData] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<any>();

  const [questionPackageServiceUjianId, setQuestionPackageServiceUjianId] =
    useState<any>();

  useEffect(() => {
    const getQuestionPackageHistory = async () => {
      try {
        let mainURL = '/soal/v1/laporan';

        if (type === 'ULANGAN_HARIAN') {
          mainURL += '/ulangan-harian';
        }

        const response = await api.get(
          `${mainURL}/${subjectData?.subject?.id}/${
            questionPackageServiceUjianId || questionPackageServiceId
          }`,
          {
            headers: user?.access_token && {
              Authorization: `Bearer ${user?.access_token}`,
            },
          },
        );

        if (response.status === 200) {
          if (type === 'ULANGAN_HARIAN') {
            setQuestionPackages(response.data?.data || []);
          } else {
            setQuestionPackages(response.data?.data?.question_package || []);
          }
        }
      } catch (err) {
        return;
      }
    };

    if (questionPackageServiceUjianId || questionPackageServiceId) {
      getQuestionPackageHistory();
    }
  }, [
    subjectData?.subject?.id,
    questionPackageServiceUjianId,
    questionPackageServiceId,
    type,
  ]);

  const handleItemClick = useCallback(
    async (userHistoryId: number, title: string) => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get(
          `/soal/v1/history/user-history/${userHistoryId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token || tokenParse}`,
            },
          },
        );

        if (response.status === 200) {
          let {
            data: {data},
          } = response;

          if (data) {
            const {correct_answer, wrong_answer, pass_answer} = data;

            return goToExplanationUtils({
              data: {
                correct_answer,
                wrong_answer,
                pass: pass_answer,
              },
              navigation: navigation,
              questionServiceId: QUESTION_SERVICE_TYPE.SOAL,
              title: title,
            });
          }
        }
      } catch (_) {}
    },
    [navigation],
  );

  const handleMappingSoalCategory = useCallback(() => {
    if (type === 'ULANGAN_HARIAN') {
      return SOAL_CATEGORY.ULANGAN_HARIAN;
    }

    switch (questionPackageServiceUjianId) {
      case 5:
        return SOAL_CATEGORY.UTS;
      case 6:
        return SOAL_CATEGORY.UAS;
      case 7:
        return SOAL_CATEGORY.UJIAN_AKHIR_TAHUN;
      default:
        return SOAL_CATEGORY.UTS;
    }
  }, [questionPackageServiceUjianId, type]);

  const _onAccordionPress = (newExpandedId: string | number) =>
    expandedId === newExpandedId
      ? setExpandedId(undefined)
      : setExpandedId(newExpandedId);

  return {
    user,
    popUpData,
    setIsOpenPopUp,
    navigation,
    type,
    subjectData,
    activeBtn,
    questionPackageServiceId,
    setQuestionPackageServiceUjianId,
    setActiveBtn,
    expandedId,
    _onAccordionPress,
    isOpenPopUp,
    questionPackages,
    rulesSOALTest,
    btn,
    handleItemClick,
    setPopupData,
    handleMappingSoalCategory,
  };
};

export {useHistoryTestAndExamScreen};
