/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {bgBlueOrnament} from '@assets/images';
import LogoSoal1 from '@assets/svg/logo_soal_white.svg';
import Akm from '@assets/svg/akm.svg';
import {
  Button,
  SwipeUp,
  ImageSubjects,
  WidgetHorizontal,
  AccessSubjectCard,
} from '@components/atoms';
import useQuestionScreen from './useQuestionScreen';
import {SubjectType} from '@constants/subjectType';
import {fetchGetAllAkm} from '@redux';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconInfoRightWhite from '@assets/svg/ic_info.svg';
import ForbiddenRobotIcon from '@assets/svg/robot_sedih.svg';
import Fonts from '@constants/fonts';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {MainView} from '@components/atoms';

const QuestionScreen = ({}: any) => {
  const {
    isShowServicesSubjects,
    isHidden,
    navigation,
    lastAccessed,
    dispatch,
    setIsShowServicesSubjects,
    renderChildrenSwipeUpSoal,
    isShowForbiddenAccess,
    setIsShowForbiddenAccess,
  } = useQuestionScreen();
  const getSubjectsByClass: any = useSelector(
    (state: RootState) => state.getSubjectsByClass,
  );
  const subjectData = getSubjectsByClass?.data;

  return (
    <MainView flex={1}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        iconRight={<IconInfoRightWhite width={24} height={24} />}
        backgroundColor="transparent"
        colorLabel={Colors.white}
        onPressIconRight={() => {
          setIsShowServicesSubjects(true);
        }}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LogoSoal1 />
        <Text style={styles.topTitle}>
          Puluhan ribu soal latihan persiapan berbagai ujian.
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <View style={styles.container}>
              <Text style={[styles.cardTitle]}>
                Mau latihan soal apa hari ini
              </Text>
              <View style={[styles.cardMiddleContainer, {marginTop: 24}]}>
                <ScrollView
                  contentContainerStyle={styles.cardMiddleContainerScroll}
                  nestedScrollEnabled={true}>
                  {subjectData?.map((item: any, index: any) => (
                    <ImageSubjects
                      key={index}
                      pressableStyle={styles.subCard}
                      imageStyle={{width: 50, height: 50}}
                      data={item}
                      onPress={() => {
                        navigation.navigate('QuestionDetailScreen', {
                          category: 'Soal',
                          subjectData: item,
                        });
                      }}
                    />
                  ))}
                </ScrollView>
                <View style={{marginTop: 25}} />
                <WidgetHorizontal
                  title="AKM"
                  akm={true}
                  svg={<Akm />}
                  action={() => {
                    dispatch(
                      fetchGetAllAkm((res: any) => {
                        if (res?.status !== 401 && res?.status !== undefined) {
                          navigation.navigate('ChapterAKMScreen', {
                            subject_data: subjectData,
                            subject_type: SubjectType?.AKM?.AKM,
                            isFromSoal: true,
                          });
                        } else {
                          setIsShowForbiddenAccess(true);
                        }
                      }),
                    );
                  }}
                />
              </View>
              {!isHidden && lastAccessed?.length !== 0 && (
                <View style={styles.lastAccessedContainer}>
                  <Text style={[styles.cardTitle, {alignSelf: 'flex-start'}]}>
                    Terakhir Diakses
                  </Text>
                  <View style={styles.bottomContainer}>
                    <ScrollView
                      nestedScrollEnabled={true}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {lastAccessed
                        ?.slice(0, 5)
                        .map((item: any, index: any) => (
                          <AccessSubjectCard
                            key={index}
                            data={item}
                            onPress={() => {
                              navigation.navigate('QuestionDetailScreen', {
                                category: 'Soal',
                                subjectData: item.subject,
                              });
                            }}
                          />
                        ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowServicesSubjects}
        onClose={() => {
          setIsShowServicesSubjects(false);
        }}
        height={500}
        children={renderChildrenSwipeUpSoal()}
      />
      <View style={styles.floatingButtonContainer}>
        <Button
          label={'Lihat Progres Latihan Soal'}
          style={styles.bottomButton}
          rightIcon
          action={() => {
            navigation.navigate('PracticeSoalReportScreen');
          }}
        />
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowForbiddenAccess}
        onClose={() => {
          setIsShowForbiddenAccess(false);
        }}
        height={500}
        children={
          <View style={styles.swipUpContainer}>
            <ForbiddenRobotIcon />
            <Text style={styles.titleSwipeUp}>Tidak Dapat Mengakses AKM</Text>
            <Text style={styles.labelSwipeUp}>
              AKM (Asesmen Kompetensi Minimum) hanya{'\n'}dapat diakses oleh
              Murid kelas 5, 8 dan 11.
            </Text>
          </View>
        }
      />
    </MainView>
  );
};
export {QuestionScreen};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  cardContainer: {
    marginTop: '5%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    paddingBottom: 32,
  },
  container: {
    paddingBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  topTitle: {
    marginLeft: '1%',
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
    marginTop: '2%',
    fontSize: 14,
    lineHeight: 18,
  },
  cardTitle: {
    marginLeft: '1%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    fontSize: 20,
    lineHeight: 28,
  },
  lastAccessedContainer: {
    marginTop: 24,
  },
  floatingButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '85%',
  },
  cardMiddleContainer: {
    width: '95%',
    height: 335,
    backgroundColor: Colors.white,
    padding: 16,
    paddingTop: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
  },
  cardMiddleContainerScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  subCard: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    width: '100%',
  },
  cardBottomContainer: {
    width: '25%',
    padding: 16,
    paddingTop: 0,
    borderRadius: 8,
    elevation: 2,
  },
  cardBottomContainerScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipUpContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  labelSwipeUp: {
    fontFamily: Fonts.RegularPoppins,
    marginTop: 10,
    fontSize: 14,
    color: Colors.dark.neutral80,
    lineHeight: 24,
    textAlign: 'center',
  },
  titleSwipeUp: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
});
