/* eslint-disable react-native/no-inline-styles */
import {
  AboutSchool,
  HeaderBerandaNonMurid,
  MenuGuru,
} from '@components/molecules';
import {Checking, ScheduleTodayWithList} from '@components/organism';
import Colors from '@constants/colors';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {AnnouncementWidget} from './component/AnnouncementWidget';
import {Keys} from '@constants/keys';
import {
  CoachmarkLib,
  FABPlus,
  MainView,
  SwipeUp,
  Widget,
} from '@components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ic24TambahKelas from '@assets/svg/ic24_Tambah_Kelas.svg';
import Ic24TambahMateri from '@assets/svg/ic24_Tambah_materi.svg';
import Ic24TambahPR from '@assets/svg/ic24_tambah_PR.svg';
import Ic24TambahUjian from '@assets/svg/ic24_tambah_ujian.svg';
import LogoAsesmenFormatif from '@assets/svg/ic_asesmen_formatif.svg';
import LogoAsesmenSumatif from '@assets/svg/ic_asesmen_sumatif.svg';
import LogoPractice from '@assets/svg/ic32_practice.svg';
import LogoTest from '@assets/svg/ic32_test.svg';
import ForbiddenRobotIcon from '@assets/svg/robot_sedih.svg';
import Fonts from '@constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {STATUSBAR_HEIGHT, isStringContains} from '@constants/functional';
import IconPhone from '@assets/svg/ic24_phone.svg';
import IconMail from '@assets/svg/mail.svg';
import IconSchool from '@assets/svg/Sekolah.svg';
import IcLaporan from '@assets/svg/ic24_laporan.svg';
import {fetchSchool} from '@redux';
import {Button} from '@components/atoms';
import {RootState} from 'src/redux/rootReducer';
import {generalStyles} from '@constants/styles';
import {useCoachmark} from '@hooks/useCoachmark';
import {ParamList} from 'type/screen';
import {MenuGuruIKM, RowMenuGuruIKM} from '@features/IKM/TeacherIKM/components';
import useHomeIKM from '../HomeScreen/useHomeIKM';
import SwipeupIkmActiveCuriculum from '../HomeScreen/components/SwipeupIkmActiveCuriculum';
import SwipeupIkmActivePhase from '../HomeScreen/components/SwipeupIkmActivePhase';
import FilterChip from '@components/molecules/Subjects/components/FilterChip';
import {SwipeUpAllSubjects} from '../HomeScreen/components/SwipeUpAllSubjects';
import {SubjectType} from '@constants/subjectType';
import {useHomeScreen} from '../HomeScreen/useHomeScreen';
import TeacherSubject from './component/TeacherSubject';
import SwipeupSettingFav from '../HomeScreen/components/SwipeupSettingFav';
import RenderImage from '@components/atoms/RenderImage';
import Information from '@components/organism/Information';

const window = Dimensions.get('window');

const HomeScreenGuru = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreenGuru'>>();
  const {school, getUser}: any = useSelector((state: RootState) => state);

  const {name, address, phone_number, email} = getUser?.data?.school || false;
  const [isShowSwipeUpMenu, setIsShowSwipeUpMenu] = useState<boolean>(false);
  const [isShowSwipeUpTentangSekolah, setIsShowSwipeUpTentangSekolah] =
    useState<boolean>(false);
  const servicesView = 0;
  const [classData, setClassData]: any = useState([]);
  const [isShowAllSubjects, setIsShowAllSubjects] = useState(false);
  const [isShowPracticeSubjects, setIsShowPracticeSubjects] = useState(false);
  const [isShowTestSubjects, setIsShowTestSubjects] = useState(false);
  const [isShowForbiddenAccess, setIsShowForbiddenAccess] =
    useState<boolean>(false);
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
    listClass,
    activeClass,
    setActiveClass,
    toggleActiveClass,
    showActiveClass,
  } = useHomeIKM();

  const {
    scrollView: scrollViewRef,
    Coachmarks,
    doneCoachMark,
    StopableScrollView,
    _handlerCoachmark,
  } = useCoachmark(Keys.coachmark_mobile_dashboard);

  const {
    handleSubmitFavorite,
    getSubjectsByClass,
    listSubjectAll,
    localListSubjectFav,
    isShowSettingFav,
    setIsShowSettingFav,
  } = useHomeScreen();

  const totalCoachMark: number = 3;

  useLayoutEffect(() => {
    // dispatch(fetchGetUser());
  }, []);

  const isIkm = isStringContains(activeCuriculum.name || '', 'merdeka');

  const MenuFAB = [
    {
      id: 1,
      icon: <Ic24TambahKelas width={24} height={24} />,
      title: 'Buat Sesi Kelas',
      backgroundColor: Colors.pink.light,
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('LMSTeacherFormClassSessionScreen', {});
      },
    },
    {
      id: 2,
      icon: <Ic24TambahMateri width={24} height={24} />,
      title: 'Unggah Materi Sekolah',
      backgroundColor: Colors.lightBlue.light2,
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('AddSchoolMaterialsScreen');
      },
    },
    {
      id: 3,
      icon: <Ic24TambahPR width={24} height={24} />,
      backgroundColor: Colors.green.light2,
      title: 'Buat PR/Projek/Tugas',
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('LMSTeacherTaskCreateScreen', {});
      },
    },
    {
      id: 4,
      icon: <Ic24TambahUjian width={24} height={24} />,
      backgroundColor: Colors.violet.light2,
      title: 'Jadwalkan Ujian',
      onPress: () => {
        setIsShowSwipeUpMenu(false);
        navigation.navigate('UjianScreen', {});
      },
    },
  ];
  const _renderSwipeUpUpMenu = () => {
    return (
      <View style={styles.containerSwipeUp}>
        {MenuFAB?.map((i: any, idx: number) => (
          <TouchableOpacity
            key={idx}
            onPress={i?.onPress}
            style={[
              styles.containerFAB,
              {backgroundColor: i?.backgroundColor ? i.backgroundColor : null},
            ]}>
            <View style={styles.subContainerFAB}>
              {i?.icon}
              <Text style={styles.titleFAB}>{i?.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchSchool(getUser?.data?.school_id));
  }, [getUser?.data?.school_id]);

  const [show, setShow] = useState(false);
  const handlePress = () => {
    setShow(!show);
  };

  const _renderTentangSekolah = () => {
    const data = [
      {
        id: 1,
        icon: <IconSchool />,
        title: address || '-',
      },
      {
        id: 2,
        icon: <IconPhone />,
        title: phone_number || '-',
      },
      {
        id: 3,
        icon: <IconMail />,
        title: email || '-',
      },
    ];

    return (
      <View style={styles.swipeUpContainer}>
        {/* {path_url?.endsWith('svg') ? (
          <SvgUri
            uri={school?.data?.degree?.icon_path_url}
            height={72}
            width={72}
          />
        ) : (
          <Image
            style={{width: 72, height: 72}}
            source={{
              uri: school?.data?.icon_path_url,
            }}
          />
        )} */}
        <RenderImage
          height={72}
          width={72}
          imageUrl={school?.data?.icon_path_url}
          // source={{
          //   uri: school?.data?.icon_path_url,
          // }}
        />
        <Text style={[styles.schoolTitle, {marginTop: 12, fontSize: 18}]}>
          {name}
        </Text>
        <View style={styles.address}>
          {data?.map((item: any, index: any) => (
            <View
              key={`lmsHome${item.id || index}`}
              style={{flexDirection: 'row', paddingTop: 8}}>
              {item.icon}
              <Text style={styles.addressTitle}>
                {item?.title ? item.title : '-'}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.swpBottomContentSoal}>
          <Button
            label={'Tutup'}
            style={styles.closeButton}
            background={Colors.primary.base}
            color={Colors.white}
            action={() => {
              setIsShowSwipeUpTentangSekolah(false);
            }}
          />
        </View>
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
  const renderChildrenSwipeUpActiveClass = () => {
    return (
      <SwipeupIkmActivePhase
        activeData={activeClass}
        data={listClass}
        onPressActivePhase={item => {
          setActiveClass(item);
          toggleActiveClass();
        }}
      />
    );
  };

  const renderChildrenSwipeUpPractice = () => {
    return (
      <View style={styles.swpContainer}>
        <View style={styles.swpTopContent}>
          <View style={styles.swpTopInnerContent}>
            <View style={styles.swpTopBodyContent}>
              {isIkm ? <LogoAsesmenFormatif /> : <LogoPractice />}
              <Text style={styles.swpTopTitle}>
                {isIkm ? 'Asesmen Formatif' : 'Practice'}
              </Text>
            </View>
            <View style={styles.swpTopTitle2Container}>
              <Text style={styles.swpTopTitle2}>Mau latihan apa hari ini?</Text>
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
                            setIsShowPracticeSubjects(false);
                            navigation.navigate('ChapterKPRegularScreen', {
                              subject_data: ie,
                              subject_type: SubjectType?.KPRegular?.Practice,
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
            rightIcon={true}
            iconLeft={<IcLaporan />}
            action={() => {
              setIsShowPracticeSubjects(false);
              navigation.navigate('KPRegularLaporanScreen');
            }}
          />
        </View>
      </View>
    );
  };

  const renderChildrenSwipeUpTest = () => {
    if (getUser?.data?.class_id <= 3) {
      return (
        <View style={styles.forbiddenTestContainerStyle}>
          <View style={styles.forbiddenTestIconContainerStyle}>
            <ForbiddenRobotIcon />
          </View>
          <Text style={styles.forbiddenTestDescriptionTopStyle}>
            Tidak Dapat Mengakses{'\n'}Kelas Pintar Regular Asesmen Sumatif
          </Text>
          <Text style={styles.forbiddenTestDescriptionBottomStyle}>
            Kelas Pintar Regular Asesmen Sumatif hanya dapat{'\n'}diakses oleh
            murid kelas 4-6 SD, SMP dan{'\n'}SMA.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.swpContainer}>
          <View style={styles.swpTopContent}>
            <View style={styles.swpTopInnerContent}>
              <View style={styles.swpTopBodyContent}>
                {isIkm ? <LogoAsesmenSumatif /> : <LogoTest />}
                <Text style={styles.swpTopTitle}>
                  {isIkm ? 'Asesmen Sumatif' : 'Test'}
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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.sectionContainer}>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <HeaderBerandaNonMurid
          type={'Guru'}
          style={{paddingTop: STATUSBAR_HEIGHT}}
        />
        <View style={[styles.content]}>
          <StopableScrollView ref={scrollViewRef} style={styles.container}>
            {/* // card */}
            <View style={[styles.card, styles.shadowProp]}>
              {/* Tentang sekolah */}
              <CoachmarkLib
                ref={ref => (Coachmarks[0] = ref)}
                onNext={() => _handlerCoachmark(1)}
                onSkip={doneCoachMark}
                buttonOnContent
                queue={1}
                backgroundColor={Colors.white}
                totalCoachmark={totalCoachMark}
                contentContainerStyle={[generalStyles.contentFlexWhite]}
                childrenStyle={styles.borderCard}
                buttonSkipText={'Lewati'}
                title={'Aktivitas LMS'}
                message={
                  'Buat sesi kelas, materi sekolah, tugas, dan ujian dengan sistem LMS berbasis teknologi di sini.'
                }>
                <>
                  <AboutSchool
                    action={() => setIsShowSwipeUpTentangSekolah(true)}
                    schoolImage={school?.data?.icon_path_url}
                  />

                  <View style={styles.rowCurriculum}>
                    <FilterChip
                      activeData={activeCuriculum}
                      onPress={toggleActiveCuriculum}
                      title={activeCuriculum?.name || 'Pilih Kurikulum'}
                    />
                    {!isStringContains(
                      activeCuriculum.name || '',
                      'merdeka',
                    ) && (
                      <FilterChip
                        activeData={activeClass}
                        onPress={toggleActiveClass}
                        title={activeClass?.name || 'Kelas 1'}
                      />
                    )}
                    {isStringContains(
                      activeCuriculum.name || '',
                      'merdeka',
                    ) && (
                      <FilterChip
                        activeData={activePhaseClass}
                        onPress={toggleActivePhase}
                        title={activePhaseClass?.name || 'Fase A'}
                      />
                    )}
                  </View>
                  {/* section menu */}

                  {activeCuriculum?.name === 'Kurikulum 2013' ? (
                    <MenuGuru show={show} />
                  ) : (
                    <MenuGuruIKM show={show} />
                  )}
                </>
              </CoachmarkLib>
              <View style={styles.centering}>
                <CoachmarkLib
                  ref={ref => (Coachmarks[1] = ref)}
                  onNext={() => _handlerCoachmark(2)}
                  onShow={() => scrollViewRef?.current?.stop()}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={2}
                  childrenStyle={styles.borderCard}
                  totalCoachmark={totalCoachMark}
                  buttonSkipText={'Lewati'}
                  title={'Menu Lainnya'}
                  message={
                    'Akses IKM, AKM, Rapat Virtual, Projek Pancasila dan Forum Diskusi di sini.'
                  }>
                  {show ? (
                    <Pressable
                      onPress={handlePress}
                      style={[styles.button, {marginBottom: 8}]}>
                      <Text style={styles.textBtn}>Sembunyikan </Text>
                      <Icon
                        name="chevron-up"
                        size={12}
                        color={Colors.primary.base}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={handlePress}
                      style={[styles.button, {marginBottom: 16}]}>
                      <Text style={styles.textBtn}>Menu Lainnya </Text>
                      <Icon
                        name="chevron-down"
                        size={12}
                        color={Colors.primary.base}
                      />
                    </Pressable>
                  )}
                </CoachmarkLib>
              </View>

              {/* IKM Content */}
              {activeCuriculum?.name !== 'Kurikulum 2013' ? (
                <MainView>
                  <RowMenuGuruIKM />
                </MainView>
              ) : null}
              <TeacherSubject
                navigation={navigation}
                activeCuriculum={activeCuriculum}
                activePhase={activePhaseClass}
                onPressActiveCuriculum={toggleActiveCuriculum}
                onPressActivePhase={toggleActivePhase}
                scrollViewRef={scrollViewRef}
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                totalCoachmark={totalCoachMark}
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
                subjectClass={getSubjectsByClass?.data}
                onNextSubjects={() =>
                  scrollViewRef.scrollTo({
                    x: 0,
                    y: servicesView - 24,
                    animated: true,
                  })
                }
              />
            </View>
            <AnnouncementWidget />
            <ScheduleTodayWithList accountRole="GURU" />
            <Checking />
            <Information />
          </StopableScrollView>
        </View>

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
        <SwipeUp
          isSwipeLine={true}
          visible={showActiveClass}
          onClose={() => toggleActiveClass()}
          height={500}
          children={renderChildrenSwipeUpActiveClass()}
        />
        <SwipeUp
          height={100}
          visible={isShowSwipeUpMenu}
          onClose={() => setIsShowSwipeUpMenu(false)}
          children={_renderSwipeUpUpMenu()}
        />
        <SwipeUp
          height={500}
          visible={isShowSwipeUpTentangSekolah}
          onClose={() => setIsShowSwipeUpTentangSekolah(false)}
          children={_renderTentangSekolah()}
        />
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
              isIKM={isIkm}
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
      </View>
      <FABPlus
        queue={3}
        Coachmarks={Coachmarks}
        doneCoachMark={doneCoachMark}
        scrollViewRef={scrollViewRef}
        totalCoachmark={totalCoachMark}
        _handlerCoachmark={_handlerCoachmark}
        message="Ketuk tombol “+” untuk membuat sesi kelas, ujian, tugas, dan materi sekolah."
        onPress={() => setIsShowSwipeUpMenu(true)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: Colors.primary.light4,
  },
  imageBackgound: {},
  sectionContainer: {
    marginBottom: '43%',
  },
  content: {
    backgroundColor: Colors.primary.light4,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    marginTop: -16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  kurikulum: {
    gap: 4,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 8,
    flexFlow: 'column wrap',
    borderRadius: 25,
  },
  titleFAB: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    letterSpacing: 0.25,
    lineHeight: 18,
    fontSize: 14,
    color: Colors.dark.neutral100,
    paddingTop: 8,
  },
  containerFAB: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 30,
    paddingRight: 12,
    backgroundColor: 'red',
    width: '45%',
    marginTop: 8,
    height: 92,
    borderRadius: 10,
  },
  subContainerFAB: {
    flexDirection: 'column',
  },
  containerSwipeUp: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 16,
  },
  swipeUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  swpContainer: {height: 400, width: '100%', marginTop: 10},
  schoolTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  schoolSubtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
  },
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  addressTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.25,
    paddingLeft: 5,
    color: Colors.dark.neutral80,
  },
  swpBottomContentSoal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  closeButton: {
    width: window.width * 0.9,
  },
  activeCuriculum: {color: Colors.primary.base, fontWeight: '600'},
  container: {
    marginBottom: 50,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  rowCurriculum: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  borderCard: {
    borderRadius: 12,
  },
  settingFavContainer: {width: '100%', height: 600, backgroundColor: 'white'},
  settingFavTopContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingFavTopTitleContainer: {
    width: '100%',
    marginTop: '2%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
  },
  settingFavTopTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomContentContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  settingFavEmptyIcon: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingFavBottomContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  settingFavBottomTitlecontainer: {width: '100%', paddingHorizontal: '5%'},
  settingFavBottomTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomScrollView: {marginTop: '5%', marginBottom: '10%'},
  settingFavBottomSubjectContainer: {marginHorizontal: 5, marginBottom: 20},
  settingFavSubmitButtonContainer: {marginHorizontal: '5%'},
  mh10: {marginHorizontal: 10},
  swpTopContent: {flex: 1, alignItems: 'center'},
  swpTopBodyContent: {flexDirection: 'row', alignItems: 'center'},
  swpTopTitle: {
    marginLeft: '1%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 18,
  },
  swpTopInnerContent: {
    flex: 1,
    alignItems: 'center',
  },
  swpTopTitle2Container: {flexDirection: 'row', alignItems: 'center'},
  swpTopTitle2: {
    marginLeft: '1%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    marginTop: '1%',
    fontSize: 20,
    lineHeight: 28,
  },
  swpMiddleContent: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  swpMiddleContent2: {
    width: '100%',
    height: 250,
  },
  swpMiddleInnerContent: {
    alignItems: 'center',
    marginVertical: 10,
    height: 100,
    marginHorizontal: 10,
  },
  swpMiddleScrollViewInner: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  swpBottomContent: {
    flex: 1.4,
    paddingHorizontal: '10%',
    justifyContent: 'center',
  },
  forbiddenTestContainerStyle: {
    alignItems: 'center',
    paddingBottom: 24,
    marginHorizontal: 10,
  },
  forbiddenTestIconContainerStyle: {marginTop: 28, marginBottom: 8},
  forbiddenTestDescriptionTopStyle: {
    marginTop: 10,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  forbiddenTestDescriptionBottomStyle: {
    marginTop: 10,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
});

export default HomeScreenGuru;
