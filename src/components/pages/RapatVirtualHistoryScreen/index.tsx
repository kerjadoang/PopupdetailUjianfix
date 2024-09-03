import {EmptyDisplay, MainView, SwipeUp} from '@components/atoms';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import {Header} from '@components/atoms/Header';
import SearchInput from '@components/atoms/SearchInput';
import {useLayoutEffect, useMemo} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  defaultParticipant,
  defaultStatus,
} from '../RapatVirtualTeacherScreen/utils';
import SwipeUpDateFilter from '@components/atoms/SwipeUpDateFilter';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import MaskotEmptyRapat from '@assets/svg/robot_empty_rapat.svg';
import {CardRapatVirtual} from '../RapatVirtualTeacherScreen/component';
import {styles} from './style';
import {useScreen} from './useScreen';
import Colors from '@constants/colors';

const RapatVirtualHistoryScreen = () => {
  const {
    navigation,
    list,
    showFilterSwipeUp,
    setShowFilterSwipeUp,
    filterParams,
    setFilterParams,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  } = useScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Riwayat Rapat Virtual" />,
    });
  }, [navigation]);

  const renderItemFilter = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: 'Semua tanggal',
        isSelected: !!filterParams.dateType,
        value: filterParams.dateType,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'DATE',
          }));
        },
      },
      {
        title: 'Semua peserta',
        isSelected: filterParams.participant?.length != 0,
        value:
          filterParams.participant?.length === defaultParticipant.length ||
          filterParams.participant?.length == 0
            ? 'Semua peserta'
            : filterParams.participant?.length === 1
            ? filterParams.participant?.[0].name
            : `${filterParams.participant?.length} peserta`,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'PARTICIPANT',
          }));
        },
      },
      {
        title: 'Semua status',
        isSelected: filterParams.status?.length != 0,
        value:
          filterParams.status?.length === defaultStatus('history').length - 1 ||
          filterParams.status?.length == 0
            ? 'Semua status'
            : filterParams.status?.[0].name,
        onPress: () => {
          setShowFilterSwipeUp(prevState => ({
            ...prevState,
            status: true,
            type: 'STATUS',
          }));
        },
      },
    ],
    [filterParams],
  );

  const renderSwipeUpFilterContent = () => {
    switch (showFilterSwipeUp.type) {
      case 'DATE':
        return (
          <SwipeUpDateFilter
            onDateFromChoose={data => setDateFrom(data)}
            onDateToChoose={data => setDateTo(data)}
            filterDateType={filterParams.dateType}
            defaultDateFrom={dateFrom}
            defaultDateTo={dateTo}
            onResetFilter={() => {
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                dateStart: '',
                dateEnd: '',
                dateType: undefined,
              }));
            }}
            handleSubmitAction={type => {
              const parseDate = (date: IDatePicker) =>
                `${date.year}-${date.month}-${date.date}`;
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                dateStart: type == 'Semua Tanggal' ? '' : parseDate(dateFrom),
                dateEnd: type == 'Semua Tanggal' ? '' : parseDate(dateTo),
                dateType: type,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
          />
        );
      case 'PARTICIPANT':
        return (
          <BaseSwipeUpFilter<RapatVirtualRole>
            defaultData={defaultParticipant}
            currentData={filterParams.participant ?? []}
            onApplyFilter={participants => {
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                participant: participants,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            onResetFilter={() => {
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                participant: [],
              }));
            }}
          />
        );
      case 'STATUS':
        return (
          <BaseSwipeUpFilter<RapatStatus>
            currentData={filterParams.status ?? []}
            defaultData={defaultStatus('history')}
            onlyOneItem={true}
            onApplyFilter={status => {
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                status: status,
              }));
              setShowFilterSwipeUp({status: false, type: ''});
            }}
            onResetFilter={() => {
              setFilterParams((prevState: RapatVirtualFilter) => ({
                ...prevState,
                status: [],
              }));
            }}
          />
        );
      default:
        break;
    }
  };

  const renderEmptyState = () => {
    if (list === null && filterParams?.search === '') {
      return (
        <MainView style={styles.contentCenter}>
          <EmptyDisplay
            imageSvg={<MaskotEmptyRapat width={100} height={100} />}
            title={'Belum Ada Riwayat Rapat Virtual'}
            desc={
              'Rapat Virtual yang sudah selesai atau dibatalkan akan tampil di sini.'
            }
          />
        </MainView>
      );
    }

    if (list === null && filterParams?.search !== '') {
      return (
        <MainView style={styles.contentCenter}>
          <EmptyDisplay
            imageSvg={<MaskotEmpty width={100} height={100} />}
            title={'Pencarian Tidak Ditemukan'}
            desc={`Hasil pencarian “${filterParams?.search}” nihil. \nCoba masukkan kata kunci lainnya!`}
          />
        </MainView>
      );
    }
  };

  return (
    <>
      <MainView style={styles.component} padding={16}>
        {/* START: Search Component */}
        <SearchInput
          onClear={() => setFilterParams({...filterParams, search: ''})}
          query={filterParams?.search || ''}
          onChangeText={function (text: string): void {
            setFilterParams({...filterParams, search: text});
          }}
        />
        {/* END: Search Component */}

        {/* START: Filter Component */}
        <MainView>
          <FlatList
            renderItem={renderItemFilter}
            data={capsuleButtonFilterData}
            style={{paddingVertical: 16}}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8}}
          />
        </MainView>
        {/* END: Filter Component */}

        {/* START: Card Component */}
        <MainView flexGrow={1} paddingBottom={16}>
          {list !== null && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingHorizontal: 16, marginBottom: 50}}>
              {list?.map((items: any, index: number) => {
                return (
                  <CardRapatVirtual
                    key={index}
                    data={items}
                    action={() =>
                      navigation.navigate('RapatVirtualTestCamerascreen', {
                        data: items,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          )}
        </MainView>
        {/* END: Card Component */}
      </MainView>

      {/* START: Empty Component */}
      <MainView flex={1} justifyContent="center" backgroundColor={Colors.white}>
        {renderEmptyState()}
      </MainView>
      {/* END: Empty Component */}

      {/* START: Swipe Up Filter Component */}
      <SwipeUp
        isSwipeLine={true}
        visible={showFilterSwipeUp.status}
        onClose={() => setShowFilterSwipeUp({status: false, type: ''})}
        height={500}
        children={renderSwipeUpFilterContent()}
      />
      {/* END: Swipe Up Filter Component */}
    </>
  );
};

export {RapatVirtualHistoryScreen};
