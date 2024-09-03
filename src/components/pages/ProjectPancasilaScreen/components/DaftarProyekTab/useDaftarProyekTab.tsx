import {
  deepClone,
  isStringContains,
  showErrorToast,
  useMergeState,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {ParamList} from 'type/screen';

const useDaftarProyekTab = (service_type: 'guru' | 'kepsek') => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ProjectPancasilaScreen'>>();
  const [listDaftarProyek, setListDaftarProyek] = useState<
    IDaftarProyekPancasila[]
  >([]);
  const [listExpandData, setListExpandData] = useState<
    IDaftarProyekPancasila[]
  >([]);
  const [listPhase, setListPhase] = useState<IPancasilaPhase[]>([]);
  const filterData = ['Fase', 'Status'];
  const isFocused = useIsFocused();
  const isFaseFilter = (filter: any) => {
    return filter === 'Fase';
  };
  const initState = {
    isLoading: false,
    isOpenSwipeUp: false,
    swipeUpFilter: '',
    filterChip: [],
    listPhaseId: '',
    listStatus: '',
    activeFaseData: [],
    activeStatusData: [],
  };

  const [state, setState] = useMergeState(deepClone(initState));

  const mappedRekomended = (value: any[]) => {
    if (value?.length > 1) {
      return '';
    }

    return value
      ?.map(item => {
        if (item.toLowerCase().includes('belum')) {
          return false;
        }
        return true;
      })
      .join('');
  };

  const mappedListPhase = (value: any[]) => {
    return value?.map(item => item.id).join(',');
  };

  const setIsOpenSwipeUp = (value: boolean) => {
    setState({isOpenSwipeUp: value});
  };

  const setSwipeUpFilter = (value: 'Fase' | 'Status') => {
    setState({
      swipeUpFilter: value,
      isOpenSwipeUp: true,
    });
  };

  const setActiveFaseData = (value: any[]) => {
    // const _listPhaseId = value.map(item => item.id).join(',');
    setState({
      activeFaseData: value,
    });
    getListDaftarProyek(
      mappedListPhase(value),
      mappedRekomended(state.activeStatusData),
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
    getListDaftarProyek(mappedListPhase(state.activeFaseData), _listStatus);
  };

  const setFilterChip = (value: any[]) => {
    setState({
      filterChip: value,
    });
  };

  const onCardPress = (data?: IDaftarProyekPancasila) => {
    if (!data) {
      return;
    }
    const expandIndex = findIndexInExpandData(data);
    if (expandIndex == -1) {
      setListExpandData([...listExpandData, data]);
      return;
    }
    setListExpandData(listExpandData.filter(item => item.id !== data.id));
  };

  const findIndexInExpandData = (data?: IDaftarProyekPancasila) => {
    return listExpandData.findIndex(item => item.id === data?.id);
  };

  const onSubCardPress = (data: any) => {
    setState(initState);
    navigation.navigate('EbookScreen', {
      projectData: data,
      screen_type: `${service_type} pancasila`,
    });
  };

  useEffect(() => {
    if (!isFocused || state.listPhaseId || state.listStatus) {
      return;
    }
    getListDaftarProyek();
    getListPhase();
  }, [isFocused]);

  const getListDaftarProyek = async (phaseId?: any, isRecommend?: any) => {
    try {
      setState({isLoading: true});
      const data = await apiGet({
        url: URL_PATH.get_pancasila_daftar_proyek(phaseId, isRecommend),
      });
      setListDaftarProyek(data);
      setState({
        listPhaseId: phaseId || listPhaseId,
        listStatus: isRecommend || listStatus,
      });
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Error');
    } finally {
      setState({isLoading: false});
    }
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

  const {
    isLoading,
    isOpenSwipeUp,
    swipeUpFilter,
    filterChip,
    activeStatusData,
    activeFaseData,
    listStatus,
    listPhaseId,
  }: any = state;
  return {
    isLoading,
    isOpenSwipeUp,
    swipeUpFilter,
    filterData,
    filterChip,
    activeStatusData,
    activeFaseData,
    listPhase,
    listDaftarProyek,
    setIsOpenSwipeUp,
    setSwipeUpFilter,
    setActiveFaseData,
    setActiveStatusData,
    setFilterChip,
    isFaseFilter,
    onCardPress,
    onSubCardPress,
    onAturUlang,
    onTerapkan,
    findIndexInExpandData,
  };
};
export default useDaftarProyekTab;
