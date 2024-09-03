import React, {FC, useMemo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  Button,
  CapsuleButtonFilterProps,
  MainText,
  MainView,
  SwipeUp,
} from '@components/atoms';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import SearchInput from '@components/atoms/SearchInput';
import CardLkpd from '@features/IKM/shared/components/CardLkpd';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconTrash from '@assets/svg/ic24_trash_red.svg';
import Colors from '@constants/colors';
import EmptyComponent from '../EmptyComponent';
import useDijadwalkanTeacherLkpd from './useDijadwalkanTeacherLkpd';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import IconPlus from '@assets/svg/ic24_plus_round.svg';
import {CreateLkpdScreenParam} from 'type/screen';

type Props = {};

const DijadwalkanTabScreen: FC<Props> = ({}) => {
  const {
    navigateScreen,
    teacherLkpdSearch,
    setTeacherLkpdSearch,
    teacherLkpdScheduleData,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    isShowSwipeupFase,
    showSwipeupFase,
    hideSwipeupFase,
    listPhaseClass,
    mappedSubjectData,
    mappedPhaseData,
    onApplyFilterSubject,
    onApplyFilterPhase,
    onResetFilterSubject,
    onResetFilterPhase,
    currentSelectedSubject,
    currentSelectedPhase,
    onEndReached,
    isShowSwipeUpOption,
    setState,
    swipeUpData,
    onDeleteLembarKerja,
  } = useDijadwalkanTeacherLkpd();

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
    ],
    [currentSelectedPhase, currentSelectedSubject],
  );

  const renderItem = ({item}: any) => {
    return <CapsuleButtonFilter {...item} />;
  };

  const renderSwipeUpOption = () => {
    const rowItems = [
      {
        icon: <IconEdit />,
        label: 'Edit Tugas',
        action: () => {
          navigateScreen<CreateLkpdScreenParam>('CreateLkpdScreen', {
            mode: 'EDIT',
            task_id: swipeUpData.id,
          });
          setState({isShowSwipeUpOption: false, swipeUpData: undefined});
        },
      },
      {
        icon: <IconCopy />,
        label: 'Duplikat Tugas',
        action: () => {
          navigateScreen<CreateLkpdScreenParam>('CreateLkpdScreen', {
            mode: 'DUPLICATE',
            task_id: swipeUpData.id,
          });
          setState({isShowSwipeUpOption: false, swipeUpData: undefined});
        },
      },
      {
        icon: <IconTrash />,
        label: 'Hapus Tugas',
        action: () => {
          onDeleteLembarKerja(swipeUpData);
          setState({isShowSwipeUpOption: false, swipeUpData: undefined});
        },
      },
    ];

    return (
      <MainView gap={16}>
        {rowItems?.map((item: any, index: any) => {
          return (
            <MainView
              key={index}
              flexDirection="row"
              gap={12}
              marginHorizontal={16}
              alignItems="center">
              {item?.icon}
              <TouchableOpacity onPress={item?.action}>
                <MainText
                  fontSize={16}
                  color={Colors.dark.neutral100}
                  lineHeight={24}>
                  {item?.label}
                </MainText>
              </TouchableOpacity>
            </MainView>
          );
        })}
      </MainView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {/* MARK: START Search Input */}
        <SearchInput
          onChangeText={(val: string) => setTeacherLkpdSearch(val, 'Schedule')}
          query={teacherLkpdSearch}
          onClear={() => setTeacherLkpdSearch('', 'Schedule')}
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
          data={teacherLkpdScheduleData?.list}
          keyExtractor={(item, idx) => idx.toString()}
          style={{height: '100%'}}
          contentContainerStyle={{
            paddingTop: 16,
          }}
          onEndReached={onEndReached}
          ListEmptyComponent={() => {
            return <EmptyComponent type="dijadwalkan" />;
          }}
          ItemSeparatorComponent={() => <MainView height={16} />}
          ListFooterComponent={() => <MainView height={200} />}
          renderItem={({item, index}) => {
            return (
              <CardLkpd
                key={index}
                items={item}
                userRole="GURU"
                isDijadwalkan={true}
                onPressMore={() => {
                  setState({isShowSwipeUpOption: true, swipeUpData: item});
                }}
                onPressDetail={() => {}}
              />
            );
          }}
        />
        {/* MARK: END Card List */}
      </View>

      {/* MARK: START Footer */}
      {teacherLkpdScheduleData?.list !== undefined ? (
        <MainView
          width={WINDOW_WIDTH}
          position="absolute"
          bottom={0}
          padding={16}
          backgroundColor={Colors.white}
          style={styles.shadowFooter}>
          <Button
            label="Buat Lembar Kerja"
            iconLeft={<IconPlus />}
            action={() => navigateScreen('CreateLkpdScreen')}
          />
        </MainView>
      ) : null}
      {/* MARK: END Footer */}

      {/* MARK: START SwipeUp Mapel */}
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeupMapel}
        onClose={hideSwipeupMapel}
        children={
          <BaseSwipeUpFilter<IKMSubject>
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

      {/* MARK: START SwipeUp Option */}
      <SwipeUp
        visible={isShowSwipeUpOption}
        onClose={() =>
          setState({isShowSwipeUpOption: false, swipeUpData: undefined})
        }
        children={renderSwipeUpOption()}
      />
      {/* MARK: END SwipeUp Option */}
    </>
  );
};

export default DijadwalkanTabScreen;
