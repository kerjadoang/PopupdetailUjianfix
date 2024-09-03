import React, {useLayoutEffect, useMemo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import useLkpdTeacherHistory from './useLkpdTeacherHistory';
import {Header, MainText, MainView, SwipeUp} from '@components/atoms';
import SearchInput from '@components/atoms/SearchInput';
import CapsuleButtonFilter, {
  CapsuleButtonFilterProps,
} from '@components/atoms/CapsuleButtonFilter';
import CardLkpd from '../../../shared/components/CardLkpd';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import Colors from '@constants/colors';
import RobotEmpty from '@assets/svg/robot_empty_state.svg';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import SwipeUpDateFilter from '@components/atoms/SwipeUpDateFilter';
import {convertDate} from '@constants/functional';
import {LkpdTeacherHistoryDetailScreenParam} from 'type/screen';

const LkpdTeacherHistoryScreen = () => {
  const {
    navigation,
    navigateScreen,
    setState,
    isShowSwipeUpOption,
    teacherLkpdHistoryData,
    teacherHistoryLkpdSearch,
    setTeacherHistoryLkpdSearch,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    isShowSwipeupFase,
    showSwipeupFase,
    hideSwipeupFase,
    isShowSwipeupDate,
    showSwipeupDate,
    hideSwipeupDate,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    dateFilterType,
    setDateFilterType,
    mappedSubjectData,
    mappedPhaseData,
    onApplyFilterSubject,
    onApplyFilterPhase,
    onApplyFilterDate,
    onResetFilterSubject,
    onResetFilterPhase,
    onResetFilterDate,
    currentSelectedSubject,
    currentSelectedPhase,
    onEndReached,
    listPhaseClass,
  } = useLkpdTeacherHistory();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Riwayat LKPD'} />,
    });
  }, []);

  const parseDate = (date: IDatePicker) =>
    `${date.year}-${date.month}-${date.date}`;

  const capsuleButtonFilterData: CapsuleButtonFilterProps[] = useMemo(
    () => [
      {
        title: 'Fase',
        isSelected: currentSelectedPhase().length > 0,
        value:
          currentSelectedPhase()?.length === 1
            ? `${currentSelectedPhase()?.[0]?.name}`
            : currentSelectedPhase()?.length === listPhaseClass.length ||
              currentSelectedPhase()?.length === 0
            ? 'Fase'
            : `${currentSelectedPhase()?.length} Fase`,
        onPress: showSwipeupFase,
      },
      {
        title: 'Semua Mapel',
        isSelected: currentSelectedSubject().length > 0,
        value:
          currentSelectedSubject()?.length === 1
            ? `${currentSelectedSubject()?.[0]?.name}`
            : currentSelectedSubject()?.length === mappedSubjectData.length ||
              currentSelectedSubject()?.length === 0
            ? 'Semua mapel'
            : `${currentSelectedSubject()?.length} Mapel`,
        onPress: showSwipeupMapel,
      },
      {
        title: 'Semua tanggal',
        isSelected: dateFilterType === 'Pilih Tanggal',
        value:
          dateFilterType === 'Pilih Tanggal'
            ? `${convertDate(parseDate(dateFrom)).format(
                'DD/MM/YYYY',
              )} - ${convertDate(parseDate(dateTo)).format('DD/MM/YYYY')}`
            : 'Semua Tanggal',
        onPress: showSwipeupDate,
      },
    ],
    [currentSelectedPhase, currentSelectedSubject, dateFrom, dateTo],
  );

  const renderItem = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const renderSwipeUpOption = () => {
    return (
      <MainView
        flexDirection="row"
        gap={12}
        marginHorizontal={16}
        alignItems="center">
        <IconCopy />
        <TouchableOpacity>
          <MainText
            fontSize={16}
            color={Colors.dark.neutral100}
            lineHeight={24}>
            Duplikat Tugas
          </MainText>
        </TouchableOpacity>
      </MainView>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <MainView height={'100%'} justifyContent="center" alignItems="center">
        <RobotEmpty />
        <MainText
          type="Bold"
          paddingTop={12}
          paddingBottom={6}
          fontWeight="600"
          fontSize={16}
          color={Colors.dark.neutral100}>
          Belum Ada Riwayat LKPD
        </MainText>
        <MainText
          fontWeight="400"
          fontSize={14}
          color={Colors.dark.neutral60}
          textAlign="center">
          LKPD yang telah berakhir dan selesai dinilai akan tampil di sini.
        </MainText>
      </MainView>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.cardContainer}>
          <View>
            {/* MARK: START Search Input */}
            <SearchInput
              onChangeText={(val: string) => setTeacherHistoryLkpdSearch(val)}
              query={teacherHistoryLkpdSearch}
              onClear={() => setTeacherHistoryLkpdSearch('')}
            />
            {/* MARK: END Search Input */}

            {/* MARK: START Filter */}
            <FlatList
              renderItem={renderItem}
              data={capsuleButtonFilterData}
              style={styles.pv16}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            />
            {/* MARK: END Filter */}

            {/* MARK: START Card List */}
            <FlatList
              keyExtractor={(item, idx) => idx.toString()}
              data={teacherLkpdHistoryData?.list}
              style={{height: '100%'}}
              contentContainerStyle={{paddingTop: 16}}
              onEndReached={onEndReached}
              ListEmptyComponent={renderEmptyComponent()}
              ItemSeparatorComponent={() => <MainView height={16} />}
              ListFooterComponent={() => <MainView height={200} />}
              renderItem={(items: any) => {
                items = items?.item;
                return (
                  <CardLkpd
                    items={items}
                    userRole="GURU"
                    onPressMore={() => {
                      setState({isShowSwipeUpOption: true});
                    }}
                    onPressDetail={() => {
                      navigateScreen<LkpdTeacherHistoryDetailScreenParam>(
                        'LkpdTeacherHistoryDetailScreen',
                        {
                          id: items?.id ?? 0,
                        },
                      );
                    }}
                  />
                );
              }}
            />
            {/* MARK: END Card List */}
          </View>
        </View>
      </View>

      {/* MARK: START SwipeUp Mapel */}
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeupMapel}
        onClose={hideSwipeupMapel}
        children={
          <BaseSwipeUpFilter<Subject>
            defaultData={mappedSubjectData}
            currentData={currentSelectedSubject()}
            onApplyFilter={onApplyFilterSubject}
            onResetFilter={onResetFilterSubject}
          />
        }
      />
      {/* MARK: END SwipeUp Mapel */}

      {/* MARK: START SwipeUp Fase */}
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeupFase}
        onClose={hideSwipeupFase}
        children={
          <BaseSwipeUpFilter<IPhaseClass>
            defaultData={mappedPhaseData}
            currentData={currentSelectedPhase()}
            onApplyFilter={onApplyFilterPhase}
            onResetFilter={onResetFilterPhase}
          />
        }
      />
      {/* MARK: END SwipeUp Fase */}

      {/* MARK: START SwipeUp Date */}
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeupDate}
        onClose={hideSwipeupDate}
        children={
          <SwipeUpDateFilter
            onDateFromChoose={data => setDateFrom(data)}
            onDateToChoose={data => setDateTo(data)}
            defaultDateFrom={dateFrom}
            defaultDateTo={dateTo}
            onResetFilter={onResetFilterDate}
            handleSubmitAction={type => {
              setDateFilterType(type);
              onApplyFilterDate(
                type == 'Semua Tanggal' ? '' : parseDate(dateFrom),
                type == 'Semua Tanggal' ? '' : parseDate(dateTo),
              );
              hideSwipeupDate();
            }}
          />
        }
      />
      {/* MARK: END SwipeUp Date */}

      {/* MARK: START SwipeUp Option */}
      <SwipeUp
        visible={isShowSwipeUpOption}
        onClose={() => setState({isShowSwipeUpOption: false})}
        children={renderSwipeUpOption()}
      />
      {/* MARK: END SwipeUp Option */}
    </>
  );
};

export {LkpdTeacherHistoryScreen};
