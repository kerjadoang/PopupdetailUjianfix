/* eslint-disable react-native/no-inline-styles */

import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import React, {Suspense, lazy} from 'react';
import Colors from '@constants/colors';
import HeaderBeranda from '@components/molecules/HeaderBeranda';
import Subjects from '@components/molecules/Subjects';
import Services from '@components/molecules/Services';
import {LMS} from '@components/atoms/LMS';
import {ScheduleToday} from '@components/organism';
import {Keys} from '@constants/keys';
import {
  Button,
  FABReward,
  FABSchedule,
  SwipeUp,
  Widget,
  PopUpWithIcon,
} from '@components/atoms';
import LogoAsesmenSumatif from '@assets/svg/ic_asesmen_sumatif.svg';
import ForbiddenRobotIcon from '@assets/svg/robot_sedih.svg';
import LogoTest from '@assets/svg/ic32_test.svg';
import IcLaporan from '@assets/svg/ic24_laporan.svg';

import {updateCoachmark} from '@redux';
import {ChildrenSwipeUpServices} from '@components/molecules/ChildrenSwipeUpServices';
import {SwipeUpAllSubjects} from './components/SwipeUpAllSubjects';

import {SubjectType} from '@constants/subjectType';
import {styles} from './styles';
import {useHomeScreen} from './useHomeScreen';
import SwipeupIkmActiveCuriculum from './components/SwipeupIkmActiveCuriculum';
import SwipeupIkmActivePhase from './components/SwipeupIkmActivePhase';
import useHomeIKM from './useHomeIKM';
import SwipeupSettingFav from './components/SwipeupSettingFav';
import {dataGuru, dataLMS, dataSoal, dataTanya} from './utils';
import SwipeupPtn from './components/SwipeupPtn';
import SwipeupPtnReleaseDates from './components/SwipeupPtnReleaseDates';
import SwipeupPractice from './components/SwipeupPractice';

const Promo = lazy(() => import('@components/organism/Promo'));
const RankTable = lazy(() => import('@components/organism/RankTable'));
const Information = lazy(() => import('@components/organism/Information'));

const HomeScreen = () => {
  const {
    navigation,
    showChangeNumber,
    refForScroll,
    heightViewLaporanMapel,
    isShowBtnLaporanMapel,
    servicesView,
    isShowAllSubjects,
    isShowSettingFav,
    listSubjectAll,
    isShowPracticeSubjects,
    isShowTestSubjects,
    isShowServicesSubjects,
    isShowForbiddenAccess,
    classData,
    selectedServices,
    localListSubjectFav,
    getSubjectsByClass,
    getUser,
    dispatch,
    setRefForScroll,
    setHeightViewLaporanMapel,
    setIsShowBtnLaporanMapel,
    setServicesView,
    setIsShowAllSubjects,
    setIsShowSettingFav,
    setIsShowPracticeSubjects,
    setIsShowTestSubjects,
    setIsShowServicesSubjects,
    setIsShowForbiddenAccess,
    setClassData,
    setSelectedServices,
    handleSubmitFavorite,
    setShowChangeNumber,
    showPTNNotRelease,
    setShowPTNNotRelease,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
  } = useHomeScreen();

  const {
    setActiveCurriculum,
    toggleActiveCuriculum,
    setActivePhaseClass,
    showActiveCuriculum,
    activeCuriculum,
    activePhaseClass,
    listCurriculum,
    listPhaseClass,
    showActivePhase,
    toggleActivePhase,
    isIKM,
  } = useHomeIKM();

  const totalCoachmark = 9;

  const renderChildrenSwipeUpPractice = () => {
    return (
      <SwipeupPractice
        navigation={navigation}
        getSubjectsByClass={getSubjectsByClass}
        isIKM={isIKM}
        setIsShowPracticeSubjects={setIsShowPracticeSubjects}
      />
    );
  };

  const renderChildrenSwipeUpTest = () => {
    if (getUser?.data?.class_id <= 3 && activeCuriculum?.id === 1) {
      return (
        <View style={styles.forbiddenTestContainerStyle}>
          <View style={styles.forbiddenTestIconContainerStyle}>
            <ForbiddenRobotIcon />
          </View>
          <Text style={styles.forbiddenTestDescriptionTopStyle}>
            Tidak Dapat Mengakses{'\n'}Kelas Pintar Regular{' '}
            {isIKM ? 'Asesmen Sumatif' : 'Test'}
          </Text>
          <Text style={styles.forbiddenTestDescriptionBottomStyle}>
            Kelas Pintar Regular {isIKM ? 'Asesmen Sumatif' : 'Test'} hanya
            dapat{'\n'}diakses oleh murid kelas 4-6 SD, SMP dan{'\n'}SMA.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.swipeUpContainer}>
          <View style={styles.swpTopContent}>
            <View style={styles.swpTopInnerContent}>
              <View style={styles.swpTopBodyContent}>
                {isIKM ? (
                  <LogoAsesmenSumatif width={22} height={22} />
                ) : (
                  <LogoTest width={22} height={22} />
                )}
                <Text style={styles.swpTopTitle}>
                  {isIKM ? 'Asesmen Sumatif' : 'Test'}
                </Text>
              </View>
              <View style={styles.swpTopTitle2Container}>
                <Text style={styles.swpTopTitle2}>
                  Mau kerjakan tes apa hari ini?
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.swpMiddleContent}>
            <View style={styles.swpMiddleContent2}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.swpMiddleScrollViewInner}>
                  {getSubjectsByClass?.data?.map((ie: any) => {
                    return (
                      <View key={ie?.id} style={styles.swpMiddleInnerContent}>
                        <View>
                          <Widget
                            type={1}
                            title={ie?.name || '-'}
                            action={() => {
                              setIsShowTestSubjects(false);
                              navigation.navigate('ChapterKPRegularScreen', {
                                subject_data: ie,
                                subject_type: SubjectType?.KPRegular?.Test,
                              });
                            }}
                            remove={false}
                            add={false}
                            imageId={ie?.icon_mobile}
                            svg={ie?.icon_path_url}
                            image={
                              'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'
                            }
                            backgroundColor={Colors.white}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.swpBottomContent}>
            <Button
              label={'Lihat Progres Belajar Saya'}
              textStyle={{flex: 0.85, textAlign: 'center', paddingRight: 16}}
              rightIcon={true}
              iconLeft={<IcLaporan />}
              action={() => {
                setIsShowTestSubjects(false);
                navigation.navigate('KPRegularLaporanScreen');
              }}
            />
          </View>
        </View>
      );
    }
  };

  const renderChildrenSwipeUpTanya = () => {
    return (
      <View style={{height: 500}}>
        <ChildrenSwipeUpServices
          data={dataTanya.data}
          logo={dataTanya.logo}
          title={dataTanya.title}
          OnPressButton1={async () => {
            dispatch(
              updateCoachmark(Keys.popup_mobile_tanya, () => {
                navigation.navigate('AskScreen');
              }),
            );
          }}
          setIsShowServicesSubjects={setIsShowServicesSubjects}
          ButtonLabel1={dataTanya.ButtonLabel1}
        />
      </View>
    );
  };

  const renderChildrenSwipeUpPTN = () => {
    return (
      <SwipeupPtn
        class_id={getUser?.data?.class_id}
        onBerlanggananPress={() => {
          setShowPTNNotRelease(false);
          setIsShowServicesSubjects(false);
          setSelectedServices('');
          navigation.navigate('Cart');
        }}
      />
    );
  };

  const renderChildrenSwipeUpPTNReleaseDates = () => {
    return <SwipeupPtnReleaseDates />;
  };

  const renderChildrenSwipeUpGuru = () => {
    return (
      <View style={styles.containerSwipeUp}>
        <ChildrenSwipeUpServices
          data={dataGuru.data}
          logo={dataGuru.logo}
          title={dataGuru.title}
          OnPressButton1={async () => {
            navigation.navigate('Cart');
          }}
          setIsShowServicesSubjects={setIsShowServicesSubjects}
          ButtonLabel1={dataGuru.ButtonLabel1}
        />
      </View>
    );
  };

  const renderChildrenSwipeUpSoal = () => {
    return (
      <View style={styles.containerSwipeUp}>
        <ChildrenSwipeUpServices
          data={dataSoal.data}
          logo={dataSoal.logo}
          title={dataSoal.title}
          OnPressButton1={() => {
            navigation.navigate('Cart');
          }}
          OnPressButton2={async () => {
            navigation.navigate('QuestionScreen', {});
            setIsShowServicesSubjects(false);
          }}
          setIsShowServicesSubjects={setIsShowServicesSubjects}
          dualButton
          ButtonLabel1={dataSoal.ButtonLabel1}
          ButtonLabel2={dataSoal.ButtonLabel2}
        />
      </View>
    );
  };

  const renderChildrenSwipeUpLMS = () => {
    return (
      <View style={styles.containerSwipeUp}>
        <ChildrenSwipeUpServices
          logo={dataLMS.logo}
          title={dataLMS.title}
          subTitle={dataLMS.subTitle}
          setIsShowServicesSubjects={setIsShowServicesSubjects}
          isLMS
        />
      </View>
    );
  };

  const renderChildrenSwipeUpActiveCuriculum = () => {
    return (
      <SwipeupIkmActiveCuriculum
        activeData={activeCuriculum}
        data={listCurriculum}
        onPressActiveCuriculum={item => {
          setActiveCurriculum(item);
          toggleActiveCuriculum();
        }}
      />
    );
  };
  const renderChildrenSwipeUpActivePhase = () => {
    return (
      <SwipeupIkmActivePhase
        activeData={activePhaseClass}
        data={listPhaseClass}
        onPressActivePhase={item => {
          setActivePhaseClass(item);
          toggleActivePhase();
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <HeaderBeranda
          scrollViewRef={refForScroll}
          Coachmarks={Coachmarks}
          doneCoachMark={doneCoachMark}
          totalCoachmark={totalCoachmark}
          _handlerCoachmark={_handlerCoachmark}
        />
        <View style={styles.content}>
          {showChangeNumber && getUser?.data?.phone_number && (
            <PopUpWithIcon
              title={'Selamat Datang'}
              desc={'Ubah No Hp untuk melanjutkan aplikasi Kelas Pintar'}
              action={() => {
                setShowChangeNumber(false);
                navigation.navigate('ChangeNumberScreen', {
                  phoneNumber: getUser?.data?.phone_number,
                });
              }}
              textButton={'Ubah no. hp'}
            />
          )}
          <ScrollView
            ref={ref => setRefForScroll(ref)}
            scrollEventThrottle={16}
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
            <Subjects
              activeCuriculum={activeCuriculum}
              activePhase={activePhaseClass}
              onPressActiveCuriculum={toggleActiveCuriculum}
              onPressActivePhase={toggleActivePhase}
              scrollViewRef={refForScroll}
              Coachmarks={Coachmarks}
              doneCoachMark={doneCoachMark}
              totalCoachmark={totalCoachmark}
              _handlerCoachmark={_handlerCoachmark}
              onSwipeUp={async () => {
                setClassData(getSubjectsByClass?.data);
                setIsShowAllSubjects(true);
              }}
              onSetting={() => setIsShowSettingFav(true)}
              onSwipeUpPractice={() => setIsShowPracticeSubjects(true)}
              onSwipeUpTest={() => setIsShowTestSubjects(true)}
              onSwipeUpForbiddenAccess={() => {
                setIsShowForbiddenAccess(true);
              }}
              subjectData={localListSubjectFav}
              onNextSubjects={() =>
                refForScroll.scrollTo({
                  x: 0,
                  y: servicesView - 24,
                  animated: true,
                })
              }
            />
            <Services
              scrollViewRef={refForScroll}
              Coachmarks={Coachmarks}
              doneCoachMark={doneCoachMark}
              totalCoachmark={totalCoachmark}
              _handlerCoachmark={_handlerCoachmark}
              setServicesView={setServicesView}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
            <View style={styles.lmsContainer}>
              <LMS
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                totalCoachmark={totalCoachmark}
                _handlerCoachmark={_handlerCoachmark}
                scrollViewRef={refForScroll}
                action={() => {
                  if (getUser?.data?.school_id) {
                    navigation.navigate('BottomTabNavigatorLMS');
                  } else {
                    setSelectedServices('LMS');
                  }
                }}
              />
            </View>

            <View
              onLayout={({
                nativeEvent: {
                  layout: {y},
                },
              }) => setHeightViewLaporanMapel(y)}>
              <ScheduleToday />
            </View>
            <Suspense fallback={<ActivityIndicator />}>
              <RankTable />
              <Promo />
              <Information />
            </Suspense>
          </ScrollView>
        </View>
      </View>

      <FABReward onPress={() => navigation.navigate('DailyCheckInScreen')} />

      {isShowBtnLaporanMapel && (
        <FABSchedule
          Coachmarks={Coachmarks}
          doneCoachMark={doneCoachMark}
          totalCoachmark={totalCoachmark}
          _handlerCoachmark={_handlerCoachmark}
          scrollViewRef={refForScroll}
          onPress={() =>
            refForScroll.scrollTo({
              x: 0,
              y: heightViewLaporanMapel + 64,
              animated: true,
            })
          }
        />
      )}

      <SwipeUp
        isSwipeLine={true}
        visible={isShowAllSubjects}
        onClose={() => {
          setIsShowAllSubjects(false);
        }}
        height={500}
        children={
          <SwipeUpAllSubjects
            onPressSubject={(subjectData: any) => {
              setIsShowAllSubjects(false);
              navigation.navigate('ChapterKPRegularScreen', {
                subject_data: subjectData,
                subject_type: SubjectType?.KPRegular?.Learn,
              });
            }}
            onPressSubjectReport={() => {
              setIsShowAllSubjects(false);
              navigation.navigate('KPRegularLaporanScreen');
            }}
            subjectData={classData ?? []}
            isIKM={isIKM}
          />
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSettingFav}
        onClose={() => {
          setIsShowSettingFav(false);
        }}
        height={500}
        children={
          <SwipeupSettingFav
            localListSubjectFav={localListSubjectFav}
            subjectData={listSubjectAll}
            onSavePress={data => {
              handleSubmitFavorite(data);
              setIsShowSettingFav(false);
            }}
          />
        }
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowPracticeSubjects}
        onClose={() => {
          setIsShowPracticeSubjects(false);
        }}
        height={500}
        children={renderChildrenSwipeUpPractice()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowTestSubjects}
        onClose={() => {
          setIsShowTestSubjects(false);
        }}
        height={500}
        children={renderChildrenSwipeUpTest()}
      />

      <SwipeUp
        isSwipeLine={true}
        visible={showPTNNotRelease}
        onClose={() => {
          setShowPTNNotRelease(false);
          setIsShowServicesSubjects(false);
          setSelectedServices('');
        }}
        height={500}
        children={renderChildrenSwipeUpPTNReleaseDates()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowServicesSubjects}
        onClose={() => {
          setIsShowServicesSubjects(false);
          setSelectedServices('');
        }}
        height={500}
        children={
          selectedServices === 'SOAL'
            ? renderChildrenSwipeUpSoal()
            : selectedServices === 'TANYA'
            ? renderChildrenSwipeUpTanya()
            : selectedServices === 'LMS'
            ? renderChildrenSwipeUpLMS()
            : selectedServices === 'GURU'
            ? renderChildrenSwipeUpGuru()
            : selectedServices === 'PTN'
            ? renderChildrenSwipeUpPTN()
            : null
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowForbiddenAccess}
        onClose={() => {
          setIsShowForbiddenAccess(false);
        }}
        height={500}
        children={
          <View
            style={{
              width: '100%',
              paddingTop: 20,
              paddingBottom: 40,
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <ForbiddenRobotIcon />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                marginTop: 20,
                fontSize: 16,
                lineHeight: 24,
                color: Colors.dark.neutral100,
              }}>
              Tidak Dapat Mengakses AKM
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                fontSize: 14,
                color: Colors.dark.neutral80,
                lineHeight: 24,
                textAlign: 'center',
              }}>
              AKM (Asesmen Kompetensi Minimum) hanya{'\n'}dapat diakses oleh
              Murid kelas 5, 8 dan 11.
            </Text>
          </View>
        }
      />

      <SwipeUp
        isSwipeLine={true}
        visible={showActiveCuriculum}
        onClose={toggleActiveCuriculum}
        height={500}
        children={renderChildrenSwipeUpActiveCuriculum()}
      />

      <SwipeUp
        isSwipeLine={true}
        visible={showActivePhase}
        onClose={() => toggleActivePhase()}
        height={500}
        children={renderChildrenSwipeUpActivePhase()}
      />
    </View>
  );
};

export default HomeScreen;
