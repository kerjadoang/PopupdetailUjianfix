/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import styles from './style';
import IconSearch from '@assets/svg/ic_search_blue.svg';
import IconClose from '@assets/svg/close_x.svg';
import IconClose40 from '@assets/svg/ic40_x_close_round_white.svg';
import IconCalendar from '@assets/svg/ic_calendar_blue.svg';
import IconReset from '@assets/svg/close_x.svg';
import Colors from '@constants/colors';
import {useAnnouncementManageHistoryScreen} from './utils';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {ButtonFilter, CardListItem, TabContentItemNotFound} from './components';
import {_handlerConvertDatePicker} from '@constants/functional';
import {fetchGetRole} from '@redux';
import {
  Button,
  DatePicker,
  Header,
  InputText,
  SwipeUp,
} from '@components/atoms';
import dayjs from 'dayjs';

const AnnouncementManageHistoryScreen: FC = () => {
  const dispatch = useDispatch();
  const {listRole} = useSelector((state: any) => state);

  const {
    navigation,
    isLoading,
    setIsLoading,
    searchValue,
    setSearchValue,
    getSearchValue,
    isShowFilterDate,
    setIsShowFilterDate,
    isFilterDateAll,
    setIsFilterDateAll,
    isCalendar,
    setIsCalendar,
    valueDatePicker,
    setValueDatePicker,
    announcements,
    announcementPagination,
    setAnnouncementPagination,
    datePickerFrom,
    datePickerUntil,
    setCalendarType,
    valueFilterDate,
    setValueFilterDate,
    isShowFilterReceiver,
    setIsShowFilterReceiver,
    filterReceiversTemp,
    setFilterReceiversTemp,
    filterReceivers,
    setFilterReceivers,
    isShowFilterStatus,
    setIsShowFilterStatus,
    filterStatus,
    setFilterStatus,
    filterStatusTemp,
    setFilterStatusTemp,
    //
    __getAnnouncements,
    __handleSetDate,
    __handleResetFilterDate,
    __handleResetFilterAll,
    __handleOnEndReached,
  } = useAnnouncementManageHistoryScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: __renderHeader,
    });

    dispatch(fetchGetRole());
  }, []);

  useLayoutEffect(() => {
    setIsLoading(true);

    const params: any = {
      status: filterStatus || 'history',
      offset: announcementPagination.offset,
      limit: announcementPagination.limit,
      search: getSearchValue,
      userType: filterReceivers.join(','),
    };

    if (valueFilterDate) {
      Object.assign(params, {
        dateStart: dayjs(datePickerFrom)
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
        dateEnd: dayjs(datePickerUntil)
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
      });
    }

    __getAnnouncements(params).finally(() => setIsLoading(false));
  }, [announcementPagination]);

  useLayoutEffect(() => {
    setAnnouncementPagination({offset: 0, limit: 10});
  }, [getSearchValue, valueFilterDate, filterReceivers, filterStatus]);

  useLayoutEffect(() => {
    if (filterReceivers.length > 0) {
      setFilterReceiversTemp(filterReceivers);
    }

    if (filterStatus) {
      setFilterStatusTemp(filterStatus);
    }
  }, [isShowFilterReceiver, isShowFilterStatus]);

  const __renderHeader = useCallback(
    () => (
      <View style={{backgroundColor: Colors.white}}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <Header label="Riwayat Pengumuman" backgroundColor="transparent" />
      </View>
    ),
    [],
  );

  const __renderFilterTanggal = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={valueFilterDate ? true : false}
          onPress={() => setIsShowFilterDate(true)}
          title={valueFilterDate ? valueFilterDate : 'Semua Tanggal'}
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowFilterDate}
          onClose={() => setIsShowFilterDate(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              {!isCalendar ? (
                <>
                  <Text style={styles.swipeUpItemTitle}>Filter</Text>

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 16}}
                    contentContainerStyle={styles.swipeUpItemContentSwipe}>
                    {['Semua Tanggal', 'Pilih Tanggal'].map((value, index) => {
                      const active = isFilterDateAll === index;

                      return (
                        <Pressable
                          key={index}
                          onPress={() => setIsFilterDateAll(index)}
                          style={[
                            styles.swipeUpItemChipContainer,
                            {
                              backgroundColor: active
                                ? Colors.primary.base
                                : Colors.primary.light3,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.textRegular,
                              {
                                color: active
                                  ? Colors.white
                                  : Colors.primary.base,
                              },
                            ]}>
                            {value}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>

                  {!isFilterDateAll ? null : (
                    <View style={{flexDirection: 'row', marginTop: 16, gap: 8}}>
                      <View style={{flex: 1}}>
                        <Text style={[styles.textRegular, {marginBottom: 8}]}>
                          Dari
                        </Text>

                        <Pressable
                          onPress={() => {
                            setCalendarType('from');
                            setIsCalendar(true);
                          }}>
                          <View style={styles.dateContainerText}>
                            <Text style={styles.textBold}>
                              {datePickerFrom
                                ? _handlerConvertDatePicker(datePickerFrom)
                                : '-'}
                            </Text>
                            <IconCalendar />
                          </View>
                        </Pressable>
                      </View>

                      <View style={{flex: 1}}>
                        <Text style={[styles.textRegular, {marginBottom: 8}]}>
                          Sampai
                        </Text>

                        <Pressable
                          onPress={() => {
                            setCalendarType('until');
                            setIsCalendar(true);
                          }}>
                          <View style={styles.dateContainerText}>
                            <Text style={styles.textBold}>
                              {datePickerUntil
                                ? _handlerConvertDatePicker(datePickerUntil)
                                : '-'}
                            </Text>
                            <IconCalendar />
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  )}

                  <View
                    style={[
                      styles.swipeUpItemContentSwipe,
                      {gap: 12, marginTop: 27},
                    ]}>
                    <Button
                      label="Atur Ulang"
                      action={() => {
                        setIsFilterDateAll(0);
                      }}
                      style={{flex: 1}}
                      outline={true}
                    />

                    <Button
                      label="Terapkan"
                      action={() => {
                        if (!isFilterDateAll) {
                          __handleResetFilterDate();
                        } else if (datePickerFrom && datePickerUntil) {
                          setValueFilterDate(
                            `${_handlerConvertDatePicker(
                              datePickerFrom,
                            )} - ${_handlerConvertDatePicker(datePickerUntil)}`,
                          );
                        }

                        setIsShowFilterDate(false);
                      }}
                      style={{flex: 1}}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <TouchableOpacity
                      onPress={() => setIsCalendar(false)}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: -6.5,
                        zIndex: 1,
                      }}>
                      <IconClose40 />
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.textBold,
                        {
                          fontSize: 20,
                          lineHeight: 28,
                          letterSpacing: 1,
                          textAlign: 'center',
                        },
                      ]}>
                      Pilih Tanggal
                    </Text>
                  </View>

                  <View style={{height: 128, marginVertical: 16}}>
                    <DatePicker
                      selected={valueDatePicker}
                      onChange={setValueDatePicker}
                    />
                  </View>

                  <Button
                    label="Pilih"
                    action={__handleSetDate}
                    style={{marginTop: 16}}
                  />
                </>
              )}
            </View>
          }
        />
      </View>
    ),
    [isShowFilterDate, isFilterDateAll, isCalendar, __handleSetDate],
  );

  const __setDataFilterPenerima = useCallback(
    (id: number) => {
      if (filterReceiversTemp.includes(id)) {
        setFilterReceiversTemp((prevState: any) =>
          prevState.filter((item: any) => item !== id),
        );
      } else {
        setFilterReceiversTemp((prevState: any) => [...prevState, id]);
      }
    },
    [filterReceiversTemp],
  );

  const __renderFilterPenerima = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={filterReceivers.length > 0}
          onPress={() => setIsShowFilterReceiver(true)}
          title={
            filterReceivers.length === listRole?.data?.length ||
            filterReceivers.length === 0
              ? 'Semua Penerima'
              : `${filterReceivers.length} Penerima`
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowFilterReceiver}
          onClose={() => setIsShowFilterReceiver(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.swipeUpItemTitle}>Filter</Text>
              <Text style={styles.swipeUpItemText}>Penerima</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginTop: 11}}
                contentContainerStyle={styles.swipeUpItemContentSwipe}>
                {listRole?.data?.map((item: any) => {
                  const active = filterReceiversTemp.includes(item?.id);

                  return (
                    <Pressable
                      key={item?.id}
                      onPress={() => __setDataFilterPenerima(item?.id)}
                      style={[
                        styles.swipeUpItemChipContainer,
                        {
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {item?.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View
                style={[
                  styles.swipeUpItemContentSwipe,
                  {gap: 12, marginTop: 27},
                ]}>
                <Button
                  label="Atur Ulang"
                  action={() => {
                    if (filterReceivers.length > 0) {
                      setFilterReceiversTemp(filterReceivers);
                    } else {
                      setFilterReceiversTemp([]);
                    }
                  }}
                  style={{flex: 1}}
                  outline={true}
                />

                <Button
                  label="Terapkan"
                  action={() => {
                    setFilterReceivers(filterReceiversTemp);
                    setIsShowFilterReceiver(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </View>
    ),
    [isShowFilterReceiver, filterReceiversTemp],
  );

  const __renderFilterStatus = useCallback(
    () => (
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ButtonFilter
          isDataExists={filterStatus ? true : false}
          onPress={() => setIsShowFilterStatus(true)}
          title={
            filterStatus
              ? `${filterStatus === 'finish' ? 'Selesai' : 'Dihapus'}`
              : 'Semua Status'
          }
        />

        <SwipeUp
          isSwipeLine={true}
          visible={isShowFilterStatus}
          onClose={() => setIsShowFilterStatus(false)}
          height={500}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.swipeUpItemTitle}>Filter</Text>
              <Text style={styles.swipeUpItemText}>Status</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginTop: 11}}
                contentContainerStyle={styles.swipeUpItemContentSwipe}>
                {['finish', 'deleted'].map((value: any, id: number) => {
                  const active = filterStatusTemp === value;

                  return (
                    <Pressable
                      key={id}
                      onPress={() => setFilterStatusTemp(value)}
                      style={[
                        styles.swipeUpItemChipContainer,
                        {
                          backgroundColor: active
                            ? Colors.primary.base
                            : Colors.primary.light3,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: active ? Colors.white : Colors.primary.base,
                          },
                        ]}>
                        {value === 'finish' ? 'Selesai' : 'Dihapus'}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View
                style={[
                  styles.swipeUpItemContentSwipe,
                  {gap: 12, marginTop: 27},
                ]}>
                <Button
                  label="Atur Ulang"
                  action={() => setFilterStatusTemp('')}
                  style={{flex: 1}}
                  outline={true}
                />

                <Button
                  label="Terapkan"
                  action={() => {
                    setFilterStatus(filterStatusTemp);
                    setIsShowFilterStatus(false);
                  }}
                  style={{flex: 1}}
                />
              </View>
            </View>
          }
        />
      </View>
    ),
    [isShowFilterStatus, filterStatusTemp],
  );

  const __renderSearchAndFilter = useCallback(
    () => (
      <View style={{paddingHorizontal: 16}}>
        <InputText
          bottom={16}
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={searchValue}
          maxLength={60}
          onChangeText={value => setSearchValue(value.trimStart())}
          leftIcon={IconSearch}
          rightIcon={searchValue && IconClose}
          onPressIcon={() => setSearchValue('')}
          placeholder="Cari"
        />

        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {valueFilterDate || filterStatus || filterReceivers.length > 0 ? (
              <TouchableOpacity
                onPress={__handleResetFilterAll}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32 / 2,
                  backgroundColor: Colors.primary.light3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <IconReset />
              </TouchableOpacity>
            ) : null}

            {__renderFilterTanggal()}
            {__renderFilterPenerima()}
            {__renderFilterStatus()}
          </ScrollView>
        </View>
      </View>
    ),
    [searchValue, __renderFilterTanggal],
  );

  const isDataSearchNotFound = announcements?.length === 0 && getSearchValue;
  const isDataFilterNotFound = announcements?.length === 0 && valueFilterDate;

  const isDataNotFound =
    !isDataSearchNotFound &&
    !isDataFilterNotFound &&
    announcements?.length !== 0;

  return (
    <>
      <View style={styles.container}>
        {__renderSearchAndFilter()}

        {isDataNotFound ? (
          <FlatList
            data={announcements}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, id): any => id}
            onEndReached={__handleOnEndReached}
            renderItem={({item, index}) => (
              <CardListItem isFirstItem={index === 0} data={item} />
            )}
          />
        ) : isDataSearchNotFound ? (
          <TabContentItemNotFound
            isSearch
            title="Pencarian Tidak Ditemukan"
            description={`Hasil pencarian "${getSearchValue?.toUpperCase()}" nihil.\nCoba masukkan kata kunci lainnya!`}
          />
        ) : isDataFilterNotFound ? (
          <TabContentItemNotFound
            isSearch
            isFilter
            title="Hasil filter tidak ditemukan"
            description={
              'Coba atur ulang filter yang\nsudah Anda atur sebelumnya'
            }
          />
        ) : (
          <TabContentItemNotFound
            title="Belum Ada Riwayat Pengumuman"
            description={
              'Pengumuman yang sudah selesai atau\ndihapus akan tampil di sini.'
            }
          />
        )}
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export {AnnouncementManageHistoryScreen};
