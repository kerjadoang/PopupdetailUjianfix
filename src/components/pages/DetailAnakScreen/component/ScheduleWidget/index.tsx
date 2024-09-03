import React from 'react';
import {Text, Image, View, Pressable} from 'react-native';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import {styles} from './style';
import useScheduleWidget from './useScheduleWidget';
import {
  ScheduleItemProject,
  ScheduleItemSessionClass,
  ScheduleItemVirtualMeeting,
} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {IDataAnak} from 'type/data-anak';
const ScheduleWidget = ({
  dataAnak,
  create,
}: {
  dataAnak: IDataAnak;
  create: boolean;
}) => {
  const {schedule}: any = useScheduleWidget(dataAnak);
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          {alignItems: 'center', flexDirection: 'row'},
        ]}>
        <IconCalendar width={20} height={20} style={{marginRight: 10}} />
        <Text style={styles.groupMentorTitle}>{'Jadwal Hari Ini'}</Text>
      </View>
      <View>
        {schedule?.length === 0 && (
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

        {schedule?.map((item, index) => {
          if (item?.type === 'sesi kelas') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'sesi tanya') {
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
          if (item?.type === 'Belajar Mandiri') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          if (item?.type === 'AKM Literasi') {
            return (
              <View key={index} style={styles.cardOfschedule}>
                <ScheduleItemSessionClass data={item} button={false} />
              </View>
            );
          }
          return <View key={index} />;
        })}
      </View>

      <View style={styles.centering}>
        <Pressable
          onPress={() =>
            navigation.navigate('ScheduleScreen', {
              filter: 'semua',
              screen: 'DetailAnakScreen',
              loginAs: 'ORANG-TUA',
              token: dataAnak.access_token,
              data: dataAnak,
              subLabel: `${dataAnak.full_name} • Kelas ${dataAnak.class_id}`,
            })
          }
          style={styles.button}>
          <Text style={styles.textBtn}>Lihat Semua Jadwal {'>'}</Text>
        </Pressable>
      </View>

      {create && (
        <View style={styles.centering}>
          <Pressable
            onPress={() =>
              navigation.navigate('FormCreateScheduleOnParentScreen', {
                filter: 'semua',
                screen: 'DetailAnakScreen',
                loginAs: 'ORANG-TUA',
                token: dataAnak.access_token,
                data: dataAnak,
              })
            }
            style={styles.buatJadwalBelajarView}>
            <Text style={styles.buatJadwalBelajarText}>
              + Buat Jadwal Belajar
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export {ScheduleWidget};
