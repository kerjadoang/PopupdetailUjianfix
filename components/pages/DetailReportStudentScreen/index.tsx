import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import {SwipeUp} from '@components/atoms';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RightArrow} from '@assets/images';

import {
  DownloadReport,
  Card,
  AttendReport,
  NotAttendReport,
  CardScore,
  ItemSubject,
} from './component';
import PresensiContainer from './component/PresensiContainer';
// routing
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {services} from './services';
import {useGetLKSSummaryReport} from '@services/lms';
import CardLKS from './component/CardLKS';
import {ParamList} from 'type/screen';

const DetailReportStudentScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailReportStudentScreen'>>();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DetailReportStudentScreen'>
    >();

  const {
    heightViewLaporanMapel,
    presensiShow,
    presensiShow2,
    refForScroll,
    isShowBtnLaporanMapel,
    statusDownload,
    presensi,
    absent,
    present,
    task,
    exam,
    akm,
    subject,
    setHeightViewLaporanMapel,
    setPresensiShow,
    setPresensiShow2,
    setRefForScroll,
    setIsShowBtnLaporanMapel,
    download,
  } = services(route);

  const {data: paramsData}: any = route.params;
  const {data: lksSummaryReportData} = useGetLKSSummaryReport(
    paramsData?.student?.id,
  );

  return (
    <>
      <ImageBackground
        source={bgBlueOrnament}
        style={[styles.bg, {zIndex: 999}]}>
        <Header
          label={'Laporan'}
          colorLabel={Colors.white}
          backgroundColor="transparent"
          iconLeft={
            <Icons name="chevron-left" color={Colors.white} size={32} />
          }
          onPressIconLeft={() => navigation.goBack()}
        />
      </ImageBackground>

      <ScrollView
        ref={ref => setRefForScroll(ref)}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={20}
        onScroll={_event => {
          if (
            Math.round(_event.nativeEvent.contentOffset.y) + 236 >=
            heightViewLaporanMapel
          ) {
            setIsShowBtnLaporanMapel(false);
          } else {
            setIsShowBtnLaporanMapel(true);
          }
        }}>
        <View style={styles.whiteContainer}>
          <DownloadReport
            semester={'Ganjil'}
            isDownload={statusDownload?.download}
            action={() => download()}
          />
          <View style={styles.margin}>
            <PresensiContainer
              year={presensi?.academic_year}
              attend={presensi?.attend_count}
              notAttend={presensi?.absent_count}
              onAttend={() => {
                setPresensiShow(true);
              }}
              onNotAttend={() => {
                setPresensiShow2(true);
              }}
            />
          </View>
          <View style={styles.margin}>
            <Card
              isExam
              finished={exam?.total_exam}
              highest={
                Array.isArray(exam.highest) ? (
                  exam?.highest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={item?.id || index}
                        num={index + 1}
                        name={item.subject}
                        score={item.point}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
              lowest={
                Array.isArray(exam.lowest) ? (
                  exam?.lowest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        isLow
                        key={item?.id || index}
                        num={index + 1}
                        name={item.subject}
                        score={item.point}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
            />
          </View>
          <View style={styles.margin}>
            <Card
              finished={task?.task_done}
              unfinished={task?.task_undone}
              highest={
                task.highest ? (
                  task?.highest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={item?.id || index}
                        num={index + 1}
                        name={item.subject}
                        score={item.value}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
              lowest={
                task.lowest ? (
                  task?.lowest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={item?.id || index}
                        isLow
                        num={index + 1}
                        name={item.subject}
                        score={item.value}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
            />
            <View style={styles.margin}>
              <Card finished={akm?.akm_done} isAKM onAKM={() => {}} />
            </View>
            <View style={styles.margin}>
              <CardLKS
                lksSummaryReportData={lksSummaryReportData?.data ?? undefined}
              />
            </View>
          </View>
          <View
            style={styles.margin}
            onLayout={({
              nativeEvent: {
                layout: {y},
              },
            }) => setHeightViewLaporanMapel(y)}>
            <View style={styles.containerMapel}>
              <Text style={styles.titleMapel}>Laporan Mata Pelajaran</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {subject?.map((item: any) => {
                  return (
                    <ItemSubject
                      key={item?.id}
                      name={item.name}
                      // img={item.path_url}
                      imgId={item.icon_mobile}
                      action={() =>
                        navigation.navigate('StudyReportStudentScreen', {
                          subject: item,
                          student: route?.params?.data?.student,
                        })
                      }
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {isShowBtnLaporanMapel && (
        <Pressable
          style={styles.btn}
          onPress={() =>
            refForScroll.scrollTo({
              x: 0,
              y: heightViewLaporanMapel + 64,
              animated: true,
            })
          }>
          <Text style={styles.textBtn}>Laporan Mata Pelajaran</Text>
          <Image
            source={RightArrow}
            style={[styles.iconBtn, {width: 12, height: 12}]}
          />
        </Pressable>
      )}
      <SwipeUp
        height={100}
        onClose={() => {
          setPresensiShow(false);
        }}
        visible={presensiShow}
        children={<AttendReport data={present} />}
      />
      <SwipeUp
        height={100}
        onClose={() => {
          setPresensiShow2(false);
        }}
        visible={presensiShow2}
        children={
          <NotAttendReport data={absent} setPresensiShow2={setPresensiShow2} />
        }
      />
    </>
  );
};
export {DetailReportStudentScreen};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: Dimensions.get('window').height * 0.1,
    position: 'absolute',
  },
  whiteContainer: {
    backgroundColor: Colors.primary.background2,
    padding: 16,
    width: '100%',
    marginTop: '20%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  margin: {
    marginTop: 16,
  },
  titleMapel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
  containerMapel: {
    padding: 16,
    backgroundColor: Colors.white,
    elevation: 8,
    borderRadius: 15,
  },
  btn: {
    position: 'absolute',
    bottom: 12,
    backgroundColor: Colors.primary.base,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 22,
  },
  iconBtn: {
    width: 20,
    height: 20,
    marginLeft: 20,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  textBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.white,
  },
});
