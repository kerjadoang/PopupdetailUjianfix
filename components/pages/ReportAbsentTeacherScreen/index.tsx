import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {styles} from './style';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Header, SwipeUp} from '@components/atoms';
import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import Down from '@assets/svg/chevron_down_blue.svg';
import DatePicker from './Components/DatePicker';
import Right from '@assets/svg/ic_arrow_right_blue.svg';
import useFormReportAbsenTeacher from './useFormReportAbsenTeacher';
import Robot from '@assets/svg/robot_empty_absent.svg';
import 'dayjs/locale/id';
import {ScrollView} from 'react-native-gesture-handler';
import {ParamList} from 'type/screen';
import {convertDate} from '@constants/functional';
const ReportAbsentTeacherScreen = () => {
  const route: any =
    useRoute<RouteProp<ParamList, 'ReportAbsentTeacherScreen'>>();
  const {id, type, full_name} = route?.params;
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ReportAbsentTeacherScreen'>
    >();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Kehadiran'}
          backgroundColor="white"
          subLabel={full_name}
        />
      ),
    });
  }, [navigation]);
  const {
    data,
    setNewDate,
    value,
    setValue,
    monthAndYearName,
    formattedValue,
    count,
    setCount,
    defaultSelected,
  }: any = useFormReportAbsenTeacher(id, type);

  const [show, setShow] = useState(false);

  const formatDateToCustomFormat = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('dddd, D MMMM YYYY');
    return formattedDate;
  };

  const formatDateToCustomFormatNoDays = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('D MMMM YYYY');
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.rowBetween, styles.contentHeader]}>
        <View style={styles.subContent}>
          <Online width={56} height={56} />
          <Text style={styles.textSubTitleBigBlack}>Kelas Online</Text>
          <Text style={styles.textTitleBigBlack}>{data?.online_class}</Text>
        </View>
        <View style={styles.subContent}>
          <Offline width={56} height={56} />
          <Text style={styles.textSubTitleBigBlack}>Kelas Offline</Text>
          <Text style={styles.textTitleBigBlack}>{data?.offline_class}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.rowBetween}>
        <Text style={styles.textTitleBlack}>Riwayat Kehadiran</Text>
        {type !== 'attendance' ? null : (
          <Pressable
            style={[styles.buttonDrop, styles.row, {alignItems: 'center'}]}
            onPress={() => setShow(!show)}>
            <Text style={styles.textBlue}>{monthAndYearName}</Text>
            <Down width={16} style={{marginLeft: 10}} />
          </Pressable>
        )}
      </View>
      {type !== 'attendance' ? (
        <View>
          <View style={styles.rowBetween}>
            <Pressable
              style={styles.buttonChoose}
              onPress={() => setCount('Diterima')}>
              <Text
                style={
                  count === 'Diterima' ? styles.textBlue : styles.textGrey
                }>
                Diterima
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttonChoose}
              onPress={() => setCount('Ditolak')}>
              <Text
                style={count === 'Ditolak' ? styles.textBlue : styles.textGrey}>
                Ditolak
              </Text>
            </Pressable>
          </View>
          <View style={[styles.rowBetween, {alignItems: 'flex-end'}]}>
            <View
              style={
                count === 'Diterima' ? styles.lineActive : styles.lineDeactivate
              }
            />
            <View
              style={
                count === 'Ditolak' ? styles.lineActive : styles.lineDeactivate
              }
            />
          </View>
          <ScrollView style={{height: '69%'}}>
            {!data?.absent_data ? (
              <View style={styles.emptyView}>
                <Robot width={100} />
                <Text style={styles.textTitleBigBlack}>
                  Belum Ada Riwayat Presensi
                </Text>
                <Text style={styles.textSubTitleGrey}>
                  Presensi yang sudah dicatat akan muncul disini.
                </Text>
              </View>
            ) : (
              data?.absent_data?.map((item: any, i: any) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    if (item?.attendance_type === 'kelas online') {
                      navigation.navigate('ReportDetailAbsentTeacherScreen', {
                        id: item?.absent_id,
                        type: item?.approval_status,
                        full_name: full_name,
                      });
                    }
                  }}
                  style={[
                    [styles.list, styles.rowBetween, {alignItems: 'center'}],
                  ]}>
                  <View style={{width: '85%'}}>
                    <Text
                      style={[styles.textBlue, {textTransform: 'capitalize'}]}>
                      {item?.attendance_type}
                    </Text>
                    <Text style={styles.textTitleBlack}>
                      {item?.days} Hari{' '}
                      {item?.days > 1 ? (
                        <Text style={styles.textSubTitle}>
                          : {formatDateToCustomFormatNoDays(item?.start_date)} -{' '}
                          {formatDateToCustomFormatNoDays(item?.end_date)}
                        </Text>
                      ) : (
                        <Text style={styles.textSubTitle}>
                          : {formatDateToCustomFormatNoDays(item?.start_date)}
                        </Text>
                      )}
                    </Text>
                    <Text
                      style={[
                        styles.textTitleBlack,
                        {textTransform: 'capitalize'},
                      ]}>
                      {item?.reason}{' '}
                    </Text>
                  </View>
                  {item?.attendance_type === 'kelas online' ? (
                    <Right width={24} />
                  ) : null}
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      ) : (
        <View>
          {!data?.attend_data ? (
            <View style={styles.emptyView}>
              <Robot width={100} />
              <Text style={styles.textTitleBigBlack}>
                Belum Ada Riwayat Presensi
              </Text>
              <Text style={styles.textSubTitleGrey}>
                Presensi yang sudah dicatat akan muncul disini.
              </Text>
            </View>
          ) : (
            data?.attend_data?.map((item: any, i: any) => (
              <View key={i} style={[styles.rowBetween, styles.list]}>
                <Text style={styles.textSubTitle}>
                  {formatDateToCustomFormat(item?.date)}
                </Text>
                <Text style={styles.textSubTitle}>
                  {item?.start_time} - {item?.end_time}
                </Text>
              </View>
            ))
          )}
        </View>
      )}
      <SwipeUp
        height={200}
        visible={show}
        onClose={() => setShow(false)}
        children={
          <View style={{padding: 10}}>
            <Text style={[styles.textTitleBigBlack, {textAlign: 'center'}]}>
              Pilih Bulan
            </Text>
            <DatePicker
              selected={value}
              onChange={(value: any) => setValue(value)}
              defaultSelected={defaultSelected}
            />
            <Button label="Simpan" action={() => setNewDate(formattedValue)} />
          </View>
        }
      />
    </View>
  );
};

export {ReportAbsentTeacherScreen};
