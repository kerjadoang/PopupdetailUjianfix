import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {Header} from '@components/atoms/Header';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import {Button, PopUp} from '@components/atoms';
import {styles} from './style';
import useAttendance from './useAttendance';
import {_handlerGetCurrentDate} from '@constants/functional';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const AttendanceScreen = () => {
  const {
    isLoading,
    navigation,
    isShowPopup,
    popupData,
    isAttendanceComplete,
    getTodayAttendance,
    getUser,
    currentTime,
    isAttendanceFinishOrComplete,
    _handlerStartFinishAttendance,
  } = useAttendance();

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */
  const userTypeId = getUser?.data?.user_type_id;
  const isUserTeacher = userTypeId == 5;
  const headerTitle = isUserTeacher ? 'Presensi Guru' : 'Presensi';
  const enterTitle = isUserTeacher ? 'Jam Dimulai' : 'Jam Masuk';
  const finishTitle = isUserTeacher ? 'Jam Selesai' : 'Jam Pulang';
  const {start_time, end_time} = getTodayAttendance?.data;
  const currentTimes = currentTime.toLocaleTimeString('en-US', {hour12: false});

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        iconLeft={
          !isUserTeacher && <IconArrowLeftWhite width={24} height={24} />
        }
        label={headerTitle}
        styleLabel={styles.styleLabel}
        colorLabel={Colors.white}
        backgroundColor={'transparent'}
        onPressIconLeft={() => !isUserTeacher && navigation.pop()}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.topCard}>
            <Text style={styles.headTitleTopCard}>
              {_handlerGetCurrentDate()}
            </Text>
            <Text style={styles.headDescriptionTopCard}>{currentTimes}</Text>

            <View style={styles.contentRow}>
              <View style={styles.blueCard}>
                <Text style={styles.titleTopCard}>{enterTitle}</Text>
                <Text style={styles.descriptionTopCard}>
                  {start_time || '00:00:00'}
                </Text>
              </View>

              <View style={styles.gap} />

              <View style={styles.blueCard}>
                <Text style={styles.titleTopCard}>{finishTitle}</Text>
                <Text style={styles.descriptionTopCard}>
                  {end_time || '00:00:00'}
                </Text>
              </View>
            </View>

            <Button
              bottom={21}
              isDisabled={isAttendanceComplete}
              label={isAttendanceFinishOrComplete ? 'Selesai' : 'Mulai'}
              action={_handlerStartFinishAttendance}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AttendancePresensiHistoryScreen', {});
              }}>
              <Text style={styles.historyTopCard}>
                {'Lihat Riwayat Presensi'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomCard}>
            <Text style={styles.titleBottomCard}>
              {'Izin atau tidak hadir di sekolah?'}
            </Text>

            <TouchableOpacity
              style={styles.requestAttendanceBottomCard}
              onPress={() => {
                navigation.navigate('AttendanceApprovalFormScreen', {});
              }}>
              <Text style={styles.requestAttendanceBottomTitle}>
                {'Ajukan ketidakhadiran di sini'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AttendanceAprovalListHistoryScreen', {});
              }}>
              <Text style={styles.historyBottomCard}>
                {'Lihat Riwayat Pengajuan'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {isLoading ? <LoadingIndicator /> : null}

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
      />
    </SafeAreaView>
  );
};

export default AttendanceScreen;
