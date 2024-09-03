import {View, Text, Pressable, Linking} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {styles} from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Countdown, Header} from '@components/atoms';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Absent from '@assets/svg/ic24_navbar_absensi_active.svg';
import Right from '@assets/svg/ic_arrow_grey_right.svg';
import Live from '@assets/svg/ic_live.svg';
import EmptyIcon from '@assets/svg/ic_empty_schedule.svg';
import useFormDetailTeacher from './useFormDetailTeacher';
import {ParamList} from 'type/screen';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {fetchStartMeeting, fetchTeacherJoinMeeting} from '@redux';
import {useDispatch} from 'react-redux';
import {convertDate, formatScheduleDate} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const DetailTeacherScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamList, 'DetailTeacherScreen'>>();
  const navigation: any =
    useNavigation<StackNavigationProp<ParamList, 'DetailTeacherScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Detail Guru'} backgroundColor="white" />,
    });
  }, [navigation]);
  const {data, id} = route.params;
  const {dataTeacher, dataAbsent, dataSchedule}: any = useFormDetailTeacher(
    data,
    id,
  );

  const _renderCardTimesOver = (item: any) => {
    return (
      <View style={styles.cardCountDownStartContainer}>
        <Text style={styles.cardCountDownStartTitle}>
          {'Segera Berlangsung'}
        </Text>

        <Button
          style={styles.cardCountDownStartButton}
          label={'Mulai'}
          action={() => {
            dispatch(
              fetchStartMeeting(
                {
                  class_session_id: item?.id,
                  subject_id: item?.subject?.id,
                  subject: item?.subject?.name,
                  rombel_class_id: item?.rombel_class_id,
                  rombel_class: item?.rombel_class?.name,
                  platform: item?.platform,
                },
                () => navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
              ),
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={[styles.shadowProp, styles.card]}>
          <Avatar id={dataTeacher?.avatar} style={styles.image} />
          <Text style={styles.textTitle}>Nama</Text>
          <Text style={styles.textSubTitle}>{dataTeacher?.full_name}</Text>
          <Text style={styles.textTitle}>Nomor Induk Karyawan (NIK)</Text>
          <Text style={styles.textSubTitle}>-</Text>
          <Text style={styles.textTitle}>Email</Text>
          <Text style={styles.textSubTitle}>{dataTeacher?.email}</Text>
          <Text style={styles.textTitle}>No.HP</Text>
          <Text style={styles.textSubTitle}>{dataTeacher?.phone_number}</Text>
          <Text style={[styles.textTitle]}>Kelas</Text>
          <View style={[styles.row, {flexWrap: 'wrap'}]}>
            {dataTeacher?.user_rombel?.map((item: any, i: any) => (
              <Text style={styles.textSubTitle} key={i}>
                {item?.rombel_class_school_name?.replace('Kelas', '')},{' '}
              </Text>
            ))}
          </View>
        </View>
        <View style={[styles.shadowProp, styles.card]}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Absent width={20} height={20} style={{marginRight: 10}} />
              <Text style={styles.textTitleBlack}>Presensi</Text>
            </View>
            <Text style={styles.textSubTitleGrey}>
              {dataAbsent?.academic_year}
            </Text>
          </View>
          <View style={[styles.row, styles.row, {marginTop: 10}]}>
            <Pressable
              style={{marginRight: 50}}
              onPress={() =>
                navigation.navigate('ReportAbsentTeacherScreen', {
                  id: dataTeacher?.id,
                  type: 'attendance',
                  full_name: dataTeacher?.full_name,
                })
              }>
              <Text>Hadir</Text>
              <View style={[styles.row, {alignItems: 'center'}]}>
                <View style={styles.circleGreen} />
                <Text style={styles.textTitleBlack}>
                  {dataAbsent?.attend_count} Hari
                </Text>
                <Right width={18} height={18} />
              </View>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('ReportAbsentTeacherScreen', {
                  id: dataTeacher?.id,
                  type: 'absent',
                  full_name: dataTeacher?.full_name,
                })
              }>
              <Text>Tidak Hadir</Text>
              <View style={[styles.row, {alignItems: 'center'}]}>
                <View style={styles.circleRed} />
                <Text style={styles.textTitleBlack}>
                  {dataAbsent?.absent_count} Hari
                </Text>
                <Right width={18} height={18} />
              </View>
            </Pressable>
          </View>
        </View>
        <View>
          <View style={[styles.rowBetween, {marginTop: 20}]}>
            <Text style={styles.textTitleBigBlack}>Jadwal Mengajar</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('LMSTeacherClassSessionScreen', {
                  teacher: dataTeacher,
                });
              }}>
              <Text style={styles.textBlue}>Lihat Semua</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={dataSchedule}
            contentContainerStyle={{
              justifyContent: 'center',
              marginTop: 16,
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={[styles.shadowProp, styles.card, {marginLeft: 16}]}>
                  <View
                    style={[
                      styles.row,
                      {
                        paddingHorizontal: 12,
                        alignItems: 'center',
                        alignSelf: 'center',
                      },
                    ]}>
                    <EmptyIcon width={100} />
                    <Text
                      style={[
                        styles.textSubTitle,
                        {paddingLeft: 12, width: 180, textAlign: 'center'},
                      ]}>
                      Belum Ada Jadwal
                    </Text>
                  </View>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('LMSTeacherDetailClassSessionScreen', {
                      id: item?.id,
                    })
                  }
                  style={[
                    styles.shadowProp,
                    styles.card,
                    {marginLeft: 4, width: WINDOW_WIDTH - 52},
                  ]}>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.labelBlue}>
                        {item?.rombel_class?.name}
                      </Text>
                      <Text style={styles.labelBlue}>
                        {item?.type === 'live' ? 'Langsung' : 'Rekaman'}
                      </Text>
                      {item?.type === 'live' ? (
                        <Text style={styles.labelBlue}>
                          {item?.platform === 'zoom'
                            ? 'Zoom'
                            : item?.platform === 'google_meet'
                            ? 'Google Meet'
                            : ''}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.textTitleBigBlack}>
                      {item?.subject?.name}
                    </Text>
                    <Text
                      style={[
                        styles.textTitleBigBlack,
                        {fontSize: 14, width: '95%'},
                      ]}>
                      {item?.title}
                    </Text>
                    <Text style={styles.textSubTitleBigBlack}>
                      {formatScheduleDate(
                        item?.time_start,
                        item?.time_end,
                        true,
                      )}
                      {/* {formatDateToCustomFormat(item?.time_start)} -{' '}
                {formatDateToCustomFormatNoDays(item?.time_end)} */}
                    </Text>
                    <View style={styles.line} />
                    {item?.status === 'on_going' ? (
                      <View style={[styles.rowBetween, {alignItems: 'center'}]}>
                        <View style={[styles.row, {alignItems: 'center'}]}>
                          <Live width={20} style={{marginRight: 5}} />
                          <Text style={styles.textRed}>
                            {'Sedang berlangsung'}
                          </Text>
                        </View>
                        <Pressable
                          style={styles.buttonJoin}
                          onPress={() => {
                            if (item?.platform === 'google_meet') {
                              if (item?.gmeet_id !== '') {
                                const meetUrl = `https://meet.google.com/${item?.gmeet_id}`;
                                Linking.openURL(meetUrl)
                                  .then(() => {
                                    navigation.goBack();
                                  })
                                  .catch(() => {});
                              } else {
                                Toast?.show({
                                  type: 'error',
                                  text1: 'Tidak dapat menemukan google meet id',
                                });
                              }
                            } else if (item?.platform === 'zoom') {
                              dispatch(
                                fetchTeacherJoinMeeting(item?.id, () =>
                                  navigation.navigate(
                                    'LMSTeacherMeetingLiveSessionScreen',
                                  ),
                                ),
                              );
                            } else if (item?.platform === 'record') {
                              navigation.navigate(
                                'LMSTeacherDetailClassSessionScreen',
                                {
                                  id: item?.id,
                                },
                              );
                            }
                          }}>
                          <Text style={styles.textWhite}>Gabung</Text>
                        </Pressable>
                      </View>
                    ) : item?.status === 'unstarted' ? (
                      <View style={styles.cardCountDownContainer}>
                        {Math.round(
                          convertDate(item?.time_start).diff(
                            convertDate(),
                            'seconds',
                          ),
                        ) < 1 ? (
                          _renderCardTimesOver(item)
                        ) : (
                          <Countdown
                            endTime={item?.time_start}
                            renderAfterTimeOver={_renderCardTimesOver(
                              item?.time_start,
                            )}
                          />
                        )}
                      </View>
                    ) : null}
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export {DetailTeacherScreen};
