/* eslint-disable react-hooks/exhaustive-deps */
import SearchInput from '@components/atoms/SearchInput';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import Colors from '@constants/colors';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import FilterSwipeUp from '../LMSTeacherClassSessionScreen/components/FilterSwipeUp';
import globalProvider from '@services/global/provider';
import {
  IListScheduledAndNeedToBeCheckFilter,
  IListScheduledAndNeedToBeCheckResponseData,
  IRombelData,
  LMSTeacherClassSessionFilter,
} from '@services/lms/type';
import {MoreMenu, MenuItemButtonType} from '@components/atoms';
import {
  _handlerCapitalizeFirstLetter,
  dismissLoading,
  showLoading,
} from '@constants/functional';
import UjianCardItem from './components/UjianCardItem';
import {useBatalkanUjian, useLMSTeacherGetExamsSchedule} from '@services/lms';
import ResetFilterIcon from '@assets/svg/ic16_x_grey.svg';
import {Button, EmptyDisplay, PopUp} from '@components/atoms';
import MaskotIconEmptyState from '@assets/svg/maskot_18.svg';
import EditIcon from '@assets/svg/ic24_edit_2.svg';
import CopyIcon from '@assets/svg/ic24_copy_blue.svg';
import TrashIcon from '@assets/svg/ic24_trash_red.svg';
import MaskotDeleteIcon from '@assets/svg/maskot_3.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ParamList} from 'type/screen';

const initialFilter = {
  rombel_data: [],
  subject: [],
  service_data: [],
  page: 1,
  limit: 16,
};

const DijadwalkanTab: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DijadwalkanTab'>>();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [showMoreMenu, setShowMoreMenu] = useState<{
    status: boolean;
    examData: IListScheduledAndNeedToBeCheckResponseData;
  }>({status: false, examData: {}});
  const flatListRef = useRef<FlatList>(null);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [doneDelete, setDoneDelete] = useState<boolean>(false);
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
    limit: 15,
  });

  const {
    mutate,
    data: listExamsData,
    nextPage,
    isLoading,
  } = useLMSTeacherGetExamsSchedule();
  const {mutate: batalkanUjian, loading: loadingBatalkanUjian} =
    useBatalkanUjian();
  const isFiltered =
    filterSubmitted?.rombel_data?.length > 0 ||
    filterSubmitted?.subject?.length > 0 ||
    filterSubmitted?.service_data!.length > 0;

  const renderItem = ({
    item,
  }: {
    item: IListScheduledAndNeedToBeCheckResponseData;
  }) => {
    return (
      <UjianCardItem
        data={item}
        onPressShowMore={() => setShowMoreMenu({status: true, examData: item})}
        section="dijadwalkan"
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

  // useEffect(() => {
  //   if (visibleFeedback) {
  //     setTimeout(() => {
  //       setVisibleFeedback({status: false, message: '', type: ''});
  //     }, 5000);
  //   }
  // }, [visibleFeedback]);

  const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
    page: 1,
    limit: 15,
    rombel_id: filterSubmitted.rombel_data?.map(
      rombelId => rombelId.rombel_class_school_id,
    ),
    subject_id: filterSubmitted.subject?.map(subjectIds => subjectIds.id),
    service_id: filterSubmitted.service_data?.map(serviceIds => serviceIds.id),
    status: ['scheduled'],
    search: query,
  };

  useEffect(() => {
    if (isFocused) {
      mutate(trasnformFilter);
    }
  }, [filterSubmitted, isFocused]);

  useEffect(() => {
    mutate(trasnformFilter);
  }, [query]);

  useEffect(() => {
    if (doneDelete) {
      mutate(trasnformFilter);
    }
  }, [doneDelete]);

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

  const onClearSearch = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setQuery('');
    setFilterSubmitted(prevState => ({
      ...prevState,
      page: 1,
    }));
  };

  const onSubmitFilter = () => {
    setShowFilterSwipeUp(prevState => ({...prevState, status: false}));
    setFilterSubmitted(prevState => ({
      ...prevState,
      ...filter,
      page: 1,
      limit: 15,
    }));
    if (listExamsData?.data && listExamsData?.data?.length > 0) {
      flatListRef.current?.scrollToIndex?.({index: 0, animated: false});
    }
  };

  const menuData: MenuItemButtonType[] = [
    {
      icon: <EditIcon />,
      label: 'Ubah Jadwal Ujian',
      onPress: () => {
        setShowMoreMenu(prevState => ({...prevState, status: false}));
        navigation.navigate('CreateJadwalUjianScreen', {
          schedule_id: showMoreMenu.examData?.id,
          isEdit: true,
        });
      },
    },
    {
      icon: <CopyIcon />,
      label: 'Duplikat Ujian',
      onPress: async () => {
        setShowMoreMenu(prevState => ({...prevState, status: false}));
        navigation.navigate('CreateJadwalUjianScreen', {
          schedule_id: showMoreMenu.examData?.id,
          isDuplicate: true,
        });
      },
    },
    {
      icon: <TrashIcon />,
      label: 'Batalkan Ujian',
      onPress: () => setVisibleDelete(true),
    },
  ];

  const onBatalkanUjian = async () => {
    showLoading();
    try {
      await batalkanUjian(showMoreMenu.examData?.id);
      setVisibleDelete(false);
      setShowMoreMenu({status: false, examData: {}});
      mutate(trasnformFilter);
      setDoneDelete(true);
      dismissLoading();
      Toast.show({
        type: 'success',
        text1: 'Ujian berhasil dibatalkan.',
      });
    } catch (e: any) {
      setVisibleDelete(false);
      mutate(trasnformFilter);
      setShowMoreMenu({status: false, examData: {}});
      setDoneDelete(true);
      dismissLoading();
      Toast.show({
        type: 'error',
        text1: e?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
    }
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
        page: filterSubmitted.page! + filterSubmitted.limit!,
      }));
    }
  };

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
        ref={flatListRef}
        style={{paddingBottom: 10}}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReach}
        ListEmptyComponent={
          <EmptyDisplay
            title={'Belum Ada Ujian Dijadwalkan'}
            desc="Daftar ujian yang telah dijadwalkan
        akan tampil di sini."
            btnLabel="Jadwalkan Ujian"
            titleStyle={{fontSize: 16, textAlign: 'center'}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
            action={() =>
              navigation.navigate('CreateJadwalUjianScreen', {
                schedule_id: undefined,
              })
            }
            imageSvg={<MaskotIconEmptyState />}
          />
        }
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
        visible={showMoreMenu.status}
        menus={menuData}
        onClose={() => setShowMoreMenu({status: false, examData: {}})}>
        <PopUp
          Icon={MaskotDeleteIcon}
          title="Batalkan Ujian"
          show={visibleDelete}
          desc={`Apakah Anda yakin untuk membatalkan ${showMoreMenu.examData?.title}? Notifikasi akan dikirim ke murid.`}
          close={() => setVisibleDelete?.(false)}
          titleCancel={'Batalkan'}
          titleConfirm={'Kembali'}
          actionCancel={onBatalkanUjian}
          actionConfirm={() => setVisibleDelete?.(false)}
          disabledActionCancel={loadingBatalkanUjian}
          disabledActionConfirm={loadingBatalkanUjian}
        />
      </MoreMenu>
      {listExamsData?.data && listExamsData?.data?.length > 0 && (
        <View style={{padding: 16, backgroundColor: Colors.white}}>
          <Button
            label="Jadwalkan Ujian"
            action={() =>
              navigation.navigate('CreateJadwalUjianScreen', {
                schedule_id: undefined,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

export default DijadwalkanTab;
