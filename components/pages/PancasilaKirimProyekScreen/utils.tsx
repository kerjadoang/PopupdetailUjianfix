import {apiGet} from '@api/wrapping';
import {
  _handlerConvertDatePicker,
  convertDate,
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {useState} from 'react';

export const parseDateValue = (value: any, type?: number) => {
  value.month = value.month;
  const dateParse = _handlerConvertDatePicker(value, type || 12);
  return dateParse;
};

export const newParseDateValue = (value: any) => {
  value.month -= 1;
  return convertDate(value).format('YYYY-MM-DD HH:mm:ss');
};

export const labelParseDateValue = (value: any) => {
  // value.month += 1;
  return convertDate(value).format('ddd, DD MMM YYYY • HH:mm');
};

export const handleDisabled = (type: string, isAddMode?: boolean) => {
  const disabledRombel = type === 'Rombel' && !isAddMode;
  const disabledClass = type === 'Kelas' && !isAddMode;
  if (type === 'Tema' || type === 'Materi' || disabledClass || disabledRombel) {
    return true;
  }
  return false;
};

export const useGetListKelas = (setState: any) => {
  const [listKelas, setListKelas] = useState([]);

  const getListKelas = async (degreeId: any) => {
    try {
      setState({isLoading: true});
      showLoading();
      const data = await apiGet({
        url: URL_PATH.get_class_by_degree(degreeId),
      });
      setListKelas(data || []);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
      setState({isLoading: false});
    }
  };
  return {
    listKelas,
    getListKelas,
  };
};

export const useGetListRombel = (setState: any) => {
  const [listRombel, setListRombel] = useState([]);

  const getListRombel = async (class_id: any) => {
    try {
      setState({isLoading: true});
      showLoading();
      const data = await apiGet({
        url: URL_PATH.get_list_class_rombel(class_id),
      });
      setListRombel(data || []);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
      setState({isLoading: false});
    }
  };
  return {
    listRombel,
    getListRombel,
  };
};

export const useGetDetailProyek = (setState: any) => {
  const [detailProyek, setDetailProyek] = useState<IPancasilaDetailProyek>();

  const getDetailProyek = async (projectId: any) => {
    try {
      setState({isLoading: true});
      showLoading();
      const data = await apiGet({
        url: URL_PATH.get_pancasila_detail_proyek(projectId),
      });
      setDetailProyek(data);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Terjadi Kesalahan');
    } finally {
      dismissLoading();
      setState({isLoading: false});
    }
  };
  return {
    detailProyek,
    getDetailProyek,
  };
};
