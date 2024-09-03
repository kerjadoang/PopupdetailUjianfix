import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {Header} from '@components/atoms/Header';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import {Button, ButtonIconColor, SwipeUp} from '@components/atoms';
import useLMSHomeScreen from './useLMSHomeScreen';
import IconPhone from '@assets/svg/ic24_phone.svg';
import IconMail from '@assets/svg/mail.svg';
import IconSchool from '@assets/svg/Sekolah.svg';
import Fonts from '@constants/fonts';
import {SvgUri} from 'react-native-svg';
import AnnouncementBanner from './components/AnnouncementBanner';
import PurchaseHistory from '@assets/svg/ic24_riwayat_pembayaran.svg';
import MenuLMS from './components/MenuLMS';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
import ExamCard from './components/ExamCard';
import SessionClassCard from './components/SessionClassCard';
import useAnnouncementWidget from './components/useAnnouncementWidget';
import {SwipeUpAllSubjects} from '../HomeScreen/components/SwipeUpAllSubjects';
import MateriSekolah from '@assets/svg/ic48_materi_sekolah_primarylight2.svg';
import Tugas from '@assets/svg/ic48_pr_tugas_alert_secondarylight.svg';
import Ujian from '@assets/svg/ic48_ujian.svg';
import AKM from '@assets/svg/ic48_akm.svg';
import IconLKPD from '@assets/svg/ic48_erapor_bgblue.svg';
import ProyekPancasila from '@assets/svg/ic48_ProjekPancasila.svg';
import NavigateCard from './components/NavigateCard';
import IconJadwal from '@assets/svg/ic24_jadwal.svg';
import IconHistory from '@assets/svg/ic24_history_blue.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '@hooks/getToken';
import {ParamList} from 'type/screen';
import RenderImage from '@components/atoms/RenderImage';
import {useActiveCurriculum} from '@features/IKM/zustand';
import {ILMSMuridUjianListResponseData} from '@services/lms/type';

const LMSHomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSHomeScreen'>>();
  const {
    school,
    isShowAboutSchool,
    setIsShowAboutSchool,
    classData,
    SessionClass,
    examCount,
    taskCount,
    isShowAllSubjects,
    setIsShowAllSubjects,
    handleSwipeUpAllSubject,
    fetchAllData,
    filteredAllExam,
  } = useLMSHomeScreen();
  const {announcement}: any = useAnnouncementWidget();
  const [token, setToken] = useState<string>('');
  const activeCurriculum: ICurriculum = useActiveCurriculum();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getToken();
        setToken(data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchToken();
  }, []);

  const menuLMS = [
    {
      name: 'Materi Sekolah',
      image: <MateriSekolah height={48} width={48} />,
      onPress: () => {
        setIsShowAllSubjects(true);
      },
    },
    {
      name: 'PR. Projek & Tugas',
      image: <Tugas height={48} width={48} />,
      onPress: () => navigation.navigate('LMSPRTugasScreen', {}),
      number: taskCount ? taskCount : null,
    },
    {
      name: 'LKPD',
      image: <IconLKPD />,
      onPress: () => {
        navigation.navigate('LkpdStudentScreen', {});
      },
    },
    {
      name: 'Ujian',
      image: <Ujian height={48} width={48} />,
      onPress: () => {
        navigation.navigate('LMSUjian');
      },
      number: examCount ? examCount : null,
    },
    {
      name: 'AKM',
      image: <AKM height={48} width={48} />,
      onPress: () => {},
    },
    {
      name: 'Projek\nPancasila',
      image: <ProyekPancasila height={48} width={48} />,
      onPress: () => {
        navigation.navigate('PancasilaProjectScreen');
      },
    },
  ];

  const renderChildrenSwipeUpAboutSchool = () => {
    const data = [
      {
        icon: <IconSchool />,
        title: school?.data?.address,
      },
      {
        icon: <IconPhone />,
        title: school?.data?.phone_number,
      },
      {
        icon: <IconMail />,
        title: school?.data?.email,
      },
    ];

    return (
      <View style={styles.swipeUpContainer}>
        {school?.data?.degree?.icon_path_url?.endsWith('svg') ? (
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
        )}
        <Text style={[styles.schoolTitle, {marginTop: 12, fontSize: 18}]}>
          {school.data?.name}
        </Text>
        <View style={styles.address}>
          {data?.map((item: any, index: any) => (
            <View
              key={`lmsHome${index}`}
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
              setIsShowAboutSchool(false);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'LMS'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topCardContainer}>
            <RenderImage
              imageUrl={school?.data?.icon_path_url}
              resizeMode="cover"
              height={56}
              width={56}
              containerStyle={{
                borderRadius: 28,
                overflow: 'hidden',
              }}
            />
            <View style={{flexDirection: 'column', marginLeft: 16}}>
              <Text style={styles.schoolTitle}>
                {school?.data?.name ? school.data.name : ''}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsShowAboutSchool(true);
                }}>
                <Text style={styles.schoolSubtitle}>{'Tentang Sekolah >'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            {announcement?.data?.length !== 0 && <AnnouncementBanner />}
            <MenuLMS menuLMS={menuLMS} activeCurriculum={activeCurriculum} />
            <ButtonIconColor
              rightIconCustom={<IconRight width={16} height={16} />}
              leftIcon={<PurchaseHistory />}
              title={'Riwayat Administrasi'}
              onPress={() => {
                navigation.navigate('AdministrativeScreen');
              }}
              stylesContainer={{marginTop: 16}}
            />
          </View>
          <View style={styles.bottomContainer}>
            {filteredAllExam?.length !== 0 && (
              <View>
                <Text style={styles.bottomTitle}>Ujian Berlangsung</Text>
                <View style={styles.examContainer}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled>
                    {filteredAllExam?.map(
                      (item: ILMSMuridUjianListResponseData, index: number) => {
                        return (
                          <ExamCard
                            data={item}
                            key={index}
                            handleSubmit={() => {
                              navigation.navigate('LMSUjianTestCameraScreen', {
                                data: item,
                              });
                            }}
                            refetchData={fetchAllData}
                          />
                        );
                      },
                    )}
                  </ScrollView>
                </View>
              </View>
            )}
            {SessionClass?.length !== 0 && SessionClass !== undefined && (
              <View>
                <Text style={styles.bottomTitle}>Sesi Kelas</Text>
                <View style={[styles.examContainer]}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled>
                    {SessionClass?.map((item: any, index: number): any => (
                      <SessionClassCard
                        data={item}
                        key={index}
                        onPress={() => {
                          navigation.navigate('ClassSessionDetailScreen', {
                            id: item?.id_relation,
                          });
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <NavigateCard
                icon={<IconJadwal width={24} height={24} />}
                title={'Jadwal Sesi Kelas'}
                onPress={() =>
                  navigation.navigate('ScheduleScreen', {
                    filter: 'semua',
                    screen: 'Sesi Kelas',
                    loginAs: 'MURID',
                    token: token,
                    data: {},
                  })
                }
              />
              <NavigateCard
                icon={<IconHistory width={24} height={24} />}
                title={'Riwayat & Rekaman'}
                onPress={() =>
                  navigation.navigate('HistoryAndRecordsScreen', {
                    screenName: 'Sesi Kelas',
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowAboutSchool}
        onClose={() => {
          setIsShowAboutSchool(false);
        }}
        height={500}
        children={renderChildrenSwipeUpAboutSchool()}
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
            onPressSubject={(subjectData: any) =>
              handleSwipeUpAllSubject(subjectData)
            }
            onPressSubjectReport={() => {
              setIsShowAllSubjects(false);
            }}
            isFromLMS
            subjectData={classData}
          />
        }
      />
    </View>
  );
};

export {LMSHomeScreen};
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  contentContainerStyle: {},
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.primary.background,
    paddingBottom: 32,
    flexGrow: 1,
  },
  topTitle: {
    marginLeft: '1%',
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
    marginTop: '2%',
    fontSize: 14,
    lineHeight: 18,
  },
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
  topCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  middleContainer: {
    marginTop: 24,
    flexDirection: 'column',
  },
  bottomContainer: {
    flexDirection: 'column',

    marginBottom: '20%',
  },
  bottomTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  examContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: -15,
    marginTop: -16,
  },
});
