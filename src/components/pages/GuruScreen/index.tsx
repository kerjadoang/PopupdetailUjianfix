import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ChildrenSwipeUpServices} from '@components/molecules/ChildrenSwipeUpServices';
import {bgBlueOrnament} from '@assets/images';
import LogoGuru2 from '@assets/svg/logo_guru2.svg';
import LogoGuru from '@assets/svg/logo_guru.svg';
import GuruIcon1 from '@assets/svg/guru_1.svg';
import GuruIcon2 from '@assets/svg/guru_2.svg';
import GuruIcon3 from '@assets/svg/guru_3.svg';
import GuruIcon4 from '@assets/svg/guru_4.svg';
import Maskot from '@assets/svg/play_maskot.svg';
import {Header} from '@components/atoms/Header';
import {useNavigation} from '@react-navigation/native';
import IconInfo from '@assets/svg/ic_info.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {Button, CardClassSession, SwipeUp} from '@components/atoms';
import useGuru from './useGuru';
import {StackNavigationProp} from '@react-navigation/stack';
import {SCREEN_NAME} from '@constants/screen';
import ArrowIcon from '@assets/svg/ic_arrow_left_white.svg';
import {getToken} from '@hooks/getToken';
import {_handlerConvertAllDate} from '@constants/functional';

import AllSUbjectIcon from '@assets/svg/allSubject.svg';
import {SvgUri} from 'react-native-svg';
import {ParamList} from 'type/screen';
import {putRecordSession} from '../PTNLiveClassRecordScreen/utils';

const windowWidth = Dimensions.get('window').width;

const data = [
  {
    icon: <GuruIcon1 />,
    text: 'Belajar Secara Langsung',
    textSubject:
      'Bersama Guru Ahli Kelas Pintar yang berpengalaman dan tersertifikasi.',
  },
  {
    icon: <GuruIcon2 />,
    text: 'Dapat Dipelajari Kembali',
    textSubject:
      'Melalui rekaman sesi kelas bagi kamu yang melewatkan atau ingin mengulang materi.',
  },
  {
    icon: <GuruIcon3 />,
    text: 'Lebih Interaktif',
    textSubject:
      'Karena dapat langsung bertanya kepada Guru Ahli selama kelas berlangsung.',
  },
  {
    icon: <GuruIcon4 />,
    text: 'Materi Lebih Menarik',
    textSubject:
      'Sesuai dengan pelajaran di sekolah yang dikemas secara menarik dan bervariasi.',
  },
];

const RenderChildrenSwipeUpGuru = ({setIsShowServicesSubjects}: any) => {
  return (
    <View>
      <ChildrenSwipeUpServices
        data={data}
        logo={<LogoGuru />}
        title={'Akses fitur GURU dengan berlangganan paket Guru!'}
        OnPressButton1={() => setIsShowServicesSubjects(false)}
        setIsShowServicesSubjects={setIsShowServicesSubjects}
        ButtonLabel1={'Tutup'}
      />
    </View>
  );
};

const ChildrenMapel = ({
  getSubjectsByClass,
  classSessionRekaman,
  setShowSubject,
  showSubject,
}: any) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'GuruScreen'>>();
  return (
    <>
      <View>
        <Text style={[styles.rightTitle, styles.centerText]}>
          Mau tonton video apa hari ini?
        </Text>
        <View style={styles.wrap}>
          {getSubjectsByClass?.data?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.chips}
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.RecordSessionClassSession, {
                    service_type: classSessionRekaman?.data[0]?.service_type,
                    selected_sub_id: item?.id,
                    selected_sub_name: item?.name,
                    isMateriVideo: true,
                  });
                  setShowSubject(!showSubject);
                }}>
                <SvgUri uri={item?.icon_path_url} width={80} height={80} />
                <Text style={styles.subjectName}>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

const GuruScreen = () => {
  const {classSession, classSessionRekaman, getUser, getSubjectsByClass} =
    useGuru();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'GuruScreen'>>();
  const [isShowServicesSubjects, setIsShowServicesSubjects] = useState(false);
  const [token, setToken] = useState<string>('');
  const [showSubject, setShowSubject] = useState(false);
  const [threeSubject, setThreeSubject] = useState([]);

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

  const slice = useCallback(() => {
    if (getSubjectsByClass) {
      setThreeSubject(getSubjectsByClass?.data?.slice(0, 3));
    }
  }, [getSubjectsByClass, setThreeSubject]);

  useEffect(() => {
    slice();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground source={bgBlueOrnament} style={styles.header}>
          <Header
            iconLeft={<ArrowIcon />}
            onPressIconLeft={() => navigation.goBack()}
            iconRight={<IconInfo />}
            backgroundColor="transparent"
            onPressIconRight={() => setIsShowServicesSubjects(true)}
          />
          <LogoGuru2 width={200} height={100} style={styles.iconHeader} />
          <Text style={styles.titleHeader}>
            Live class Interaktif bersama Guru Ahli.
          </Text>
        </ImageBackground>
        <View style={styles.whiteContainer}>
          <View style={styles.row}>
            <Text style={styles.rightTitle}>Sesi Kelas</Text>
            <Text style={styles.leftTitle}>
              Kelas {getUser?.data?.class?.order || '--'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <FlatList
              horizontal
              data={classSession?.data}
              renderItem={({item, index}) => (
                <CardClassSession
                  title={item?.subject?.name}
                  keys={index || item?.ID}
                  key={index}
                  subtitle={item?.chapter?.name}
                  time={`${_handlerConvertAllDate(
                    item?.time_start,
                    9,
                  )} - ${_handlerConvertAllDate(item?.time_finish, 8)}`}
                  isLive={
                    item?.status === 'started' || item?.status === 'start'
                      ? true
                      : false
                  }
                  isOnGoing={item?.status === 'unstarted' ? true : false}
                  downloadable={item?.status === 'finished' ? true : false}
                  endTime={item?.time_start}
                  onJoin={() => {
                    navigation.navigate('ClassSessionDetailGURUScreen', {
                      id: item?.ID,
                      service_type: 'guru',
                    });
                  }}
                  mentor={item?.user?.full_name}
                />
              )}
              // keyExtractor={item => item?.id}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Maskot width={70} height={70} />
                  <Text style={styles.textEmpty}>
                    Belum ada sesi kelas berlangsung atau yang akan datang
                  </Text>
                </View>
              }
            />
          </View>
          <Button
            label="Lihat Jadwal"
            color={Colors.primary.base}
            background={Colors.primary.light3}
            style={{alignSelf: 'center'}}
            action={() =>
              navigation.navigate('ScheduleScreen', {
                filter: 'Sesi Kelas GURU',
                screen: 'Sesi Kelas GURU',
                loginAs: 'MURID',
                token: token,
                data: {},
              })
            }
          />
          <View style={styles.row}>
            <Text style={styles.rightTitle}>Rekaman Sesi Kelas</Text>
          </View>
          <View style={{marginBottom: 20}}>
            {classSessionRekaman?.data?.length > 0 ? (
              <>
                <ScrollView horizontal>
                  {classSessionRekaman?.data?.map((item: any, index: any) => {
                    return (
                      <CardClassSession
                        title={item?.subject?.name}
                        keys={index || item?.ID}
                        key={index}
                        downloadable
                        subtitle={item?.chapter?.name}
                        time={_handlerConvertAllDate(item?.time_start, 9)}
                        onRecord={async () => {
                          await putRecordSession(
                            item?.ID || 0,
                            item?.lc_zoom?.media_id || '',
                          );
                          navigation.navigate('VideoAnimationScreen', {
                            chapterData: item,
                            type: 'guru',
                            isFromGuru: true,
                          });
                        }}
                        mentor={item?.user?.full_name}
                      />
                    );
                  })}
                </ScrollView>
                <Button
                  label="Lihat Semua Rekaman"
                  color={Colors.primary.base}
                  background={Colors.primary.light3}
                  style={{alignSelf: 'center'}}
                  action={() => {
                    navigation.navigate(SCREEN_NAME.RecordSessionClassSession, {
                      service_type: classSessionRekaman?.data[0]?.service_type,
                      selected_sub_id: '',
                      selected_sub_name: '',
                    });
                  }}
                />
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Maskot width={70} height={70} />
                <Text style={styles.textEmpty}>
                  Belum ada rekaman sesi kelas
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.rightTitle}>Materi Video Presentasi</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setShowSubject(!showSubject)}
              style={styles.chips}>
              <AllSUbjectIcon width={80} height={90} />
            </TouchableOpacity>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={threeSubject}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.chips}
                    onPress={() => {
                      navigation.navigate(
                        SCREEN_NAME.RecordSessionClassSession,
                        {
                          service_type:
                            classSessionRekaman?.data[0]?.service_type,
                          selected_sub_id: item?.id,
                          selected_sub_name: item?.name,
                          isMateriVideo: true,
                        },
                      );
                    }}>
                    <SvgUri uri={item?.icon_path_url} width={60} height={60} />
                    <Text style={styles.subjectName}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>

      <SwipeUp
        swipeToClose
        isSwipeLine={true}
        visible={isShowServicesSubjects}
        onClose={() => setIsShowServicesSubjects(false)}
        height={500}
        children={
          <RenderChildrenSwipeUpGuru
            setIsShowServicesSubjects={setIsShowServicesSubjects}
          />
        }
      />
      <SwipeUp
        visible={showSubject}
        onClose={() => setShowSubject(false)}
        height={500}
        children={
          <ChildrenMapel
            getSubjectsByClass={getSubjectsByClass}
            classSessionRekaman={classSessionRekaman}
            setShowSubject={setShowSubject}
            showSubject={showSubject}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
  },
  iconHeader: {
    alignSelf: 'center',
  },
  titleHeader: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  whiteContainer: {
    marginTop: -20,
    paddingBottom: 85,
    padding: 16,
    backgroundColor: Colors.primary.light4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  rightTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
  },
  leftTitle: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    color: Colors.primary.base,
    fontSize: 16,
    fontFamily: Fonts.RegularPoppins,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emptyContainer: {
    backgroundColor: Colors.white,
    width: windowWidth,
    alignItems: 'center',
    padding: 16,
    borderRadius: 15,
    elevation: 8,
    flexDirection: 'row',
  },
  textEmpty: {
    color: Colors.dark.neutral80,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 15,
    width: '70%',
    // marginLeft: '5%',
    textAlignVertical: 'center',
    fontFamily: Fonts.RegularPoppins,
  },
  chips: {
    width: 100,
    height: 120,
    paddingBottom: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  subjectName: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 15,
  },
});
export {GuruScreen};
