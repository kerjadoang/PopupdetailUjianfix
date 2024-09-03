/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import useAnakSaya from './useAnakSaya';
import {
  CardAnak,
  CardLaporanAnakSaya,
  CoachmarkLib,
  ScheduleItemProject,
  ScheduleItemSessionClass,
  ScheduleItemVirtualMeeting,
} from '@components/atoms';
import IconBook from '@assets/svg/ic16_book.svg';
import IconLive from '@assets/svg/ic16_live.svg';
import IconClock from '@assets/svg/ic16_clock.svg';
import Guru from '@assets/svg/guru_logo.svg';
import {AnouncementAnak} from '@components/organism';
import {ActivityAnak} from '../ActivityAnak';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import Fonts from '@constants/fonts';
import {generalStyles} from '@constants/styles';

interface IHeaderAnakSaya {
  user?: any;
  navigation?: any;
}
export const HeaderAnakSaya = ({user, navigation}: IHeaderAnakSaya) => {
  const date = new Date(user?.last_active);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = date
    .toLocaleDateString('id-ID', options)
    .replace(/\./g, ':');
  return (
    <View style={[styles.cardTLTP, styles.shadowProp]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}>
        <View>
          <Image
            source={{
              uri: user?.path_url,
            }}
            style={styles.imageProfileHeader}
          />
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text style={styles.titleName}>{user?.full_name || '-'}</Text>
          </View>
          <View>
            <Text style={styles.titleClass}>
              {user?.rombel_name || '-'} • {user?.school_name || '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.log}>
              Terakhir aktif: {formattedDate || '-'}
            </Text>
          </View>

          {navigation && (
            <Pressable
              onPress={() =>
                navigation.navigate('DetailAnakScreen', {
                  user: user,
                })
              }>
              <Text style={styles.lihatDetail}>Lihat Detail {'>'}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const Creator = ({data}: any) => {
  // console.log('data', data);
  return (
    <View style={styles.DirectionRow}>
      <Guru />
      <Image
        source={{
          uri: data?.path_url,
        }}
        style={styles.imageProfile}
      />
      <View>
        <Text style={styles.teacher}>{data?.full_name || '-'}</Text>
      </View>
    </View>
  );
};

const EmptyAnakSaya = () => {
  return (
    <View
      style={[
        styles.shadowProp,
        styles.card,
        {
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        },
      ]}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <Image
          source={require('@assets/images/ic_empty.png')}
          style={{width: 80, height: 80}}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontWeight: '600',
          fontSize: 14,
        }}>
        Anak Belum Terhubung
      </Text>
      <Text style={[styles.text, {textAlign: 'center'}]}>
        Tambah akun anak untuk pantau aktivitas dan progres belajar anak.
      </Text>
    </View>
  );
};

const JadwalHariIni = ({scheduleByDate, navigation, user}) => {
  const {data} = scheduleByDate;
  // console.log('JadwalHariIni', user);
  return (
    <View style={[styles.card, styles.shadowProp, {marginTop: 2}]}>
      <View
        style={[
          styles.flexDirection,
          {
            marginBottom: 16,
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconCalendar width={24} height={24} style={{marginRight: 8}} />
          <Text style={styles.jadwal}>Jadwal Hari ini</Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('ScheduleScreen', {
              filter: 'semua',
              screen: 'DetailAnakScreen',
              loginAs: 'ORANG-TUA',
              token: user?.access_token,
              data: user,
            })
          }>
          <Text style={styles.lihat}>Lihat Semua</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.data?.map((item: any, index: number) => {
          if (item?.type === 'sesi kelas') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'rapat virtual') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemVirtualMeeting data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'Projek') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemProject data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'PR') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemProject data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'Tugas') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemProject data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'Ujian Tengah Semester') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'Ujian Akhir Semester') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          return (
            <View
              key={index}
              style={[
                styles.DirectionRow,
                {
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.primary.light2,
                  padding: 16,
                  marginRight: 8,
                },
                // {justifyContent: 'space-between'},
              ]}>
              <View style={styles.content}>
                <View style={{flexDirection: 'row', gap: 4}}>
                  <View
                    style={{
                      backgroundColor: Colors.primary.light3,
                      padding: 4,
                      borderRadius: 15,
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        color: Colors.primary.base,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.type}
                    </Text>
                  </View>
                  {item?.rombel_class && (
                    <View
                      style={{
                        backgroundColor: Colors.secondary.light2,
                        padding: 4,
                        borderRadius: 15,
                        paddingHorizontal: 8,
                      }}>
                      <Text
                        style={{
                          color: '#995F0D',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.rombel_class}
                      </Text>
                    </View>
                  )}
                </View>
                {item.type === 'sesi kelas guru' && (
                  <Creator data={item.creator} />
                )}
                <View>
                  <Text style={styles.courses}>{item.title}</Text>
                </View>
                <View />
                {item?.note_group?.map((item: any, index: number) => {
                  return (
                    <View key={index} style={styles.alignCenter}>
                      {item.icon === 'book' ? (
                        <IconBook width={16} height={16} />
                      ) : item.icon === 'calendar' ? (
                        <IconCalendar width={16} height={16} />
                      ) : item.icon === 'clock' ? (
                        <IconClock width={16} height={16} />
                      ) : item.icon === 'live' ? (
                        <IconLive width={16} height={16} />
                      ) : item.icon === 'elipse' ? (
                        <IconLive width={16} height={16} />
                      ) : (
                        <IconBook width={16} height={16} />
                      )}

                      <Text
                        style={
                          item.icon === 'live'
                            ? styles.live
                            : item.icon === 'elipse'
                            ? styles.live
                            : styles.text
                        }>
                        {item.description}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
        {data?.length === 0 && (
          <View style={styles.renderEmpty}>
            <Image
              source={require('@assets/images/ic_empty_schedule.png')}
              style={{width: 80, height: 80}}
            />
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Belum ada jadwal hari ini
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const AnakSaya = (props: any) => {
  const {getAllChildren, navigation, user, setUser, scheduleByDate} =
    useAnakSaya();
  const window = Dimensions.get('window');

  const notPending = getAllChildren.data.filter(
    (d: any) => d.approval_status !== 'pending',
  );
  const pending = getAllChildren.data.filter(
    (d: any) => d.approval_status === 'pending',
  );

  return (
    <View style={styles.container}>
      <CoachmarkLib
        ref={ref => (props.Coachmarks[0] = ref)}
        onNext={() => {
          props?._handlerCoachmark(1);
          props?.scrollViewRef?.scrollTo({
            x: 0,
            y: 150,
            animated: true,
          });
        }}
        onSkip={props?.doneCoachMark}
        buttonOnContent
        contentContainerStyle={generalStyles.contentFlexWhite}
        queue={1}
        totalCoachmark={2}
        backgroundColor={Colors.white}
        title={'Daftar Anak'}
        message={
          'Pantau perkembangan belajar anak yang telah di daftarkan ke Kelas Pintar'
        }>
        <>
          {/* Khusus Pending atau butuh verifikasi */}
          {pending?.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={true}>
              {pending?.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <CardAnak
                      data={item}
                      key={index}
                      waitingVerified={true}
                      onPress={() => props?.cancelConnection(item?.user_id)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          ) : null}

          {/* Jika kosong */}
          {getAllChildren?.data?.length === 0 ? (
            <EmptyAnakSaya />
          ) : (
            <>
              {notPending?.length > 1 && (
                <ScrollView
                  showsHorizontalScrollIndicator={true}
                  horizontal={true}>
                  {notPending?.map((items: any, index: any) => {
                    return (
                      <View key={index}>
                        <CardAnak
                          onPress={() => setUser(items)}
                          id={user?.user_id}
                          data={items}
                          key={index}
                          cstmWidth={window.width * 0.5}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              )}
              {/* Anak Saya yang telah dipilih */}
              {user !== null && (
                <HeaderAnakSaya user={user} navigation={navigation} />
              )}
            </>
          )}
        </>
      </CoachmarkLib>

      <CoachmarkLib
        ref={ref => (props.Coachmarks[1] = ref)}
        onNext={() => props?._handlerCoachmark(2)}
        onSkip={props?.doneCoachMark}
        buttonOnContent
        contentContainerStyle={generalStyles.contentFlexWhite}
        queue={2}
        childrenStyle={styles.borderCard}
        totalCoachmark={2}
        title={'Jadwal Hari Ini'}
        message={'Cek jadwal kegiatan belajar harian anak Anda di sini.'}>
        <JadwalHariIni
          user={user}
          scheduleByDate={scheduleByDate}
          navigation={navigation}
        />
      </CoachmarkLib>

      {user !== null && user.account_type === 'b2b' && (
        <View style={[styles.shadowProp, styles.card, {marginTop: 2}]}>
          <CardLaporanAnakSaya
            logo={require('@assets/images/ic24_erapor.png')}
            title="Laporan Belajar"
            description="Pantau perkembangan belajar anak"
            onPress={() =>
              navigation.navigate('LearningReportStudentOnParentScreen', {
                data: user,
              })
            }
          />
          <CardLaporanAnakSaya
            logo={require('@assets/images/ic24_pr_tugas.png')}
            title="PR/Tugas"
            description="1 dari 3 sudah dikerjakan"
            onPress={() => Alert.alert('ceck')}
          />
          <CardLaporanAnakSaya
            logo={require('@assets/images/ic24_exam.png')}
            title="Ujian"
            description="2 jadwal ujian mendatang"
            onPress={() => Alert.alert('ceck')}
          />
        </View>
      )}
      {user !== null && user.account_type === 'b2c' && (
        <View style={[styles.shadowProp, styles.card, {marginTop: 2}]}>
          <CardLaporanAnakSaya
            logo={require('@assets/images/ic24_erapor.png')}
            title="Laporan Belajar"
            description="Pantau perkembangan belajar anak"
            onPress={() =>
              navigation.navigate('LearningReportStudentOnParentScreen', {
                data: user,
              })
            }
          />
        </View>
      )}
      {user !== null && (
        <View style={[styles.shadowProp, styles.card, {marginTop: 2}]}>
          <AnouncementAnak type={'parent'} token={user?.access_token} />
        </View>
      )}
      {user !== null && (
        <View style={[styles.shadowProp, styles.card, {marginTop: 2}]}>
          <ActivityAnak token={user?.access_token} user={user} />
        </View>
      )}
    </View>
  );
};

export {AnakSaya};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  imageProfile: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  imageProfileHeader: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: Colors.white,
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
  cardTLTP: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    padding: 16,
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding: 16,
  },
  titleName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  titleClass: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  lihatDetail: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  log: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  font: {
    fontFamily: 'Poppins-Regular',
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: Colors.dark.neutral80,
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  DirectionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    // flex: 1,
  },
  content: {
    flexDirection: 'column',
    gap: 4,
    marginTop: 8,
    // width: '70%',
  },
  courses: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  jadwal: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  lihat: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  live: {
    color: Colors.danger.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  alignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  teacher: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  renderEmpty: {
    // flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // width: 300,
    marginBottom: 16,
  },
  cardOfschedule: {
    // backgroundColor: 'red',
    borderRadius: 10,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
    borderWidth: 1,
    borderColor: Colors.primary.light2,
    padding: 16,
    marginRight: 8,
  },
  borderCard: {
    borderRadius: 24,
  },
});
