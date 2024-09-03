/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import useStudyReportStudentScreen from '../../useStudyReportStudentScreen';
import {SvgUri} from 'react-native-svg';
import Colors from '@constants/colors';
import {CardProgress} from '../../component/CardProgress';
import Fonts from '@constants/fonts';
import LogoRegular from '@assets/svg/kelaspintar_regular.svg';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import ArrowRight from '@assets/svg/ic_arrow_right_blue.svg';
import Clock from '@assets/svg/ic16_clock.svg';
import LearnLogo from '@assets/svg/ic32_learn.svg';
import PracticeLogo from '@assets/svg/ic32_practice.svg';
import TestLogo from '@assets/svg/ic32_test.svg';
import MateriType1 from '@assets/svg/videoPresentasi.svg';
import MateriType2 from '@assets/svg/videoAnimasi.svg';
import MateriType3 from '@assets/svg/learnEbook.svg';
import {BarChart} from 'react-native-chart-kit';
import {SwipeUp} from '@components/atoms';
import SwipeUpSchoolMaterials from '@components/pages/AddSchoolMaterialsScreen/components/SwipeUpSchoolMaterials';
import {SubjectType} from '@constants/subjectType';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

interface IProps {
  navigation: any;
}

const WIDTH = Math.round(Dimensions.get('window').width);

const Materi = (props: IProps) => {
  const {
    subjectMaterial,
    schoolMaterial,
    history,
    duration,
    subjectData,
    average,
    __parselearningDurationToChart,
    materiArrRes,
    isShowHandleChapter,
    setIsShowHandleChapter,
    chapterData,
    chapterSelected,
    setChapterSelected,
    navigation,
    student,
    isShowHandleChapterSummary,
    setIsShowHandleChapterSummary,
    chapterSelectedSummary,
    setChapterSelectedSummary,
    isLoading,
    loadingStore,
  } = useStudyReportStudentScreen();

  const renderChildrenSwipeUpChapterList = () => {
    return (
      <SwipeUpSchoolMaterials
        data={chapterData?.data}
        selected={chapterSelected}
        setSelected={setChapterSelected}
        title={'Pilih Bab'}
        setShow={setIsShowHandleChapter}
        withOptionAllSelect
      />
    );
  };

  const renderChildrenSwipeUpChapterListSummary = () => {
    return (
      <SwipeUpSchoolMaterials
        data={chapterData?.data}
        selected={chapterSelectedSummary}
        setSelected={setChapterSelectedSummary}
        title={'Pilih Bab'}
        setShow={setIsShowHandleChapterSummary}
        withOptionAllSelect
      />
    );
  };

  const cekType = (x: string) => {
    if (x === 'learn') {
      return SubjectType.KPRegular.Learn;
    } else if (x === 'practice') {
      return SubjectType.KPRegular.Practice;
    } else {
      return SubjectType.KPRegular.Test;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <SvgUri
          uri={subjectData?.icon}
          width={48}
          height={48}
          style={{width: 48, height: 48}}
        />
        <Text style={styles.subjectName}>{subjectData?.name}</Text>
      </View>

      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 16}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8, lineHeight: 24},
            ]}>
            Materi
          </Text>
          <LogoRegular />
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsShowHandleChapter(true)}>
            <Text style={styles.btnText}>
              {chapterSelected?.value ?? 'Semua Bab'}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>
        {history?.map((item: any, index: number) => {
          return (
            <CardProgress
              key={index}
              type={item?.title}
              allTask={item?.total}
              progress={item?.progress}
              desc={item?.desc}
              img={
                item.title === 'learn' ? (
                  <LearnLogo width={32} height={32} />
                ) : item.title === 'practice' ? (
                  <PracticeLogo width={32} height={32} />
                ) : (
                  <TestLogo width={32} height={32} />
                )
              }
              action={() => {
                item?.total &&
                  navigation.navigate('ChapterKPRegularScreen', {
                    subject_type: cekType(item.title),
                    subject_data: subjectMaterial,
                  });
              }}
              isMurid={!student}
            />
          );
        })}

        <View style={styles.averageContainer}>
          {average?.length > 0 ? (
            average?.map((item: any, idx: number) => {
              return (
                <View
                  key={idx}
                  style={{
                    marginHorizontal: 10,
                    width: 100,
                  }}>
                  <Text
                    style={
                      styles.greyText
                    }>{`Rata-rata ${item.test_name}`}</Text>
                  <Text style={styles.averageValue}>{item.average}</Text>
                </View>
              );
            })
          ) : (
            <Text>Belum Ada Nilai Rata-rata Test</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              props?.navigation.navigate('KPRegularHistoryScoreScreen', {
                report: {subject: subjectMaterial?.subject},
                student: student,
              });
            }}
            style={[
              styles.btn,
              {
                alignSelf: 'center',
              },
            ]}>
            <Text style={styles.btnText}>Riwayat Nilai Test</Text>
            <ArrowRight width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 10}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8},
            ]}>
            Materi Sekolah
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.btn}
            onPress={() => setIsShowHandleChapterSummary(true)}>
            <Text style={styles.btnText}>
              {chapterSelectedSummary?.value ?? 'Semua Bab'}
            </Text>
            <ArrowDown />
          </Pressable>
        </View>
        {materiArrRes?.map((item: any, index: number) => {
          return (
            <CardProgress
              index={index}
              key={index}
              lengthData={schoolMaterial?.length}
              type={item.learning_method}
              allTask={item?.total ? item.total : 0}
              progress={item?.total_learn ? item?.total_learn : 0}
              desc={item.desc}
              img={
                item.learning_method_id === 2 ? (
                  <MateriType1 width={40} height={40} />
                ) : item.learning_method_id === 3 ? (
                  <MateriType2 width={40} height={40} />
                ) : (
                  <MateriType3 width={40} height={40} />
                )
              }
              isMurid={!student}
              action={() => {
                item &&
                  navigation.navigate('ChapterLMSScreen', {
                    subject_type: 'LMS_MateriSekolah',
                    subject_data: subjectMaterial?.subject,
                  });
              }}
            />
          );
        })}
      </View>
      <View style={styles.whiteContainer}>
        <View style={styles.subjectContainer}>
          <Clock width={25} height={25} />
          <Text style={[styles.subjectName, {fontSize: 16}]}>
            Durasi Belajar
          </Text>
        </View>
        <View style={styles.durationHeader}>
          <View>
            <Text style={styles.greyText}>Total</Text>
            <Text style={styles.averageValue}>
              {duration?.total
                ? `${duration?.total?.hour} Jam ${duration?.total?.minute} Menit`
                : '0 jam 0 menit'}
            </Text>
          </View>
          <View>
            <Text style={styles.greyText}>Total Minggu Ini</Text>
            <Text style={styles.averageValue}>
              {duration?.perWeek
                ? `${duration?.perWeek?.hour} Jam ${duration.perWeek?.minute} Menit`
                : '0 jam 0 menit'}
            </Text>
          </View>
        </View>
        <Text style={styles.greyText}>Grafik Minggu Ini</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <BarChart
            data={__parselearningDurationToChart()}
            width={WIDTH}
            height={220}
            showBarTops={false}
            fromZero={true}
            yAxisLabel=""
            yAxisSuffix=" jam"
            chartConfig={{
              barRadius: 3,
              barPercentage: 0.6,
              fillShadowGradientFromOpacity: 1,
              fillShadowGradientToOpacity: 1,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              color: () => Colors.primary.base,
              labelColor: () => Colors.dark.neutral60,
              decimalPlaces: 0,
              propsForLabels: {
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
              },
              propsForHorizontalLabels: {
                dx: WIDTH + 6,
              },
              propsForBackgroundLines: {
                stroke: Colors.dark.neutral20,
              },
            }}
            style={{
              marginTop: 12,
              paddingRight: 7,
            }}
            // showValuesOnTopOfBars //untuk menampilkan data value diatas diagram
          />
        </ScrollView>
      </View>
      <View style={styles.whiteContainer} />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowHandleChapter}
        onClose={() => {
          setIsShowHandleChapter(false);
        }}
        height={500}
        children={renderChildrenSwipeUpChapterList()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowHandleChapterSummary}
        onClose={() => {
          setIsShowHandleChapterSummary(false);
        }}
        height={500}
        children={renderChildrenSwipeUpChapterListSummary()}
      />
      {isLoading || loadingStore ? <LoadingIndicator /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    paddingBottom: 25,
  },
  subjectContainer: {
    flexDirection: 'row',
  },
  subjectName: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    marginLeft: 16,
    textAlignVertical: 'center',
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  btnText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingRight: 12,
  },
  greyText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  averageValue: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    letterSpacing: 0.1,
    paddingTop: 4,
  },
  durationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});

export {Materi};
