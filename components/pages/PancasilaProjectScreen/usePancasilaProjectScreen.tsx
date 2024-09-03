import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const LIMIT_OFFSET = {
  limit: 10,
  page: 0,
};

const usePancasilaProjectScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PancasilaProjectScreen'>>();
  const TabLabel = {
    list: 'Projek Berlangsung',
    history: 'Riwayat Projek',
  };

  const [tabActive, setTabActive] = useState<string>(TabLabel.list);
  const Tab = createMaterialTopTabNavigator();
  const handleOnPressTab: any = (tabName: string) => {
    setTabActive(tabName);
  };

  const [riwayatPagination, setRiwayatPagination] = useState(LIMIT_OFFSET);
  const [listPagination, setListPagination] = useState(LIMIT_OFFSET);

  const pancasilaProjectStore: any = useSelector(
    (store: RootState) => store.getPancasilaProject,
  );

  const [filterRecommend, setFilterRecommend] = useState([]);
  const [filterHistory, setFilterHistory] = useState([]);
  const [isShowFilterRecommend, setIsShowFilterRecommend] =
    useState<boolean>(false);
  const [isShowFilterHistory, setIsShowFilterHistory] =
    useState<boolean>(false);
  const [selected, setSelected] = useState([]);

  const buttonCategoryRecommend = [
    {
      id: 1,
      name: 'Status',
      value:
        filterRecommend?.length === 0
          ? null
          : filterRecommend?.length < 2
          ? filterRecommend?.map((obj: any) => obj?.name)
          : 'Semua Status',
      onPress: () => {
        setIsShowFilterRecommend(true);
      },
      isSelected:
        filterRecommend !== null && filterRecommend?.length !== 0
          ? true
          : false,
    },
  ];

  const buttonCategoryHistory = [
    {
      id: 1,
      name: 'Status',
      value:
        filterHistory?.length === 0
          ? null
          : filterHistory?.length < 2
          ? filterHistory?.map((obj: any) => obj?.name)
          : 'Semua Status',
      onPress: () => {
        setIsShowFilterHistory(true);
      },
      isSelected:
        filterHistory !== null && filterHistory?.length !== 0 ? true : false,
    },
  ];

  const dispatch = useDispatch();

  const __onEndReachedRiwayat = () => {
    const {historyNextPage, isLoadingHistory} = pancasilaProjectStore;

    if (historyNextPage && !isLoadingHistory) {
      setRiwayatPagination(prevState => ({
        ...prevState,
        page: riwayatPagination.page + 1,
      }));
    }
  };

  const __onEndReachedList = () => {
    const {nextPage, loading} = pancasilaProjectStore;

    if (nextPage && !loading) {
      setListPagination(prevState => ({
        ...prevState,
        page: listPagination.page + 1,
      }));
    }
  };

  return {
    navigation,
    tabActive,
    setTabActive,
    Tab,
    TabLabel,
    handleOnPressTab,
    pancasilaProjectStore,
    __onEndReachedList,
    __onEndReachedRiwayat,
    dispatch,
    riwayatPagination,
    listPagination,
    filterRecommend,
    setFilterRecommend,
    isShowFilterRecommend,
    setIsShowFilterRecommend,
    filterHistory,
    setFilterHistory,
    isShowFilterHistory,
    setIsShowFilterHistory,
    selected,
    setSelected,
    setListPagination,
    buttonCategoryRecommend,
    buttonCategoryHistory,
  };
};

export default usePancasilaProjectScreen;
