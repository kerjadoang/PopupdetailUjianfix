import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import Robot from '@assets/svg/robot_link_account.svg';
import Fonts from '@constants/fonts';
import Clock from '@assets/svg/ic16_clock.svg';

type Props = {
  showExplanation?: () => void;
  dataDetail: any;
};
const SwipeUpDoneCorrection = ({showExplanation, dataDetail}: Props) => {
  const isValid =
    dataDetail?.items?.student_value !== 'Belum dinilai' &&
    dataDetail?.items?.student_value !== 'Tidak mengerjakan';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {dataDetail?.type ? dataDetail?.type : '-'} •{' '}
        {dataDetail?.subject_name ? dataDetail?.subject_name : '-'}
      </Text>
      <Text style={styles.name}>
        {dataDetail?.title ? dataDetail?.title : '-'}
      </Text>
      <Text style={styles.date}>
        Diberikan: {dataDetail?.time_start ? dataDetail?.time_start : '-'}
      </Text>
      {dataDetail?.correction_type === 'pending' ? (
        <View style={styles.middle}>
          <Robot width={120} height={120} />
          <Text style={styles.description}>
            Tugas kamu masih dalam proses pemeriksaan. Tunggu sebentar, ya!
          </Text>
        </View>
      ) : dataDetail?.correction_type === 'finish' ? (
        <View style={styles.middle}>
          <Text style={styles.nilaiText}>Nilai</Text>
          <Text style={styles.nilaiValue}>
            {isValid ? dataDetail?.value : dataDetail?.items?.student_value}
          </Text>
        </View>
      ) : null}
      <View style={styles.bottom}>
        {dataDetail?.correction_type === 'finish' ? (
          <View>
            <View style={styles.nilaiContainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.trueValue}>
                  {dataDetail?.correct ? dataDetail?.correct : 0}
                </Text>
                <Text style={styles.trueText}>Benar</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.trueValue, {color: Colors.danger.base}]}>
                  {dataDetail?.wrong ? dataDetail?.wrong : 0}
                </Text>
                <Text style={[styles.trueText, {color: Colors.danger.base}]}>
                  Salah
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={[styles.trueValue, {color: Colors.dark.neutral60}]}>
                  {dataDetail?.skip ? dataDetail?.skip : 0}
                </Text>
                <Text style={[styles.trueText, {color: Colors.dark.neutral60}]}>
                  Dilewati
                </Text>
              </View>
            </View>
            <View style={styles.rectangle} />
          </View>
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.durationText}>Durasi Pengerjaan:</Text>
          <Clock width={16} height={16} style={{marginHorizontal: 5.5}} />
          <Text style={styles.durationTime}>
            {dataDetail?.duration ?? '0 menit'}
          </Text>
        </View>
        <Text style={[styles.durationText, {paddingTop: 12}]}>
          Dikumpulkan:{' '}
          {dataDetail?.time_correction ? dataDetail?.time_correction : '-'}
        </Text>
      </View>
      {dataDetail?.correction_type === 'finish' && isValid ? (
        <View style={{marginTop: 32, width: '100%'}}>
          <Button
            label="Lihat Pembahasan"
            fontSize={16}
            action={showExplanation}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SwipeUpDoneCorrection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
  },
  name: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    fontWeight: '600',
    paddingTop: 4,
  },
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
    paddingTop: 4,
  },
  nilaiText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '600',
  },
  nilaiValue: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.primary.base,
    fontWeight: '600',
  },
  middle: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    fontWeight: '400',
    paddingTop: 16,
  },
  bottom: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    marginTop: 16,
    width: '100%',
  },
  durationText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral60,
    fontWeight: '400',
  },
  durationTime: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.primary.base,
    fontWeight: '600',
  },
  nilaiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trueValue: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: Colors.success.base,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  trueText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.success.base,
    fontWeight: '400',
    paddingHorizontal: 28,
  },
  rectangle: {
    height: 0.6,
    backgroundColor: Colors.dark.neutral40,
    marginVertical: 12,
  },
});
