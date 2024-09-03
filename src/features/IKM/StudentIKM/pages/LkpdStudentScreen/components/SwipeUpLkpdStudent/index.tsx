import React, {FC} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {Button, MainText, MainView} from '@components/atoms';
import IcCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import Colors from '@constants/colors';
import IcRobotKedip from '@assets/svg/ic_robot_kedip.svg';
import Fonts from '@constants/fonts';
import IcInfoOrange from '@assets/svg/ic24_info_orange_2.svg';
import {convertDate, isStringContains} from '@constants/functional';

const caraPengerjaanText: Array<string> = [
  'Semua soal wajib dijawab.',
  'Untuk melihat jawaban, selesaikan tes dalam jangka waktu yang telah diberikan atau klik selesai.',
  'Untuk menjawab pertanyaan, berilah penjelasan yang tepat.',
];

type Props = {
  type: SwipeUpLKPDType;
  data: LKPDCardData;
  onButtonPress?: CallBack<void>;
};

const SwipeUpLkpdStudent: FC<Props> = ({type, data, onButtonPress}) => {
  const renderDikumpulkanCard = () => {
    return (
      <View style={styles.dikumpulkanCard}>
        <Text style={styles.date}>
          Dikumpulkan:{' '}
          {!data?.time_mengumpulkan
            ? '-'
            : convertDate(data?.time_mengumpulkan).format(
                'ddd, DD MMM YYYY • HH:mm',
              )}
        </Text>
      </View>
    );
  };

  const renderBody = () => {
    switch (type) {
      case 'schedule':
        return (
          <View>
            <Text style={{fontFamily: Fonts.SemiBoldPoppins, fontSize: 14}}>
              Cara Pengerjaan :
            </Text>
            <MainView marginLeft={6} marginBottom={24}>
              <FlatList<string>
                data={caraPengerjaanText}
                renderItem={({item}) => {
                  return (
                    <View style={{flexDirection: 'row', marginBottom: 6}}>
                      <Text>• </Text>
                      <Text style={{fontSize: 14}}>{item}</Text>
                    </View>
                  );
                }}
              />
            </MainView>
            <MainView flexDirection="row" marginBottom={16}>
              <IcInfoOrange style={{marginRight: 8}} />
              <Text style={{fontFamily: Fonts.RegularPoppins}}>
                Jawaban yang sudah kamu masukkan akan otomatis tersimpan. Kamu
                dapat keluar dan melanjutkan Lembar Kerja.
              </Text>
            </MainView>
          </View>
        );

      default:
        //if belum dinilai
        if (isStringContains(data.student_value || '', 'belum')) {
          return (
            <MainView alignItems="center">
              <IcRobotKedip style={{marginVertical: 14}} />
              <Text style={styles.belumDinilaiText}>
                Tugas kamu masih dalam proses pemeriksaan. Tunggu sebentar, ya!
              </Text>
              {renderDikumpulkanCard()}
            </MainView>
          );
        }

        return (
          <MainView alignItems="center">
            <MainText color={Colors.dark.neutral60}>Nilai</MainText>
            <Text style={styles.score}>{data?.student_value}</Text>
            {renderDikumpulkanCard()}
          </MainView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* MARK: START Header */}
      <View style={{marginBottom: 16}}>
        <Text style={styles.title}>Lembar Kerja</Text>
        <Text style={styles.name}>{data?.title ? data?.title : '-'}</Text>
        <Text style={styles.date}>
          Diberikan:{' '}
          {convertDate(data?.time_start).format('ddd, DD MMM YYYY • HH:mm') ||
            '-'}
        </Text>
        {type === 'schedule' && (
          <MainView flexDirection="row" alignSelf="center" alignItems="center">
            <Text style={styles.dateCollected}>Dikumpulkan: </Text>
            <IcCalendarBlue
              height={16}
              width={16}
              style={{marginHorizontal: 2}}
            />
            <Text style={styles.dateCollected}>
              {convertDate(data?.time_finish).format(
                'ddd, DD MMM YYYY • HH:mm',
              ) || '-'}
            </Text>
          </MainView>
        )}
      </View>
      {/* MARK: END Header */}

      {/* MARK: START Body */}
      {renderBody()}
      {/* MARK: END Body */}

      {/* MARK: START Footer */}
      {type !== 'done_scoring' && (
        <View style={{marginTop: 16}}>
          <Button
            action={onButtonPress}
            label={type === 'schedule' ? 'Kerjakan' : 'Tutup'}
          />
        </View>
      )}
      {/* MARK: END Footer */}
    </View>
  );
};

export default SwipeUpLkpdStudent;
