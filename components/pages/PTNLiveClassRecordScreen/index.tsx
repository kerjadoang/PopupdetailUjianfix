import React, {useCallback, useMemo} from 'react';
import {View, Image, FlatList, Keyboard} from 'react-native';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import usePTNLiveClassRecord from './usePTNLiveClassRecord';
import {CapsuleButtonFilterProps, EmptyState, SwipeUp} from '@components/atoms';
import RecordSessionItem from './components/RecordSessionItem';
import LoadMoreButton from './components/LoadMoreButton';
import {styles} from './styles';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import SwipeUpDateFilter from '@components/atoms/SwipeUpDateFilter';
import {
  IPTNLiveClassRekamanFilter,
  IPTNType,
  IResponsePTNRecordSession,
} from './type';
import {PTNType} from './utils';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import SearchInput from '@components/atoms/SearchInput';
import dayjs from 'dayjs';

const PTNLiveClassRecordScreen: React.FC = () => {
  const {
    tempClassSessionRekaman,
    onShowRekaman,
    showMore,
    onShowMorePress,
    setDateFrom,
    setDateTo,
    dateFrom,
    dateTo,
    setShowFilterSwipeUp,
    showFilterSwipeUp,
    filterParams,
    setFilterParams,
    ptnSubjects,
    setSearchValue,
    searchValue,
    isError,
  } = usePTNLiveClassRecord();

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Tipe',
        isSelected: filterParams.type?.length != 0,
        value:
          filterParams.type?.length === 0 ||
          filterParams.type?.length == PTNType.length
            ? 'Semua Tipe'
            : filterParams.type?.length === 1
            ? filterParams.type?.[0].name
            : `${filterParams.type?.length} Tipe`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'TYPE',
          }));
        },
      },
      {
        id: 2,
        title: 'Semua Mapel',
        isSelected: filterParams.subjects?.length != 0,
        value:
          filterParams.subjects?.length === 0 ||
          filterParams.subjects?.length == 0
            ? 'Semua Mapel'
            : filterParams.subjects?.length === 1
            ? filterParams.subjects?.[0].name
            : `${filterParams.subjects?.length} Mapel`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'SUBJECT',
          }));
        },
      },
      {
        id: 3,
        title: 'Semua Tanggal',
        isSelected: !!filterParams.dateType,
        value:
          filterParams.dateType === 'Pilih Tanggal'
            ? `${dayjs(filterParams.dateStart).format('DD/MM/YYYY')} - ${dayjs(
                filterParams.dateEnd,
              ).format('DD/MM/YYYY')}`
            : filterParams.dateType,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'DATE',
          }));
        },
      },
    ],
    [filterParams],
  );

  const renderItemFilter = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const renderSwipeUpFilterContent = () => {
    switch (showFilterSwipeUp.type) {
      case 'TYPE':
        return (
          <BaseSwipeUpFilter<IPTNType>
            currentData={filterParams.type ?? []}
            defaultData={PTNType}
            onApplyFilter={types => {
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                type: types,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            onResetFilter={() => {
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                type: [],
              }));
            }}
          />
        );
      case 'DATE':
        return (
          <SwipeUpDateFilter
            onDateFromChoose={data => setDateFrom(data)}
            onDateToChoose={data => setDateTo(data)}
            filterDateType={filterParams.dateType}
            defaultDateFrom={dateFrom}
            defaultDateTo={dateTo}
            onResetFilter={() => {
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                dateStart: '',
                dateEnd: '',
                dateType: undefined,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            handleSubmitAction={type => {
              const parseDate = (date: IDatePicker) =>
                `${date.year}-${date.month}-${date.date}`;
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                dateStart: type == 'Semua Tanggal' ? '' : parseDate(dateFrom),
                dateEnd: type == 'Semua Tanggal' ? '' : parseDate(dateTo),
                dateType: type,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
          />
        );
      case 'SUBJECT':
        return (
          <BaseSwipeUpFilter<SubjectPtn>
            defaultData={ptnSubjects}
            currentData={filterParams.subjects ?? []}
            onApplyFilter={subjects => {
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                subjects: subjects,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            onResetFilter={() => {
              setFilterParams((prevState: IPTNLiveClassRekamanFilter) => ({
                ...prevState,
                subjects: [],
              }));
            }}
          />
        );
      default:
        break;
    }
  };

  const renderHeaderComponent = () => (
    <View key={'header'} style={{marginBottom: 12}}>
      <FlatList
        renderItem={renderItemFilter}
        data={capsuleButtonFilterData}
        style={{paddingVertical: 16}}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 8}}
        keyExtractor={(_, index) => index.toString()}
      />
      <SearchInput
        onClear={() => {
          setSearchValue('');
        }}
        placeholder="Cari"
        query={searchValue}
        onChangeText={setSearchValue}
        onSubmit={() => {
          setFilterParams(prev => ({...prev, search: searchValue}));
          Keyboard.dismiss();
        }}
      />
    </View>
  );

  const renderFooterComponent = () => {
    if (tempClassSessionRekaman.length == 0 || isError) {
      return <View />;
    }
    return <LoadMoreButton onPress={onShowMorePress} showMore={showMore} />;
  };

  const renderComponent = useCallback(
    ({item, index}: IFlatListItem<IResponsePTNRecordSession>) => {
      return (
        <RecordSessionItem
          onPress={() => onShowRekaman(item)}
          keys={index}
          item={item}
        />
      );
    },
    [],
  );

  return (
    <View style={{flex: 1, marginBottom: 40}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Rekaman Live Class'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.cardContainer}>
        {renderHeaderComponent()}
        <FlatList<IResponsePTNRecordSession>
          data={isError ? [] : tempClassSessionRekaman}
          ListEmptyComponent={
            <EmptyState
              title={'Belum Ada Rekaman Sesi Kelas'}
              subTitle={
                'Daftar rekaman sesi kelas yang telah selesai akan tampil di sini.'
              }
              type={'empty_sad'}
            />
          }
          renderItem={renderComponent}
          ListFooterComponent={renderFooterComponent}
          keyExtractor={data => data.ID?.toString() || '0'}
        />
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={showFilterSwipeUp.status}
        onClose={() => setShowFilterSwipeUp({status: false, type: ''})}
        height={500}
        children={renderSwipeUpFilterContent()}
      />
    </View>
  );
};

export {PTNLiveClassRecordScreen};
