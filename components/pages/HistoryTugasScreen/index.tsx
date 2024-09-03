/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import useHistoryTugasSceen from './useHistoryTugasSceen';
import GetAllExam from '@constants/GetAllExam';
import dayjs from 'dayjs';
import {SwipeUp} from '@components/atoms';
import SwipeUpBelumDinilai from './components/SwipeUpBelumDinilai';
import SwipeUpSudahDinilai from './components/SwipeUpSudahDinilai';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const HistoryTugasScreen = () => {
  const {
    navigation,
    handleSelect,
    selectedItem,
    getExamHistory,
    isShowDetail,
    setIsShowDetail,
    isLoading,
    fetchDetailHistoryExam,
    swipeUpType,
    swipeUpData,
    goToExplaination,
  } = useHistoryTugasSceen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Riwayat PR, Projek & Tugas'} />,
    });
  }, [navigation]);

  return (
    <View>
      <ScrollView horizontal style={{backgroundColor: 'white'}}>
        {GetAllExam.map((item, key) => (
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
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', paddingBottom: 200, height: '100%'}}>
        {getExamHistory?.data?.list?.map((items: any, index: number) => {
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
                  {items?.type}
                </Text>
              </View>

              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.titleCard}>{items?.subject?.name}</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {items?.title}
                  </Text>
                </View>
                <Pressable
                  style={styles.buttonContainer}
                  onPress={() => fetchDetailHistoryExam(items)}>
                  <Text style={styles.buttonText}>Detail</Text>
                </Pressable>
              </View>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.dikumpulkan}>Dikumpulkan</Text>
                  <Text style={styles.dateStyle}>
                    {`${dayjs(items?.time_finish)
                      .locale('id')
                      .format('ddd, D MMM YYYY • hh:mm')}`}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nilaiStyle}>Nilai</Text>
                  {items?.student_value === 'Belum dinilai' ? (
                    <Text style={styles.belumdinilai}>Belum dinilai</Text>
                  ) : (
                    <Text style={styles.sudahdinilai}>
                      {items?.student_value}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}

        {getExamHistory?.data?.list?.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              height: '100%',
              marginTop: '50%',
            }}>
            <Image source={require('@assets/images/robot_empty_riwayat.png')} />
            <Text style={styles.textEmptyTitle}>Belum Ada Riwayat Ujian</Text>
            <Text style={styles.textEmptyDesc}>
              Ujian yang telah berakhir akan tampil di sini.
            </Text>
          </View>
        )}
      </ScrollView>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowDetail}
        onClose={() => {
          setIsShowDetail(false);
        }}
        height={500}
        children={
          swipeUpType === 'SUDAH-DINILAI' ? (
            <SwipeUpSudahDinilai
              showExplanation={() => goToExplaination()}
              data={swipeUpData}
            />
          ) : (
            <SwipeUpBelumDinilai
              hideSwipeUp={() => setIsShowDetail(false)}
              data={swipeUpData}
            />
            // <SwipeUpSudahDinilai
            //   showExplanation={() => goToExplaination()}
            //   data={swipeUpData}
            // />
          )
        }
      />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export default HistoryTugasScreen;
