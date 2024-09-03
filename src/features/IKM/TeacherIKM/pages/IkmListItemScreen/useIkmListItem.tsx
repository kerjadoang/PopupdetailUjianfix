import {
  dismissLoading,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  IkmListItemScreenParam,
  ParamList,
  UploadFileIkmScreenParam,
} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {apiDelete, apiGet, apiGetBulkImage} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useEffect, useState} from 'react';

const useIkmListItem = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'IkmListItemScreen'>>();
  const {getRouteParams, navigateScreen} = useNavigate();
  const {title, services, data} = getRouteParams<IkmListItemScreenParam>();
  const [listItem, setListItem] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showMoreSwipeUp, setShowMoreSwipeUp] = useState<boolean>(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const getCapaianPembelajaran = async (subject_id: number) => {
    try {
      showLoading();
      const resData = await apiGet({
        url: URL_PATH.get_capaian_pembelajaran_subject(subject_id),
      });
      resData.list = await apiGetBulkImage({
        dottedString: 'thumbnail_media_id' ?? '',
        datas: resData.list,
        newParams: 'thumbnail_media_url',
      });
      setListItem(resData?.list);
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    } finally {
      dismissLoading();
    }
  };

  const getAlurTujuanPembelajaran = async (subject_id: number) => {
    try {
      showLoading();
      let resData = await apiGet({
        url: URL_PATH.get_alur_tujuan_pembelajaran_subject(subject_id),
      });

      resData.list = await apiGetBulkImage({
        dottedString: 'thumbnail_media_id' ?? '',
        datas: resData.list,
        newParams: 'thumbnail_media_url',
      });
      setListItem(resData?.list);
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    } finally {
      dismissLoading();
    }
  };

  const getModulAjar = async (subject_id: number) => {
    try {
      showLoading();
      const resData = await apiGet({
        url: URL_PATH.get_modul_ajar_subject(subject_id),
      });
      resData.list = await apiGetBulkImage({
        dottedString: 'thumbnail_media_id' ?? '',
        datas: resData.list,
        newParams: 'thumbnail_media_url',
      });
      setListItem(resData?.list);
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    } finally {
      dismissLoading();
    }
  };

  const getVideoTutorial = async () => {
    try {
      showLoading();
      const resData = await apiGet({
        url: URL_PATH.get_video_tutorial(1, 10),
      });
      resData.list = await apiGetBulkImage({
        dottedString: 'thumbnail_media_id' ?? '',
        datas: resData.list,
        newParams: 'thumbnail_media_url',
      });
      setListItem(resData);
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    } finally {
      dismissLoading();
    }
  };

  const onPressEdit = () => {
    setShowMoreSwipeUp(false);
    navigateScreen<UploadFileIkmScreenParam>('UploadFileIkmScreen', {
      type: 'Ubah',
      serviceType: title === 'Modul Ajar' ? 'Modul Ajar' : 'ATP',
      data: data,
      defaultValue: selectedItem,
    });
  };

  const onPressDelete = () => {
    setShowMoreSwipeUp(false);
    setShowDeletePopUp(true);
  };

  const deleteItem = async () => {
    try {
      showLoading();
      await apiDelete({
        url:
          services === 'Alur Tujuan Pembelajaran'
            ? URL_PATH.put_alur_tujuan_pembelajaran(selectedItem?.id)
            : URL_PATH.put_modul_ajar(selectedItem?.id),
      });

      showSuccessToast(`${services} Berhasil Dihapus`);
      setShowDeletePopUp(false);

      if (services === 'Alur Tujuan Pembelajaran') {
        getAlurTujuanPembelajaran(data?.id);
      } else if (services === 'Modul Ajar') {
        getModulAjar(data?.id);
      }
    } catch (error) {
      showErrorToast('Terjadi kesalahan pada sistem kami.');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setTimeout(() => {
      if (services === 'Capaian Pembelajaran') {
        getCapaianPembelajaran(data?.id);
      } else if (services === 'Alur Tujuan Pembelajaran') {
        getAlurTujuanPembelajaran(data?.id);
      } else if (services === 'Modul Ajar') {
        getModulAjar(data?.id);
      } else {
        getVideoTutorial();
      }
    }, 300);
  }, [data, isFocused]);

  return {
    navigation,
    navigateScreen,
    title,
    services,
    data,
    listItem,
    selectedItem,
    setSelectedItem,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showDeletePopUp,
    setShowDeletePopUp,
    onPressEdit,
    onPressDelete,
    deleteItem,
  };
};
export default useIkmListItem;
