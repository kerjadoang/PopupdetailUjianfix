/* eslint-disable react-hooks/exhaustive-deps */
import SearchInput from '@components/atoms/SearchInput';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View, FlatList} from 'react-native';
import Colors from '@constants/colors';
import RobotEmptySearch from '@assets/svg/robot_empty_search.svg';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import FilterSwipeUp from '../LMSTeacherClassSessionScreen/components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {
  ILKSHistoryListFilter,
  IRombelData,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {_handlerCapitalizeFirstLetter} from '@constants/functional';
import {useLMSLKSHistory} from '@services/lms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetFilterIcon from '@assets/svg/ic16_x_grey.svg';
import {EmptyDisplay, Header} from '@components/atoms';
import MaskotIconEmptyState from '@assets/svg/maskot_18.svg';
import useDebounce from '@hooks/useDebounce';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import LKSCardItem from './components/LKSCardItem';
import {StackNavigationProp} from '@react-navigation/stack';

const initialFilter = {
  subject: [],
  chapter: [],
  page: 0,
  limit: 15,
};

const LKSListScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LKSListScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'LKSListScreen'>>();
  const {class_id} = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: keyof LMSTeacherClassSessionFilter | '';
  }>({status: false, type: ''});
  const [initFilter, setInitFilter] = useState<{
    subject: IBaseSubject[] | [];
    chapter: IBaseChapter[] | [];
  }>({
    chapter: [],
    subject: [],
  });
  // selected filter in swipe up
  const [filter, setFilter] = useState<
    Omit<
      LMSTeacherClassSessionFilter,
      'type' | 'platform' | 'service_data' | 'rombel_data'
    >
  >({
    subject: [],
    chapter: [],
    page: 0,
    limit: 15,
  });
  // selected filter after submitted in swipe up
  const [filterSubmitted, setFilterSubmitted] = useState<
    Omit<
      LMSTeacherClassSessionFilter,
      'type' | 'platform' | 'service_data' | 'rombel_data'
    >
  >({
    subject: [],
    chapter: [],
    page: 0,
    limit: 15,
  });

  const {
    mutate,
    data: listLKSHistory,
    nextPage,
    isLoading,
  } = useLMSLKSHistory();
  const query = useDebounce(searchQuery, 100);
  const isFiltered =
    filterSubmitted?.chapter?.length > 0 ||
    filterSubmitted?.subject?.length > 0 ||
    query?.length > 0;
  const isFilteredWithoutSearch =
    filterSubmitted?.chapter?.length > 0 ||
    filterSubmitted?.subject?.length > 0;
  const isResultEmptyAfterFitlter =
    isFiltered && (!listLKSHistory?.data || listLKSHistory?.data?.length < 1);

  const renderItem = ({item}: any) => {
    return (
      <LKSCardItem
        data={item}
        onPressCheckDetail={() =>
          navigation.navigate('DetailLKSScreen', {
            data: item,
          })
        }
      />
    );
  };
  const renderItemFilterCapsule = ({item}: any) => {
    return (
      <CapsuleButtonFilter
        {...item}
        disabled={
          item.title.includes('Bab') && filterSubmitted.subject?.length < 1
        }
      />
    );
  };

  useEffect(() => {
    const getInitFilter = async () => {
      let res = await Promise.all([await globalProvider.getAllSubject()]);
      setInitFilter(prevState => ({
        ...prevState,
        subject: res[0].data?.data ?? [],
      }));
    };
    getInitFilter();
  }, []);

  useEffect(() => {
    const getInitFilter = async () => {
      let chapterIds = filterSubmitted.subject?.map(item => item.id).join(',');
      let res = await globalProvider.getChapterListBySubject2(chapterIds);
      setInitFilter(prevState => ({
        ...prevState,
        chapter: res.data?.data ?? [],
      }));
    };
    if (filterSubmitted.subject.length > 0) {
      getInitFilter();
    }
  }, [filterSubmitted.subject]);

  useEffect(() => {
    const trasnformFilter: ILKSHistoryListFilter = {
      page: filterSubmitted.page,
      limit: filterSubmitted.limit,
      rombel_id: class_id?.id,
      subject_id: filterSubmitted?.subject?.map(subjectIds => subjectIds?.id),
      chapter_id: filterSubmitted?.chapter?.map(chapter => chapter?.id),
      search: query,
    };
    mutate(trasnformFilter);
  }, [filterSubmitted]);

  useEffect(() => {
    const trasnformFilter: ILKSHistoryListFilter = {
      page: 0,
      limit: 15,
      rombel_id: class_id?.id,
      subject_id: filterSubmitted?.subject?.map(subjectIds => subjectIds?.id),
      chapter_id: filterSubmitted?.chapter?.map(chapter => chapter?.id),
      search: query,
    };
    mutate(trasnformFilter);
  }, [query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="LKS"
          subLabel={class_id?.name}
          onPressIconRight={() => navigation.navigate('RiwayatUjianScreen')}
        />
      ),
    });
  }, []);

  const onChangeFilter = (
    data: IBaseChapter | IBaseSubject | string | IRombelData,
  ) => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'chapter':
        const dataRombel = data as IBaseChapter;
        const dataIsExist = filterData.chapter.some(
          chapter => chapter.id === dataRombel.id,
        );
        if (dataIsExist) {
          filterData.chapter = filterData.chapter.filter(
            item => item.id !== dataRombel.id,
          );
        } else {
          filterData.chapter = [...filter.chapter, dataRombel];
        }
        break;

      case 'subject':
        const dataSubject = data as IBaseSubject;
        const subjectIsExist = filterData.subject.some(
          rombel => rombel.id === dataSubject.id,
        );
        if (subjectIsExist) {
          filterData.subject = filterData.subject.filter(
            item => item.id !== dataSubject.id,
          );
        } else {
          filterData.subject = [...filter.subject, dataSubject];
        }
        break;

      default:
        break;
    }
    setFilter(filterData);
  };

  const onRemoveFilter = () => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'chapter':
        filterData.chapter = [];
        break;
      case 'subject':
        filterData.subject = [];
        break;
      default:
        break;
    }
    setFilter(filterData);
  };
  const onRemoveAllFilter = () => {
    setFilter(initialFilter);
    setFilterSubmitted(initialFilter);
  };
  const onSelectAllFilter = () => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'subject':
        filterData.subject = initFilter.subject;
        break;
      case 'chapter':
        filterData.chapter = initFilter.chapter;
        break;
      default:
        break;
    }
    setFilter(filterData);
  };

  const onShowFilterSwipeUp = (
    status: boolean,
    type: keyof typeof filter | '',
  ) => {
    setShowFilterSwipeUp(prevState => ({...prevState, status, type}));
  };

  const onSubmitFilter = () => {
    setShowFilterSwipeUp(prevState => ({...prevState, status: false}));
    setFilterSubmitted(prevState => ({
      ...prevState,
      ...filter,
      page: 0,
      limit: 15,
    }));
    flatListRef.current?.scrollToIndex?.({index: 0, animated: false});
  };

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: 'Semua Mapel',
        isSelected: filterSubmitted.subject.length > 0,
        value:
          filter.subject?.length === 0
            ? undefined
            : filterSubmitted.subject?.length < 2 &&
              filterSubmitted.subject?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.subject.map(item => item.name).join(''),
              )
            : `${filterSubmitted.subject?.length} Mapel`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'subject',
          }));
        },
      },
      {
        title: 'Semua Bab',
        isSelected: filterSubmitted.chapter.length > 0,
        value:
          filter.chapter?.length === 0
            ? undefined
            : filterSubmitted.chapter?.length < 2 &&
              filterSubmitted.chapter?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.chapter.map(item => item.name).join(''),
              )
            : `${filterSubmitted.chapter?.length} Bab`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'chapter',
          }));
        },
      },
    ],
    [filterSubmitted],
  );

  const onEndReach = () => {
    if (nextPage && !isLoading) {
      setFilterSubmitted(prevState => ({
        ...prevState,
        page: filterSubmitted.page! + filterSubmitted.limit!,
      }));
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {(isFiltered ||
        (listLKSHistory?.data && listLKSHistory?.data?.length > 0)) && (
        <>
          <SearchInput
            onClear={onClearSearch}
            placeholder="Cari"
            query={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
            {isFilteredWithoutSearch && (
              <TouchableOpacity
                onPress={onRemoveAllFilter}
                style={{marginLeft: 16}}>
                <ResetFilterIcon />
              </TouchableOpacity>
            )}
            <FlatList
              renderItem={renderItemFilterCapsule}
              data={capsuleButtonFilterData}
              style={{paddingVertical: 16}}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 8,
                paddingLeft: isFiltered ? 0 : 16,
                paddingRight: 16,
              }}
            />
          </View>
        </>
      )}
      <FlatList
        renderItem={renderItem}
        data={listLKSHistory?.data}
        style={{paddingBottom: 10}}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyDisplay
            title={
              isResultEmptyAfterFitlter
                ? 'Pencarian Tidak Ditemukan'
                : 'Belum Ada Riwayat LKS'
            }
            desc={
              isResultEmptyAfterFitlter
                ? `Hasil pencarian ${
                    searchQuery ? `"${searchQuery}"` : searchQuery
                  } nihil. Coba masukkan kata kunci lainnya!`
                : 'PR/Projek/Tugas yang telah berakhir dan selesai dinilai akan tampil di sini.'
            }
            titleStyle={{fontSize: 16, textAlign: 'center'}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
            imageSvg={
              isResultEmptyAfterFitlter ? (
                <RobotEmptySearch />
              ) : (
                <MaskotIconEmptyState />
              )
            }
          />
        }
        onEndReached={onEndReach}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 16,
          paddingBottom: 10,
          paddingTop: 5,
        }}
      />
      <FilterSwipeUp
        onChangeFilter={onChangeFilter}
        onRemoveFilter={onRemoveFilter}
        height={100}
        visible={showFilterSwipeUp.status}
        type={showFilterSwipeUp.type}
        onClose={() => {
          setFilter(prevState => ({...prevState, ...filterSubmitted}));
          onShowFilterSwipeUp(false, '');
        }}
        rombelAndSubject={initFilter}
        onSubmitFilter={onSubmitFilter}
        onSelectAll={onSelectAllFilter}
        filter={filter as LMSTeacherClassSessionFilter}
      />
    </View>
  );
};

export default LKSListScreen;
