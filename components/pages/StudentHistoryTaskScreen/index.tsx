/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import GetAllExam from '@constants/GetAllExam';
import {SwipeUp} from '@components/atoms';
import SwipeUpDoneCorrection from './components/SwipeUp';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import Colors from '@constants/colors';
import Robot from '@assets/svg/robot_empty_state.svg';
import useStudentHistoryTaskSceen from './useStudentHistoryTaskSceen';
import {convertDate, isStringContains} from '@constants/functional';

const StudentHistoryTaskScreen = () => {
  const {
    navigation,
    handleSelect,
    selectedItem,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryTask,
    swipeUpData,
    goToExplaination,
    taskData,
    __onEndReachedRiwayat,
    student_id,
    fetchDetailHistoryTaskTeacher,
    onPressBack,
    loading,
  } = useStudentHistoryTaskSceen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Riwayat PR, Projek & Tugas'}
          backgroundColor={Colors.white}
          onPressIconLeft={onPressBack}
        />
      ),
    });
  }, []);

  const _renderEmptyContent = () => (
    <View style={styles.emptyContainer}>
      <Robot width={100} height={100} />
      <Text style={styles.emptyTitle}>
        Belum Ada Riwayat PR, Projek & Tugas
      </Text>
      <Text style={styles.emptySubTitle}>
        {selectedItem === 1
          ? 'PR/Projek/Tugas yang telah berakhir akan tampil di sini.'
          : selectedItem === 2
          ? 'PR/Projek/Tugas yang telah dinilai guru akan tampil di sini.'
          : 'PR/Projek/Tugas yang sedang dalam proses pemeriksaan akan tampil di sini.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View style={{backgroundColor: Colors.white, padding: 16}}>
        <View style={{flexDirection: 'row', paddingBottom: 16}}>
          {GetAllExam.map((item, key) => (
            <Pressable
              key={key}
              style={[
                styles.unChoose,
                item.id === selectedItem && styles.choose,
              ]}
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
        {taskData?.length !== 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 200}}
            showsVerticalScrollIndicator={false}
            data={taskData}
            keyExtractor={(_, _id): any => _id}
            ListEmptyComponent={_renderEmptyContent}
            onEndReached={__onEndReachedRiwayat}
            renderItem={({item, index}) => {
              // const isStudentChecked =
              //   !isStringContains(item.student_value, 'belum dinilai') &&
              //   student_id;
              const isNotDoingTask = isStringContains(
                item.student_value,
                'tidak mengerjakan',
              );

              return (
                <View style={[styles.shadowProp, styles.card]} key={index}>
                  <View
                    style={[
                      styles.chipsContainer,
                      {borderRadius: 25, marginBottom: 8},
                    ]}>
                    <Text
                      style={[
                        styles.chipsFont,
                        {paddingVertical: 4, paddingHorizontal: 8},
                      ]}>
                      {item?.type}
                    </Text>
                  </View>

                  <View style={[styles.rowBetween]}>
                    <View style={{width: '75%'}}>
                      <Text style={styles.subjectCard}>
                        {item?.subject?.name}
                      </Text>
                      <Text style={styles.titleCard}>{item?.title}</Text>
                    </View>
                    {!isNotDoingTask && (
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                          student_id
                            ? fetchDetailHistoryTaskTeacher(item)
                            : fetchDetailHistoryTask(item);
                        }}>
                        <Text style={styles.buttonText}>
                          {/* {!isStudentChecked ? 'Periksa' : 'Detail'} */}
                          Detail
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 8,
                    }}>
                    <View>
                      <Text style={styles.dikumpulkan}>Dikumpulkan</Text>
                      <Text style={styles.dateStyle}>
                        {`${convertDate(item?.time_finish).format(
                          'ddd, D MMM YYYY • hh:mm',
                        )}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                      }}>
                      <Text style={styles.nilaiStyle}>Nilai</Text>
                      {item?.student_value !== 'Belum dinilai' ? (
                        <Text style={styles.sudahdinilai}>
                          {item?.student_value}
                        </Text>
                      ) : (
                        <Text style={styles.belumdinilai}>Belum dinilai</Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          _renderEmptyContent()
        )}
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowDetail}
        onClose={() => {
          setIsShowDetail(false);
        }}
        height={500}
        children={
          <SwipeUpDoneCorrection
            showExplanation={() => goToExplaination()}
            dataDetail={swipeUpData}
          />
        }
      />
      {isLoading || loading ? <LoadingIndicator /> : null}
    </SafeAreaView>
  );
};

export {StudentHistoryTaskScreen};
