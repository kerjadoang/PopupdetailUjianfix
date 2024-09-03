/* eslint-disable react/no-unstable-nested-components */
import {Header, SwipeUp} from '@components/atoms';
import React, {useLayoutEffect} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {useHistoryExamScreenTeacher} from './useHistoryExamScreenTeacher';
import {styles} from './styles';
//search empty
import {EmptyState} from '@components/atoms';

import {CardTask} from './component/CardTask';
import {ButtonFilter} from '../HistoryAndRecordsScreen/components/ButtonFIlter';
import {ChildrenSwipeUpFilter} from './component/ChildrenSwipeUpFilter';
import {convertDate} from '@constants/functional';

const HistoryExamScreenTeacher = () => {
  const {
    navigation,
    SearchInput,
    search,
    setSearch,
    listMapel,
    mapelSelected,
    tipeSelected,
    tipe,
    date,
    setDate,
    setTime,
    valueDatePicker,
    setValueDatePicker,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    calendar,
    setCalendar,
    _handlerSetDate,
    setState,
    isShowDateFilter,
    setIsShowDateFilter,
    isShowMapelFilter,
    setIsShowMapelFilter,
    isShowTypeFilter,
    setIsShowTypeFilter,
    buttonCategory,
    setTipeSelected,
    selected,
    setSelected,
    setMapelSelected,
    list,
    __onEndReached,
    route,
  } = useHistoryExamScreenTeacher();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label="Riwayat Ujian" subLabel={route?.params?.id?.name} />
      ),
    });
  }, [navigation]);

  const renderChildrenSwipeUpTypeFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'tipe'}
        tipe={tipeSelected}
        setTipe={setTipeSelected}
        dualButton
        subTitle={'Tipe'}
        data={tipe}
        setIsShow={setIsShowTypeFilter}
        setSelected={setSelected}
        selected={selected}
      />
    );
  };

  const renderChildrenSwipeUpMapelFilter = () => {
    return (
      <ChildrenSwipeUpFilter
        type={'mapel'}
        mapel={mapelSelected}
        setMapel={setMapelSelected}
        dualButton
        subTitle={'Mata Pelajaran'}
        data={listMapel}
        setIsShow={setIsShowMapelFilter}
        setSelected={setSelected}
        selected={selected}
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
      />
    );
  };

  const EmptyContent = () => {
    return (
      <View style={styles.emptyContainer}>
        {selected.length > 0 && (list?.length === 0 || list === undefined) ? (
          <EmptyState
            title={'Hasil filter tidak ditemukan'}
            subTitle={'Coba atur ulang filter yang sudah Anda atur sebelumnya'}
            type={'empty_sad'}
          />
        ) : list?.length === 0 &&
          search !== null &&
          search !== undefined &&
          search !== '' ? (
          <EmptyState
            title={'Pencarian Tidak Ditemukan'}
            subTitle={`Hasil pencarian “${search}” nihil. \nCoba masukkan kata kunci lainnya!`}
            type={'empty_search'}
          />
        ) : (
          <EmptyState
            title={'Belum Ada Riwayat Ujian'}
            subTitle={
              'Ujian yang telah berakhir dan selesai dinilai akan tampil di sini.'
            }
            type={'empty_state'}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput
        query={search}
        onChangeText={function (text: string): void {
          setSearch(text);
        }}
        onClear={() => setSearch('')}
      />
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      <View>
        {list !== undefined && list?.length !== 0 ? (
          <FlatList
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            data={list}
            keyExtractor={(_, _id): any => _id}
            onEndReached={__onEndReached}
            onEndReachedThreshold={0.25}
            renderItem={({item}) => (
              <CardTask
                type={item?.service?.name || '-'}
                className={item?.class?.name}
                chapterNname={item?.title}
                subjectName={item?.subject?.name}
                processingTime={` ${convertDate(item?.start_time)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')} - ${convertDate(
                  item?.end_time,
                )
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}`}
                assessingTime={convertDate(item?.completed_at)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
                action={() => {
                  navigation.navigate('DetailTaskScreenTeacher', {
                    id: route?.params.id,
                    data: item,
                    isFromTeacher: true,
                    isFromLaporan: true,
                  });
                }}
              />
            )}
          />
        ) : (
          EmptyContent()
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
      </View>
    </View>
  );
};
export {HistoryExamScreenTeacher};
