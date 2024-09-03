import {
  CoachmarkLib,
  FABPlus,
  SwipeUp,
  SwipeUpAboutSchool,
} from '@components/atoms';
import {
  AboutSchool,
  // AboutSchool,
  HeaderBerandaNonMurid,
  MenuAdmin,
  // MenuGuru,
} from '@components/molecules';
import {
  Anouncement,
  Information,
  ScheduleTodayWithList,
  Verification,
} from '@components/organism';
import Colors from '@constants/colors';
import {Keys} from '@constants/keys';
import {fetchClassByDegree, fetchSchool} from '@redux';
import React, {useEffect, useState} from 'react'; // useRef, useCallback, RefObject,useEffect
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import Ic24TambahKelas from '@assets/svg/ic24_Tambah_Kelas.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import Fonts from '@constants/fonts';
import {useCoachmark} from '@hooks/useCoachmark';
import {generalStyles} from '@constants/styles';

const window = Dimensions.get('window');

const HomeScreenAdmin = () => {
  const dispatch = useDispatch();
  const [isShowSwipeUpMenu, setIsShowSwipeUpMenu] = useState<boolean>(false);

  const [isShowAboutSchool, setIsShowAboutSchool] = useState(false);
  const [refForScroll, setRefForScroll] = useState<any>(null);
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreenAdmin'>>();

  const {getUser, school}: any = useSelector((state: RootState) => state);

  const {scrollView, Coachmarks, doneCoachMark, _handlerCoachmark} =
    useCoachmark(Keys.coachmark_mobile_dashboard);

  useEffect(() => {
    if (getUser) {
      dispatch(fetchClassByDegree(getUser?.data?.school?.degree_id));
      dispatch(fetchSchool(getUser?.data.school_id));
    }
  }, [getUser]);

  const _renderSwipeUpUpMenu = () => {
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
                onPress={() => {
                  setIsShowSwipeUpMenu(false);
                  navigation.navigate('AdminListVerificationScreen');
                }}
                style={[styles.containerFAB, {backgroundColor: '#FFF2F7'}]}>
                <View style={styles.subContainerFAB}>
                  <Ic24TambahKelas width={24} height={24} />
                  <Text style={styles.titleFAB}>Unggah Bukti Pembayaran</Text>
                </View>
              </Pressable>
            </View>
            <View style={{flex: 1}}>
              <Pressable
                onPress={() => {
                  setIsShowSwipeUpMenu(false);
                  navigation.navigate('RapatVirtualTeacherScreen', {
                    type: 'ADMIN',
                  });
                }}
                style={[styles.containerFAB, {backgroundColor: '#E1F4FE'}]}>
                <View style={styles.subContainerFAB}>
                  <Ic24TambahKelas width={24} height={24} />
                  <Text style={styles.titleFAB}>Buat Rapat Virtual</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              gap: 16,
            }}>
            <View style={{flex: 1}}>
              <Pressable
                onPress={() => {
                  setIsShowSwipeUpMenu(false);
                  navigation.navigate('AnnouncementManageScreen');
                }}
                style={[styles.containerFAB, {backgroundColor: '#E6F5EE'}]}>
                <View style={styles.subContainerFAB}>
                  <Ic24TambahKelas width={24} height={24} />
                  <Text style={styles.titleFAB}>Buat Pengumuman</Text>
                </View>
              </Pressable>
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
      </View>
    );
  };

  const renderChildrenSwipeUpAboutSchool = () => {
    return (
      <SwipeUpAboutSchool
        school={school?.data}
        action={() => {
          setIsShowAboutSchool(false);
        }}
      />
    );
  };

  const totalCoachmark = 4;

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.sectionContainer}>
        <HeaderBerandaNonMurid type={'Admin'} />
        <View style={styles.content}>
          <ScrollView ref={(ref: any) => setRefForScroll(ref)}>
            <View style={[styles.card, styles.shadowProp]}>
              <CoachmarkLib
                ref={ref => (Coachmarks[0] = ref)}
                onNext={() => {
                  _handlerCoachmark(1);
                  refForScroll?.scrollTo({
                    x: 0,
                    y: 150,
                    animated: true,
                  });
                }}
                onSkip={doneCoachMark}
                buttonOnContent
                queue={1}
                arrowMiddle
                totalCoachmark={totalCoachmark}
                childrenStyle={styles.borderCard}
                contentContainerStyle={generalStyles.contentFlex}
                buttonSkipText={'Lewati'}
                title={'LMS'}
                message={
                  'Akses fitur sekolah digital dengan sistem berbasis teknologi di sini.'
                }>
                <View style={styles.menuWhite}>
                  <AboutSchool
                    action={() => setIsShowAboutSchool(true)}
                    schoolImage={school?.data?.icon_path_url}
                  />
                  <MenuAdmin />
                </View>
              </CoachmarkLib>
            </View>
            <View style={styles.gap16} />
            <CoachmarkLib
              ref={ref => (Coachmarks[1] = ref)}
              onNext={() => {
                _handlerCoachmark(2);
                refForScroll?.scrollTo({
                  x: 0,
                  y: 384,
                  animated: true,
                });
              }}
              onSkip={doneCoachMark}
              buttonOnContent
              queue={2}
              totalCoachmark={totalCoachmark}
              contentContainerStyle={generalStyles.contentFlexWhite}
              buttonSkipText={'Lewati'}
              childrenStyle={styles.borderCard}
              title={'Pengumuman'}
              message={
                'Klik untuk cek atau kelola pengumuman yang dibuat oleh Admin/Kepsek.'
              }>
              <View style={styles.chips}>
                <Anouncement type={'Kepsek'} token={''} />
              </View>
            </CoachmarkLib>
            <CoachmarkLib
              ref={ref => (Coachmarks[2] = ref)}
              onNext={() => {
                _handlerCoachmark(3);
              }}
              onSkip={doneCoachMark}
              buttonOnContent
              queue={3}
              totalCoachmark={totalCoachmark}
              childrenStyle={styles.borderCard}
              contentContainerStyle={generalStyles.contentFlex}
              buttonSkipText={'Lewati'}
              title={'Verifikasi Administrasi'}
              message={
                'Verifikasi administrasi di sini. Anda dapat menolak atau menerima proses verifikasi.'
              }>
              <View style={styles.chips}>
                <Verification />
              </View>
            </CoachmarkLib>

            <View>
              <ScheduleTodayWithList accountRole={'ADMIN'} />
            </View>

            <Information />
          </ScrollView>
        </View>

        <SwipeUp
          height={100}
          visible={isShowSwipeUpMenu}
          onClose={() => setIsShowSwipeUpMenu(false)}
          children={_renderSwipeUpUpMenu()}
        />
        <SwipeUp
          isSwipeLine={true}
          visible={isShowAboutSchool}
          onClose={() => {
            setIsShowAboutSchool(false);
          }}
          height={500}
          children={renderChildrenSwipeUpAboutSchool()}
        />
        <View style={styles.buttonPlusOverlay}>
          <FABPlus
            queue={4}
            Coachmarks={Coachmarks}
            doneCoachMark={doneCoachMark}
            scrollViewRef={scrollView}
            totalCoachmark={totalCoachmark}
            _handlerCoachmark={_handlerCoachmark}
            message="Ketuk tombol “+” untuk mengunggah bukti pembayaran, membuat rapat virtual dan pengumuman."
            onPress={() => setIsShowSwipeUpMenu(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  anakSaya: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
  tambahAkun: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  sectionContainer: {
    marginBottom: 200,
  },
  content: {
    backgroundColor: Colors.primary.light4,
    padding: 16,
    height: '100%',
    marginTop: -16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderRadius: 20,
    width: '100%',
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
  schoolTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginVertical: 8,
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
  closeButton: {
    width: window.width * 0.9,
  },
  chips: {
    borderRadius: 20,
    backgroundColor: Colors.primary.light4,
  },
  menuWhite: {
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  buttonPlusOverlay: {
    bottom: -24,
  },
  gap16: {
    marginTop: 16,
  },
  borderCard: {borderRadius: 24},
});

export default HomeScreenAdmin;
