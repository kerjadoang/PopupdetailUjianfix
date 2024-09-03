import React, {useLayoutEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Maskot11} from '@assets/images';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {
  _handlerCapitalizeFirstLetter,
  _handlerConvertAllDate,
} from '@constants/functional';
import useAttendanceAprovalListHistoryScreen from './useAttendanceAprovalListHistoryScreen';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import IconArrowRightBlue from '@assets/svg/blueArrow.svg';

const AttendanceAprovalListHistoryScreen = () => {
  const {
    isLoading,
    listHistoryAttendance,
    listTab,
    selectedTab,
    getUser,
    _handlerOnPressTab,
    _handlerOnScroll,
  } = useAttendanceAprovalListHistoryScreen();
  const navigation: any = useNavigation();

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
  const isUserStudent = userTypeId == 1;
  const isUserTeacher = userTypeId == 5;
  const isTabWaiting = selectedTab == 'Menunggu';
  const isTabApproved = selectedTab == 'Diterima';

  const noDataTitle = isTabWaiting
    ? 'Belum Ada Pengajuan\nKetidakhadiran'
    : isTabApproved
    ? 'Belum Ada Pengajuan Yang Diterima'
    : 'Belum Ada Pengajuan Yang Ditolak';

  const noDataDescription = isTabWaiting
    ? isUserTeacher
      ? 'Pengajuan ketidakhadiran yang\nsedang menunggu persetujuan admin\nakan muncul disini'
      : 'Pengajuan ketidakhadiran yang\nsedang menunggu persetujuan guru\nakan muncul disini'
    : isTabApproved
    ? 'Pengajuan ketidakhadiran yang\nditerima akan muncul disini'
    : 'Pengajuan ketidakhadiran yang\nditolak akan muncul disini';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Pengajuan Ketidakhadiran'} />,
    });
  }, []);

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Maskot11} style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>{noDataTitle}</Text>
        <Text style={styles.noDataDescription}>{noDataDescription}</Text>
      </View>
    );
  };

  const _renderTab = () => {
    return (
      <>
        <View style={styles.tabContainer}>
          {listTab?.map((value: any, index: any) => {
            const isSelectedItem = selectedTab === value?.label;

            return (
              <TouchableOpacity
                key={index}
                style={styles.tabCard}
                onPress={() => {
                  _handlerOnPressTab(value?.label);
                }}>
                <Text
                  style={
                    isSelectedItem
                      ? styles.tabTitleActive
                      : styles.tabTitlePassive
                  }>
                  {value?.label}
                </Text>

                {isSelectedItem ? <View style={styles.lineActive} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.grayLine} />
      </>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.dataContainer}>
        {listHistoryAttendance?.data?.map((value: any, index: any) => {
          const {approval_status, days, start_date, end_date, reason, id} =
            value;
          const startDateConvert = _handlerConvertAllDate(start_date, 1, 2);
          const endDateConvert = _handlerConvertAllDate(end_date, 1, 2);
          const badgeStyle =
            approval_status == 'diterima'
              ? styles.badgeAccepted
              : approval_status == 'ditolak'
              ? styles.badgeRejected
              : styles.badgeWaiting;
          const titleBadgeStyle =
            approval_status == 'diterima'
              ? styles.titleBadgeAccepted
              : approval_status == 'ditolak'
              ? styles.titleBadgeRejected
              : styles.titleBadgeWaiting;
          const approvalTitle =
            approval_status == 'menunggu' && isUserTeacher
              ? 'Menunggu persetujuan Admin'
              : approval_status == 'menunggu' && isUserStudent
              ? 'Menunggu persetujuan Guru'
              : approval_status;

          return (
            <TouchableOpacity
              key={index}
              style={styles.dataCard}
              onPress={() => {
                navigation.navigate('AttendanceApprovalDetailHistoryScreen', {
                  absentId: id,
                });
              }}>
              <View style={styles.leftContent}>
                <View style={styles.row}>
                  <View style={badgeStyle}>
                    <Text style={titleBadgeStyle}>
                      {_handlerCapitalizeFirstLetter(approvalTitle)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardHeadTitle}>{'Kelas Online'}</Text>
                <View style={styles.cardDateContainer}>
                  <Text style={styles.cardDateTitle}>{`${days} hari: `}</Text>
                  <Text
                    style={
                      styles.cardDateDescription
                    }>{`${startDateConvert} - ${endDateConvert}`}</Text>
                </View>
                <Text style={styles.cardReasonTitle}>
                  {_handlerCapitalizeFirstLetter(reason)}
                </Text>
              </View>

              <IconArrowRightBlue style={styles.cardIcon} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
          translucent
        />
        {_renderTab()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={event => _handlerOnScroll(event)}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.container}>
            {listHistoryAttendance?.data &&
            listHistoryAttendance?.data?.length != 0
              ? _renderContent()
              : _renderNoData()}
          </View>
        </ScrollView>
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default AttendanceAprovalListHistoryScreen;
