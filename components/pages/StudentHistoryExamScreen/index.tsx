import {View, Text, Pressable, FlatList, SafeAreaView} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import {NewGetAllExam} from '@constants/GetAllExam';
import {SwipeUp} from '@components/atoms';
import SwipeUpDoneCorrection from './components/SwipeUp';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useStudentHistoryExamSceen from './useStudentHistoryExamSceen';
import Colors from '@constants/colors';
import Robot from '@assets/svg/robot_empty_state.svg';
import SwipeUpBelumDinilai from './components/SwipeUpBelumDinilai';
import StudentUjianHistoryCard from './components/StudentUjianHistoryCard';

const StudentHistoryExamScreen = () => {
  const {
    navigation,
    handleSelect,
    selectedItem,
    getExamHistory,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryExam,
    swipeUpData,
    result,
    goToExplaination,
    __onEndReachedRiwayat,
    swipeUpType,
    loading,
    isDoneScoring,
    isFromTeacher,
  } = useStudentHistoryExamSceen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label={'Riwayat Ujian'} backgroundColor={Colors.white} />
      ),
    });
  }, [navigation]);

  const _renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Robot width={100} height={100} />
      <Text style={styles.emptyTitle}>Belum Ada Riwayat Ujian</Text>
      <Text style={styles.emptySubTitle}>
        {selectedItem === 1
          ? 'Ujain yang telah berakhir akan tampil di sini.'
          : selectedItem === 2
          ? 'Ujian yang telah dinilai guru akan tampil di sini.'
          : 'Ujian yang sedang dalam proses pemeriksaan akan tampil di sini.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.capsuleContainer}>
        {NewGetAllExam.map((item, key) => (
          <Pressable
            key={key}
            style={[styles.unChoose, item.id === selectedItem && styles.choose]}
            onPress={() => handleSelect(item.id)}>
            <Text
              style={
                (styles.textUnchoose,
                item.id === selectedItem && styles.textChoose)
              }>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
      {getExamHistory.data?.length !== 0 ? (
        <FlatList<IUjianHistory>
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={getExamHistory?.data}
          keyExtractor={(_, _id): any => _id}
          onEndReached={__onEndReachedRiwayat}
          ListEmptyComponent={_renderEmpty}
          renderItem={({item, index}) => {
            return (
              <StudentUjianHistoryCard
                key={index}
                isFromTeacher={isFromTeacher}
                isDoneScoring={isDoneScoring}
                item={item}
                onButtonPress={() => fetchDetailHistoryExam(item)}
              />
            );
          }}
        />
      ) : (
        _renderEmpty()
      )}

      <SwipeUp
        isSwipeLine={true}
        visible={isShowDetail}
        onClose={() => {
          setIsShowDetail(false);
        }}
        height={500}
        children={
          swipeUpType === 'BELUM-DINILAI' ? (
            <SwipeUpBelumDinilai
              hideSwipeUp={() => setIsShowDetail(false)}
              data={swipeUpData}
            />
          ) : (
            <SwipeUpDoneCorrection
              showExplanation={() => goToExplaination()}
              data={swipeUpData}
              result={result}
              is_display_result_exam={swipeUpData?.is_display_result_exam}
            />
          )
        }
      />
      {isLoading || loading ? <LoadingIndicator /> : null}
    </SafeAreaView>
  );
};

export {StudentHistoryExamScreen};
