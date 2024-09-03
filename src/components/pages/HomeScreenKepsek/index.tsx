/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {AboutSchool, HeaderBerandaNonMurid} from '@components/molecules';
import {MenuKepsek} from '@components/molecules/MenuKepsek';
import {Anouncement, ScheduleTodayWithList} from '@components/organism';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import {
  CoachmarkLib,
  FABPlus,
  SwipeUp,
  SwipeUpAboutSchool,
} from '@components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSchool} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import {fetchClassByDegree} from '@redux';
import Ic24Rapat from '@assets/svg/ic24_rapat.svg';
import Ic24Pengumuman from '@assets/svg/ic24_pengumuman.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native-paper';
import Fonts from '@constants/fonts';
import {Keys} from '@constants/keys';
import {useCoachmark} from '@hooks/useCoachmark';
import {generalStyles} from '@constants/styles';
import Information from '@components/organism/Information';

const HomeScreenKepsek = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreenKepsek'>>();
  const [isShowSwipeUpMenu, setIsShowSwipeUpMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isShowAboutSchool, setIsShowAboutSchool] = useState(false);
  const {getUser, school}: any = useSelector((state: RootState) => state);

  useEffect(() => {
    // dispatch(fetchGetUser());
  }, []);

  useEffect(() => {
    dispatch(fetchClassByDegree(getUser?.data?.school?.degree_id));
    dispatch(fetchSchool(getUser?.data.school_id));
  }, [getUser]);

  const {
    scrollView: scrollViewRef,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
  } = useCoachmark(Keys.coachmark_mobile_dashboard);

  const totalCoachMark = 3;
  const [refForScroll, setRefForScroll] = useState<any>(null);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.sectionContainer}>
        <HeaderBerandaNonMurid type={'Kepsek'} />
        <View style={styles.content}>
          <ScrollView ref={(ref: any) => setRefForScroll(ref)}>
            {/* // card */}
            <CoachmarkLib
              ref={ref => (Coachmarks[0] = ref)}
              onNext={() => {
                _handlerCoachmark(1);
                refForScroll?.scrollTo({
                  x: 0,
                  y: 320,
                  animated: true,
                });
              }}
              onSkip={doneCoachMark}
              buttonOnContent
              queue={1}
              arrowMiddle
              totalCoachmark={totalCoachMark}
              contentContainerStyle={generalStyles.contentFlex}
              childrenStyle={styles.borderCard}
              buttonSkipText={'Lewati'}
              title={'LMS'}
              message={
                'Akses fitur sekolah digital dengan sistem berbasis teknologi di sini. '
              }>
              <View style={[styles.card, styles.shadowProp]}>
                {/* Tentang sekolah */}
                <AboutSchool
                  action={() => setIsShowAboutSchool(true)}
                  schoolImage={school?.data?.icon_path_url}
                />
                {/* section menu */}
                <MenuKepsek />
              </View>
            </CoachmarkLib>
            <View style={styles.gap32} />
            <CoachmarkLib
              ref={ref => (Coachmarks[1] = ref)}
              onNext={() => _handlerCoachmark(2)}
              onShow={() => refForScroll?.current?.stop()}
              onSkip={doneCoachMark}
              buttonOnContent
              queue={2}
              arrowMiddle
              totalCoachmark={totalCoachMark}
              childrenStyle={{borderRadius: 24}}
              contentContainerStyle={generalStyles.contentFlexWhite}
              buttonSkipText={'Lewati'}
              title={'Pengumuman'}
              message={
                'Klik untuk cek atau kelola pengumuman yang dibuat oleh Admin/Kepsek.'
              }>
              <Anouncement type={'Kepsek'} token="" />
            </CoachmarkLib>

            <ScheduleTodayWithList accountRole="KEPSEK" />
            <Information />

            <SwipeUp
              isSwipeLine={true}
              visible={isShowAboutSchool}
              onClose={() => {
                setIsShowAboutSchool(false);
              }}
              height={500}
              children={renderChildrenSwipeUpAboutSchool(
                school,
                setIsShowAboutSchool,
              )}
            />
          </ScrollView>
        </View>
      </View>
      <FABPlus
        onPress={() => setIsShowSwipeUpMenu(true)}
        Coachmarks={Coachmarks}
        totalCoachmark={totalCoachMark}
        doneCoachMark={doneCoachMark}
        scrollViewRef={scrollViewRef}
        _handlerCoachmark={_handlerCoachmark}
        queue={3}
      />
      <SwipeUp
        height={100}
        visible={isShowSwipeUpMenu}
        onClose={() => setIsShowSwipeUpMenu(false)}
        children={_renderSwipeUpUpMenu(setIsShowSwipeUpMenu, navigation)}
      />
    </SafeAreaView>
  );
};

const _renderSwipeUpUpMenu = (setIsShowSwipeUpMenu, navigation) => {
  return (
    <View style={styles.containerSwipeUp}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 16,
          }}>
          <View style={{flex: 1}}>
            <Pressable
              onPress={async () => {
                await setIsShowSwipeUpMenu(false);
                await navigation.navigate('RapatVirtualTeacherScreen');
              }}
              style={[
                styles.containerFAB,
                {backgroundColor: Colors.lightBlue.light2, zIndex: 999},
              ]}>
              <View style={styles.subContainerFAB}>
                <Ic24Rapat width={24} height={24} />
                <Text style={styles.titleFAB}> Buat Rapat Virtual</Text>
              </View>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              onPress={async () => {
                await setIsShowSwipeUpMenu(false);
                await navigation.navigate('AnnouncementManageCreateScreen');
              }}
              style={[
                styles.containerFAB,
                {backgroundColor: Colors.green.light2},
              ]}>
              <View style={styles.subContainerFAB}>
                <Ic24Pengumuman width={24} height={24} />
                <Text style={styles.titleFAB}>Buat Pengumuman</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const renderChildrenSwipeUpAboutSchool = (school, setIsShowAboutSchool) => {
  return (
    <SwipeUpAboutSchool
      school={school?.data}
      action={() => {
        setIsShowAboutSchool(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageBackgound: {},
  sectionContainer: {
    marginBottom: 170,
  },
  content: {
    backgroundColor: Colors.primary.light4,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

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
  containerFAB: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 30,
    paddingRight: 12,
    backgroundColor: 'red',
    width: '100%',
    marginTop: 8,
    height: 92,
    borderRadius: 10,
  },
  subContainerFAB: {
    flexDirection: 'column',
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
  gap32: {marginTop: 16},
  borderCard: {
    borderRadius: 15,
  },
});

export default HomeScreenKepsek;
