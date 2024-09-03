import {
  isStringContains,
  showErrorToast,
  useMergeState,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {URL_PATH} from '@constants/url';
import {apiGet, apiGetBulkImage, apiPut} from '@api/wrapping';
import {IPancasilaListStatusProyek} from '@services/projectPancasila/type';
import {ParamList} from 'type/screen';

const usePancasilaAllStatusProyekScreen = (
  service_type: 'guru' | 'kepsek',
  type: 'proyek_berlangsung' | 'riwayat_proyek',
) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'PancasilaAllStatusProyekScreen'>
    >();
  const [listPhase, setListPhase] = useState<IPancasilaPhase[]>([]);
  const [listStatusProyek, setListStatusProyek] = useState<
    IPancasilaListStatusProyek[]
  >([]);
  const filterData = ['Fase', 'Status'];
  const isTypeBerlangsung = type === 'proyek_berlangsung';

  const isFaseFilter = (filter: any) => {
    return filter === 'Fase';
  };
  const parseStatusType = () => {
    if (isTypeBerlangsung) {
      return 'berlangsung';
    }
    return 'batal,selesai';
  };

  useEffect(() => {
    getListStatusProyek();
    getListPhase();
  }, []);

  const [state, setState] = useMergeState({
    isLoading: false,
    isOpenSwipeUp: false,
    swipeUpFilter: '',
    filterChip: [],
    listPhaseId: '',
    listStatus: '',
    activeFaseData: [],
    activeStatusData: [],
  });

  const setIsOpenSwipeUp = (value: boolean) => {
    setState({isOpenSwipeUp: value});
  };

  const setSwipeUpFilter = (value: 'Fase' | 'Status') => {
    setState({
      swipeUpFilter: value,
      isOpenSwipeUp: true,
    });
  };

  const mappedRiwayatStatus = (value: any[]) => {
    return value
      ?.map?.((item: string) => {
        if (!isStringContains(item, 'batal')) {
          return item;
        }
        return 'batal';
      })
      .join(',')
      .toLowerCase?.();
  };

  const mappedRekomended = (value: any[]) => {
    if (value.length > 1) {
      return '';
    }

    return value
      .map(item => {
        if (item.toLowerCase().includes('belum')) {
          return false;
        }
        return true;
      })
      .join('');
  };

  const mappedListPhase = (value: any[]) => {
    return value.map(item => item.id).join(',');
  };

  const setActiveFaseData = (value: any[]) => {
    setState({
      activeFaseData: value,
    });
    getListStatusProyek(
      mappedListPhase(value),
      isTypeBerlangsung ? mappedRekomended(state.activeStatusData) : '',
      isTypeBerlangsung
        ? 'berlangsung'
        : mappedRiwayatStatus(state.activeStatusData),
    );
  };

  const setActiveStatusData = (value: any[]) => {
    let _listStatus = '';

    if (value.length <= 1) {
      _listStatus = value
        .map(item => {
          if (item.toLowerCase().includes('belum')) {
            return false;
          }
          return true;
        })
        .join('');
    }

    setState({
      activeStatusData: value,
    });

    getListStatusProyek(
      mappedListPhase(state.activeFaseData),
      isTypeBerlangsung ? _listStatus : '',
      isTypeBerlangsung ? 'berlangsung' : mappedRiwayatStatus(value),
    );
  };

  const getListStatusProyek = async (
    phaseId?: any,
    isRecommend?: any,
    status?: string,
  ) => {
    try {
      setState({isLoading: true});
      let data = await apiGet({
        url: URL_PATH.get_pancasila_list_status(
          phaseId,
          isRecommend,
          status || parseStatusType(),
          0,
          20,
        ),
      });

      data = await apiGetBulkImage({
        dottedString: 'sender.avatar',
        datas: data,
      });

      setListStatusProyek(data);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Error');
    } finally {
      setState({isLoading: false});
    }
  };

  const setFilterChip = (value: any[]) => {
    setState({
      filterChip: value,
    });
  };
  const getListPhase = async () => {
    try {
      setState({isLoading: true});
      const data = await apiGet({
        url: URL_PATH.get_pancasila_list_phase(),
      });
      const mappingPhaseName = data.map((item: IPancasilaPhase) => {
        // "name": "Fase A",
        if (!isStringContains(item.name || '', '(')) {
          return item;
        }
        // "name": "Fase A (Kelas 1 - 2)",
        const indexOfKurung = item.name?.indexOf('(') ?? 5;
        const newItem = {
          ...item,
          name: item?.name?.substring(0, indexOfKurung - 1),
        };
        return newItem;
      });
      setListPhase(mappingPhaseName);
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Error');
    } finally {
      setState({isLoading: false});
    }
  };

  const onAturUlang = () => {
    setFilterChip(filterChip.filter((item: any) => item !== swipeUpFilter));
  };

  const onTerapkan = (data: any) => {
    setIsOpenSwipeUp(false);
    if (isFaseFilter(swipeUpFilter)) {
      setActiveFaseData(data);
    } else {
      setActiveStatusData(data);
    }
    if (data.length === 0) {
      setFilterChip(filterChip.filter((item: any) => item !== swipeUpFilter));
      return;
    }
    setFilterChip([...filterChip, swipeUpFilter]);
  };
  const onClickUbah = async (data: IPancasilaListStatusProyek) => {
    navigation.navigate('PancasilaKirimProyekScreen', {
      role: service_type,
      project_id: data.project_id,
      type: 'edit',
    });
  };
  const onClickHapus = async (data: IPancasilaListStatusProyek) => {
    try {
      setState({isLoading: true});
      await apiPut({
        url: URL_PATH.put_pancasila_hapus_status_send_proyek(data.id),
        body: {
          status: 'batal',
        },
      });
      getListStatusProyek();
    } catch (error) {
    } finally {
      setState({isLoading: false});
    }
  };
  const {
    isLoading,
    isOpenSwipeUp,
    swipeUpFilter,
    filterChip,
    activeStatusData,
    activeFaseData,
    listStatus,
  }: any = state;
  return {
    isLoading,
    listStatusProyek,
    listPhase,
    listStatus,
    isOpenSwipeUp,
    swipeUpFilter,
    filterData,
    filterChip,
    activeStatusData,
    activeFaseData,
    setIsOpenSwipeUp,
    setSwipeUpFilter,
    setActiveFaseData,
    setActiveStatusData,
    setFilterChip,
    isFaseFilter,
    onTerapkan,
    onAturUlang,
    onClickHapus,
    onClickUbah,
    isTypeBerlangsung,
  };
};
export default usePancasilaAllStatusProyekScreen;
