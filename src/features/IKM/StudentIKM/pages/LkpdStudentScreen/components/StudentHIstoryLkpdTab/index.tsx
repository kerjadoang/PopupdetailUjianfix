import React, {FC} from 'react';
import {FlatList} from 'react-native';
import CapsuleButtonFilter from '@components/atoms/CapsuleButtonFilter';
import CardLkpd from '@features/IKM/shared/components/CardLkpd';
import useStudentHistoryLkpdTab from './useStudentHistoryLkpdTab';
import {EmptyState, MainView, SwipeUp} from '@components/atoms';
import SwipeUpLkpdStudent from '../SwipeUpLkpdStudent';
import BaseSwipeUpFilter from '@components/atoms/BaseSwipeUpFilter';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

type Props = {
  route: any;
};

const StudentHistoryLkpdTab: FC<Props> = () => {
  const {
    isSwipeUpShow,
    swipeUpType,
    toggleSwipeUp,
    swipeUpData,
    hideSwipeUp,
    lkpdHistoryData,
    currentSelectedSubject,
    onApplyFilter,
    onResetFilter,
    mappedSubjectData,
    isShowSwipeupMapel,
    showSwipeupMapel,
    hideSwipeupMapel,
    onEndReached,
    lkpdSearchText,
  } = useStudentHistoryLkpdTab();
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
        data={lkpdHistoryData.list}
        keyExtractor={(item, idx) => idx.toString()}
        onEndReached={onEndReached}
        style={{height: '100%'}}
        contentContainerStyle={{paddingTop: 16}}
        ItemSeparatorComponent={() => <MainView height={16} />}
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
                title="Belum Ada Riwayat Lembar Kerja"
                type="empty_state"
                subTitle={
                  'Lembar kerja yang sudah dikerjakan \n akan tampil disini'
                }
              />
            )}
          </MainView>
        }
        ListFooterComponent={<MainView height={120} />}
        renderItem={({item, index}) => {
          return (
            <CardLkpd
              key={index}
              userRole="MURID"
              items={item}
              isPerluDiperiksa={false}
              onPressMore={() => {}}
              onPressDetail={() => {
                toggleSwipeUp({
                  type: item.status as SwipeUpLKPDType,
                  data: item,
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
              hideSwipeUp();
              if (swipeUpType === 'done') {
                return;
              }
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
            currentData={currentSelectedSubject()}
            defaultData={mappedSubjectData}
            onApplyFilter={onApplyFilter}
            onResetFilter={onResetFilter}
          />
        }
      />
    </MainView>
  );
};

export default StudentHistoryLkpdTab;
