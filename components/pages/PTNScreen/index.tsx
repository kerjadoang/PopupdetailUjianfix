/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {bgBlueOrnament} from '@assets/images';
import {useNavigation} from '@react-navigation/native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

import {Button, Header, SwipeUp} from '@components/atoms';
import ArrowWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconInfo from '@assets/svg/ic_info.svg';
import LogoPTN from '@assets/svg/logo_ptn.svg';
import LogoPtn2 from '@assets/svg/ptn_blue.svg';

import IconPtn1 from '@assets/svg/ptn_step_1.svg';
import IconPtn2 from '@assets/svg/ptn_step_2.svg';
import IconPtn3 from '@assets/svg/ptn_step_3.svg';
import IconPtn4 from '@assets/svg/ptn_step_4.svg';
import IconPtn5 from '@assets/svg/ptn_step_5.svg';

import IconDT from '@assets/svg/ic48_IKM.svg';
import IconMateriSekolah from '@assets/svg/ic48_materi_sekolah.svg';
import IconRapatVirtual from '@assets/svg/ic48_Rapat_Virtual_bgyellow.svg';
import IconLaporanKkm from '@assets/svg/ic48_laporan_nilai_kkm.svg';
import IconLaporan from '@assets/svg/ic48_erapor_bgblue.svg';
import MaskotPtn from '@assets/svg/maskot_ptn.svg';

import NoScheduleMaskot from '@assets/svg/maskot_empty_schedule.svg';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardSchedule} from './component';
import Ranking from './component/Ranking';
import {useScreen} from './useScreen';
import {LineChart} from 'react-native-chart-kit';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
import {WIDTH} from '../PTNReportScreen/utils';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const windowWidth = Dimensions.get('window').width;

const PTNScreen = () => {
  const navigation: any =
    useNavigation<StackNavigationProp<ParamList, 'PTNScreen'>>();
  const {
    validation,
    setValidation,
    isCollaps,
    setIsCollaps,
    ptnSchedule,
    leaderboardTryout,
    swipe,
    setSwipe,
    cartLabels,
    cartFullLabels,
    cartData,
    checkDiagnostic,
    isHavePackage,
    onClickScheduleCard,
  } = useScreen();
  const validationTest = checkDiagnostic?.data?.data;

  const InfoChildren = () => {
    return (
      <>
        <View style={{padding: 16, height: 600}}>
          <View style={styles.headerSwipeUp}>
            <LogoPtn2 width={105} height={55} />
            <Text style={styles.titleSwipe}>
              Yakin lebih pintar, Yakin masuk kampus idaman
            </Text>
          </View>
          <View style={styles.rectangle} />
          <View style={styles.row}>
            <IconPtn1 width={56} height={56} />
            <View style={styles.listInfo}>
              <Text style={styles.titleInfo}>Test Minat & Kepribadian</Text>
              <Text style={styles.descInfo}>
                Menyajikan materi, soal latihan, dan tes pembelajaran secara
                interaktif.
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconPtn2 width={56} height={56} />
            <View style={styles.listInfo}>
              <Text style={styles.titleInfo}>Live Class</Text>
              <Text style={styles.descInfo}>
                Belajar Bersama Guru Ahli Kelas Pintar yang berpengalaman dan
                tersertifikasi.
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconPtn3 width={56} height={56} />
            <View style={styles.listInfo}>
              <Text style={styles.titleInfo}>Bank Soal</Text>
              <Text style={styles.descInfo}>
                Belajar Bersama Guru Ahli Kelas Pintar yang berpengalaman dan
                tersertifikasi.
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconPtn4 width={56} height={56} />
            <View style={styles.listInfo}>
              <Text style={styles.titleInfo}>Try Out</Text>
              <Text style={styles.descInfo}>
                Uji kemampuan dan kesiapan kamu dalam menghadapi ujian.
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconPtn5 width={56} height={56} />
            <View style={styles.listInfo}>
              <Text style={styles.titleInfo}>Laporan</Text>
              <Text style={styles.descInfo}>
                Mengetahui progres belajar murid pada setiap mata pelajaran yang
                telah dipelajari.
              </Text>
            </View>
          </View>
          <View style={styles.btnSwipeContainer}>
            <Button
              label="Tutup"
              action={() => setSwipe({...swipe, show: false})}
            />
          </View>
        </View>
      </>
    );
  };

  const TestMinatBakat = () => {
    return (
      <>
        <View
          style={{
            padding: 16,
            height: 400,
            backgroundColor: Colors.white,
          }}>
          <Text style={styles.titleSwipe}>Test Minat & Kepribadian</Text>
          <Text style={styles.stepCount}>10 Soal</Text>
          <Text style={styles.titleInfo}>Cara Pengerjaan : </Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.descInfo2}>
                Lengkapi data diri terlebih dahulu.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.descInfo2}>
                Permainan ini menggunakan metode Drag and Drop.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.descInfo2}>
                Setiap soal berisikan kelompok pekerjaan yang masing-masing
                terdiri atas 12 jenis.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.descInfo2}>
                Urutkan jawaban berdasarkan yang{' '}
                <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
                  Sangat Kamu Sukai
                </Text>{' '}
                sampai{' '}
                <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
                  Sangat Tidak Kamu Sukai.
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.dot}> • </Text>
              <Text style={styles.descInfo2}>
                Fokuslah pada uska atau tidak suka terhadap pekerjaan tersebut.
              </Text>
            </View>
          </View>
          <View style={styles.btnSwipeContainer}>
            <Button
              label="Mulai"
              action={() => {
                setSwipe({...swipe, show2: false});
                navigation.navigate('DiagnoticTestScreen');
              }}
            />
          </View>
        </View>
      </>
    );
  };

  const SwipeValidation = () => {
    return (
      <>
        {!validation.degreeMatch ? (
          <View style={{height: 150, padding: 16, alignItems: 'center'}}>
            <LogoPtn2 width={105} height={55} />
            <Text style={styles.titleValidation}>
              Tidak Dapat Mengakses PTN
            </Text>
            <Text style={styles.descValidation}>
              PTN hanya dapat diakses oleh Kelas 10, 11, 12.
            </Text>
          </View>
        ) : (
          <View style={{height: 250, padding: 16, alignItems: 'center'}}>
            <MaskotPtn width={100} height={100} />
            <Text style={styles.titleValidation}>
              Belum Berlangganan Paket PTN
            </Text>
            <Text style={styles.descValidation}>
              Fitur ini hanya dapat diakses oleh pengguna paket. Akses PTN
              dengan berlangganan.
            </Text>
            <View style={styles.btnSwipeContainer}>
              <Button label={'Berlangganan'} />
            </View>
          </View>
        )}
      </>
    );
  };

  const data: any = {
    labels: cartLabels,
    datasets: [
      {
        data: cartData,
      },
    ],
  };

  const handleChartWidth = () => {
    const multiplier = data?.datasets?.[0]?.data?.length * 0.25;
    if (data?.datasets?.[0]?.data?.length <= 5) {
      return WIDTH;
    }

    return WIDTH * multiplier || WIDTH;
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ImageBackground source={bgBlueOrnament} style={styles.headerContainer}>
        <Header
          backgroundColor="transparent"
          iconRight={<IconInfo />}
          iconLeft={<ArrowWhite />}
          onPressIconRight={() => setSwipe({...swipe, show: true})}
        />
        <LogoPTN width={120} height={65} style={styles.logoHeader} />

        <Text style={styles.headerTitle}>
          Pendampingan belajar untuk masuk kampus idaman.
        </Text>
      </ImageBackground>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.menuPtn}>
            <View style={styles.menuContainer}>
              <Pressable
                style={styles.itemMenu}
                onPress={() => {
                  validationTest?.already_finished_test &&
                  validationTest?.already_register
                    ? navigation.navigate('DiagnoticTestResultScreen')
                    : validationTest?.already_register
                    ? navigation.navigate('DiagnoticTestScreen')
                    : navigation.navigate('FormDiagnosticTestScreen');
                }}>
                <IconDT width={60} height={60} />
                <Text style={styles.itemMenuText}>
                  {'Test Minat \n& Kepribadian'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (!isHavePackage) {
                    return setValidation({...validation, show: true});
                  }

                  navigation.navigate('PTNLiveClassHomeScreen');
                }}
                style={styles.itemMenu}>
                <IconRapatVirtual width={60} height={60} />
                <Text style={styles.itemMenuText}>{'Live\nClass'}</Text>
              </Pressable>
              <Pressable
                style={styles.itemMenu}
                onPress={() => {
                  if (!isHavePackage) {
                    return setValidation({...validation, show: true});
                  }

                  navigation.navigate('PTNBankSoalScreen');
                }}>
                <IconMateriSekolah width={60} height={60} />
                <Text style={styles.itemMenuText}>{'Bank\nSoal'}</Text>
              </Pressable>
              <Pressable
                style={styles.itemMenu}
                onPress={() => {
                  if (!isHavePackage) {
                    return setValidation({...validation, show: true});
                  }

                  navigation.navigate('TryOutScreen');
                }}>
                <IconLaporanKkm width={60} height={60} />
                <Text style={styles.itemMenuText}>TryOut</Text>
              </Pressable>
              {isCollaps ? null : (
                <Pressable
                  style={styles.itemMenu}
                  onPress={() => {
                    if (!isHavePackage) {
                      return setValidation({...validation, show: true});
                    }

                    navigation.navigate('PTNReportScreen');
                  }}>
                  <IconLaporan />
                  <Text style={styles.itemMenuText}>Laporan</Text>
                </Pressable>
              )}
            </View>
            <Pressable
              style={styles.btn}
              onPress={() => setIsCollaps(!isCollaps)}>
              <Text style={styles.btnText}>
                {isCollaps ? 'Menu Lainnya' : 'Sembunyikan'}
              </Text>
              {isCollaps ? (
                <Icon
                  name="chevron-down"
                  size={16}
                  color={Colors.primary.base}
                />
              ) : (
                <Icon name="chevron-up" size={16} color={Colors.primary.base} />
              )}
            </Pressable>
          </View>
          <Text style={styles.titleSchedule}>Jadwal Hari Ini</Text>
          <View style={styles.menuPtn}>
            {ptnSchedule?.data?.data ? (
              <>
                {ptnSchedule?.data?.data?.map((item: any, index: number) => {
                  return (
                    <CardSchedule
                      data={item}
                      key={index}
                      action={() => onClickScheduleCard(item)}
                    />
                  );
                })}
              </>
            ) : (
              <View style={styles.row}>
                <NoScheduleMaskot width={80} height={80} />
                <Text style={[styles.emptyText, {alignSelf: 'center'}]}>
                  Belum ada jadwal hari ini.
                </Text>
              </View>
            )}

            <Pressable
              style={({pressed}) => [
                styles.btn,
                {marginTop: 10, opacity: pressed ? 0.5 : 1},
              ]}
              onPress={() => {
                if (!isHavePackage) {
                  return setValidation({...validation, show: true});
                }

                return navigation.navigate('SchedulePTNScreen');
              }}>
              <Text style={styles.btnText}>Lihat Semua Jadwal</Text>
              <Icon
                name="chevron-right"
                size={24}
                color={Colors.primary.base}
              />
            </Pressable>
          </View>
          <Text style={styles.titleSchedule}>Ringkasan hasil Try Out</Text>
          <View style={styles.menuPtn}>
            <ScrollView horizontal>
              {data?.labels?.length > 0 ? (
                <LineChart
                  data={data}
                  height={260}
                  width={handleChartWidth()}
                  withVerticalLines={false}
                  withShadow={false}
                  fromZero={true}
                  yLabelsOffset={30}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundGradientFrom: Colors.white,
                    backgroundGradientTo: Colors.white,
                    color: () => Colors.primary.base,
                    labelColor: () => Colors.dark.neutral60,
                    decimalPlaces: 0,
                    propsForLabels: {
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                    },
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '4',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 2,
                    borderRadius: 10,
                  }}
                  onDataPointClick={({index}) => {
                    Toast.show({
                      type: 'labelChart',
                      text2: cartData?.[index],
                      text1: cartFullLabels?.[index],
                      visibilityTime: 5000,
                    });
                  }}
                />
              ) : null}
            </ScrollView>
          </View>

          <Text style={styles.titleSchedule}>Papan Peringkat</Text>
          <View style={[styles.menuPtn, {marginBottom: 200}]}>
            <Ranking data={leaderboardTryout?.data?.data} />
            <Pressable
              style={styles.btn}
              onPress={() => {
                if (!isHavePackage) {
                  return setValidation({...validation, show: true});
                }

                return navigation.navigate('LeaderboardScreen');
              }}>
              <Text style={styles.btnText}>Lihat Selengkapnya</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <SwipeUp
        height={700}
        visible={swipe.show}
        onClose={() => setSwipe({...swipe, show: false})}
        children={<InfoChildren />}
      />
      <SwipeUp
        height={700}
        visible={swipe.show2}
        onClose={() => setSwipe({...swipe, show2: false})}
        children={<TestMinatBakat />}
      />
      <SwipeUp
        height={400}
        visible={validation.show}
        onClose={() => setValidation({...validation, show: false})}
        children={<SwipeValidation />}
      />
    </View>
  );
};
export {PTNScreen};
const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    paddingBottom: 35,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
    textAlign: 'center',
  },
  logoHeader: {
    alignSelf: 'center',
  },
  body: {
    padding: 16,
    backgroundColor: Colors.primary.light4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: -10,
  },
  menuPtn: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 16,
  },
  btn: {
    borderRadius: 15,
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemMenu: {
    width: '25%',
    height: 88,
    alignItems: 'center',
    marginVertical: 24,
  },
  itemMenuText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
    marginTop: 7,
  },
  titleSchedule: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    marginTop: 24,
    marginBottom: 12,
  },
  headerSwipeUp: {
    alignItems: 'center',
  },
  titleSwipe: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textAlign: 'center',
  },
  rectangle: {
    width: windowWidth,
    height: 4,
    backgroundColor: Colors.dark.neutral10,
  },
  titleInfo: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  descInfo: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
  },
  descInfo2: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
  },
  btnSwipeContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
  },
  emptyText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  listInfo: {
    padding: 6,
    width: '90%',
    paddingLeft: 5,
  },
  dot: {
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'top',
    lineHeight: 16,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  stepCount: {
    color: Colors.primary.base,
    backgroundColor: Colors.primary.light2,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    textAlign: 'center',
    marginVertical: 16,
    alignSelf: 'center',
  },
  titleValidation: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.BoldPoppins,
    color: Colors.black,
    textAlign: 'center',
  },
  descValidation: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
});
