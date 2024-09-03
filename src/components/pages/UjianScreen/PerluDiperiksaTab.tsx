/* eslint-disable react-hooks/exhaustive-deps */
import SearchInput from '@components/atoms/SearchInput';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, FlatList, ActivityIndicator, Keyboard} from 'react-native';
import Colors from '@constants/colors';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import FilterSwipeUp from '../LMSTeacherClassSessionScreen/components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {
  IListScheduledAndNeedToBeCheckFilter,
  IRombelData,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {MoreMenu, MenuItemButtonType} from '@components/atoms';
import {_handlerCapitalizeFirstLetter} from '@constants/functional';
import UjianCardItem from './components/UjianCardItem';
import {useLMSTeacherGetExamsSchedule} from '@services/lms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetFilterIcon from '@assets/svg/ic16_x_grey.svg';
import {Button, EmptyDisplay} from '@components/atoms';
import MaskotIconEmptyState from '@assets/svg/maskot_18.svg';
import CopyIcon from '@assets/svg/ic24_copy_blue.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';

const initialFilter = {
  rombel_data: [],
  subject: [],
  service_data: [],
  page: 1,
  limit: 16,
};

const PerluDiperiksaTab: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PerluDiperiksaTab'>>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [showFilterSwipeUp, setShowFilterSwipeUp] = useState<{
    status: boolean;
    type: keyof LMSTeacherClassSessionFilter | '';
  }>({status: false, type: ''});
  const [initFilter, setInitFilter] = useState<{
    rombel_data: IRombelData[] | [];
    subject: IBaseSubject[] | [];
    service_data: IBaseService[] | [];
  }>({
    rombel_data: [],
    subject: [],
    service_data: [],
  });
  // selected filter in swipe up
  const [filter, setFilter] = useState<
    Omit<LMSTeacherClassSessionFilter, 'type' | 'platform' | 'chapter'>
  >({
    rombel_data: [],
    subject: [],
    service_data: [],
    page: 1,
    limit: 15,
  });
  // selected filter after submitted in swipe up
  const [filterSubmitted, setFilterSubmitted] = useState<
    Omit<LMSTeacherClassSessionFilter, 'type' | 'platform' | 'chapter'>
  >({
    rombel_data: [],
    subject: [],
    service_data: [],
    page: 1,
    limit: 10,
  });

  const [examId, setExamId] = useState<any>(null);

  const {
    mutate,
    data: listExamsData,
    nextPage,
    isLoading,
  } = useLMSTeacherGetExamsSchedule();

  const isFiltered =
    filterSubmitted?.rombel_data?.length > 0 ||
    filterSubmitted?.subject?.length > 0 ||
    filterSubmitted?.service_data!.length > 0;
  const isFocus = useIsFocused();

  const renderItem = ({item}: any) => {
    return (
      <UjianCardItem
        data={item}
        onPressCheckDetail={() =>
          navigation.navigate('ExamDetailGuruScreen', {exam_id: item.id})
        }
        onPressShowMore={() => {
          setExamId(item?.id);
          setShowMoreMenu(true);
        }}
        section="perlu_diperiksa"
      />
    );
  };
  const renderItemFilterCapsule = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  useEffect(() => {
    const getInitFilter = async () => {
      let res = await Promise.all([
        await globalProvider.getAllRombel(),
        await globalProvider.getAllSubject(),
        await globalProvider.getAllServices(),
      ]);
      setInitFilter({
        rombel_data: res[0].data?.data ?? [],
        subject: res[1].data?.data ?? [],
        service_data: res[2].data?.data ?? [],
      });
    };
    getInitFilter();
  }, []);

  useEffect(() => {
    if (isFocus) {
      const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
        page: filterSubmitted.page,
        limit: filterSubmitted.limit,
        rombel_id: filterSubmitted.rombel_data?.map(
          rombelId => rombelId.rombel_class_school_id,
        ),
        subject_id: filterSubmitted.subject?.map(subjectIds => subjectIds.id),
        service_id: filterSubmitted.service_data?.map(
          serviceIds => serviceIds.id,
        ),
        status: ['done', 'on_progress'],
        search: query,
      };
      mutate(trasnformFilter);
    }
  }, [filterSubmitted, isFocus]);

  useEffect(() => {
    const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
      page: 1,
      limit: 15,
      rombel_id: filterSubmitted.rombel_data?.map(
        rombelId => rombelId.rombel_class_school_id,
      ),
      subject_id: filterSubmitted.subject?.map(subjectIds => subjectIds.id),
      service_id: filterSubmitted.service_data?.map(
        serviceIds => serviceIds.id,
      ),
      status: ['done', 'on_progress'],
      search: query,
    };
    mutate(trasnformFilter);
  }, [query]);

  const onChangeFilter = (data: IRombelData | IBaseSubject | string) => {
    const filterData = {...filter};
    switch (showFilterSwipeUp.type) {
      case 'rombel_data':
        const dataRombel = data as IRombelData;
        const dataIsExist = filterData.rombel_data.some(
          rombel =>
            rombel.rombel_class_school_id === dataRombel.rombel_class_school_id,
        );
        if (dataIsExist) {
          filterData.rombel_data = filterData.rombel_data.filter(
            item =>
              item.rombel_class_school_id !== dataRombel.rombel_class_school_id,
          );
        } else {
          filterData.rombel_data = [...filter.rombel_data, dataRombel];
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

      case 'service_data':
        const dataService = data as IBaseService;
        const serviceIsExist = filterData.service_data?.some(
          rombel => rombel.id === dataService.id,
        );
        if (serviceIsExist) {
          filterData.service_data = filterData.service_data?.filter(
            item => item.id !== dataService.id,
          );
        } else {
          filterData.service_data = [...filter.service_data!, dataService];
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
      case 'rombel_data':
        filterData.rombel_data = [];
        break;
      case 'subject':
        filterData.subject = [];
        break;
      case 'service_data':
        filterData.service_data = [];
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
      case 'rombel_data':
        filterData.rombel_data = initFilter.rombel_data;
        break;
      case 'subject':
        filterData.subject = initFilter.subject;
        break;
      case 'service_data':
        filterData.service_data = initFilter.service_data;
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
      page: 1,
      limit: 15,
    }));
    flatListRef.current?.scrollToIndex?.({index: 0, animated: false});
  };

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: 'Semua kelas',
        isSelected: filterSubmitted.rombel_data.length > 0,
        value:
          filter.rombel_data?.length === 0
            ? undefined
            : filterSubmitted.rombel_data?.length < 2 &&
              filterSubmitted.rombel_data?.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.rombel_data
                  .map(item => item.rombel_class_school_name)
                  .join(''),
              )
            : `${filterSubmitted.rombel_data?.length} Kelas`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'rombel_data',
          }));
        },
      },
      {
        title: 'Semua mapel',
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
        title: 'Semua tipe',
        isSelected: filterSubmitted.service_data!.length > 0,
        value:
          filter.service_data?.length === 0
            ? undefined
            : filterSubmitted.service_data!.length < 2 &&
              filterSubmitted.service_data!.length > 0
            ? _handlerCapitalizeFirstLetter(
                filterSubmitted.service_data!.map(item => item.name).join(''),
              )
            : `${filterSubmitted.service_data?.length} Tipe`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'service_data',
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
        page: filterSubmitted.page! + 1,
      }));
    }
  };

  const onClearSearch = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setQuery('');
    setFilterSubmitted(prevState => ({
      ...prevState,
      page: 1,
    }));
  };

  const menuData: MenuItemButtonType[] = [
    {
      icon: <CopyIcon />,
      label: 'Duplikat Jadwal Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        navigation.navigate('CreateJadwalUjianScreen', {
          schedule_id: examId,
          isDuplicate: true,
        });
      },
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <SearchInput
        onClear={onClearSearch}
        placeholder="Cari"
        query={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => {
          setQuery(searchQuery);
          Keyboard.dismiss();
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
        {isFiltered && (
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
      <FlatList
        renderItem={renderItem}
        data={listExamsData?.data}
        style={{paddingBottom: 10}}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyDisplay
            title={'Belum Ada Ujian Diperiksa'}
            desc="Daftar ujian yang perlu diperiksa
        akan tampil di sini."
            btnLabel="Jadwalkan Ujian"
            titleStyle={{fontSize: 16, textAlign: 'center'}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
            action={() => {
              navigation.navigate('CreateJadwalUjianScreen', {
                schedule_id: undefined,
              });
            }}
            imageSvg={<MaskotIconEmptyState />}
          />
        }
        ListFooterComponent={
          isLoading && listExamsData?.data ? <ActivityIndicator /> : null
        }
        onEndReached={onEndReach}
        onEndReachedThreshold={1.0}
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
      <MoreMenu
        height={100}
        visible={showMoreMenu}
        menus={menuData}
        onClose={() => setShowMoreMenu(false)}
      />
      {listExamsData?.data && listExamsData?.data?.length > 0 && (
        <View style={{padding: 16, backgroundColor: Colors.white}}>
          <Button
            label="Jadwalkan Ujian"
            action={() => {
              navigation.navigate('CreateJadwalUjianScreen', {
                schedule_id: undefined,
              });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PerluDiperiksaTab;
