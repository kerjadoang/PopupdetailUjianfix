/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  CapsuleButtonFilterProps,
  Header,
  MainText,
  MainView,
  PopUp,
  SwipeUp,
} from '@components/atoms';
import React, {useLayoutEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
// routing
import {Button} from '@components/atoms';

//search empty
import {EmptyDisplay} from '@components/atoms';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import MaskotEmptyRapat from '@assets/svg/robot_empty_rapat.svg';
import IconHistory from '@assets/svg/iconToHistory.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconDelete from '@assets/svg/ic24_trash_red.svg';
import RobotHapus from '@assets/svg/ic_robot_hapus.svg';

import {useRapatVirtualTeacherScreen} from './useRapatVirtualTeacherScreen';
import {CardRapatVirtual} from './component';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import SwipeUpDateFilter from '@components/atoms/SwipeUpDateFilter';
import {defaultParticipant, defaultStatus} from './utils';
import BaseSwipeUpFilter from '../../atoms/BaseSwipeUpFilter';
const windowWidth = Dimensions.get('window').width;

const RapatVirtualTeacherScreen = () => {
  const {
    list,
    SearchInput,
    filterParams,
    setFilterParams,
    navigation,
    setShowFilterSwipeUp,
    showFilterSwipeUp,
    setDateFrom,
    setDateTo,
    dateFrom,
    dateTo,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
    dataItem,
    setDataItem,
    cancelVirtualMeeting,
  } = useRapatVirtualTeacherScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Rapat Virtual"
          iconRight={<IconHistory />}
          onPressIconRight={() =>
            navigation.navigate('RapatVirtualHistoryScreen')
          }
        />
      ),
    });
  }, [navigation]);

  const EmptyState = () => {
    if (list === null && filterParams?.search === '') {
      return (
        <View style={styles.contentCenter}>
          <EmptyDisplay
            imageSvg={<MaskotEmptyRapat width={100} height={100} />}
            title={'Belum Ada Jadwal Rapat Virtual'}
            desc={'Jadwal Rapat Virtual akan tampil di sini.'}
          />
        </View>
      );
    }

    if (list === null && filterParams?.search !== '') {
      return (
        <View style={styles.contentCenter}>
          <EmptyDisplay
            imageSvg={<MaskotEmpty width={100} height={100} />}
            title={'Pencarian Tidak Ditemukan'}
            desc={`Hasil pencarian “${filterParams?.search}” nihil. \nCoba masukkan kata kunci lainnya!`}
          />
        </View>
      );
    }
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
          filterParams.status?.length ===
            defaultStatus('scheduled').length - 1 ||
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

  const renderItemFilter = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

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
            defaultData={defaultStatus('scheduled')}
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

  const renderMoreSwipeUp = () => {
    return (
      <MainView padding={16} gap={24}>
        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            navigation.navigate('RapatVirtualCreateScreen', {
              type: 'edit',
              data: dataItem,
            });
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconEdit />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Ubah Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            setShowConfirmCancel(true);
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconDelete />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Batalkan Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>
      </MainView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          onClear={() => setFilterParams({...filterParams, search: ''})}
          query={filterParams?.search || ''}
          onChangeText={function (text: string): void {
            setFilterParams({...filterParams, search: text});
          }}
        />
        <View>
          <FlatList
            renderItem={renderItemFilter}
            data={capsuleButtonFilterData}
            style={{paddingVertical: 16}}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8}}
          />
        </View>

        {list !== null && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 16, marginBottom: 50}}>
            {list?.map((items: any, index: number) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('RapatVirtualDetailScreen', {
                      data: items,
                    })
                  }>
                  <CardRapatVirtual
                    data={items}
                    action={() =>
                      navigation.navigate('RapatVirtualTestCamerascreen', {
                        data: items,
                      })
                    }
                    actionMore={() => {
                      setDataItem(items);
                      setShowMoreSwipeUp(true);
                    }}
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <View>{EmptyState()}</View>

        <View style={styles.containerBottomShadow}>
          <Button
            label={'+ Buat Rapat Baru'}
            action={() =>
              navigation.navigate('RapatVirtualCreateScreen', {
                type: 'create',
              })
            }
            fontSize={16}
          />
        </View>
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={showFilterSwipeUp.status}
        onClose={() => setShowFilterSwipeUp({status: false, type: ''})}
        height={500}
        children={renderSwipeUpFilterContent()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={showMoreSwipeUp}
        onClose={() => setShowMoreSwipeUp(false)}
        height={500}
        children={renderMoreSwipeUp()}
      />

      <PopUp
        show={showConfirmCancel}
        Icon={RobotHapus}
        title="Batalkan Rapat Virtual"
        desc="Apakah Anda yakin akan membatalkan rapat virtual?"
        titleCancel="Kembali"
        actionCancel={() => {
          setShowConfirmCancel(false);
        }}
        titleConfirm="Batalkan"
        actionConfirm={() => {
          cancelVirtualMeeting(dataItem?.id);
        }}
      />
    </>
  );
};
export {RapatVirtualTeacherScreen};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 5,
    marginRight: 5,
  },
  btnFilterActive: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
    gap: 5,
  },
  btnFilterText: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  btnFilterTextActive: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  containerBottomShadow: {
    position: 'absolute',
    bottom: 10,
    width: windowWidth,
    textAlign: 'center',
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.dark.neutral40,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
});
