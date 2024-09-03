import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import useHistoryAndRecordsScreen from './useHistoryAndRecordsScreen';
import IconSearch from '@assets/svg/ic24_search.svg';
import {ButtonFilter} from './components/ButtonFIlter';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, SwipeUp} from '@components/atoms';
import SearchHeader from './components/SearchHeader';
import {ChildrenSwipeUpFilter} from './components/ChildrenSwipeUpFilter';
import HistoryRecordCard from './components/HistoryRecordCard';
import {SCREEN_NAME} from '@constants/screen';
import ImageNotFound from '@assets/images/robot_empty_search.png';
import {styles} from './styles';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const HistoryAndRecordsScreen = ({route}: any) => {
  const {screenName} = route.params;
  const {
    navigation,
    setIsShowSearch,
    isShowSearch,
    isShowDateFilter,
    isShowMapelFilter,
    isShowTypeFilter,
    buttonCategory,
    setIsShowDateFilter,
    setIsShowMapelFilter,
    setIsShowTypeFilter,
    setQuery,
    setQueryVal,
    searchInputRef,
    query,
    mapel,
    setMapel,
    setMapelName,
    resetFilter,

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

    type,
    setType,
    selected,
    setSelected,
    allMapel,
    fetchMoreData,

    SessionClass,
    _handlerGoBack,
    isLoading,
    onPressDownload,
    listSelected,
    ready,
    submitDelete,
    progress,
  } = useHistoryAndRecordsScreen();

  const renderChildrenSwipeUpTypeFilter = () => {
    const data = [
      {
        id: 1,
        name: 'Rekaman',
      },
      {
        id: 2,
        name: 'Langsung (Zoom)',
      },
      {
        id: 3,
        name: 'Langsung (Google Meet)',
      },
    ];
    return (
      <ChildrenSwipeUpFilter
        type={'tipe'}
        tipe={type}
        setTipe={setType}
        dualButton
        subTitle={'Tipe'}
        data={data}
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
        mapel={mapel}
        setMapel={setMapel}
        setMapelName={setMapelName}
        dualButton
        subTitle={'Mata Pelajaran'}
        data={allMapel}
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        width: '100%',
      }}>
      {!isShowSearch ? (
        <Header
          label={'Riwayat & Rekaman'}
          subLabel={screenName}
          onPressIconLeft={_handlerGoBack}
          onPressIconRight={() => {
            setIsShowSearch(true);
          }}
          iconRight={
            <IconSearch width={24} height={24} color={Colors.primary.base} />
          }
        />
      ) : (
        <SearchHeader
          query={query}
          searchInputRef={searchInputRef}
          setQuery={setQuery}
          setQueryVal={setQueryVal}
          navigation={() => {
            setIsShowSearch(false);
          }}
        />
      )}
      <View style={styles.container}>
        <View style={styles.BtnContainer}>
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
          {SessionClass !== undefined && SessionClass?.length !== 0 ? (
            <FlatList
              contentContainerStyle={{
                height: SessionClass?.length
                  ? SessionClass.length * 250
                  : window.height,
              }}
              data={SessionClass}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.25}
              onEndReached={() => fetchMoreData()}
              keyExtractor={(_, _id): any => _id}
              renderItem={({item}) => (
                <HistoryRecordCard
                  data={item}
                  onPress={() => {
                    navigation.navigate(SCREEN_NAME.ClassSessionDetailScreen, {
                      id: item?.id,
                    });
                  }}
                  onPressDownload={item => onPressDownload(item)}
                  progress={progress}
                  ready={ready}
                  listSelected={listSelected}
                  submitDelete={item => submitDelete(item)}
                />
              )}
            />
          ) : (SessionClass?.length === 0 || SessionClass === undefined) &&
            selected.length > 0 ? (
            <View style={styles.searchNotFoundContainer}>
              <View style={styles.searchTipsOrNotFound}>
                <Image
                  source={ImageNotFound}
                  style={{width: 100, height: 100}}
                />
                <Text style={styles.searchTipsOrNotFoundTitle}>
                  Hasil Filter Tidak Ditemukan
                </Text>
                <View
                  style={{
                    width: '100%',
                    marginTop: 12,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    label="Tampilkan Semua Hasil"
                    action={() => {
                      resetFilter();
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (SessionClass?.length === 0 || SessionClass === undefined) &&
            query !== '' ? (
            <View style={styles.searchNotFoundContainer}>
              <View style={styles.searchTipsOrNotFound}>
                <Image
                  source={ImageNotFound}
                  style={{width: 100, height: 100}}
                />
                <Text style={styles.searchTipsOrNotFoundTitle}>
                  Pencarian Tidak ditemukan
                </Text>
                <Text
                  style={[
                    styles.searchTipsOrNotFoundDescription,
                    {color: Colors.dark.neutral80},
                  ]}>
                  Hasil pencarian "{query}" nihil. Coba masukkan kata kunci
                  lainnya!
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.searchNotFoundContainer}>
              <View style={styles.searchTipsOrNotFound}>
                <Image
                  source={ImageNotFound}
                  style={{width: 100, height: 100}}
                />
                <Text style={styles.searchTipsOrNotFoundTitle}>
                  Belum Ada Riwayat & Rekaman
                </Text>
                <Text style={styles.searchTipsOrNotFoundDescription}>
                  Daftar riwayat & rekaman akan tampil di sini.
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
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
      {isLoading ? <LoadingIndicator /> : null}
    </SafeAreaView>
  );
};

export {HistoryAndRecordsScreen};

const window = Dimensions.get('window');
