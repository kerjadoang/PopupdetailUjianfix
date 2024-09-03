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
import {Button, MonthPicker, SwipeUp} from '@components/atoms';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import {_handlerConvertAllDate} from '@constants/functional';
import useAttendancePresensiHistoryScreen from './useAttendancePresensiHistoryScreen';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const AttendancePresensiHistoryScreen = () => {
  const {
    isLoading,
    listHistoryPresensi,
    valueDatePicker,
    isShowSwipeUp,
    selectedFilter,
    setValueDatePicker,
    _handlerOnPressSwipeUpDateSelectButton,
    _handlerOnCloseSwipeUp,
    _handlerShowSwipeUp,
  } = useAttendancePresensiHistoryScreen();
  const navigation = useNavigation();

  const convertFiter: any = _handlerConvertAllDate(selectedFilter, 5, 2);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Riwayat Presensi'} />,
    });
  }, []);

  const _renderSwipeUpContent = () => {
    return (
      <View style={styles.swipeUpDateWrapper}>
        <Text style={styles.swipeUpDateHeaderTitle}>{'Pilih Bulan'}</Text>
        <MonthPicker selected={valueDatePicker} onChange={setValueDatePicker} />

        <View style={styles.swipeUpDateButtonWrapper}>
          <Button
            style={styles.swipeUpButtonConfirm}
            label={'Simpan'}
            action={_handlerOnPressSwipeUpDateSelectButton}
          />
        </View>
      </View>
    );
  };

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Maskot11} style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>{'Belum Ada Riwayat Presensi'}</Text>
        <Text style={styles.noDataDescription}>
          {'Presensi yang sudah dicatat\nakan muncul disini.'}
        </Text>
      </View>
    );
  };

  const _renderTab = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabCardPassive}
          onPress={_handlerShowSwipeUp}>
          <Text style={styles.tabTitlePassive}>{convertFiter}</Text>
          <IconArrowBottomBlue width={20} height={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.dataContainer}>
        {listHistoryPresensi?.data?.map((value: any, index: any) => {
          const {date, start_time, end_time} = value;
          const dateConvert: any = _handlerConvertAllDate(date, 3, 2);

          return (
            <View key={index}>
              <View style={styles.dataCard}>
                <Text style={styles.dataTitle}>{dateConvert}</Text>
                <View>
                  <Text style={styles.dataTitle}>{`${start_time || ''} - ${
                    end_time || ''
                  }`}</Text>
                </View>
              </View>

              <View style={styles.grayLine} />
            </View>
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
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.container}>
            {listHistoryPresensi?.data && listHistoryPresensi?.data?.length != 0
              ? _renderContent()
              : _renderNoData()}
          </View>
        </ScrollView>

        <SwipeUp
          height={100}
          visible={isShowSwipeUp}
          onClose={_handlerOnCloseSwipeUp}
          children={_renderSwipeUpContent()}
        />
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default AttendancePresensiHistoryScreen;
