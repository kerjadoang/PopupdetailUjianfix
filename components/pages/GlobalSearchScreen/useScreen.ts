import {showErrorToast} from '@constants/functional';
import {SubjectType} from '@constants/subjectType';
import {useNavigation} from '@react-navigation/native';
import ProviderMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useScreen = () => {
  const navigation: any = useNavigation();

  const _handlerNavigationMateri = async (
    group: string,
    name: string,
    dataItem: any,
  ) => {
    switch (group && name) {
      case 'learn' && 'Konsep Pelajaran':
        navigation.navigate('ConceptScreen', {
          chapterData: dataItem,
        });
        break;
      case 'learn' && 'Tujuan Pembelajaran':
        try {
          const _resFileData = await ProviderMedia?.getFile(dataItem?.file);
          const ResData = _resFileData?.data || false;
          if (ResData?.data?.path_url?.endsWith('.json')) {
            fetch(ResData?.data?.path_url)
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Error: ' + response.status);
                }
              })
              .then(data => {
                navigation.navigate('LearningObjectiveScreen', {
                  chapterData: dataItem,
                  contentData: data,
                });
              })
              .catch(error => {
                Toast?.show({
                  type: 'error',
                  text1: error?.message ?? 'Terjadi kesalahan pada sistem kami',
                });
              });
          }
        } catch (error: any) {
          Toast?.show({
            type: 'error',
            text1:
              error?.response?.data?.message ??
              'Terjadi kesalahan pada sistem kami',
          });
        }
        break;
      case 'learn' && 'Concept Adventure':
        navigation.navigate('ConceptScreen', {
          chapterData: dataItem,
        });
        break;
      case 'learn' && 'E-Book':
        navigation.navigate('EbookScreen', {
          chapterData: dataItem,
          subjectId: dataItem?.subject?.id,
        });
        break;
      case 'practice' && 'Pahami dan Beraksi':
        navigation.navigate('HotsScreen', {
          chapterData: dataItem,
          title: name ?? '',
          question_service_type_id: 4,
        });
        break;
      case 'practice' && 'Think and Share':
        navigation.navigate('HotsScreen', {
          chapterData: dataItem,
          title: name ?? '',
          question_service_type_id: 4,
        });
        break;
      case 'learn_lms' && 'E-book':
        navigation.navigate('EbookScreen', {
          chapterData: dataItem,
          subjectId: dataItem?.subject?.id,
        });
        break;
      default:
        showErrorToast('Data tidak ditemukan.');
        break;
    }
  };

  const _handlerNavigationVideo = (
    group: string,
    name: string,
    dataItem: any,
  ) => {
    switch (group && name) {
      case 'learn' && 'Video Animasi':
        navigation.navigate('VideoAnimationScreen', {
          chapterData: dataItem,
          type: 'learn',
        });
        break;
      case 'learn' && 'Video Presentasi':
        navigation.navigate('VideoPresentationScreen', {
          contentData: dataItem,
        });
        break;
      case 'guru' && 'Live Class':
        dataItem.ID = dataItem.id;
        navigation.navigate('VideoAnimationScreen', {
          chapterData: dataItem,
          type: 'guru',
        });
        break;
      case 'learn_lms' && 'Video Animasi':
        navigation.navigate('VideoAnimationScreen', {
          chapterData: dataItem,
          type: 'learn',
        });
        break;
      case 'learn_lms' && 'Video Presentasi':
        navigation.navigate('VideoPresentationScreen', {
          contentData: dataItem,
        });
        break;
      default:
        showErrorToast('Data tidak ditemukan.');
        break;
    }
  };

  const navigateToPractice = (dataItem: any) => {
    navigation.navigate('KPRegularDetailBab', {
      category: SubjectType?.KPRegular?.Practice,
      chapterData: dataItem?.chapter,
      subject_name: dataItem?.subject?.name,
      subject_icon: dataItem?.subject?.icon_mobile,
      subject_id: dataItem?.subject?.id,
    });
  };

  const navigateToTest = (dataItem: any) => {
    navigation.navigate('KPRegularDetailBab', {
      category: SubjectType?.KPRegular?.Test,
      chapterData: dataItem?.chapter,
      subject_name: dataItem?.subject?.name,
      subject_icon: dataItem?.subject?.icon_mobile,
      subject_id: dataItem?.subject?.id,
    });
  };

  const navigateToSOALUlangan = (dataItem: any) => {
    navigation.navigate('ChapterSOALScreen', {
      subject_type: SubjectType?.SOAL.UlanganHarian,
      subject_data: dataItem?.subject,
    });
  };

  const navigateToSOALUTS = (dataItem: any) => {
    navigation.navigate('ChapterSOALScreen', {
      subject_type: SubjectType?.SOAL.UjianTengahSemester,
      subject_data: dataItem?.subject,
    });
  };

  const navigateToSOALUAT = (dataItem: any) => {
    navigation.navigate('ChapterSOALScreen', {
      subject_type: SubjectType?.SOAL.UjianAkhirTahun,
      subject_data: dataItem?.subject,
    });
  };

  const _handlerNavigationSoal = (
    group: string,
    name: string,
    dataItem: any,
  ) => {
    switch (group && name) {
      case 'soal' && 'Ulangan Harian Practice':
        navigateToSOALUlangan(dataItem);
        break;
      case 'soal' && 'Ulangan Harian Test':
        navigateToSOALUlangan(dataItem);
        break;
      case 'soal' && 'Ujian Tengah Semester':
        navigateToSOALUTS(dataItem);
        break;
      case 'soal' && 'Ujian Akhir Tahun':
        navigateToSOALUAT(dataItem);
        break;
      case 'practice' && 'Pahami dan Beraksi':
        navigateToPractice(dataItem);
        break;
      case 'practice' && 'Latihan Soal PG':
        navigateToPractice(dataItem);
        break;
      case 'practice' && 'Latihan Soal Uraian':
        navigateToPractice(dataItem);
        break;
      case 'practice' && 'Tanya Jawab':
        navigateToPractice(dataItem);
        break;
      case 'practice' && 'Soal Berbasis Nilai':
        navigateToPractice(dataItem);
        break;
      case 'test' && 'Test Adaptif':
        navigateToTest(dataItem);
        break;
      case 'test' && 'Soal Pilihan Ganda':
        navigateToTest(dataItem);
        break;
      case 'test' && 'Soal Uraian':
        navigateToTest(dataItem);
        break;

      default:
        showErrorToast('Data tidak ditemukan.');
        break;
    }
  };

  const _handlerNavigationLainnya = (group: string, dataItem: any) => {
    switch (group) {
      case 'blog':
        navigation.navigate('BlogDetailScreen', {idBlog: dataItem?.id});
        break;

      default:
        showErrorToast('Data tidak ditemukan.');
        break;
    }
  };

  return {
    _handlerNavigationMateri,
    _handlerNavigationVideo,
    _handlerNavigationSoal,
    _handlerNavigationLainnya,
  };
};

export default useScreen;
