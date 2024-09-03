import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Button, MainView, PopUpWithIcon} from '@components/atoms';
import Down from '@assets/svg/ic24_chevron_down_black.svg';
import {styles} from '../styles';
import Calender from '@assets/svg/ic16_calendar.svg';
import {ScrollView} from 'react-native-gesture-handler';
import Robot from '@assets/svg/robot_gembira.svg';
import Warning from '@assets/svg/ic24_info_orange.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import 'dayjs/locale/id';
import {ParamList} from 'type/screen';
import {convertDate} from '@constants/functional';
type Props = {
  show?: any;
  setshow?: any;
  dataDesc?: any;
  dataType?: any;
  selectedType?: any;
  setSelectedType: any;
  handleSelect?: any;
  submitRegister?: any;
  popup?: any;
  setpopup?: any;
  status?: any;
  showSwipe?: any;
  setShowSwipe?: any;
  selectedData?: any;
};

const SwipeUpContent = ({
  show,
  setshow,
  dataDesc,
  dataType,
  selectedType,
  handleSelect,
  submitRegister,
  popup,
  setpopup,
  status,
  setShowSwipe,
  selectedData,
}: Props) => {
  const checkIfBeforeTargetDate = () => {
    const targetDate = new Date(selectedData?.time_start);
    const currentDate = new Date();

    if (currentDate <= targetDate) {
      return true; // Current date is before or equal to the target date
    } else {
      return false; // Current date is after the target date
    }
  };

  const calculateDuration = () => {
    const targetDate = new Date(selectedData?.time_start);
    const currentDate = new Date();

    const timeDifference = targetDate.getTime() - currentDate.getTime();

    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;

    const totalSeconds = Math.floor(timeDifference / millisecondsPerSecond);
    const days = Math.floor(
      totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay),
    );
    const hours = Math.floor(
      (totalSeconds % (secondsPerMinute * minutesPerHour * hoursPerDay)) /
        (secondsPerMinute * minutesPerHour),
    );
    const minutes = Math.floor(
      (totalSeconds % (secondsPerMinute * minutesPerHour)) / secondsPerMinute,
    );

    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    const duration = `${formattedDays} Hari : ${formattedHours} Jam : ${formattedMinutes} Menit`;
    return duration;
  };

  const startDate = convertDate(selectedData?.time_start).format(
    'ddd, MMM YYYY • HH:mm',
  );
  const endDate = convertDate(selectedData?.time_finish).format(
    'ddd, D MMMM YYYY • HH:mm',
  );

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TryOutScreen'>>();
  return (
    <View style={{padding: 16}}>
      <View style={styles.modalHeader}>
        <Text style={[styles.textTitleBigBlack, {textAlign: 'center'}]}>
          {dataDesc?.title}
        </Text>
        <Text style={styles.textSubTitleGrey}>
          Waktu {status ? 'Pengerjaan' : 'Pendaftaran'}
        </Text>
        {status ? (
          <View style={styles.row}>
            <Calender width={16} style={{marginRight: 5}} />
            <Text style={styles.textSubTitle}>
              {startDate} - {endDate}
            </Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Calender width={16} style={{marginRight: 5}} />
            <Text style={styles.textSubTitle}>
              {startDate} - {endDate}
            </Text>
          </View>
        )}
      </View>

      <View style={{marginTop: 20}}>
        <Text style={[status ? styles.textBlueBold : styles.textTitleBlack]}>
          Deskripsi:
        </Text>
        <MainView flexDirection="row">
          <Text style={[styles.textSubTitle, {paddingLeft: 10}]}>•</Text>
          <Text style={[styles.textSubTitle, {marginHorizontal: 10}]}>
            Try Out ini hanya terdiri dari Soal TPS (Tes Potensi Skolastik)
          </Text>
        </MainView>
        <MainView flexDirection="row">
          <Text style={[styles.textSubTitle, {paddingLeft: 10}]}>•</Text>
          <Text style={[styles.textSubTitle, {marginHorizontal: 10}]}>
            Try Out hanya dapat dikerjakan pada periode pengerjaan
          </Text>
        </MainView>
        <MainView flexDirection="row">
          <Text style={[styles.textSubTitle, {paddingLeft: 10}]}>•</Text>
          <Text style={[styles.textSubTitle, {marginHorizontal: 10}]}>
            Pembahasan soal akan muncul setelah periode Try Out selesai
          </Text>
        </MainView>
        {status ? (
          <View style={[styles.row, styles.info]}>
            <Warning width={24} height={24} style={{marginRight: 10}} />
            <Text style={[styles.textBlue, {color: '#998122'}]}>
              Jika telah memulai anda tidak dapat membatalkannya
            </Text>
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitleBlack}>Pilih Soal </Text>
            <Pressable style={styles.dropDown} onPress={() => setshow(!show)}>
              <Text
                style={[
                  styles.textSubTitle,
                  {color: selectedType ? 'black' : '#667085'},
                ]}>
                {selectedType ? selectedType?.description : 'Pilih Type'}
              </Text>
              <Down width={24} />
            </Pressable>
            {show ? (
              <View
                style={[
                  styles.card,
                  styles.shadowProp,
                  {width: '100%', padding: 0},
                ]}>
                <Text style={[styles.textTitleBlack, styles.custom]}>
                  Pilih Tipe Soal
                </Text>
                <ScrollView
                  style={{height: 128}}
                  persistentScrollbar={true}
                  showsVerticalScrollIndicator={true}>
                  <View style={{padding: 16}}>
                    {dataType?.map((item: any, i: number) => (
                      <Pressable
                        onPress={() => {
                          setshow(false);
                          return handleSelect(item);
                        }}
                        key={i}
                        style={[
                          styles.rowBetween,
                          {
                            alignItems: 'center',
                            marginBottom: 10,
                          },
                        ]}>
                        <Text style={styles.textSubTitleBigBlack}>
                          {item?.description}
                        </Text>
                        <View
                          style={
                            selectedType?.id === item?.id
                              ? styles.circleBlue
                              : styles.circleBorderBlue
                          }
                        />
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>
            ) : null}
          </View>
        )}
        <View style={{height: 150, justifyContent: 'flex-end'}}>
          <Button
            isDisabled={checkIfBeforeTargetDate()}
            label={
              checkIfBeforeTargetDate()
                ? calculateDuration()
                : status
                ? 'Mulai'
                : 'Daftar'
            }
            // isDisabled={(!selectedType && !status) || checkIfBeforeTargetDate()}
            action={() => {
              setShowSwipe(false);
              if (status) {
                navigation.navigate('TryOutSubjectScreen', {
                  title: selectedData?.title,
                  id: selectedData?.id,
                  register_id: selectedData?.register_id,
                });
              } else {
                submitRegister();
              }
            }}
          />
        </View>
        {popup ? (
          <PopUpWithIcon
            desc="Semangat Mengerjakan !"
            title="Terimakasih telah mendaftar"
            action={() => {
              setpopup(!popup);
              setshow(false);
            }}
            textButton="OK"
            icon
            iconName={<Robot width={100} height={100} />}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SwipeUpContent;
