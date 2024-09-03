/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RobotEmpty from '@assets/svg/robot_empty_state.svg';
import {useExplanation} from './useExplanation';
import {ExplanationPG, MainText, MainView} from '@components/atoms';

const ExplanationTryOutScreen = () => {
  const {
    getExplanationTryout,
    status,
    selectedStatus,
    setSelectedStatus,
    navigation,
    testName,
    filterExplanation,
    explanationData,
    setExplanationData,
  }: any = useExplanation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label={'Pembahasan'} subLabel={testName || 'Try Out'} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setExplanationData(filterExplanation(selectedStatus));
  }, [getExplanationTryout, selectedStatus]);

  const renderEmptyState = (status: any) => {
    let textTitle;
    let textSubtitle;
    switch (status) {
      case 'wrong':
        textTitle = 'Tidak Ada Jawaban Salah';
        textSubtitle = 'Keren, jawabanmu belum ada yang salah!';
        break;
      case 'pass':
        textTitle = 'Tidak Ada Jawaban Dilewati';
        textSubtitle = 'Semua soal latihan berhasil kamu jawab.';
        break;
      default:
        textTitle = 'Tidak Ada Jawaban Benar';
        textSubtitle =
          'Pelajari kembali materi belajar dan coba kerjakan try out lagi nanti.';
        break;
    }
    return (
      <MainView flex={1} justifyContent="center" alignItems="center">
        <RobotEmpty />

        <MainView marginTop={12}>
          <MainText
            textAlign="center"
            fontWeight="600"
            fontSize={16}
            color={Colors.black}
            paddingBottom={6}>
            {textTitle}
          </MainText>
          <MainText
            textAlign="center"
            fontSize={14}
            color={Colors.dark.neutral60}>
            {textSubtitle}
          </MainText>
        </MainView>
      </MainView>
    );
  };

  return (
    <>
      <View style={styles.body}>
        <View style={styles.btnContainer}>
          {status.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedStatus(item.value)}
                style={
                  selectedStatus === item.value
                    ? [styles.btn, {backgroundColor: Colors.primary.base}]
                    : [styles.btn, {backgroundColor: Colors.dark.neutral10}]
                }>
                <Text
                  style={
                    selectedStatus === item.value
                      ? styles.activeText
                      : styles.nonActiveText
                  }>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {explanationData ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {explanationData?.map((item: any, index: number) => {
              return (
                <View>
                  <ExplanationPG
                    isCorrect={item.is_correct}
                    key={index}
                    queue={item?.order}
                    question={item?.question?.question || '--'}
                    userAnswer={
                      item.is_correct === true
                        ? item?.question?.question_options?.[0]?.key
                        : item?.selected_option?.key
                    }
                    correctAnswer={
                      item.status === 'answered' && item.is_correct === false
                        ? item?.question?.question_options?.[0]?.key
                        : null
                    }
                    explanation={
                      item?.question?.question_discuss?.explanation || '--'
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          renderEmptyState(selectedStatus)
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 16,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 15,
  },
  activeText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  nonActiveText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
});
export {ExplanationTryOutScreen};
