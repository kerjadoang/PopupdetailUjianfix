import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import usePRProjectTaskHistory from './usePRProjectTaskHistory';
import {Header, SwipeUp} from '@components/atoms';
import {styles} from './styles';
import SearchHeader from './components/SearchHeader';
import {ButtonFilter} from './components/ButtonFIlter';
import {ChildrenSwipeUpFilter} from './components/ChildrenSwipeUpFilter';
import CardListItem from './components/CardListItem';
import RobotEmptyState from '@assets/svg/robot_empty_state.svg';
import RobotEmptySearch from '@assets/svg/robot_empty_search.svg';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import IconClose from '@assets/svg/ic32_close_round.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {IDataDuplicateTask} from 'type/screen';
import {convertDate} from '@constants/functional';
export const dataType = [
  {
    id: 1,
    name: 'PR',
  },
  {
    id: 2,
    name: 'Projek',
  },
  {
    id: 3,
    name: 'Tugas',
  },
];
const PRProjectTaskHistoryScreen = () => {
  const {
    navigation,
    buttonCategory,
    isShowClassFilter,
    isShowDateFilter,
    isShowMapelFilter,
    isShowTypeFilter,

    setIsShowClassFilter,
    setIsShowDateFilter,
    setIsShowMapelFilter,
    setIsShowTypeFilter,
    resetFilter,

    selected,
    classes,
    mapel,
    type,

    setClasses,
    setMapel,
    setDate,
    setType,
    setSelected,

    date,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    _handlerSetDate,
    calendar,
    setCalendar,
    setTime,
    valueDatePicker,
    setValueDatePicker,

    query,
    setQuery,
    setQueryVal,
    searchInputRef,
    setRiwayatPagination,
    filterMapel,
    filterClass,
    setState,
    PrProjectHistoryStore,
    __onEndReachedRiwayat,

    duplicateTask,
    isLoading,
    isFromReport,
    reportName,
    route,
  } = usePRProjectTaskHistory();

  const renderChildrenSwipeUpTypeFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'tipe'}
        tipe={type}
        setTipe={setType}
        dualButton
        subTitle={'Tipe'}
        data={dataType}
        setIsShow={setIsShowTypeFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setRiwayatPagination}
      />
    );
  };

  const renderChildrenSwipeUpMapelFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'mapel'}
        mapel={mapel}
        setMapel={setMapel}
        dualButton
        subTitle={'Mata Pelajaran'}
        data={filterMapel}
        setIsShow={setIsShowMapelFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setRiwayatPagination}
      />
    );
  };

  const renderChildrenSwipeUpClassFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'class'}
        classes={classes}
        setClasses={setClasses}
        dualButton
        subTitle={'Kelas'}
        data={filterClass}
        setIsShow={setIsShowClassFilter}
        setSelected={setSelected}
        selected={selected}
        setPage={setRiwayatPagination}
      />
    );
  };

  const renderChildrenSwipeUpDateFilter = () => {
    const data = [
      {
        id: 1,
        name: 'Semua Tanggal',
      },
      {
        id: 2,
        name: 'Pilih Tanggal',
      },
    ];

    return (
      <ChildrenSwipeUpFilter
        type={'date'}
        date={date}
        setDate={setDate}
        dualButton
        data={data}
        isShow={isShowDateFilter}
        setIsShow={setIsShowDateFilter}
        setSelected={setSelected}
        selected={selected}
        valueDatePicker={valueDatePicker}
        setValueDatePicker={setValueDatePicker}
        datePickerConvertFrom={datePickerConvertFrom}
        datePickerConvertUntil={datePickerConvertUntil}
        datePickerFrom={datePickerFrom}
        datePickerUntil={datePickerUntil}
        calendar={calendar}
        setCalendar={setCalendar}
        _handlerSetDate={_handlerSetDate}
        setTime={setTime}
        setState={setState}
        setPage={setRiwayatPagination}
      />
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Riwayat PR, Projek & Tugas'}
          subLabel={isFromReport ? reportName : null}
          onPressIconLeft={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  const _renderNotFound = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotEmptyState width={100} height={100} />
        <Text style={styles.notFoundLabel}>
          Belum Ada Riwayat PR/Projek/Tugas
        </Text>
        <Text style={styles.notFoundText}>
          PR/Projek/Tugas yang telah berakhir dan selesai dinilai akan tampil di
          sini.
        </Text>
      </View>
    );
  };

  const _renderNotFoundSearch = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotEmptySearch width={100} height={100} />
        <Text style={styles.notFoundLabel}>Pencarian Tidak Ditemukan</Text>
        <Text style={styles.notFoundText}>
          Hasil pencarian "{query}" nihil. Coba masukkan kata kunci lainnya!
        </Text>
      </View>
    );
  };

  const _renderNotFoundFilter = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.notFoundLabel}>Hasil filter tidak ditemukan</Text>
        <Text style={styles.notFoundText}>
          Coba atur ulang filter yang sudah Anda atur sebelumnya
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!PrProjectHistoryStore?.data &&
      selected?.length === 0 &&
      query === '' ? (
        _renderNotFound()
      ) : (
        <>
          <SearchHeader
            query={query}
            searchInputRef={searchInputRef}
            setQuery={setQuery}
            setQueryVal={setQueryVal}
            navigation={() => {
              setQuery('');
            }}
            setRiwayatPagination={setRiwayatPagination}
          />
          <View style={styles.BtnContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selected?.length > 0 ? (
                <TouchableOpacity onPress={() => resetFilter()}>
                  <IconClose width={32} height={32} />
                </TouchableOpacity>
              ) : null}

              {buttonCategory.map((item: any, index: number) => {
                return (
                  <ButtonFilter
                    title={item.name}
                    key={index}
                    onPress={item.onPress}
                    isSelected={item.isSelected}
                    value={item.value}
                  />
                );
              })}
            </ScrollView>
          </View>
          {PrProjectHistoryStore?.data?.length !== 0 ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: 3, paddingBottom: 16}}
              showsVerticalScrollIndicator={false}
              data={PrProjectHistoryStore?.data}
              keyExtractor={(_, _id): any => _id}
              onEndReached={__onEndReachedRiwayat}
              onEndReachedThreshold={0.25}
              renderItem={({item}) => (
                <CardListItem
                  id={item.id}
                  navigation={navigation}
                  category={item?.type}
                  rombelName={item?.rombel_class_school?.name}
                  mapel={item?.subject?.name}
                  title={item?.title}
                  givenDate={`${convertDate(item?.time_start).format(
                    'ddd, D MMM YYYY • hh:mm',
                  )} - ${convertDate(item?.time_finish).format(
                    'ddd, D MMM YYYY • hh:mm',
                  )} `}
                  collectionDate={convertDate(item?.time_finish).format(
                    'ddd, D MMM YYYY • hh:mm',
                  )}
                  studentInfo={item?.student_info}
                  type="DIJADWALKAN"
                  buttonTitle="Detail"
                  buttonOnPress={() => {
                    if (isFromReport) {
                      navigation.navigate('DetailTaskScreen', {
                        id: route?.params.id,
                        data: item,
                      });
                    } else {
                      navigation.navigate('TaskDetailTeacherScreen', {
                        idHistory: item?.id,
                      });
                    }
                  }}
                  buttonOnPressDuplicate={() => {
                    duplicateTask(item?.id).then((res: IDataDuplicateTask) => {
                      navigation.navigate('LMSTeacherTaskCreateScreen', {
                        duplicateTask: res,
                        isFrom: 'TaskScreen',
                      });
                    });
                  }}
                />
              )}
            />
          ) : !PrProjectHistoryStore?.data && selected.length > 0 ? (
            _renderNotFoundFilter()
          ) : !PrProjectHistoryStore?.data && query !== '' ? (
            _renderNotFoundSearch()
          ) : (
            _renderNotFound()
          )}
        </>
      )}

      <SwipeUp
        isSwipeLine={true}
        visible={isShowTypeFilter}
        onClose={() => {
          setIsShowTypeFilter(false);
        }}
        height={200}
        children={renderChildrenSwipeUpTypeFilter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowMapelFilter}
        onClose={() => {
          setIsShowMapelFilter(false);
        }}
        height={200}
        children={renderChildrenSwipeUpMapelFilter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowDateFilter}
        onClose={() => {
          setIsShowDateFilter(false);
        }}
        height={500}
        children={renderChildrenSwipeUpDateFilter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowClassFilter}
        onClose={() => {
          setIsShowClassFilter(false);
        }}
        height={500}
        children={renderChildrenSwipeUpClassFilter()}
      />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {PRProjectTaskHistoryScreen};
