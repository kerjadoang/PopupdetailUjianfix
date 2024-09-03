import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {EmptyState, MainView, SwipeUp} from '@components/atoms';
import useStudentScheduleLkpdTab from './useStudentScheduleLkpdTab';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import CardLkpd from '@features/IKM/shared/components/CardLkpd';
import SwipeUpLkpdStudent from '../SwipeUpLkpdStudent';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import {LembarKerjaScreenParam} from 'type/screen';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {convertDate} from '@constants/functional';

type Props = {
  lkpd_id?: number;
};

const StudentScheduleLkpdTab: FC<Props> = ({lkpd_id}) => {
  const {
    isSwipeUpShow,
    swipeUpType,
    toggleSwipeUp,
    swipeUpData,
    hideSwipeUp,
    lkpdScheduleData,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    mappedSubjectData,
    onApplyFilter,
    onResetFilter,
    currentSelectedSubject,
    onEndReached,
    navigateScreen,
    lkpdSearchText,
  } = useStudentScheduleLkpdTab({lkpd_id});
  return (
    <MainView padding={16}>
      <MainView alignSelf="flex-start">
        <CapsuleButtonFilter
          isSelected={currentSelectedSubject().length != 0}
          title={
            currentSelectedSubject()?.length === 1
              ? `${currentSelectedSubject()?.[0]?.name}`
              : currentSelectedSubject()?.length === mappedSubjectData.length ||
                currentSelectedSubject()?.length === 0
              ? 'Semua mapel'
              : `${currentSelectedSubject()?.length} Mapel`
          }
          onPress={showSwipeupMapel}
        />
      </MainView>

      <FlatList
        data={lkpdScheduleData.list}
        keyExtractor={(item, idx) => idx.toString()}
        style={{height: '100%'}}
        onEndReached={onEndReached}
        contentContainerStyle={{paddingTop: 16}}
        ListEmptyComponent={
          <MainView height={WINDOW_HEIGHT * 0.65}>
            {lkpdSearchText.length != 0 ? (
              <EmptyState
                title="Pencarian Tidak Ditemukan"
                type="empty_search"
                subTitle={`Hasil pencarian “${lkpdSearchText?.toUpperCase?.()}” nihil. \nCoba masukkan kata kunci lainnya!`}
              />
            ) : (
              <EmptyState
                title="Belum Ada Lembar Kerja yang belum dikerjakan"
                type="empty_state"
                subTitle={
                  'Lembar kerja yang belum dikerjakan \n akan tampil disini'
                }
              />
            )}
          </MainView>
        }
        ItemSeparatorComponent={() => <MainView height={16} />}
        ListFooterComponent={<MainView height={120} />}
        renderItem={({item, index}) => {
          const isExpired = convertDate().isAfter(
            convertDate(item.time_finish),
          );
          return (
            <CardLkpd
              key={index}
              userRole="MURID"
              hideButton={isExpired}
              items={item}
              label="Kerjakan"
              onPressMore={() => {}}
              onPressDetail={() => {
                toggleSwipeUp({
                  data: item,
                  type: item.status as SwipeUpLKPDType,
                });
              }}
            />
          );
        }}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isSwipeUpShow}
        onClose={hideSwipeUp}
        children={
          <SwipeUpLkpdStudent
            type={swipeUpType}
            data={swipeUpData}
            onButtonPress={() => {
              if (swipeUpType !== 'schedule') {
                return;
              }
              navigateScreen<LembarKerjaScreenParam>('LembarKerjaScreen', {
                title: swipeUpData.title,
                id: swipeUpData.id,
                userRole: 'MURID',
              });
              hideSwipeUp();
            }}
          />
        }
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeupMapel}
        onClose={hideSwipeupMapel}
        children={
          <BaseSwipeUpFilter<Subject>
            defaultData={mappedSubjectData}
            currentData={currentSelectedSubject()}
            onApplyFilter={onApplyFilter}
            onResetFilter={onResetFilter}
          />
        }
      />
    </MainView>
  );
};

export default StudentScheduleLkpdTab;
