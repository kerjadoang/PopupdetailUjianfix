import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  useAddSoalToPaketSoalUjian,
  useGetDetailPaketSoalList,
} from '@services/lms';
import {IAddToPaketSoalPayload} from '@services/lms/type';
import {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ParamList} from 'type/screen';
import IconArrange from '@assets/svg/ic24_arrange.svg';
import IconTrash from '@assets/svg/ic24_trash_red.svg';
import {
  dismissLoading,
  handlerOpenFile,
  isText,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {apiDelete, apiGetFile, apiPost, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useDetailSoalListActions, useDetailSoalListMode} from '../zustand';

interface IPopupListMore {
  isShow: boolean;
  data: IBasePackageQuestion[];
}

const useScreenDetailPaketSoal = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailPaketSoalListScreen'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'DetailPaketSoalListScreen'>
    >();

  const {
    package_id,
    subtitle,
    title,
    subject_id,
    mode,
    package_id_to_be_add,
    class_id,
    chapter_id,
  } = route.params;
  const {data, refetch} = useGetDetailPaketSoalList();
  const {mutate: addSoalToPaketSoal} = useAddSoalToPaketSoalUjian();
  const {height} = useWindowDimensions();
  const listMode = useDetailSoalListMode();
  const {
    setRawSoalList,
    setSoalList,
    setMode: setListMode,
    resetState: resetDetailSoalList,
  } = useDetailSoalListActions();
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<typeof mode>(mode);
  const [selectedSoal, setSelectedSoal] = useState<IBasePackageQuestion[]>([]);
  const [showSwipeUpMore, setShowSwipeUpMore] = useState<boolean>(false);
  const [showSwipeUpUpload, setShowSwipeUpUpload] = useState<boolean>(false);
  const [showPopUpDeletePackage, setShowPopUpDeletePackage] =
    useState<boolean>(false);
  const [showPopUpListMore, setShowPopUpListMore] = useState<IPopupListMore>({
    data: [],
    isShow: false,
  });

  const isAddMode = currentMode === 'add_soal';
  const isFocused = useIsFocused();
  const [localFileName, setLocalFileName] = useState<string>();
  const [fileData, setFileData] = useState<IFileData>();
  const [progressUpload, setProgressUpload] = useState<string>('0%');
  const [uploadError, setUploadError] = useState<{
    errorMessage: string;
    isError: boolean;
  }>({
    errorMessage: '',
    isError: false,
  });

  useEffect(() => {
    if (!data?.data?.package_question) {
      return;
    }

    setSoalList(data?.data?.package_question || []);
    setRawSoalList(data?.data?.package_question || []);

    return () => {
      resetDetailSoalList();
    };
  }, [data?.data?.package_question]);

  const onPressSoalItem = (item: IBasePackageQuestion, index: number) => {
    if (isAddMode) {
      if (selectedSoal.some(soal => soal.id === item.id)) {
        setSelectedSoal(prevState =>
          [...prevState].filter(soal => soal.id !== item.id),
        );
      } else {
        setSelectedSoal(prevState => [...prevState, item]);
      }
      return;
    }
    navigation.push('DetailSoalScreen', {
      order: index + 1,
      title,
      subtitle: data?.data?.name,
      school_id: data?.data?.school_id,
      subject_id,
      class_id,
      package_id,
      chapter_id,
    });
  };

  const onAddSoalToPaketSoal = async () => {
    try {
      const payloadData: IAddToPaketSoalPayload['questions'] = selectedSoal.map(
        soal => {
          return {
            question_id: soal.question_id,
            orders: soal.orders,
          };
        },
      );
      await addSoalToPaketSoal(package_id_to_be_add, {questions: payloadData});
      navigation.replace('DetailPaketSoalListScreen', {
        subject_id,
        package_id: package_id_to_be_add,
        title,
        subtitle,
        class_id,
        chapter_id,
        mode: 'detail',
      });
      setCurrentMode('detail');
      Toast.show({type: 'success', text1: 'Soal berhasil disimpan.'});
    } catch (e) {}
  };

  const listMore = [
    {
      id: 1,
      icon: <IconArrange />,
      title: 'Atur Urutan Soal',
    },
    {
      id: 2,
      icon: <IconTrash />,
      title: 'Hapus Soal',
    },
    {
      id: 3,
      icon: <IconTrash />,
      title: 'Hapus Paket Soal',
    },
  ];

  const deletePackageSoal = async (package_id: any) => {
    setShowPopUpDeletePackage(false);
    try {
      showLoading();
      await apiDelete({
        url: URL_PATH.delete_detail_paket_soal_list(package_id),
      });

      navigation.goBack();
      showSuccessToast('Paket soal berhasil dihapus.');
    } catch (err: any) {
      showErrorToast(err || 'Terjadi Kesalahan.');
      setShowSwipeUpMore(false);
    } finally {
      dismissLoading();
    }
  };

  const actionMore = (title: string) => {
    switch (title) {
      case 'Atur Urutan Soal':
        setListMode('reorder');
        setShowSwipeUpMore(false);
        break;
      case 'Hapus Soal':
        setListMode('delete');
        setShowSwipeUpMore(false);
        break;
      case 'Hapus Paket Soal':
        setShowSwipeUpMore(false);
        setShowPopUpDeletePackage(true);
        break;
      default:
        break;
    }
  };

  const onDoneEditMode = (soalList: IBasePackageQuestion[]) => {
    if (listMode === 'reorder') {
      return reorderSoal(soalList);
    }
    setShowPopUpListMore({data: soalList, isShow: true});
  };

  const closeListMorePopup = (withListMode?: boolean) => {
    setShowPopUpListMore(prevState => ({
      data: prevState.data,
      isShow: false,
    }));

    if (!withListMode) {
      return;
    }

    setListMode('detail');
  };
  const deleteBulkSoal = async (soalList: IBasePackageQuestion[]) => {
    try {
      showLoading();
      const body = {
        question_ids: soalList.map(item => item.question_id),
      };

      await apiDelete({
        url: URL_PATH.delete_bulk_detail_paket_soal_list(package_id),
        body: body,
      });
      refetch(package_id);
      showSuccessToast('Soal berhasil dihapus.');
    } catch (error: any) {
      showErrorToast(error.toString());
    } finally {
      dismissLoading();
    }
  };
  const reorderSoal = async (soalList: IBasePackageQuestion[]) => {
    try {
      showLoading();
      const body = {
        questions: soalList.map((item, index) => ({
          id: item.id,
          orders: index + 1,
        })),
      };
      await apiPut({
        url: URL_PATH.put_reoder_detail_paket_soal_list(package_id),
        body: body,
      });
      showSuccessToast('Urutan soal berhasil diatur.');
      setListMode('detail');
      refetch(package_id);
    } catch (error: any) {
      showErrorToast(error.toString());
    } finally {
      dismissLoading();
    }
  };

  const actionCancelListMore = useCallback(() => {
    closeListMorePopup(true);
    if (listMode === 'delete') {
      deleteBulkSoal(showPopUpListMore.data);
      return;
    }
  }, [listMode, showPopUpListMore]);

  const actionConfirmListMore = useCallback(() => {
    closeListMorePopup(false);
    if (listMode === 'delete') {
      setListMode('detail');
      return;
    }
  }, [listMode, showPopUpListMore]);

  const parseUploadErrorMessage = (message: string) => {
    switch (message) {
      case 'Higher Than Max Limit':
        return 'File melebihi ukuran batas maksimum ( 100mb ).';

      case 'Format Not Valid':
        return 'Format File yang di upload tidak sesuai.';

      default:
        return 'Gagal upload bulk soal';
    }
  };

  const uploadBulkSoal = async (package_id: number, media_id: string) => {
    try {
      showLoading();
      const body = {
        media_id: media_id,
      };
      await apiPost({
        url: URL_PATH.upload_bulk_soal(package_id),
        body,
      });

      showSuccessToast('Soal berhasil ditambahkan.');
      handleRemoveData();
      refetch(package_id);
    } catch (error) {
      handleRemoveData();
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  const _handlerDocumentSelection = async () => {
    try {
      setUploadError({
        errorMessage: parseUploadErrorMessage(''),
        isError: false,
      });
      const resData = await handlerOpenFile({
        uploadType: 'Ujian',
        onError: (err: string) => {
          setUploadError({
            errorMessage: parseUploadErrorMessage(err),
            isError: true,
          });
        },
        uploadProgress: (progress: number) => {
          setProgressUpload(`${progress}%`);
        },
        showLoadingIndicator: false,
        uploadSubType: 'paket-soal',
        showSnackBar: false,
        listFileExtension: ['doc', 'docx', 'DOC', 'DOCX'],
      });

      setFileData({
        ID: resData?.ID,
        file_name: resData?.local_name,
        path_url: resData?.path_url || '',
        type: resData?.local_type,
      });
    } catch (error: any) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    }
  };

  const handleRemoveData = () => {
    setFileData({});
    setLocalFileName('');
    setUploadError({
      errorMessage: '',
      isError: false,
    });
  };

  const handleDownloadTemplateBulk = async () => {
    const url =
      'https://cdn-assets.kelaspintar.id/template/Template_Upload_Bulk_Ujian_Soal_Pilihan_Ganda.docx';

    try {
      await apiGetFile({
        url: url,
        fileNameWithExt: 'Template_Upload_Bulk_Ujian_Soal_Pilihan_Ganda.docx',
      });

      setShowSwipeUpUpload(false);
      showSuccessToast('Template berhasil di download.');
    } catch (error) {
      showErrorToast(isText(error) ? error : 'Terjadi Kesalahan');
    }
  };

  const handleCancelUpload = () => {
    handleRemoveData();
    setShowSwipeUpUpload(false);
  };

  const handleSubmitUpload = async () => {
    if (fileData?.ID) {
      setTimeout(() => {
        uploadBulkSoal(package_id, fileData?.ID || '');
        setShowSwipeUpUpload(false);
      }, 1000);
    } else {
      setUploadError({
        errorMessage: 'File Wajib Diisi.',
        isError: true,
      });
    }
  };

  return {
    navigation,
    isFocused,
    title,
    subtitle,
    package_id,
    subject_id,
    isAddMode,
    class_id,
    chapter_id,
    data,
    refetch,
    height,
    visibleMenu,
    setVisibleMenu,
    selectedSoal,
    showSwipeUpMore,
    setShowSwipeUpMore,
    showSwipeUpUpload,
    setShowSwipeUpUpload,
    showPopUpDeletePackage,
    setShowPopUpDeletePackage,
    onPressSoalItem,
    onAddSoalToPaketSoal,
    listMore,
    deletePackageSoal,
    actionMore,
    listMode,
    setListMode,
    onDoneEditMode,
    showPopUpListMore,
    setShowPopUpListMore,
    actionCancelListMore,
    actionConfirmListMore,
    _handlerDocumentSelection,
    handleRemoveData,
    fileData,
    progressUpload,
    localFileName,
    setLocalFileName,
    uploadError,
    handleDownloadTemplateBulk,
    handleCancelUpload,
    handleSubmitUpload,
  };
};

export {useScreenDetailPaketSoal};
